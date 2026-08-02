"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { questions, sources, type Question } from "./questions";
import { activeQuestionCount } from "./question-bank";
import { summaryCards, type SummaryCard } from "./summaries";

type AnswerSource = { label: string; url: string };
type AssistantAnswer = {
  summary: string;
  details: string[];
  caution?: string;
  topic?: string;
  sources: AnswerSource[];
  confidence: "kuat" | "cukup" | "rendah";
};
type ChatMessage =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; answer: AssistantAnswer };

const STOP_WORDS = new Set([
  "apa", "apakah", "bagaimana", "berapa", "yang", "dan", "atau", "dari",
  "dalam", "untuk", "pada", "dengan", "itu", "ini", "ke", "di", "oleh",
  "saya", "adalah", "menurut", "tentang", "terkait", "bisa", "boleh",
  "harus", "sebagai", "jika", "kalau", "kapan", "siapa", "mengapa",
]);

const TERM_EXPANSIONS: Record<string, string[]> = {
  bmn: ["barang", "milik", "negara", "penggunaan"],
  disiplin: ["pelanggaran", "hukuman", "pns", "pemeriksaan"],
  hukuman: ["disiplin", "pelanggaran", "sanksi"],
  informasi: ["ppid", "layanan", "publik", "keterbukaan"],
  kinerja: ["skp", "iku", "nkp", "nko", "evaluasi"],
  kehumasan: ["komunikasi", "media", "informasi", "publik"],
  anggaran: ["keuangan", "belanja", "pelaksanaan", "perencanaan"],
  perdin: ["perjalanan", "dinas"],
  pengadaan: ["pbj", "penyedia", "kontrak"],
  organisasi: ["struktur", "tugas", "fungsi", "djbc"],
};

const SUGGESTIONS = [
  "Berapa batas maksimal IKU UPK-Two?",
  "Apa perbedaan hukuman disiplin sedang dan berat?",
  "Informasi apa yang dikecualikan oleh PPID?",
  "Bagaimana tahapan penggunaan BMN?",
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function queryTerms(query: string) {
  const base = normalize(query)
    .split(" ")
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term));
  return [...new Set(base.flatMap((term) => [term, ...(TERM_EXPANSIONS[term] || [])]))];
}

function scoreText(query: string, terms: string[], text: string) {
  const normalized = normalize(text);
  const phrase = normalize(query);
  let score = phrase.length > 5 && normalized.includes(phrase) ? 18 : 0;
  terms.forEach((term) => {
    if (normalized.includes(term)) score += /^\d+$/.test(term) ? 5 : 2;
  });
  return score;
}

function questionText(question: Question) {
  return [
    question.topic,
    question.stem,
    question.reference,
    sources[question.source].label,
    ...question.options.flatMap(([option, explanation]) => [option, explanation]),
  ].join(" ");
}

function cardText(card: SummaryCard) {
  return [
    card.topic,
    card.title,
    card.memoryCode,
    card.summary,
    ...card.keyPoints,
    ...card.traps,
    card.sourceLabel,
  ].join(" ");
}

function uniqueSources(items: AnswerSource[]) {
  return items.filter(
    (source, index) => items.findIndex((item) => item.url === source.url) === index,
  );
}

function answerQuestion(query: string): AssistantAnswer {
  const terms = queryTerms(query);
  if (!terms.length) {
    return {
      summary: "Tuliskan istilah, angka, prosedur, atau nama peraturan yang ingin Anda pastikan.",
      details: ["Contoh: batas waktu PPID, hukuman disiplin, IKU, BMN, perjalanan dinas, atau komunikasi internal."],
      sources: [],
      confidence: "rendah",
    };
  }

  const questionMatches = questions
    .map((question) => ({
      question,
      score: scoreText(query, terms, questionText(question)),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const cardMatches = summaryCards
    .map((card) => ({ card, score: scoreText(query, terms, cardText(card)) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const bestQuestion = questionMatches[0];
  const bestCard = cardMatches[0];
  const bestScore = Math.max(bestQuestion?.score || 0, bestCard?.score || 0);
  const minimumScore = Math.max(4, Math.ceil(terms.length * 0.8));

  if (bestScore < minimumScore) {
    const nearby = questionMatches[0]?.question;
    return {
      summary: "Saya belum menemukan dasar yang cukup kuat untuk menjawab dengan aman.",
      details: nearby
        ? [`Materi terdekat yang ditemukan: ${nearby.topic} — ${nearby.reference}. Coba gunakan istilah yang lebih spesifik.`]
        : ["Coba sebutkan topik, nomor peraturan, istilah, atau angka yang sedang diragukan."],
      topic: nearby?.topic,
      sources: nearby
        ? [{ label: sources[nearby.source].label, url: sources[nearby.source].url }]
        : [],
      confidence: "rendah",
    };
  }

  const useCard = Boolean(bestCard && (!bestQuestion || bestCard.score >= bestQuestion.score));
  const matchedQuestions: Question[] = [];
  const seen = new Set<string>();
  questionMatches.forEach(({ question }) => {
    const key = `${question.source}|${question.reference}|${question.options[question.answer][0]}`;
    if (!seen.has(key) && matchedQuestions.length < 3) {
      seen.add(key);
      matchedQuestions.push(question);
    }
  });

  if (useCard && bestCard) {
    const card = bestCard.card;
    return {
      summary: card.summary,
      details: [...card.keyPoints].slice(0, 4),
      caution: card.traps[0],
      topic: card.topic,
      sources: uniqueSources([
        { label: card.sourceLabel, url: card.sourceUrl },
        ...matchedQuestions.map((question) => ({
          label: sources[question.source].label,
          url: sources[question.source].url,
        })),
      ]).slice(0, 3),
      confidence: bestScore >= 12 ? "kuat" : "cukup",
    };
  }

  const primary = bestQuestion.question;
  const [correctOption, explanation] = primary.options[primary.answer];
  return {
    summary: correctOption,
    details: [
      explanation,
      ...matchedQuestions
        .slice(1)
        .map((question) => question.options[question.answer][0]),
    ].slice(0, 3),
    topic: primary.topic,
    sources: uniqueSources(
      matchedQuestions.map((question) => ({
        label: `${sources[question.source].label} · ${question.reference}`,
        url: sources[question.source].url,
      })),
    ).slice(0, 3),
    confidence: bestScore >= 12 ? "kuat" : "cukup",
  };
}

export function KnowledgeChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(1);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const ask = (question: string) => {
    const clean = question.trim();
    if (!clean) return;
    const id = nextMessageId.current;
    nextMessageId.current += 2;
    setMessages((previous) => [
      ...previous,
      { id, role: "user", text: clean },
      { id: id + 1, role: "assistant", answer: answerQuestion(clean) },
    ]);
    setInput("");
    setOpen(true);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <>
      <button
        className={`knowledge-chat-trigger ${open ? "active" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="knowledge-chat-panel"
      >
        <span>?</span>
        <strong>Tanya materi</strong>
      </button>

      {open && (
        <section
          className="knowledge-chat-panel"
          id="knowledge-chat-panel"
          aria-label="Chatbot knowledge base Dukungan Manajemen"
        >
          <header>
            <div>
              <span>Asisten knowledge base</span>
              <strong>Tanya SIMTALENTA</strong>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Tutup chatbot">×</button>
          </header>

          <div className="knowledge-chat-status">
            <i /> Materi Drive terindeks · {activeQuestionCount.toLocaleString("id-ID")} soal aktif · {summaryCards.length} ringkasan
          </div>

          <div className="knowledge-chat-messages" aria-live="polite">
            {!messages.length && (
              <div className="knowledge-welcome">
                <strong>Apa yang masih meragukan?</strong>
                <p>Saya mencari jawaban dari pembahasan, ringkasan, dan rujukan materi—lalu menunjukkan dokumen sumbernya.</p>
                <div>
                  {SUGGESTIONS.map((suggestion) => (
                    <button key={suggestion} onClick={() => ask(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) =>
              message.role === "user" ? (
                <div className="knowledge-message user" key={message.id}>{message.text}</div>
              ) : (
                <article className="knowledge-message assistant" key={message.id}>
                  <div className="knowledge-answer-meta">
                    {message.answer.topic && <span>{message.answer.topic}</span>}
                    <small>Dasar {message.answer.confidence}</small>
                  </div>
                  <strong>{message.answer.summary}</strong>
                  {message.answer.details.length > 0 && (
                    <ul>
                      {message.answer.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  )}
                  {message.answer.caution && (
                    <p className="knowledge-caution"><b>Waspadai:</b> {message.answer.caution}</p>
                  )}
                  {message.answer.sources.length > 0 && (
                    <footer>
                      <span>Sumber jawaban</span>
                      {message.answer.sources.map((source) => (
                        <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                          {source.label} ↗
                        </a>
                      ))}
                    </footer>
                  )}
                </article>
              ),
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={submit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tanyakan materi atau peraturan…"
              aria-label="Pertanyaan untuk chatbot"
              autoComplete="off"
            />
            <button type="submit" disabled={!input.trim()} aria-label="Kirim pertanyaan">→</button>
          </form>
          <p className="knowledge-disclaimer">Jawaban belajar, bukan penetapan resmi. Buka sumber untuk keputusan kedinasan.</p>
        </section>
      )}
    </>
  );
}

export default KnowledgeChat;

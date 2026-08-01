"use client";

import { useEffect, useMemo, useState } from "react";
import { questions, sources, type Question, type Topic } from "./questions";
import { summaryCards } from "./summaries";
import { KnowledgeChat } from "./knowledge-chat";

type View = "home" | "quiz" | "results" | "summary";
type Mode = "exam" | "adaptive" | "sprint" | "topic";
type Session = {
  mode: Mode;
  title: string;
  questionIds: number[];
  optionOrders: Record<number, number[]>;
  topic?: Topic;
};
type ProgressItem = {
  attempts: number;
  correct: number;
  wrong: number;
};
type Progress = Record<number, ProgressItem>;
type QuizResult = {
  correct: number;
  total: number;
  unanswered: number;
  answers: Record<number, number>;
  questionIds: number[];
  optionOrders: Record<number, number[]>;
};

const topicMeta: Record<Topic, { short: string; icon: string }> = {
  "Manajemen Kinerja": { short: "Kinerja", icon: "MK" },
  "Disiplin & Kepegawaian": { short: "Kepegawaian", icon: "KP" },
  PPID: { short: "PPID", icon: "PI" },
  "Komunikasi & Penyuluhan": { short: "Komunikasi", icon: "KM" },
  "Kepatuhan Internal": { short: "Kepatuhan", icon: "KI" },
  "Organisasi, Sejarah & Logo": { short: "Organisasi", icon: "OS" },
  "Umum, Rumah Tangga & BMN": { short: "Umum & BMN", icon: "BM" },
  "Keuangan & Pengadaan": { short: "Keuangan", icon: "KU" },
  "Layanan Informasi": { short: "Layanan", icon: "LI" },
  "AI dalam Probis": { short: "AI Probis", icon: "AI" },
};

const topics = Object.keys(topicMeta) as Topic[];
const STORAGE_KEY = "simtalenta-djbc-progress-v1";
const LAST_RESULT_KEY = "simtalenta-djbc-last-result-v1";

function shuffle<T>(input: T[]) {
  const next = [...input];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function reorderQuestion(question: Question, order?: number[]): Question {
  if (!order || order.length !== 4) return question;
  return {
    ...question,
    options: order.map((index) => question.options[index]),
    answer: order.indexOf(question.answer),
  };
}

function formatTime(seconds: number) {
  const safe = Math.max(seconds, 0);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    : `${minutes}:${String(secs).padStart(2, "0")}`;
}

function readProgress(): Progress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Progress;
  } catch {
    return {};
  }
}

function percentage(value: number, total: number) {
  return total ? Math.round((value / total) * 100) : 0;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [session, setSession] = useState<Session | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<number[]>([]);
  const [flagged, setFlagged] = useState<number[]>([]);
  const [progress, setProgress] = useState<Progress>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [summaryTopic, setSummaryTopic] = useState<Topic | "Semua">("Semua");
  const [summaryQuery, setSummaryQuery] = useState("");
  const [revealedCards, setRevealedCards] = useState<string[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setProgress(readProgress());
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const activeQuestions = useMemo(() => {
    if (!session) return [];
    return session.questionIds
      .map((id) => questions.find((question) => question.id === id))
      .filter((question): question is Question => Boolean(question))
      .map((question) =>
        reorderQuestion(question, session.optionOrders[question.id]),
      );
  }, [session]);

  const currentQuestion = activeQuestions[currentIndex];
  const isStudyMode = session?.mode !== "exam";
  const isRevealed = currentQuestion
    ? revealed.includes(currentQuestion.id)
    : false;

  const updateProgress = (
    sessionQuestions: Question[],
    submittedAnswers: Record<number, number>,
  ) => {
    const next = { ...readProgress() };
    sessionQuestions.forEach((question) => {
      const selected = submittedAnswers[question.id];
      if (selected === undefined) return;
      const previous = next[question.id] || {
        attempts: 0,
        correct: 0,
        wrong: 0,
      };
      const isCorrect = selected === question.answer;
      next[question.id] = {
        attempts: previous.attempts + 1,
        correct: previous.correct + (isCorrect ? 1 : 0),
        wrong: previous.wrong + (isCorrect ? 0 : 1),
      };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setProgress(next);
  };

  const finishQuiz = () => {
    if (!session) return;
    const correct = activeQuestions.filter(
      (question) => answers[question.id] === question.answer,
    ).length;
    const quizResult: QuizResult = {
      correct,
      total: activeQuestions.length,
      unanswered: activeQuestions.filter(
        (question) => answers[question.id] === undefined,
      ).length,
      answers: { ...answers },
      questionIds: [...session.questionIds],
      optionOrders: { ...session.optionOrders },
    };
    updateProgress(activeQuestions, answers);
    localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(quizResult));
    setResult(quizResult);
    setConfirmOpen(false);
    setView("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (view !== "quiz" || session?.mode !== "exam") return;
    const timer = window.setInterval(() => {
      setTimeLeft((remaining) => Math.max(remaining - 1, 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [view, session?.mode]);

  useEffect(() => {
    if (
      view === "quiz" &&
      session?.mode === "exam" &&
      timeLeft === 0 &&
      activeQuestions.length
    ) {
      const timeout = window.setTimeout(() => finishQuiz(), 0);
      return () => window.clearTimeout(timeout);
    }
    // finishQuiz intentionally uses the current answer snapshot at time expiry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    if (view !== "quiz" || !currentQuestion) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (["1", "2", "3", "4"].includes(event.key)) {
        const option = Number(event.key) - 1;
        if (!(isStudyMode && isRevealed)) {
          setAnswers((previous) => ({
            ...previous,
            [currentQuestion.id]: option,
          }));
          if (isStudyMode) {
            setRevealed((previous) =>
              previous.includes(currentQuestion.id)
                ? previous
                : [...previous, currentQuestion.id],
            );
          }
        }
      }
      if (event.key.toLowerCase() === "r") {
        setFlagged((previous) =>
          previous.includes(currentQuestion.id)
            ? previous.filter((id) => id !== currentQuestion.id)
            : [...previous, currentQuestion.id],
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [view, currentQuestion, isStudyMode, isRevealed]);

  const startSession = (mode: Mode, topic?: Topic) => {
    let pool: Question[];
    let title: string;

    const prioritize = (candidates: Question[]) =>
      candidates
        .map((question) => {
          const stat = progress[question.id];
          const priority = !stat
            ? 100 + Math.random()
            : stat.wrong * 12 - stat.correct * 3 - stat.attempts + Math.random();
          return { question, priority };
        })
        .sort((a, b) => b.priority - a.priority)
        .map(({ question }) => question);

    if (mode === "exam") {
      pool = shuffle(questions).slice(0, 100);
      title = "Simulasi Penuh · 100 dari 1.000 Soal";
      setTimeLeft(120 * 60);
    } else if (mode === "sprint") {
      pool = shuffle(
        topics.flatMap((sprintTopic) =>
          prioritize(
            questions.filter((question) => question.topic === sprintTopic),
          ).slice(0, 3),
        ),
      );
      title = "Sprint 3 Hari · 30 Soal · Seluruh Rumpun";
    } else if (mode === "topic" && topic) {
      pool = shuffle(
        questions.filter((question) => question.topic === topic),
      ).slice(0, 25);
      title = `Latihan · ${topicMeta[topic].short} · Pembahasan Langsung`;
    } else {
      pool = prioritize(questions).slice(0, 20);
      title = "Belajar Langsung · 20 Soal Adaptif";
    }

    setSession({
      mode,
      title,
      questionIds: pool.map((question) => question.id),
      optionOrders: Object.fromEntries(
        pool.map((question) => [question.id, shuffle([0, 1, 2, 3])]),
      ),
      topic,
    });
    setAnswers({});
    setRevealed([]);
    setFlagged([]);
    setCurrentIndex(0);
    setResult(null);
    setPaletteOpen(false);
    setView("quiz");
    window.scrollTo({ top: 0 });
  };

  const resetToHome = () => {
    setView("home");
    setSession(null);
    setResult(null);
    setConfirmOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseOption = (optionIndex: number) => {
    if (!currentQuestion || (isStudyMode && isRevealed)) return;
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionIndex,
    }));
    if (isStudyMode) {
      setRevealed((previous) =>
        previous.includes(currentQuestion.id)
          ? previous
          : [...previous, currentQuestion.id],
      );
    }
  };

  const nextQuestion = () => {
    if (currentIndex === activeQuestions.length - 1) {
      if (session?.mode === "exam") setConfirmOpen(true);
      else finishQuiz();
      return;
    }
    setCurrentIndex((index) => index + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFlag = () => {
    if (!currentQuestion) return;
    setFlagged((previous) =>
      previous.includes(currentQuestion.id)
        ? previous.filter((id) => id !== currentQuestion.id)
        : [...previous, currentQuestion.id],
    );
  };

  const totalAttempts = Object.values(progress).reduce(
    (sum, item) => sum + item.attempts,
    0,
  );
  const totalCorrect = Object.values(progress).reduce(
    (sum, item) => sum + item.correct,
    0,
  );
  const mastered = Object.values(progress).filter(
    (item) => item.attempts >= 2 && item.correct / item.attempts >= 0.8,
  ).length;

  const topicStats = topics.map((topic) => {
    const topicQuestions = questions.filter(
      (question) => question.topic === topic,
    );
    const attempts = topicQuestions.reduce(
      (sum, question) => sum + (progress[question.id]?.attempts || 0),
      0,
    );
    const correct = topicQuestions.reduce(
      (sum, question) => sum + (progress[question.id]?.correct || 0),
      0,
    );
    return {
      topic,
      count: topicQuestions.length,
      attempts,
      accuracy: percentage(correct, attempts),
    };
  });

  const recommendedTopics = [...topicStats]
    .sort((a, b) => {
      if (!a.attempts && b.attempts) return -1;
      if (a.attempts && !b.attempts) return 1;
      if (a.attempts && b.attempts && a.accuracy !== b.accuracy) {
        return a.accuracy - b.accuracy;
      }
      return b.count - a.count;
    })
    .slice(0, 3);

  const normalizedSummaryQuery = summaryQuery.trim().toLowerCase();
  const filteredSummaryCards = summaryCards.filter((card) => {
    const matchesTopic =
      summaryTopic === "Semua" || card.topic === summaryTopic;
    const searchable = [
      card.title,
      card.memoryCode,
      card.summary,
      ...card.keyPoints,
      ...card.traps,
    ]
      .join(" ")
      .toLowerCase();
    return (
      matchesTopic &&
      (!normalizedSummaryQuery || searchable.includes(normalizedSummaryQuery))
    );
  });

  const openSummary = (topic: Topic | "Semua" = "Semua") => {
    setSummaryTopic(topic);
    setView("summary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (view === "quiz" && session && currentQuestion) {
    const selected = answers[currentQuestion.id];
    const answeredCount = activeQuestions.filter(
      (question) => answers[question.id] !== undefined,
    ).length;
    const progressPercent = percentage(currentIndex + 1, activeQuestions.length);

    return (
      <main className="quiz-shell">
        <header className="quiz-header">
          <button className="brand compact" onClick={resetToHome}>
            <span className="brand-mark">BC</span>
            <span>
              <strong>SIMTALENTA</strong>
              <small>DJBC · Dukungan Manajemen</small>
            </span>
          </button>
          <div className="quiz-header-center">
            <span>{session.title}</span>
            <strong>
              {currentIndex + 1} / {activeQuestions.length}
            </strong>
          </div>
          <div className={`timer ${timeLeft < 600 ? "urgent" : ""}`}>
            <span>{session.mode === "exam" ? "Sisa waktu" : "Mode belajar"}</span>
            <strong>
              {session.mode === "exam" ? formatTime(timeLeft) : "Pembahasan aktif"}
            </strong>
          </div>
        </header>

        <div className="top-progress" aria-label={`${progressPercent}% selesai`}>
          <span style={{ width: `${progressPercent}%` }} />
        </div>

        <section className="quiz-layout">
          <aside className="question-sidebar desktop-only">
            <div className="sidebar-title">
              <span>Navigasi soal</span>
              <strong>{answeredCount} dijawab</strong>
            </div>
            <div className="number-grid">
              {activeQuestions.map((question, index) => (
                <button
                  key={question.id}
                  className={[
                    index === currentIndex ? "current" : "",
                    answers[question.id] !== undefined ? "answered" : "",
                    flagged.includes(question.id) ? "flagged" : "",
                  ].join(" ")}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Soal ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="legend">
              <span><i className="dot current-dot" /> Aktif</span>
              <span><i className="dot answered-dot" /> Dijawab</span>
              <span><i className="dot flagged-dot" /> Ragu</span>
            </div>
          </aside>

          <article className="question-card">
            <div className="question-meta">
              <span className="topic-pill">{currentQuestion.topic}</span>
              <span className={`difficulty ${currentQuestion.difficulty.toLowerCase()}`}>
                {currentQuestion.difficulty}
              </span>
              <button
                className={`flag-button ${flagged.includes(currentQuestion.id) ? "active" : ""}`}
                onClick={toggleFlag}
              >
                {flagged.includes(currentQuestion.id) ? "◆ Ditandai" : "◇ Tandai ragu"}
              </button>
            </div>

            <div className="question-number">Soal {currentIndex + 1}</div>
            <h1>{currentQuestion.stem}</h1>

            <div className="options">
              {currentQuestion.options.map(([text], optionIndex) => {
                const showResult = isStudyMode && isRevealed;
                const isCorrect = optionIndex === currentQuestion.answer;
                const isSelected = selected === optionIndex;
                return (
                  <button
                    key={optionIndex}
                    className={[
                      "option",
                      isSelected ? "selected" : "",
                      showResult && isCorrect ? "correct" : "",
                      showResult && isSelected && !isCorrect ? "incorrect" : "",
                    ].join(" ")}
                    onClick={() => chooseOption(optionIndex)}
                    disabled={Boolean(showResult)}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span>{text}</span>
                    {showResult && isCorrect && <b>Benar</b>}
                    {showResult && isSelected && !isCorrect && <b>Jawaban Anda</b>}
                  </button>
                );
              })}
            </div>

            {isStudyMode && isRevealed && (
              <section className="explanation-panel">
                <div className="explanation-head">
                  <span className={selected === currentQuestion.answer ? "answer-good" : "answer-bad"}>
                    {selected === currentQuestion.answer
                      ? "✓ Jawaban tepat"
                      : `✕ Belum tepat · Kunci ${String.fromCharCode(65 + currentQuestion.answer)}`}
                  </span>
                  <a
                    href={sources[currentQuestion.source].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buka sumber resmi ↗
                  </a>
                </div>
                <div className="explanation-list">
                  {currentQuestion.options.map(([, explanation], optionIndex) => (
                    <div
                      key={optionIndex}
                      className={optionIndex === currentQuestion.answer ? "right-reason" : ""}
                    >
                      <strong>
                        {String.fromCharCode(65 + optionIndex)} ·{" "}
                        {optionIndex === currentQuestion.answer ? "Mengapa benar" : "Mengapa bukan"}
                      </strong>
                      <p>{explanation}</p>
                    </div>
                  ))}
                </div>
                <p className="reference">
                  <strong>Rujukan:</strong> {currentQuestion.reference} ·{" "}
                  {sources[currentQuestion.source].label}
                </p>
              </section>
            )}

            <footer className="question-actions">
              <button
                className="button ghost"
                onClick={() => setPaletteOpen(true)}
              >
                Daftar soal
              </button>
              <div>
                <button
                  className="button secondary"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((index) => index - 1)}
                >
                  Sebelumnya
                </button>
                {isStudyMode && !isRevealed ? (
                  <button
                    className="button primary"
                    disabled
                  >
                    Pilih jawaban
                  </button>
                ) : (
                  <button className="button primary" onClick={nextQuestion}>
                    {currentIndex === activeQuestions.length - 1
                      ? "Lihat hasil"
                      : "Berikutnya"}
                  </button>
                )}
              </div>
            </footer>
            <p className="keyboard-hint">
              Pintasan: tombol 1–4 untuk memilih · R untuk tandai ragu
            </p>
          </article>
        </section>

        <div className="mobile-quiz-bar">
          <button onClick={() => setPaletteOpen(true)}>
            ☷ {answeredCount}/{activeQuestions.length}
          </button>
          {session.mode === "exam" && <strong>{formatTime(timeLeft)}</strong>}
        </div>

        {paletteOpen && (
          <div className="modal-backdrop" onMouseDown={() => setPaletteOpen(false)}>
            <section className="modal palette-modal" onMouseDown={(event) => event.stopPropagation()}>
              <div className="modal-head">
                <div>
                  <span>Navigasi cepat</span>
                  <h2>{answeredCount} soal telah dijawab</h2>
                </div>
                <button onClick={() => setPaletteOpen(false)} aria-label="Tutup">×</button>
              </div>
              <div className="number-grid mobile-grid">
                {activeQuestions.map((question, index) => (
                  <button
                    key={question.id}
                    className={[
                      index === currentIndex ? "current" : "",
                      answers[question.id] !== undefined ? "answered" : "",
                      flagged.includes(question.id) ? "flagged" : "",
                    ].join(" ")}
                    onClick={() => {
                      setCurrentIndex(index);
                      setPaletteOpen(false);
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {confirmOpen && (
          <div className="modal-backdrop">
            <section className="modal confirm-modal">
              <span className="modal-symbol">✓</span>
              <h2>Kumpulkan simulasi?</h2>
              <p>
                {activeQuestions.length - answeredCount > 0
                  ? `${activeQuestions.length - answeredCount} soal masih kosong. Anda tetap dapat kembali untuk melengkapinya.`
                  : "Semua soal sudah dijawab. Hasil dan pembahasan lengkap akan segera ditampilkan."}
              </p>
              <div className="modal-actions">
                <button className="button secondary" onClick={() => setConfirmOpen(false)}>
                  Kembali
                </button>
                <button className="button primary" onClick={finishQuiz}>
                  Ya, kumpulkan
                </button>
              </div>
            </section>
          </div>
        )}
        <KnowledgeChat />
      </main>
    );
  }

  if (view === "summary") {
    return (
      <main className="summary-page">
        <header className="simple-header">
          <button className="brand compact" onClick={resetToHome}>
            <span className="brand-mark">BC</span>
            <span>
              <strong>SIMTALENTA</strong>
              <small>DJBC · Ringkasan Hafalan</small>
            </span>
          </button>
          <button className="button ghost" onClick={resetToHome}>
            Kembali ke beranda
          </button>
        </header>

        <section className="summary-hero">
          <div>
            <span className="eyebrow light">Hafal cepat · tetap presisi</span>
            <h1>Ringkasan angka, istilah, dan jebakan yang wajib melekat.</h1>
            <p>
              Gunakan kode ingatan, buka kartu untuk melihat fakta inti, lalu
              uji diri lewat soal dengan pembahasan langsung.
            </p>
          </div>
          <div className="summary-hero-stat">
            <strong>{summaryCards.length}</strong>
            <span>kartu hafalan</span>
            <small>{topics.length} rumpun materi</small>
          </div>
        </section>

        <section className="summary-content">
          <div className="summary-toolbar">
            <label className="summary-search">
              <span>Cari materi, angka, atau peraturan</span>
              <input
                type="search"
                value={summaryQuery}
                onChange={(event) => setSummaryQuery(event.target.value)}
                placeholder="Contoh: 25-20-15, RKBMN, hold time..."
              />
            </label>
            <div className="summary-filter" aria-label="Filter rumpun materi">
              <button
                className={summaryTopic === "Semua" ? "active" : ""}
                onClick={() => setSummaryTopic("Semua")}
              >
                Semua
              </button>
              {topics.map((topic) => (
                <button
                  key={topic}
                  className={summaryTopic === topic ? "active" : ""}
                  onClick={() => setSummaryTopic(topic)}
                >
                  {topicMeta[topic].short}
                </button>
              ))}
            </div>
          </div>

          <div className="summary-result-head">
            <div>
              <span className="eyebrow">Kartu aktif</span>
              <h2>
                {filteredSummaryCards.length} ringkasan
                {summaryTopic === "Semua"
                  ? ""
                  : ` · ${topicMeta[summaryTopic].short}`}
              </h2>
            </div>
            <button
              className="button primary"
              onClick={() =>
                startSession(
                  summaryTopic === "Semua" ? "adaptive" : "topic",
                  summaryTopic === "Semua" ? undefined : summaryTopic,
                )
              }
            >
              Uji dengan pembahasan langsung
            </button>
          </div>

          {filteredSummaryCards.length ? (
            <div className="memory-grid">
              {filteredSummaryCards.map((card, index) => {
                const isOpen = revealedCards.includes(card.id);
                return (
                  <article
                    key={card.id}
                    className={`memory-card ${isOpen ? "open" : ""}`}
                  >
                    <button
                      className="memory-front"
                      onClick={() =>
                        setRevealedCards((previous) =>
                          previous.includes(card.id)
                            ? previous.filter((id) => id !== card.id)
                            : [...previous, card.id],
                        )
                      }
                      aria-expanded={isOpen}
                    >
                      <span className="memory-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="memory-topic">
                        {topicMeta[card.topic].short}
                      </span>
                      <h2>{card.title}</h2>
                      <div className="memory-code">{card.memoryCode}</div>
                      <p>{card.summary}</p>
                      <strong>
                        {isOpen ? "Tutup rincian ↑" : "Buka fakta & jebakan ↓"}
                      </strong>
                    </button>
                    {isOpen && (
                      <div className="memory-back">
                        <section>
                          <span>Fakta inti</span>
                          <ul>
                            {card.keyPoints.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </section>
                        <section className="memory-traps">
                          <span>Jebakan ujian</span>
                          <ul>
                            {card.traps.map((trap) => (
                              <li key={trap}>{trap}</li>
                            ))}
                          </ul>
                        </section>
                        <a
                          href={card.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {card.sourceLabel} ↗
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="summary-empty">
              <strong>Ringkasan belum ditemukan.</strong>
              <p>Coba kata kunci lain atau pilih semua rumpun materi.</p>
            </div>
          )}
        </section>
        <KnowledgeChat />
      </main>
    );
  }

  if (view === "results" && result && session) {
    const resultQuestions = result.questionIds
      .map((id) => questions.find((question) => question.id === id))
      .filter((question): question is Question => Boolean(question))
      .map((question) =>
        reorderQuestion(question, result.optionOrders[question.id]),
      );
    const score = percentage(result.correct, result.total);
    const topicResults = topics
      .map((topic) => {
        const subset = resultQuestions.filter((question) => question.topic === topic);
        const correct = subset.filter(
          (question) => result.answers[question.id] === question.answer,
        ).length;
        return { topic, total: subset.length, correct };
      })
      .filter((item) => item.total > 0);
    const reviewQuestions = resultQuestions.filter(
      (question) => result.answers[question.id] !== question.answer,
    );

    return (
      <main className="result-page">
        <header className="simple-header">
          <button className="brand compact" onClick={resetToHome}>
            <span className="brand-mark">BC</span>
            <span><strong>SIMTALENTA</strong><small>DJBC</small></span>
          </button>
          <button className="button ghost" onClick={resetToHome}>Kembali ke beranda</button>
        </header>

        <section className="result-hero">
          <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}>
            <div><strong>{score}</strong><span>/100</span></div>
          </div>
          <div>
            <span className="eyebrow">Hasil · {session.title}</span>
            <h1>
              {score >= 85
                ? "Sangat siap. Pertahankan ketelitian."
                : score >= 70
                  ? "Fondasi kuat. Tajamkan area lemah."
                  : "Teruskan latihan. Pembahasan akan membantu."}
            </h1>
            <p>
              {result.correct} benar · {result.total - result.correct - result.unanswered} salah ·{" "}
              {result.unanswered} tidak dijawab
            </p>
            <div className="result-actions">
              <button
                className="button primary"
                onClick={() => startSession(session.mode, session.topic)}
              >
                Ulangi latihan
              </button>
              <button className="button secondary" onClick={() => startSession("adaptive")}>
                Latihan adaptif
              </button>
            </div>
          </div>
        </section>

        <section className="result-content">
          <div className="section-heading">
            <span className="eyebrow">Peta penguasaan</span>
            <h2>Nilai per rumpun materi</h2>
          </div>
          <div className="topic-results">
            {topicResults.map((item) => {
              const topicScore = percentage(item.correct, item.total);
              return (
                <div key={item.topic}>
                  <div>
                    <span>{topicMeta[item.topic].short}</span>
                    <strong>{item.correct}/{item.total} · {topicScore}%</strong>
                  </div>
                  <div className="mini-progress">
                    <span style={{ width: `${topicScore}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="review-heading">
            <div>
              <span className="eyebrow">Bedah jawaban</span>
              <h2>
                {reviewQuestions.length
                  ? `${reviewQuestions.length} soal perlu ditinjau`
                  : "Semua jawaban tepat"}
              </h2>
            </div>
            <p>Setiap opsi dijelaskan agar distraktor yang menjebak mudah dikenali.</p>
          </div>

          <div className="review-list">
            {reviewQuestions.map((question, index) => {
              const chosen = result.answers[question.id];
              return (
                <details key={question.id} open={index === 0}>
                  <summary>
                    <span className="review-number">{index + 1}</span>
                    <span>
                      <small>{question.topic} · {question.difficulty}</small>
                      <strong>{question.stem}</strong>
                    </span>
                    <span className="review-key">
                      {chosen === undefined
                        ? "Kosong"
                        : `${String.fromCharCode(65 + chosen)} → ${String.fromCharCode(65 + question.answer)}`}
                    </span>
                  </summary>
                  <div className="review-body">
                    {question.options.map(([text, explanation], optionIndex) => (
                      <div
                        key={optionIndex}
                        className={[
                          "review-option",
                          optionIndex === question.answer ? "right" : "",
                          optionIndex === chosen && optionIndex !== question.answer ? "wrong" : "",
                        ].join(" ")}
                      >
                        <span>{String.fromCharCode(65 + optionIndex)}</span>
                        <div>
                          <strong>{text}</strong>
                          <p>
                            <b>{optionIndex === question.answer ? "Mengapa benar: " : "Mengapa bukan: "}</b>
                            {explanation}
                          </p>
                        </div>
                      </div>
                    ))}
                    <footer>
                      <span><strong>Rujukan:</strong> {question.reference}</span>
                      <a href={sources[question.source].url} target="_blank" rel="noreferrer">
                        {sources[question.source].label} ↗
                      </a>
                    </footer>
                  </div>
                </details>
              );
            })}
          </div>
        </section>
        <KnowledgeChat />
      </main>
    );
  }

  return (
    <main className="home-page">
      <header className="home-header">
        <div className="brand">
          <span className="brand-mark">BC</span>
          <span>
            <strong>SIMTALENTA</strong>
            <small>DJBC · Dukungan Manajemen</small>
          </span>
        </div>
        <nav>
          <a href="#mode-belajar">Mode belajar</a>
          <button className="nav-button" onClick={() => openSummary()}>
            Ringkasan hafalan
          </button>
          <a href="#materi">Peta materi</a>
          <button className="source-button" onClick={() => setSourcesOpen(true)}>
            Sumber resmi
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="status-badge"><i /> Bank soal diperbarui 28 Juli 2026</span>
          <h1>
            Berlatih seperti ujian. <em>Memahami</em> seperti ahli.
          </h1>
          <p>
            Bank 1.000 soal analitik dan menjebak untuk Manajemen Talenta
            DJBC—setiap simulasi mengambil 100 soal acak, dengan opsi yang
            berbeda tipis pada angka, istilah, dan nomor peraturan.
          </p>
          <div className="hero-actions">
            <button className="button primary large" onClick={() => startSession("sprint")}>
              Mulai Sprint 3 Hari · 30 soal <span>→</span>
            </button>
            <button className="button text-button" onClick={() => startSession("exam")}>
              Simulasi penuh 100 soal
            </button>
          </div>
          <div className="hero-facts">
            <span><strong>120</strong> menit</span>
            <span><strong>1.000</strong> bank soal</span>
            <span><strong>{summaryCards.length}</strong> kartu hafalan</span>
            <span><strong>{topics.length}</strong> rumpun materi</span>
            <span><strong>4×</strong> pembahasan per soal</span>
          </div>
        </div>

        <div className="hero-dashboard">
          <div className="dashboard-top">
            <span>Kesiapan belajar Anda</span>
            <strong>{hydrated ? `${percentage(mastered, questions.length)}%` : "—"}</strong>
          </div>
          <div className="readiness-track">
            <span style={{ width: `${percentage(mastered, questions.length)}%` }} />
          </div>
          <div className="dashboard-stats">
            <div><small>Akurasi</small><strong>{hydrated && totalAttempts ? `${percentage(totalCorrect, totalAttempts)}%` : "—"}</strong></div>
            <div><small>Dikuasai</small><strong>{hydrated ? mastered : "—"}<i>/1.000</i></strong></div>
            <div><small>Dikerjakan</small><strong>{hydrated ? Object.keys(progress).length : "—"}</strong></div>
          </div>
          <div className="dashboard-callout">
            <span className="callout-icon">↗</span>
            <div>
              <strong>
                {totalAttempts
                  ? "Latihan berikutnya menyesuaikan kelemahan Anda"
                  : "Mulai latihan untuk memetakan kemampuan"}
              </strong>
              <p>Jawaban salah dan soal yang belum pernah dikerjakan diprioritaskan.</p>
            </div>
          </div>
          <button className="dashboard-link" onClick={() => startSession("sprint")}>
            Mulai pemetaan seluruh materi <span>→</span>
          </button>
        </div>
      </section>

      <section className="sprint-section" aria-labelledby="sprint-title">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Rencana belajar kilat</span>
            <h2 id="sprint-title">Kuasai yang paling menentukan dalam 3 hari.</h2>
          </div>
          <p>
            Gunakan pembahasan sebagai materi utama. Jangan mengejar 1.000 soal;
            kejar cakupan, pola jebakan, lalu ulangi kesalahan.
          </p>
        </div>
        <div className="sprint-plan">
          <article>
            <span>Hari 1 · Peta kemampuan</span>
            <strong>31 kartu + Sprint 30</strong>
            <p>Baca seluruh kartu hafalan, lalu jawab tiga soal dari setiap rumpun dengan pembahasan langsung.</p>
            <button onClick={() => openSummary()}>Buka ringkasan →</button>
          </article>
          <article>
            <span>Hari 2 · Tutup kelemahan</span>
            <strong>3 topik prioritas</strong>
            <p>{recommendedTopics.map(({ topic }) => topicMeta[topic].short).join(" · ")}. Kerjakan latihan adaptif sampai dua putaran.</p>
            <button onClick={() => startSession("adaptive")}>Latihan adaptif →</button>
          </article>
          <article>
            <span>Hari 3 · Kondisi ujian</span>
            <strong>Simulasi 100 + bedah salah</strong>
            <p>Kerjakan tanpa melihat pembahasan, lalu ulangi hanya soal salah dan ragu. Hentikan belajar berat sebelum tidur.</p>
            <button onClick={() => startSession("exam")}>Mulai simulasi →</button>
          </article>
        </div>
      </section>

      <section className="mode-section" id="mode-belajar">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Pilih cara belajar</span>
            <h2>Tiga hari, lima strategi</h2>
          </div>
          <p>
            Mulai dari pembahasan, ukur diri dalam kondisi ujian, lalu ulangi
            hanya bagian yang masih lemah.
          </p>
        </div>
        <div className="mode-grid">
          <button className="mode-card featured sprint-card" onClick={() => startSession("sprint")}>
            <span className="mode-index">01</span>
            <div className="mode-icon">30</div>
            <span className="mode-label">Cakupan seluruh materi</span>
            <h3>Sprint 3 Hari</h3>
            <p>Tiga soal dari masing-masing 10 rumpun, diprioritaskan dari yang belum pernah dikerjakan dan pernah salah.</p>
            <footer><span>±45 menit · pembahasan aktif</span><b>Mulai →</b></footer>
          </button>
          <button className="mode-card" onClick={() => startSession("exam")}>
            <span className="mode-index">02</span>
            <div className="mode-icon">100</div>
            <span className="mode-label">Kondisi ujian</span>
            <h3>Simulasi Penuh</h3>
            <p>100 soal ditarik acak dari bank 1.000, 120 menit, tanpa pembahasan sebelum dikumpulkan.</p>
            <footer><span>Estimasi 2 jam</span><b>Mulai →</b></footer>
          </button>
          <button className="mode-card" onClick={() => startSession("adaptive")}>
            <span className="mode-index">03</span>
            <div className="mode-icon">20</div>
            <span className="mode-label">Jawab lalu bedah</span>
            <h3>Pembahasan Langsung</h3>
            <p>Begitu memilih jawaban, kunci dan alasan keempat pilihan langsung terbuka.</p>
            <footer><span>20 soal adaptif</span><b>Mulai →</b></footer>
          </button>
          <button className="mode-card" onClick={() => openSummary()}>
            <span className="mode-index">04</span>
            <div className="mode-icon">HAF</div>
            <span className="mode-label">Hafalan cepat</span>
            <h3>Ringkasan Materi</h3>
            <p>Kode ingatan, angka wajib hafal, fakta inti, dan jebakan umum dalam kartu ringkas.</p>
            <footer><span>{summaryCards.length} kartu</span><b>Buka →</b></footer>
          </button>
          <a className="mode-card" href="#materi">
            <span className="mode-index">05</span>
            <div className="mode-icon">{String(topics.length).padStart(2, "0")}</div>
            <span className="mode-label">Pendalaman</span>
            <h3>Latihan per Topik</h3>
            <p>Pilih satu rumpun untuk 25 soal acak dengan pembahasan langsung.</p>
            <footer><span>25 soal per sesi</span><b>Pilih →</b></footer>
          </a>
        </div>
      </section>

      <section className="topics-section" id="materi">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Peta materi</span>
            <h2>Seluruh ruang lingkup dukungan manajemen</h2>
          </div>
          <p>Materi Drive dipadukan dengan regulasi resmi terbaru untuk menutup area yang belum tersedia.</p>
        </div>
        <div className="topic-grid">
          {topicStats.map(({ topic, count, attempts, accuracy }) => (
            <button key={topic} className="topic-card" onClick={() => startSession("topic", topic)}>
              <span className="topic-icon">{topicMeta[topic].icon}</span>
              <div>
                <h3>{topic}</h3>
                <p>{count} soal · {attempts ? `${accuracy}% akurasi` : "belum dicoba"}</p>
              </div>
              <span className="topic-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      <section className="how-section">
        <div>
          <span className="eyebrow light">Mengapa efektif</span>
          <h2>Bukan sekadar mencari huruf yang benar.</h2>
          <p>
            Setiap pembahasan memetakan logika aturan dan jebakan pada tiga opsi
            lain—agar Anda mengenali pola soal, bukan menghafal kunci.
          </p>
        </div>
        <ol>
          <li><span>1</span><div><strong>Jawab dengan analisis</strong><p>Soal dibangun dari skenario dan perbedaan istilah yang tipis.</p></div></li>
          <li><span>2</span><div><strong>Bedah semua pilihan</strong><p>Ketahui dasar jawaban benar dan letak kesalahan setiap pengecoh.</p></div></li>
          <li><span>3</span><div><strong>Ulangi secara adaptif</strong><p>Progres lokal memprioritaskan topik yang belum benar-benar dikuasai.</p></div></li>
        </ol>
      </section>

      <footer className="site-footer">
        <div className="brand compact">
          <span className="brand-mark">BC</span>
          <span><strong>SIMTALENTA</strong><small>DJBC · Dukungan Manajemen</small></span>
        </div>
        <div className="footer-message">
          <p>
            Alat bantu belajar mandiri. Selalu periksa kembali sumber resmi apabila
            terdapat perubahan regulasi. Progres tersimpan hanya di perangkat ini.
          </p>
          <strong>
            Semoga setiap ikhtiar belajar diberi kemudahan, ilmu yang bermanfaat,
            ketenangan, dan hasil terbaik. Aamiin.
          </strong>
          <small>© 2026 agung3956 · Seluruh hak cipta dilindungi.</small>
        </div>
        <button onClick={() => setSourcesOpen(true)}>
          Lihat {Object.keys(sources).length} sumber rujukan ↗
        </button>
      </footer>

      {sourcesOpen && (
        <div className="modal-backdrop" onMouseDown={() => setSourcesOpen(false)}>
          <section className="modal sources-modal" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span>Rujukan materi</span>
                <h2>Sumber Drive & regulasi resmi</h2>
              </div>
              <button onClick={() => setSourcesOpen(false)} aria-label="Tutup">×</button>
            </div>
            <p className="sources-intro">
              Materi utama berasal dari folder Talenta Anda. Area yang belum
              tersedia dilengkapi dari JDIH Kementerian Keuangan, BKN, dan LKPP.
            </p>
            <div className="sources-list">
              {Object.entries(sources).map(([key, source], index) => (
                <a key={key} href={source.url} target="_blank" rel="noreferrer">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{source.label}</strong>
                  <b>↗</b>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}
      <KnowledgeChat />
    </main>
  );
}

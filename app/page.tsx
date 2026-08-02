"use client";

import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import type { Topic as SummaryTopic } from "./questions";
import {
  ACTIVE_SESSION_KEY,
  FAVORITES_KEY,
  HISTORY_KEY,
  LAST_RESULT_KEY,
  PROGRESS_KEY,
  RECENT_IDS_KEY,
  quizConfig,
} from "./quiz-config";
import {
  BANK_TOPICS,
  BANK_VERSION,
  activeQuestionCount,
  loadQuestionsByIds,
  publicSourceRegistry,
  questionIndex,
  type BankQuestion as Question,
  type BankTopic as Topic,
  type QuestionIndexItem,
} from "./question-bank";
import { summaryCards, type SummaryCard } from "./summaries";
import {
  balancedOptionOrders,
  buildBalancedPackage,
  isRestorableSession,
  parseStoredJson,
  remainingSeconds,
  scoreQuestions,
} from "./quiz-core";

const KnowledgeChat = lazy(() => import("./knowledge-chat"));
const Chat = () => <Suspense fallback={null}><KnowledgeChat /></Suspense>;

type View = "home" | "quiz" | "results" | "summary";
type Mode = "exam" | "adaptive" | "sprint" | "topic" | "favorites";
type Session = {
  sessionId: string;
  seed: string;
  questionBankVersion: string;
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
  startedAt: number;
  completedAt: number;
  durationSeconds: number;
  sessionId: string;
  seed: string;
  questionBankVersion: string;
};
type HistoryItem = QuizResult & { title: string; score: number };
type SavedSession = {
  schemaVersion: number;
  session: Session;
  currentIndex: number;
  answers: Record<number, number>;
  revealed: number[];
  flagged: number[];
  startedAt: number;
  deadlineAt: number | null;
};

const topicMeta: Record<Topic, { short: string; icon: string }> = {
  "Manajemen Talenta": { short: "Talenta", icon: "MT" },
  "Manajemen Karier & Bidang Penugasan": { short: "Karier", icon: "KR" },
  "Pengelolaan & Pengembangan SDM": { short: "Pengembangan SDM", icon: "SD" },
  "Manajemen Kinerja": { short: "Kinerja", icon: "MK" },
  "Kepatuhan, Integritas & Disiplin": { short: "Kepatuhan", icon: "KI" },
  "Kompetensi Manajerial & Kepemimpinan": { short: "Kepemimpinan", icon: "KP" },
  "Organisasi, Tata Kelola & Risiko": { short: "Tata Kelola", icon: "TG" },
  "Learning Organization & Knowledge Management": { short: "LO & KM", icon: "LO" },
  "Statement of Purpose & Kesiapan Talenta": { short: "SoP", icon: "SP" },
};

const summaryTopicMeta: Record<SummaryTopic, { short: string }> = {
  "Manajemen Kinerja": { short: "Kinerja" },
  "Manajemen Talenta & SDM": { short: "Talenta & SDM" },
  "Disiplin & Kepegawaian": { short: "Kepegawaian" },
  PPID: { short: "PPID" },
  "Komunikasi & Penyuluhan": { short: "Komunikasi" },
  "Kepatuhan Internal": { short: "Kepatuhan" },
  "Organisasi, Sejarah & Logo": { short: "Organisasi" },
  "Umum, Rumah Tangga & BMN": { short: "Umum & BMN" },
  "Keuangan & Pengadaan": { short: "Keuangan" },
  "Layanan Informasi": { short: "Layanan" },
  "AI dalam Probis": { short: "AI Probis" },
};

const discussionTopicMap: Record<Topic, SummaryTopic[]> = {
  "Manajemen Talenta": ["Manajemen Talenta & SDM"],
  "Manajemen Karier & Bidang Penugasan": ["Manajemen Talenta & SDM", "Disiplin & Kepegawaian"],
  "Pengelolaan & Pengembangan SDM": ["Manajemen Talenta & SDM", "Disiplin & Kepegawaian"],
  "Manajemen Kinerja": ["Manajemen Kinerja"],
  "Kepatuhan, Integritas & Disiplin": ["Kepatuhan Internal", "Disiplin & Kepegawaian"],
  "Kompetensi Manajerial & Kepemimpinan": ["Manajemen Talenta & SDM", "Komunikasi & Penyuluhan"],
  "Organisasi, Tata Kelola & Risiko": ["Organisasi, Sejarah & Logo", "Kepatuhan Internal"],
  "Learning Organization & Knowledge Management": ["Manajemen Talenta & SDM", "Komunikasi & Penyuluhan"],
  "Statement of Purpose & Kesiapan Talenta": ["Manajemen Talenta & SDM", "Komunikasi & Penyuluhan"],
};

const topics = [...BANK_TOPICS];
const summaryTopics = Object.keys(summaryTopicMeta) as SummaryTopic[];
const summaryToBankTopic: Record<SummaryTopic, Topic> = {
  "Manajemen Kinerja": "Manajemen Kinerja",
  "Manajemen Talenta & SDM": "Manajemen Talenta",
  "Disiplin & Kepegawaian": "Kepatuhan, Integritas & Disiplin",
  PPID: "Organisasi, Tata Kelola & Risiko",
  "Komunikasi & Penyuluhan": "Kompetensi Manajerial & Kepemimpinan",
  "Kepatuhan Internal": "Kepatuhan, Integritas & Disiplin",
  "Organisasi, Sejarah & Logo": "Organisasi, Tata Kelola & Risiko",
  "Umum, Rumah Tangga & BMN": "Organisasi, Tata Kelola & Risiko",
  "Keuangan & Pengadaan": "Organisasi, Tata Kelola & Risiko",
  "Layanan Informasi": "Kompetensi Manajerial & Kepemimpinan",
  "AI dalam Probis": "Learning Organization & Knowledge Management",
};
const SPRINT_SIZE = topics.length * 3;
const DISCUSSION_STOP_WORDS = new Set([
  "adalah", "atau", "bagi", "dalam", "dapat", "dengan", "dan", "dari",
  "ini", "itu", "karena", "kepada", "manakah", "menurut", "pada", "paling",
  "sebagai", "secara", "seorang", "sesuai", "suatu", "yang",
]);

function discussionTokens(text: string) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((token) => token.length >= 3 && !DISCUSSION_STOP_WORDS.has(token)),
  );
}

function discussionCardsFor(question: Question): SummaryCard[] {
  const questionTokens = discussionTokens([
    question.stem,
    question.reference,
    question.options[question.answer]?.[0] ?? "",
  ].join(" "));

  return summaryCards
    .filter((card) => discussionTopicMap[question.topic].includes(card.topic))
    .map((card, order) => {
      const titleTokens = discussionTokens(`${card.title} ${card.memoryCode}`);
      const detailTokens = discussionTokens([
        card.summary,
        ...card.keyPoints,
        ...card.traps,
      ].join(" "));
      const score = [...questionTokens].reduce(
        (total, token) =>
          total + (titleTokens.has(token) ? 4 : detailTokens.has(token) ? 1 : 0),
        0,
      );
      return { card, score, order };
    })
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .filter(({ score }) => score >= 6)
    .slice(0, 1)
    .map(({ card }) => card);
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
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}") as Progress;
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
  const [loadedQuestions, setLoadedQuestions] = useState<Record<number, Question>>({});
  const [timeLeft, setTimeLeft] = useState(quizConfig.examDurationMinutes * 60);
  const [sessionStartedAt, setSessionStartedAt] = useState(0);
  const [deadlineAt, setDeadlineAt] = useState<number | null>(null);
  const [practiceCount, setPracticeCount] = useState<number>(quizConfig.defaultPracticeCount);
  const [examCount, setExamCount] = useState<number>(quizConfig.examQuestionCount);
  const [examMinutes, setExamMinutes] = useState<number>(quizConfig.examDurationMinutes);
  const [domainFilter, setDomainFilter] = useState("Semua");
  const [subdomainFilter, setSubdomainFilter] = useState("Semua");
  const [difficultyFilter, setDifficultyFilter] = useState("Semua");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingBank, setLoadingBank] = useState(false);
  const [bankError, setBankError] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [summaryTopic, setSummaryTopic] = useState<SummaryTopic | "Semua">("Semua");
  const [summaryQuery, setSummaryQuery] = useState("");
  const [revealedCards, setRevealedCards] = useState<string[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const restore = async () => {
        setProgress(readProgress());
        setFavorites(parseStoredJson<number[]>(localStorage.getItem(FAVORITES_KEY)) ?? []);
        setHistory(parseStoredJson<HistoryItem[]>(localStorage.getItem(HISTORY_KEY)) ?? []);
        const saved = parseStoredJson<SavedSession>(localStorage.getItem(ACTIVE_SESSION_KEY));
        if (
          isRestorableSession(saved, quizConfig.schemaVersion, new Set(questionIndex.map(({ id }) => id))) &&
          (saved as SavedSession).session.questionBankVersion === BANK_VERSION
        ) {
          const restored = saved as SavedSession;
          try {
            const restoredQuestions = await loadQuestionsByIds(restored.session.questionIds);
            setLoadedQuestions(Object.fromEntries(restoredQuestions.map((question) => [question.id, question])));
            setSession(restored.session);
            setCurrentIndex(Math.min(restored.currentIndex, restored.session.questionIds.length - 1));
            setAnswers(restored.answers);
            setRevealed(restored.session.mode === "exam" ? [] : restored.revealed);
            setFlagged(restored.flagged);
            setSessionStartedAt(restored.startedAt);
            setDeadlineAt(restored.deadlineAt);
            if (restored.deadlineAt) setTimeLeft(remainingSeconds(restored.deadlineAt));
            setView("quiz");
          } catch {
            localStorage.removeItem(ACTIVE_SESSION_KEY);
            setBankError("Sesi lama tidak dapat dimuat dan telah dilepas dengan aman.");
          }
        } else if (saved) {
          localStorage.removeItem(ACTIVE_SESSION_KEY);
        }
        setHydrated(true);
      };
      void restore();
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const activeQuestions = useMemo(() => {
    if (!session) return [];
    return session.questionIds
      .map((id) => loadedQuestions[id])
      .filter((question): question is Question => Boolean(question))
      .map((question) =>
        reorderQuestion(question, session.optionOrders[question.id]),
      );
  }, [session, loadedQuestions]);

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
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    setProgress(next);
  };

  const finishQuiz = () => {
    if (!session) return;
    const scored = scoreQuestions(activeQuestions, answers);
    const completedAt = Date.now();
    const quizResult: QuizResult = {
      correct: scored.correct,
      total: scored.total,
      unanswered: scored.unanswered,
      answers: { ...answers },
      questionIds: [...session.questionIds],
      optionOrders: { ...session.optionOrders },
      startedAt: sessionStartedAt,
      completedAt,
      durationSeconds: Math.max(0, Math.round((completedAt - sessionStartedAt) / 1000)),
      sessionId: session.sessionId,
      seed: session.seed,
      questionBankVersion: session.questionBankVersion,
    };
    updateProgress(activeQuestions, answers);
    localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(quizResult));
    const historyItem: HistoryItem = {
      ...quizResult,
      title: session.title,
      score: percentage(scored.correct, scored.total),
    };
    const nextHistory = [historyItem, ...history.filter((item) => item.sessionId !== historyItem.sessionId)].slice(0, 20);
    const recentIds = [...session.questionIds, ...(parseStoredJson<number[]>(localStorage.getItem(RECENT_IDS_KEY)) ?? [])]
      .filter((id, index, values) => values.indexOf(id) === index)
      .slice(0, 300);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    localStorage.setItem(RECENT_IDS_KEY, JSON.stringify(recentIds));
    setHistory(nextHistory);
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    setResult(quizResult);
    setConfirmOpen(false);
    setView("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (view !== "quiz" || session?.mode !== "exam" || !deadlineAt) return;
    const updateTimer = () => setTimeLeft(remainingSeconds(deadlineAt));
    updateTimer();
    const timer = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(timer);
  }, [view, session?.mode, deadlineAt]);

  useEffect(() => {
    if (!hydrated || view !== "quiz" || !session) return;
    const saved: SavedSession = {
      schemaVersion: quizConfig.schemaVersion,
      session,
      currentIndex,
      answers,
      revealed: session.mode === "exam" ? [] : revealed,
      flagged,
      startedAt: sessionStartedAt,
      deadlineAt,
    };
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(saved));
  }, [hydrated, view, session, currentIndex, answers, revealed, flagged, sessionStartedAt, deadlineAt]);

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

  const startSession = async (mode: Mode, topic?: Topic) => {
    let pool: QuestionIndexItem[];
    let title: string;
    const seed = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    const recentIds = parseStoredJson<number[]>(localStorage.getItem(RECENT_IDS_KEY)) ?? [];
    const baseSettings = {
      seed,
      domains: domainFilter === "Semua" ? undefined : [domainFilter],
      subdomains: subdomainFilter === "Semua" ? undefined : [subdomainFilter],
      difficulties: difficultyFilter === "Semua" ? undefined : [difficultyFilter as "easy" | "medium" | "hard"],
      avoidIds: recentIds,
      progress,
    };

    if (mode === "exam") {
      pool = buildBalancedPackage(questionIndex, { ...baseSettings, count: examCount }) as QuestionIndexItem[];
      title = `Simulasi Penuh · ${pool.length} Soal Teracak Seimbang`;
    } else if (mode === "sprint") {
      pool = topics.flatMap((sprintTopic, index) => buildBalancedPackage(
        questionIndex.filter((question) => question.topic === sprintTopic),
        { seed: `${seed}:sprint:${index}`, count: 3, avoidIds: recentIds, progress },
      )) as QuestionIndexItem[];
      title = `Sprint 3 Hari · ${SPRINT_SIZE} Soal · Seluruh Rumpun`;
    } else if (mode === "topic" && topic) {
      pool = buildBalancedPackage(questionIndex.filter((question) => question.topic === topic), {
        ...baseSettings, count: practiceCount,
      }) as QuestionIndexItem[];
      title = `Latihan · ${topicMeta[topic].short} · ${pool.length} Soal Unik`;
    } else if (mode === "favorites") {
      pool = buildBalancedPackage(questionIndex.filter((question) => favorites.includes(question.id)), {
        seed, count: Math.min(practiceCount, favorites.length), progress,
      }) as QuestionIndexItem[];
      title = `Favorit · ${pool.length} Soal Tersimpan`;
    } else {
      pool = buildBalancedPackage(questionIndex, { ...baseSettings, count: practiceCount }) as QuestionIndexItem[];
      title = `Belajar Langsung · ${practiceCount} Soal Adaptif`;
    }

    if (!pool.length) return;
    setBankError("");
    setLoadingBank(true);
    let hydratedQuestions: Question[];
    try {
      hydratedQuestions = await loadQuestionsByIds(pool.map((question) => question.id));
    } catch {
      setBankError("Shard soal belum dapat dimuat. Periksa koneksi lalu coba kembali.");
      setLoadingBank(false);
      return;
    }
    setLoadedQuestions((previous) => ({
      ...previous,
      ...Object.fromEntries(hydratedQuestions.map((question) => [question.id, question])),
    }));
    const startedAt = Date.now();
    const examDeadline = mode === "exam" ? startedAt + examMinutes * 60 * 1000 : null;
    setSession({
      sessionId: `${BANK_VERSION}:${seed}`,
      seed,
      questionBankVersion: BANK_VERSION,
      mode,
      title,
      questionIds: pool.map((question) => question.id),
      optionOrders: balancedOptionOrders(hydratedQuestions, seed),
      topic,
    });
    setAnswers({});
    setRevealed([]);
    setFlagged([]);
    setCurrentIndex(0);
    setResult(null);
    setSessionStartedAt(startedAt);
    setDeadlineAt(examDeadline);
    setTimeLeft(examMinutes * 60);
    setPaletteOpen(false);
    setView("quiz");
    setLoadingBank(false);
    window.scrollTo({ top: 0 });
  };

  const resetToHome = () => {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    setView("home");
    setSession(null);
    setResult(null);
    setConfirmOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const repeatIncorrect = async (questionIds: number[], startedAt: number) => {
    const pool = await loadQuestionsByIds(questionIds);
    if (!pool.length) return;
    const seed = `${startedAt.toString(36)}-ulang-${questionIds.length}`;
    setLoadedQuestions((previous) => ({ ...previous, ...Object.fromEntries(pool.map((question) => [question.id, question])) }));
    setSession({
      sessionId: `${BANK_VERSION}:${seed}`,
      seed,
      questionBankVersion: BANK_VERSION,
      mode: "adaptive",
      title: `Ulangi ${pool.length} Soal Salah atau Kosong`,
      questionIds: pool.map(({ id }) => id),
      optionOrders: balancedOptionOrders(pool, seed),
    });
    setAnswers({});
    setRevealed([]);
    setFlagged([]);
    setCurrentIndex(0);
    setResult(null);
    setSessionStartedAt(startedAt);
    setDeadlineAt(null);
    setView("quiz");
    window.scrollTo({ top: 0 });
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

  const toggleFavorite = () => {
    if (!currentQuestion) return;
    const next = favorites.includes(currentQuestion.id)
      ? favorites.filter((id) => id !== currentQuestion.id)
      : [...favorites, currentQuestion.id];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
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
    const topicQuestions = questionIndex.filter(
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

  const domainOptions = [...new Map(questionIndex.map((question) => [question.domain, question.domainLabel])).entries()];
  const subdomainOptions = [...new Set(questionIndex
    .filter((question) => domainFilter === "Semua" || question.domain === domainFilter)
    .map((question) => question.subdomain))].sort();

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

  const openSummary = (topic: SummaryTopic | "Semua" = "Semua") => {
    setSummaryTopic(topic);
    setView("summary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (view === "quiz" && session && currentQuestion) {
    const selected = answers[currentQuestion.id];
    const discussionCards = discussionCardsFor(currentQuestion);
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
              <button
                className={`flag-button ${favorites.includes(currentQuestion.id) ? "active" : ""}`}
                onClick={toggleFavorite}
                aria-label="Simpan soal sebagai favorit"
              >
                {favorites.includes(currentQuestion.id) ? "★ Favorit" : "☆ Favorit"}
              </button>
            </div>

            <div className="question-number">
              Soal {currentIndex + 1} · {currentQuestion.bankId} · {currentQuestion.cognitiveLevel} · v{currentQuestion.questionBankVersion}
            </div>
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
                    href={currentQuestion.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buka sumber resmi ↗
                  </a>
                </div>
                <div className="explanation-list">
                  {currentQuestion.options.map(([text, explanation], optionIndex) => (
                    <div
                      key={optionIndex}
                      className={optionIndex === currentQuestion.answer ? "right-reason" : ""}
                    >
                      <strong>
                        {String.fromCharCode(65 + optionIndex)} ·{" "}
                        {optionIndex === currentQuestion.answer ? "Mengapa benar" : "Mengapa bukan"}
                      </strong>
                      <b className="explained-option">{text}</b>
                      <p>{explanation}</p>
                    </div>
                  ))}
                </div>
                <p className="reference">
                  <strong>Rujukan:</strong> {currentQuestion.reference} ·{" "}
                  {currentQuestion.sourceTitle}
                </p>
                <section className="complete-discussion">
                  <header>
                    <span>Pembahasan menyeluruh</span>
                    <strong>Kondisi setiap opsi dan ketentuan yang tepat untuk soal ini</strong>
                  </header>
                  <div className="discussion-topics">
                    <article>
                      <div className="discussion-title">
                        <span>Kesimpulan soal</span>
                        <code>Kunci {String.fromCharCode(65 + currentQuestion.answer)}</code>
                      </div>
                      <h2>{currentQuestion.options[currentQuestion.answer][0]}</h2>
                      <p>{currentQuestion.options[currentQuestion.answer][1]}</p>
                      <p><strong>Uraian topik:</strong> {currentQuestion.explanation}</p>
                      <p><strong>Inti yang perlu diingat:</strong> {currentQuestion.keyTakeaway}</p>
                      <div className="discussion-columns">
                        <div>
                          <strong>Cara membaca opsi</strong>
                          <ul>
                            <li>Identifikasi tujuan keputusan, bukti yang tersedia, dan batas penerapan ketentuan.</li>
                            <li>Bandingkan konsekuensi setiap opsi terhadap akuntabilitas, kewenangan, dan risiko.</li>
                            <li>Gunakan alasan A–D di atas untuk mengenali miskonsepsi spesifik pada setiap pengecoh.</li>
                          </ul>
                        </div>
                      </div>
                    </article>
                    {discussionCards.map((card, cardIndex) => (
                      <article key={card.id}>
                        <div className="discussion-title">
                          <span>{cardIndex === 0 ? "Materi pendalaman yang cocok" : "Konteks terkait"}</span>
                          <code>{card.memoryCode}</code>
                        </div>
                        <h2>{card.title}</h2>
                        <p>{card.summary}</p>
                        <div className="discussion-columns">
                          <div>
                            <strong>Pokok yang wajib dipahami</strong>
                            <ul>
                              {card.keyPoints.map((point) => <li key={point}>{point}</li>)}
                            </ul>
                          </div>
                          <div className="discussion-traps">
                            <strong>Jebakan yang perlu dihindari</strong>
                            <ul>
                              {card.traps.map((trap) => <li key={trap}>{trap}</li>)}
                            </ul>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
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
        <Chat />
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
              {summaryTopics.map((topic) => (
                <button
                  key={topic}
                  className={summaryTopic === topic ? "active" : ""}
                  onClick={() => setSummaryTopic(topic)}
                >
                  {summaryTopicMeta[topic].short}
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
                  : ` · ${summaryTopicMeta[summaryTopic].short}`}
              </h2>
            </div>
            <button
              className="button primary"
              onClick={() =>
                startSession(
                  summaryTopic === "Semua" ? "adaptive" : "topic",
                  summaryTopic === "Semua" ? undefined : summaryToBankTopic[summaryTopic],
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
                        {summaryTopicMeta[card.topic].short}
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
        <Chat />
      </main>
    );
  }

  if (view === "results" && result && session) {
    const resultQuestions = result.questionIds
      .map((id) => loadedQuestions[id])
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
    const difficultyResults = ["Dasar", "Analitik", "Menjebak"].map((difficulty) => {
      const subset = resultQuestions.filter((question) => question.difficulty === difficulty);
      return {
        difficulty,
        total: subset.length,
        correct: subset.filter((question) => result.answers[question.id] === question.answer).length,
      };
    }).filter(({ total }) => total > 0);
    const cognitiveResults = ["remember", "apply", "analyze", "evaluate"].map((cognitiveLevel) => {
      const subset = resultQuestions.filter((question) => question.cognitiveLevel === cognitiveLevel);
      return {
        cognitiveLevel,
        total: subset.length,
        correct: subset.filter((question) => result.answers[question.id] === question.answer).length,
      };
    }).filter(({ total }) => total > 0);
    const recommendedResultTopics = [...topicResults]
      .sort((left, right) => percentage(left.correct, left.total) - percentage(right.correct, right.total))
      .slice(0, 3);

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
              {score >= 80
                ? "Dikuasai dengan baik. Pertahankan ketelitian."
                : score >= 60
                  ? "Cukup dikuasai. Tajamkan area lemah."
                  : "Perlu penguatan melalui pembahasan dan pengulangan."}
            </h1>
            <p>
              {result.correct} benar · {result.total - result.correct - result.unanswered} salah ·{" "}
              {result.unanswered} tidak dijawab · durasi {formatTime(result.durationSeconds)}
            </p>
            <small>{quizConfig.label} Hasil ini bukan penetapan kelulusan resmi.</small>
            <p>
              Prioritas penguatan: {recommendedResultTopics.map(({ topic }) => topicMeta[topic].short).join(" · ") || "tidak ada—semua domain telah terjawab benar"}.
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
              {reviewQuestions.length > 0 && (
                <button className="button secondary" onClick={() => repeatIncorrect(reviewQuestions.map(({ id }) => id), result.completedAt)}>
                  Ulangi soal salah/kosong
                </button>
              )}
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

          <div className="section-heading">
            <span className="eyebrow">Tingkat kesulitan</span>
            <h2>Nilai per kesulitan</h2>
          </div>
          <div className="topic-results">
            {difficultyResults.map((item) => (
              <div key={item.difficulty}>
                <div><span>{item.difficulty}</span><strong>{item.correct}/{item.total} · {percentage(item.correct, item.total)}%</strong></div>
                <div className="mini-progress"><span style={{ width: `${percentage(item.correct, item.total)}%` }} /></div>
              </div>
            ))}
          </div>

          <div className="section-heading">
            <span className="eyebrow">Level kognitif</span>
            <h2>Nilai per proses berpikir</h2>
          </div>
          <div className="topic-results">
            {cognitiveResults.map((item) => (
              <div key={item.cognitiveLevel}>
                <div><span>{item.cognitiveLevel}</span><strong>{item.correct}/{item.total} · {percentage(item.correct, item.total)}%</strong></div>
                <div className="mini-progress"><span style={{ width: `${percentage(item.correct, item.total)}%` }} /></div>
              </div>
            ))}
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
                      <a href={question.sourceUrl} target="_blank" rel="noreferrer">
                        {question.sourceTitle} ↗
                      </a>
                    </footer>
                  </div>
                </details>
              );
            })}
          </div>
        </section>
        <Chat />
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
          <span className="status-badge"><i /> Bank soal diperbarui 3 Agustus 2026</span>
          <h1>
            Berlatih seperti ujian. <em>Memahami</em> seperti ahli.
          </h1>
          <p>
            Bank {activeQuestionCount.toLocaleString("id-ID")} soal aktif terverifikasi untuk Uji Kompetensi Manajerial
            DJBC—setiap simulasi menyusun paket acak seimbang dari domain, level kognitif, dan kesulitan.
          </p>
          <div className="hero-actions">
            <button className="button primary large" onClick={() => startSession("sprint")}>
              Mulai Sprint 3 Hari · {SPRINT_SIZE} soal <span>→</span>
            </button>
            <button className="button text-button" onClick={() => startSession("exam")}>
              Simulasi penuh {examCount} soal
            </button>
          </div>
          <div className="hero-facts">
            <span><strong>120</strong> menit</span>
            <span><strong>{activeQuestionCount.toLocaleString("id-ID")}</strong> bank aktif</span>
            <span><strong>1.354</strong> kandidat diaudit</span>
            <span><strong>{summaryCards.length}</strong> kartu hafalan</span>
            <span><strong>{topics.length}</strong> rumpun materi</span>
            <span><strong>4×</strong> pembahasan per soal</span>
          </div>

          <p className="audit-status">
            <strong>Kontrol mutu aktif:</strong>{" "}
            1.354 kandidat ditelaah dengan ambang mutu 85; tepat {activeQuestionCount.toLocaleString("id-ID")} soal
            lolos sebagai bank aktif, tanpa sumber personal atau regulasi kedaluwarsa.
          </p>
        </div>

        <div className="hero-dashboard">
          <div className="dashboard-top">
            <span>Kesiapan belajar Anda</span>
            <strong>{hydrated ? `${percentage(mastered, activeQuestionCount)}%` : "—"}</strong>
          </div>
          <div className="readiness-track">
            <span style={{ width: `${percentage(mastered, activeQuestionCount)}%` }} />
          </div>
          <div className="dashboard-stats">
            <div><small>Akurasi</small><strong>{hydrated && totalAttempts ? `${percentage(totalCorrect, totalAttempts)}%` : "—"}</strong></div>
            <div><small>Dikuasai</small><strong>{hydrated ? mastered : "—"}<i>/{activeQuestionCount.toLocaleString("id-ID")}</i></strong></div>
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
            Gunakan pembahasan sebagai materi utama. Jangan mengejar seluruh bank sekaligus;
            kejar cakupan, pola jebakan, lalu ulangi kesalahan.
          </p>
        </div>
        <div className="sprint-plan">
          <article>
            <span>Hari 1 · Peta kemampuan</span>
            <strong>{summaryCards.length} kartu + Sprint {SPRINT_SIZE}</strong>
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
            <strong>Simulasi {examCount} + bedah salah</strong>
            <p>Kerjakan tanpa melihat pembahasan, lalu ulangi hanya soal salah dan ragu. Hentikan belajar berat sebelum tidur.</p>
            <button onClick={() => startSession("exam")}>Mulai simulasi →</button>
          </article>
        </div>
      </section>

      <section className="mode-section" id="mode-belajar">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Pilih cara belajar</span>
            <h2>Tiga hari, enam strategi</h2>
          </div>
          <p>
            Mulai dari pembahasan, ukur diri dalam kondisi ujian, lalu ulangi
            hanya bagian yang masih lemah.
          </p>
        </div>
        <div className="mode-grid">
          <div className="mode-card settings-card" aria-label="Pengaturan latihan internal">
            <span className="mode-label">Pengaturan latihan internal</span>
            <h3>Jumlah soal latihan</h3>
            <p>{quizConfig.label}</p>
            <div className="summary-filter">
              {quizConfig.practiceCountOptions.map((count) => (
                <button key={count} className={practiceCount === count ? "active" : ""} onClick={() => setPracticeCount(count)}>
                  {count} soal
                </button>
              ))}
            </div>
            <h3>Waktu simulasi</h3>
            <div className="summary-filter">
              {quizConfig.examDurationOptions.map((minutes) => (
                <button key={minutes} className={examMinutes === minutes ? "active" : ""} onClick={() => setExamMinutes(minutes)}>
                  {minutes} menit
                </button>
              ))}
            </div>
            <h3>Jumlah soal simulasi</h3>
            <div className="summary-filter">
              {quizConfig.practiceCountOptions.map((count) => (
                <button key={count} className={examCount === count ? "active" : ""} onClick={() => setExamCount(count)}>
                  {count} soal
                </button>
              ))}
            </div>
            <div className="simulator-settings">
              <label>
                <span>Domain</span>
                <select value={domainFilter} onChange={(event) => { setDomainFilter(event.target.value); setSubdomainFilter("Semua"); }}>
                  <option value="Semua">Semua domain</option>
                  {domainOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label>
                <span>Subdomain</span>
                <select value={subdomainFilter} onChange={(event) => setSubdomainFilter(event.target.value)}>
                  <option value="Semua">Semua subdomain</option>
                  {subdomainOptions.map((value) => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}
                </select>
              </label>
              <label>
                <span>Kesulitan</span>
                <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value)}>
                  <option value="Semua">Semua tingkat</option>
                  <option value="easy">Dasar</option>
                  <option value="medium">Analitik</option>
                  <option value="hard">Menjebak</option>
                </select>
              </label>
            </div>
            {loadingBank && <p role="status">Memuat shard soal yang dipilih…</p>}
            {bankError && <p role="alert">{bankError}</p>}
          </div>
          <button className="mode-card featured sprint-card" onClick={() => startSession("sprint")}>
            <span className="mode-index">01</span>
            <div className="mode-icon">{SPRINT_SIZE}</div>
            <span className="mode-label">Cakupan seluruh materi</span>
            <h3>Sprint 3 Hari</h3>
            <p>Tiga soal dari masing-masing {topics.length} rumpun, diprioritaskan dari yang belum pernah dikerjakan dan pernah salah.</p>
            <footer><span>±45 menit · pembahasan aktif</span><b>Mulai →</b></footer>
          </button>
          <button className="mode-card" onClick={() => startSession("exam")}>
            <span className="mode-index">02</span>
            <div className="mode-icon">{examCount}</div>
            <span className="mode-label">Kondisi ujian</span>
            <h3>Simulasi Penuh</h3>
            <p>{examCount} soal unik ditarik acak seimbang dari bank {activeQuestionCount.toLocaleString("id-ID")}; susunan soal dan opsi berubah setiap simulasi.</p>
            <footer><span>{examMinutes} menit · pembahasan setelah dikumpulkan</span><b>Mulai →</b></footer>
          </button>
          <button className="mode-card" onClick={() => startSession("adaptive")}>
            <span className="mode-index">03</span>
            <div className="mode-icon">{practiceCount}</div>
            <span className="mode-label">Jawab lalu bedah</span>
            <h3>Pembahasan Langsung</h3>
            <p>Begitu memilih jawaban, kunci dan alasan keempat pilihan langsung terbuka.</p>
            <footer><span>{practiceCount} soal adaptif</span><b>Mulai →</b></footer>
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
            <p>Pilih satu rumpun untuk hingga 25 soal unik acak dengan pembahasan langsung.</p>
            <footer><span>hingga 25 soal per sesi</span><b>Pilih →</b></footer>
          </a>
          <button className="mode-card" onClick={() => startSession("favorites")} disabled={!favorites.length}>
            <span className="mode-index">06</span>
            <div className="mode-icon">★</div>
            <span className="mode-label">Tersimpan lokal</span>
            <h3>Soal Favorit</h3>
            <p>{favorites.length ? `${favorites.length} soal ditandai untuk diulang.` : "Tandai soal saat latihan agar muncul di sini."}</p>
            <footer><span>{favorites.length} favorit</span><b>{favorites.length ? "Mulai →" : "Belum ada"}</b></footer>
          </button>
        </div>
      </section>

      {history.length > 0 && (
        <section className="history-section" aria-labelledby="history-title">
          <div className="section-heading split">
            <div><span className="eyebrow">Riwayat lokal</span><h2 id="history-title">Hasil simulasi terakhir</h2></div>
            <p>Versi bank dan seed disimpan agar paket dapat diaudit. Maksimal 20 sesi di perangkat ini.</p>
          </div>
          <div className="history-grid">
            {history.slice(0, 5).map((item) => (
              <article key={item.sessionId}>
                <span>{new Date(item.completedAt).toLocaleString("id-ID")}</span>
                <strong>{item.score}%</strong>
                <p>{item.correct}/{item.total} benar · {formatTime(item.durationSeconds)}</p>
                <small>{item.questionBankVersion} · seed {item.seed}</small>
              </article>
            ))}
          </div>
        </section>
      )}

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
          Lihat {publicSourceRegistry.length} sumber rujukan ↗
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
              Status dan tanggal verifikasi ditampilkan agar perubahan regulasi dapat diaudit.
            </p>
            <div className="sources-list">
              {publicSourceRegistry.map((source, index) => (
                <a key={source.sourceId} href={source.driveUrl} target="_blank" rel="noreferrer">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{source.title}<small>{source.issuer} · {source.status} · diverifikasi {source.lastVerified}</small></strong>
                  <b>↗</b>
                </a>
              ))}
            </div>
            <p className="sources-intro">
              <strong>Riwayat regulasi:</strong> {publicSourceRegistry.find((source) => source.status === "superseded")?.title ?? "Regulasi lama Manajemen Talenta"} berstatus superseded dan tidak digunakan sebagai dasar soal aktif.
            </p>
          </section>
        </div>
      )}
      <Chat />
    </main>
  );
}

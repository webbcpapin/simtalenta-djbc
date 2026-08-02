export const quizConfig = {
  schemaVersion: 3,
  examQuestionCount: 100,
  examDurationMinutes: 120,
  defaultPracticeCount: 20,
  practiceCountOptions: [10, 20, 30, 50, 100] as const,
  examDurationOptions: [30, 60, 90, 120] as const,
  label: "Konfigurasi latihan internal, bukan ketentuan resmi.",
} as const;

export const ACTIVE_SESSION_KEY = `simtalenta-djbc-session-v${quizConfig.schemaVersion}`;
export const PROGRESS_KEY = `simtalenta-djbc-progress-v${quizConfig.schemaVersion}`;
export const LAST_RESULT_KEY = `simtalenta-djbc-last-result-v${quizConfig.schemaVersion}`;
export const HISTORY_KEY = `simtalenta-djbc-history-v${quizConfig.schemaVersion}`;
export const FAVORITES_KEY = `simtalenta-djbc-favorites-v${quizConfig.schemaVersion}`;
export const RECENT_IDS_KEY = `simtalenta-djbc-recent-v${quizConfig.schemaVersion}`;

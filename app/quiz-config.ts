export const quizConfig = {
  schemaVersion: 2,
  examQuestionCount: 100,
  examDurationMinutes: 120,
  defaultPracticeCount: 20,
  practiceCountOptions: [10, 20, 30] as const,
  label: "Konfigurasi latihan internal, bukan ketentuan resmi.",
} as const;

export const ACTIVE_SESSION_KEY = `simtalenta-djbc-session-v${quizConfig.schemaVersion}`;
export const PROGRESS_KEY = `simtalenta-djbc-progress-v${quizConfig.schemaVersion}`;
export const LAST_RESULT_KEY = `simtalenta-djbc-last-result-v${quizConfig.schemaVersion}`;

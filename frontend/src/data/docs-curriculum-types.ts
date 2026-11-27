export type DocArticleStatus = 'not_started' | 'in_progress' | 'completed' | 'reviewed';

export type DocDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface DocPhaseMetadata {
  number: number;
  folder: string;
  title: string;
  arTitle: string;
  description: string;
}

export interface StructuredDocChapter {
  number: number;
  phaseNumber: number;
  slug: string;
  title: string;
  arTitle: string;
  summary: string;
  difficulty: DocDifficulty;
  status: DocArticleStatus;
  actualWordCount: number;
  targetWordCount: number;
  readTimeMinutes: number;
  topics: string[];
}

export interface DocPracticalProject {
  number: number;
  title: string;
  arTitle: string;
  description: string;
  concepts: string[];
  status: DocArticleStatus;
  demoUrl?: string;
  repoUrl?: string;
}

export interface PhaseProgressStats {
  phaseNumber: number;
  total: number;
  completed: number;
  inProgress: number;
  percentage: number;
  actualWords: number;
  targetWords: number;
}

export interface OfficialCurriculumProgress {
  total: number;
  completed: number;
  reviewed: number;
  inProgress: number;
  notStarted: number;
  actualWords: number;
  targetWords: number;
  completionPercentage: number;
  byPhase: Record<number, PhaseProgressStats>;
}

/**
 * Computes official content production progress from a structured curriculum.
 * Only chapters marked as `completed` or `reviewed` count toward completion.
 */
export function calculateDocsOfficialProgress(
  chapters: readonly StructuredDocChapter[]
): OfficialCurriculumProgress {
  const byPhase: Record<number, PhaseProgressStats> = {};
  let completed = 0;
  let reviewed = 0;
  let inProgress = 0;
  let notStarted = 0;
  let actualWords = 0;
  let targetWords = 0;

  for (const ch of chapters) {
    if (!byPhase[ch.phaseNumber]) {
      byPhase[ch.phaseNumber] = {
        phaseNumber: ch.phaseNumber,
        total: 0,
        completed: 0,
        inProgress: 0,
        percentage: 0,
        actualWords: 0,
        targetWords: 0,
      };
    }

    const phase = byPhase[ch.phaseNumber];
    phase.total += 1;
    phase.actualWords += ch.actualWordCount;
    phase.targetWords += ch.targetWordCount;

    actualWords += ch.actualWordCount;
    targetWords += ch.targetWordCount;

    if (ch.status === 'reviewed') {
      reviewed += 1;
      completed += 1;
      phase.completed += 1;
    } else if (ch.status === 'completed') {
      completed += 1;
      phase.completed += 1;
    } else if (ch.status === 'in_progress') {
      inProgress += 1;
      phase.inProgress += 1;
    } else {
      notStarted += 1;
    }
  }

  for (const key of Object.keys(byPhase)) {
    const p = byPhase[Number(key)];
    p.percentage = p.total > 0 ? Math.round((p.completed / p.total) * 100) : 0;
  }

  const total = chapters.length;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    reviewed,
    inProgress,
    notStarted,
    actualWords,
    targetWords,
    completionPercentage,
    byPhase,
  };
}

export function isDocChapterPublished(chapter: Pick<StructuredDocChapter, 'status'>): boolean {
  return chapter.status === 'completed' || chapter.status === 'reviewed';
}

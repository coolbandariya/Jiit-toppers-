import { z } from 'zod';

export const resourceSubmissionSchema = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().max(4000).optional(),
  type: z.enum([
    'NOTE',
    'PYQ',
    'ASSIGNMENT',
    'TUTORIAL',
    'LAB',
    'BOOK',
    'VIDEO',
    'CHEAT_SHEET',
    'OTHER',
  ]),
  subjectId: z.string().trim().min(1).max(128).optional(),
  campusId: z.string().trim().min(1).max(128).optional(),
  sourceUrl: z.string().url().max(2048).optional(),
  academicYear: z.number().int().min(2000).max(2100).optional(),
  examType: z
    .enum(['T1', 'T2', 'T3', 'MIDTERM', 'END_SEM', 'QUIZ', 'LAB', 'OTHER'])
    .optional(),
});

export type ResourceSubmission = z.infer<typeof resourceSubmissionSchema>;

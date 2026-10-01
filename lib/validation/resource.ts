import { z } from 'zod';

const safeHttpUrl = z
  .string()
  .trim()
  .url()
  .max(2048)
  .refine((value) => {
    try {
      const protocol = new URL(value).protocol;
      return protocol === 'https:' || protocol === 'http:';
    } catch {
      return false;
    }
  }, 'URL must use HTTP or HTTPS');

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
  sourceUrl: safeHttpUrl.optional(),
  academicYear: z.number().int().min(2000).max(2100).optional(),
  examType: z
    .enum(['T1', 'T2', 'T3', 'MIDTERM', 'END_SEM', 'QUIZ', 'LAB', 'OTHER'])
    .optional(),
}).strict();

export type ResourceSubmission = z.infer<typeof resourceSubmissionSchema>;

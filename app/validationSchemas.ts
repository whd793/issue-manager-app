import { z } from 'zod';

// export const issueSchema = z.object({
//   title: z.string().min(1, 'Title is required.').max(255),
//   description: z.string().min(1, 'Description is required.').max(65535),
// });

// export const patchIssueSchema = z.object({
//   title: z.string().min(1, 'Title is required.').max(255).optional(),
//   description: z
//     .string()
//     .min(1, 'Description is required.')
//     .max(65535)
//     .optional(),
//   assignedToUserId: z
//     .string()
//     .min(1, 'AssignedToUserId is required.')
//     .max(255)
//     .optional()
//     .nullable(),
// });

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required.').max(65535),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255).optional(),
  description: z
    .string()
    .min(1, 'Description is required.')
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'AssignedToUserId is required.')
    .max(255)
    .optional()
    .nullable(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(65535),
});

export const labelSchema = z.object({
  name: z.string().min(1, 'Label name is required').max(50),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color hex code'),
});

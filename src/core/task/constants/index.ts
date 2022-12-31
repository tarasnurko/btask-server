export type TaskText =
  | 'Bid'
  | 'Invite to First Call'
  | 'Schedule First Call'
  | 'Make Offer'
  | 'Close Deal';

export const TaskTextArr: TaskText[] = [
  'Bid',
  'Invite to First Call',
  'Schedule First Call',
  'Make Offer',
  'Close Deal',
];

export enum TaskStatus {
  Inactive = 'inactive',
  Next = 'next',
  Done = 'done',
  Deleted = 'deleted',
}

export enum TaskChangeStatus {
  Done = 'done',
  Deleted = 'deleted',
}

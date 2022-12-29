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
  Done = 'done',
  Deleted = 'deleted',
}

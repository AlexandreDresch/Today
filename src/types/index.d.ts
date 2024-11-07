export interface ComponentProps {
  [key: string]: any;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  completed: boolean;
}

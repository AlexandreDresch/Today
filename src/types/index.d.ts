export interface ComponentProps {
  [key: string]: any;
}

export interface Task {
  title: string;
  description: string;
  category: string;
}

export interface DailyTasks {
  day: string;
  tasks: Task[];
}

export interface MainSectionProps {
  tasks: DailyTasks[]
}
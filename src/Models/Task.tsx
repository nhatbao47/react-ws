export enum TaskState {
    New = 1,
    Inprogress,
    Done
}

export interface Task {
    id: number;
    title: string;
    description: string;
    state: TaskState;
}
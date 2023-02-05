export interface ISubtask {
    id: number;
    content: string; 
}

interface IToDoTask {
    id: number; 
    content: string;
    completed: boolean;
    subtasks: ISubtask[];
}

export default IToDoTask;
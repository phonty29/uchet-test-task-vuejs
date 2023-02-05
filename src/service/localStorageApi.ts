import type IToDoTask from "@/utils/type/IToDoTask";

class LocalStorageService {
    static getTasks() {
        return JSON.parse(localStorage.getItem("tasks") || '[]');
    }
    static setTasks(tasks: IToDoTask[]) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    static deleteTasks() {
        localStorage.removeItem("tasks");
    }
}

export default LocalStorageService;
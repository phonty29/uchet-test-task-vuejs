import type IToDoTask from "@/utils/type/IToDoTask";

class LocalStorageService {
    static getTasks() {
        return JSON.parse(localStorage.getItem("tasks") || '[]');
    }
    static getId() {
        return JSON.parse(localStorage.getItem("id") || "0" );
    }
    static setTasks(tasks: IToDoTask[]) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    static setId(id: number) {
        localStorage.setItem("id", id.toString());
    }
    static deleteTasks() {
        localStorage.removeItem("tasks");
    }
}

export default LocalStorageService;
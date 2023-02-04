class LocalStorageService {
    static getToDoTasks() {
        return JSON.parse(localStorage.getItem("todos") || '[]');
    }
    
    static getId() {
        return JSON.parse(localStorage.getItem("id") || "0" );
    }
}

export default LocalStorageService;
import { defineStore } from 'pinia'
import type IToDoTask from '@/utils/type/IToDoTask';
import LocalStorageService from '@/service/localStorageApi';
import type { ISubtask } from '@/utils/type/IToDoTask';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: LocalStorageService.getTasks() as IToDoTask[]
  }),
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getSearchedTasks(state) {
      return (content: string) => state.tasks.filter(task => task.content.startsWith(content));
    },
    getTaskById(state) {
      return (id: number) => state.tasks.find(task => task.id == id);
    }
  },
  actions: {
    addTask(content: string) {
      let lastId = 0;
      if (this.tasks.length) 
        lastId = this.tasks[this.tasks.length-1].id;
      const task: IToDoTask = {
          id: lastId + 1,
          content: content,
          completed: false,
          subtasks: []
      };
      this.tasks.push(task);
      LocalStorageService.setTasks(this.tasks);
    }, 
    markAs(task: IToDoTask) {
      const index = this.tasks.indexOf(task);
      this.tasks[index] = {...this.tasks[index], completed: !this.tasks[index].completed};
      LocalStorageService.setTasks(this.tasks);
    },
    deleteCompletedTasks() {
      this.tasks = this.tasks.filter((t) => !t.completed);
      LocalStorageService.setTasks(this.tasks);
    },
    removeTask(task: IToDoTask) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
      LocalStorageService.setTasks(this.tasks);
      if (!this.tasks.length) 
          LocalStorageService.deleteTasks();
    },
    editTask(task: IToDoTask, newContent: string) {
      const index = this.tasks.indexOf(task);
      this.tasks[index] = {...this.tasks[index], content: newContent};
      console.log(this.tasks);
      LocalStorageService.setTasks(this.tasks);
    },
    addSubtask(parentTask: IToDoTask, content: string) {
      const index = this.tasks.indexOf(parentTask);
      const subtask = {
        id: this.tasks[index].subtasks.length + 1,
        content: content
      };
      this.tasks[index].subtasks.push(subtask);
      LocalStorageService.setTasks(this.tasks);
    },
    removeSubtask(parentTask: IToDoTask, subtask: ISubtask) {
      const parentIndex = this.tasks.indexOf(parentTask);
      const subtaskIndex = this.tasks[parentIndex].subtasks.indexOf(subtask);
      this.tasks[parentIndex].subtasks.splice(subtaskIndex, 1);
      LocalStorageService.setTasks(this.tasks);
    }
  }
})

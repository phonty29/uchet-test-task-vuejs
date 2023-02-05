import { defineStore } from 'pinia'
import type IToDoTask from '@/utils/type/IToDoTask';
import LocalStorageService from '@/service/localStorageApi';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: LocalStorageService.getTasks() as IToDoTask[],
    id: LocalStorageService.getId() as number
  }),
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getId(state) {
      return state.id;
    }
  },
  actions: {
    addTask(content: string) {
      const task = {
          id: this.id++,
          content: content,
          completed: false
      }
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
      if (!this.tasks.length) {
          this.id = 0;
          LocalStorageService.setId(this.id);
          LocalStorageService.deleteTasks();
      }
    },
    editTask(task: IToDoTask, newContent: string) {
      const index = this.tasks.indexOf(task);
      this.tasks[index] = {...this.tasks[index], content: newContent};
      LocalStorageService.setTasks(this.tasks);
    }
  }
})

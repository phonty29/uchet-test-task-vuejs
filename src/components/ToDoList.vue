<script>
    import LocalStorageService from '@/service/localStorageApi';
    import FilterMethods from '@/utils/enum/FilterMethods';
    import ToDoTask from '@/components/ToDoTask.vue';
    import {useTodoStore} from '@/stores/todo';
    export default {
        components: {ToDoTask},
        setup() {
            const todoStore = useTodoStore();
            return { todoStore };
        },
        data() {
            return {
                filterMethods: FilterMethods,
                filterBy: FilterMethods.BY_ALL
            }
        }, 
        computed: {
            filteredTasks() {
                switch (this.filterBy) {
                    case this.filterMethods.BY_COMPLETED:
                        return this.todoStore.getTasks.filter(t => t.completed);
                    case this.filterMethods.BY_INCOMPLETED:
                        return this.todoStore.getTasks.filter(t => !t.completed);
                    default:
                        return this.todoStore.getTasks;
                }
            },
            incompletedTasks() {
                return this.todoStore.getTasks.filter((t) => !t.completed).length;
            }  
        },
        methods: {
            addTask(event) {
                const content = event.target.value.trim();
                if (!content) return;
                this.todoStore.addTask(content);
                event.target.value = "";
            },
            deleteCompletedTasks() {
                this.todoStore.deleteCompletedTasks();
            }
        }
    }
</script>

<template>
    <div class="menu">
        <p class="tasks-left-text"> Осталось задач 
            <span class="green">{{ incompletedTasks }} </span>
        </p>
        <div class="filter">
          <h3>Фильтровать по:</h3>
          <select v-model="filterBy" class="filter-box">
            <option :value="filterMethods.BY_ALL">Всем</option>
            <option :value="filterMethods.BY_COMPLETED">Завершенным</option>
            <option :value="filterMethods.BY_INCOMPLETED">Незавершенным</option>
          </select>
          <span class="focus"></span>
        </div>
        <div class="delete-completed" @click="deleteCompletedTasks">
            Удалить выделенные
        </div>
    </div>

    <input autofocus class="add-task" placeholder="Введите новую задачу" @keyup.enter="addTask" /> 
    <to-do-task v-for="task in filteredTasks" :task="task" :key="task.id" />
</template>

<style scoped>
    .menu {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
    .tasks-left-text {
        color: white;
        text-align: left;
        margin-bottom: 6px;
    }
    .determine-todos {
        font-family: Verdana, sans-serif;
        align-self: center;
        border: solid grey;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        background-color: rgb(100, 100, 100);
        padding: 4px 8px;
    }
    .add-task {
        padding: 8px;
        font-size: 14px;
        width: 100%;
        background-color: inherit;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: white;
        margin: 8px 0px;
    }
    .add-task::placeholder {
        font-size: 14px;
    }
    .add-task:focus {
        border: solid white;
        border-width: 1px;
    } 
    .filter {
      display: flex;
      justify-items: center;
      align-items: center;
    }

    .filter h3 {
      margin-right: 1rem;
      min-width: 135px;
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
              appearance: none;
      background-color: transparent;
      border: none;
      padding: 0 1em 0 0;
      margin: 0;
      width: 100%;
      font-family: inherit;
      font-size: inherit;
      cursor: inherit;
      line-height: inherit;
      z-index: 1;
      outline: none;
    }

    select::-ms-expand {
      display: none;
    }

    .filter-box {
      display: grid;
      align-items: center;
      position: relative;
      min-width: 15ch;
      max-width: 30ch;
      border-radius: 0.25em;
      padding: 0.25em 0.5em;
      font-size: 1rem;
      cursor: pointer;
      line-height: 1;
      background-color: inherit;
      background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
    }
    .filter-box select, .filter-box::after {
      grid-area: select;
    }
    .filter-box::after {
      content: "";
      justify-self: end;
      width: 0.8em;
      height: 0.5em;
      background-color: var(--select-arrow);
      -webkit-clip-path: polygon(100% 0%, 0 0%, 50% 100%);
              clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    }
    select::after + .focus {
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border: 2px solid var(--select-focus);
      border-radius: inherit;
    }
</style>

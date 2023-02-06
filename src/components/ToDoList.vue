<script>
    import FilterMethods from '@/utils/enum/FilterMethods';
    import ToDoTask from '@/components/ToDoTask.vue';
    import {useTodoStore} from '@/stores/todo';
    import {debounce} from '@/utils/use';
    export default {
        components: {ToDoTask},
        setup() {
            const todoStore = useTodoStore();
            return { todoStore };
        },
        data() {
            return {
                filterMethods: FilterMethods,
                filterBy: FilterMethods.BY_ALL,
                searchedTask: ""
            }
        }, 
        computed: {
            filteredTasks() {
                switch (this.filterBy) {
                    case this.filterMethods.BY_COMPLETED:
                        return this.todoStore.getSearchedTasks(this.searchedTask).filter(t => t.completed);
                    case this.filterMethods.BY_INCOMPLETED:
                        return this.todoStore.getSearchedTasks(this.searchedTask).filter(t => !t.completed);
                    default:
                        return this.todoStore.getSearchedTasks(this.searchedTask);
                }
            },
            incompletedTasks() {
                return this.todoStore.getTasks.filter((t) => !t.completed).length;
            }
        },
        methods: {
            addTask() {
                const content = prompt("Add new task");
                if (!content) return;
                this.todoStore.addTask(content);
            },
            deleteCompletedTasks() {
                this.todoStore.deleteCompletedTasks();
            },
            searchTask(event) {
                debounce(() => {
                    const content = event.target.value.trim();
                    this.searchedTask = content;
                }, 1000)();
            }
        }
    }
</script>

<template>
    <div class="options">
        <div class="options-info"> Осталось задач 
            <span class="green">{{ incompletedTasks }} </span>
        </div>
        <div class="options-filter">
          <label>Фильтровать по: </label>
          <select v-model="filterBy" class="filter-box">
            <option :value="filterMethods.BY_ALL">Всем</option>
            <option :value="filterMethods.BY_COMPLETED">Завершенным</option>
            <option :value="filterMethods.BY_INCOMPLETED">Незавершенным</option>
          </select>
          <span class="focus"></span>
        </div>
        <div class="options-delete" @click="deleteCompletedTasks">
            <img src="/trash-bin.png" alt="delete-completed-tasks" title="Удалить помеченные задачи">
        </div>
    </div>
    <div class="rule">
        <input autofocus class="search-box" placeholder="Найти задачу" @input="searchTask" /> 
        <button class="rule-add-btn" >
            <img src="/add-button.png" alt="Add task" title="Добавить новую задачу" @click="addTask">
        </button>
    </div>
    <to-do-task v-for="task in filteredTasks" :task="task" :key="task.id" />
</template>

<style scoped>
    .options {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        margin-top: 1rem;
    }
    .options-delete {
        cursor: pointer;
    }
    .options-filter {
      display: flex;
      justify-items: center;
      align-items: center;
    }
    .options-filter label {
      margin-right: 0.5rem;
      min-width: 120px;
    }
    .rule {
        display: flex;
    }
    .rule-add-btn {
        background-color: inherit; 
        border: none;
    }
    .rule-add-btn img {
        cursor: pointer;
    }
    .search-box {
        padding: 8px;
        padding-left: 32px;
        background: url("/search.png") no-repeat left;
        font-size: 14px;
        background-color: inherit;
        border: 1px solid #ccc;
        flex-grow: 1;
        border-radius: 4px;
        color: hsla(160, 100%, 37%, 1);
        margin: 8px 0px;
    }
    .search-box::placeholder {
        font-size: 14px;
    }
    .search-box:focus {
        border: solid white;
        border-width: 1px;
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
      line-height: 1;
      cursor: pointer;
      background-color: #d6d6d6;
    }
    @media screen and (max-width: 550px)  {
        .options-info {
            display: none;
        }
    }
    @media screen and (max-width: 380px)  {
        .options-filter {
            flex-direction: column;
        }
        .options-filter label {
            margin-bottom: 0.3rem;
        }
    }
    @media screen and (max-width: 300px)  {
        .search-box {
            flex-grow: 0;
            width: 75%;
        }
    }
</style>

<script>
    import LocalStorageService from '../api/localStorageApi';
    export default {
        data() {
            return {
                todos: LocalStorageService.getToDoTasks(),
                id: LocalStorageService.getId(),
                filterBy: "all",
                showAll: false
            }
        }, 
        computed: {
            filteredTodos() {
                return this.filterBy ? this.todos : this.todos.filter((t) => !t.completed)
            },
            incompletedTodos() {
                return this.todos.filter((t) => !t.completed)
            }  
        },
        watch: {
            todos: {
                handler(todos) {
                    localStorage.setItem("todos", JSON.stringify(todos))
                },
                deep: true
            }, 
            id: {
                handler(id) {
                    localStorage.setItem("id", id)
                }
            }
        },
        methods: {
            addTodo(e) {
                const value = e.target.value.trim();
                if (value === "") {
                    return;
                }      
                this.todos.push({
                    id: this.id++,
                    task: value,
                    completed: false,
                })
                e.target.value = ''
            }, 
            removeTodo(todo) {
                // Removes a todo from the array at the index of todo and of 1 obj
                this.todos.splice(this.todos.indexOf(todo), 1)
                // Resets id counter to 0 if array is empty
                if (this.todos.length === 0) {
                    this.id = 0
                    localStorage.setItem("id", 0)
                }
            }
        }
    }
</script>

<template>
    <div class="menu">
        <p class="tasks-left-text"> Осталось задач {{ incompletedTodos.length }} </p>
        <div class="filter">
          <h3>Filter by: </h3>
          <select v-model="filterBy" class="filter-box">
            <option value="all">All</option>
            <option value="completed">Completed tasks</option>
            <option value="uncompleted">Uncompleted tasks</option>
          </select>
          <span class="focus"></span>
        </div>
    </div>

    <input 
        autofocus
        class="add-task"
        placeholder="Add a new task"
        @keyup.enter="addTodo"
    > 
    <div v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
        <label class="checkbox-container">
            <input 
                type="checkbox"
                v-model="todo.completed"
                >
            <span class="checkbox"> </span>
        </label>
        <p :class="{ completed: todo.completed }"> {{ todo.task }} </p>
        <button @click="removeTodo(todo)" class="delete-button"> X </button>
    </div> 
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
    .todo-item {
        display: flex;
        justify-content: space-between;
        border: solid rgb(57, 57, 57);
        border-width: 2px;
        background-color: rgb(20, 20, 20);
        padding: 16px;
        color: white;
    }
    /* Customising checkbox guide https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */
    
    /* Customise checkbox container */
    .checkbox-container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    /* Hide default checkbox */
    .checkbox-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    
    /* Create a custom checkbox */
    .checkbox {
        height: 25px;
        width: 25px;
        background-color: rgb(80, 80, 80);
        position: absolute;
        top: 0;
        left: 0;
    }
    .checkbox-container:hover input ~ .checkbox {
        background-color: rgb(65, 65, 65);
    }
    .checkbox-container input:checked ~ .checkbox {
        background-color: rgb(55, 55, 55);
    }
    .checkbox:after {
        content: "";
        position: absolute;
        display: none;
    }
    /* Show the checkbox when checked */
    .checkbox-container input:checked ~ .checkbox:after {
        display: block;
    }
    /* Style the checkbox */
    .checkbox-container .checkbox:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .completed {
        text-decoration: line-through;
        text-decoration-thickness: 3px;
        color: #ccc;
    }
    .delete-button {
        border: none;
        font-weight: bold;
        background-color: rgb(20, 20, 20);
        color: white;
        font-size: 18px;
    }

    .filter {
      display: flex;
      justify-items: center;
      align-items: center;
    }

    .filter h3 {
      margin-right: 1rem;
      min-width: 75px;
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
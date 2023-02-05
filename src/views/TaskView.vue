<script>
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
                isEditMode: false
            }
        },
        computed: {
            getTask() {
                return this.todoStore.getTaskById(this.$route.params.id);
            },
            getSubtasks() {
                return this.getTask.subtasks;
            }
        },
        methods: {
            editParentTask(event) {
                const newContent = event.target.value.trim(); 
                this.todoStore.editTask(this.getTask, newContent);
                this.isEditMode = false;
            },
            addSubtask(event) {
                const content = event.target.value.trim();
                if (!content) return;
                this.todoStore.addSubtask(this.getTask, content);
                event.target.value = "";
            },
            removeSubtask(subtask) {
                this.todoStore.removeSubtask(this.getTask, subtask);
            }
        }
    }
</script>

<template>
    <div v-if="getTask">
        <div class="todo-item">
            <p v-if="!isEditMode"> {{ getTask.content }} </p>
            <input v-else :value="getTask.content"  @keyup.enter="editParentTask" />
            <button @click="isEditMode = !isEditMode" class="delete-button"> E </button>
        </div> 
        <h3>Подзадачи: </h3>
        <input autofocus class="add-task" placeholder="Введите новую подзадачу" @keyup.enter="addSubtask" />
         
        <div v-for="subtask in getSubtasks" >
            <div class="subtask-item">
            <p> {{ subtask.content }} </p>
            <button @click="removeSubtask(subtask)" class="delete-button"> X </button>
        </div> 
        </div>
    </div>
    <div v-else>Such task doesn't exist</div>
</template>
  
<style scoped>
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
    .subtask-item {
        display: flex;
        justify-content: space-between;
        border: solid hsla(160, 100%, 37%, 1);
        border-width: 2px;
        background-color: rgb(57, 57, 57); 
        padding: 16px;
        color: white;
    }
    .delete-button {
        border: none;
        font-weight: bold;
        background-color: rgb(20, 20, 20);
        color: white;
        font-size: 18px;
    }
</style>
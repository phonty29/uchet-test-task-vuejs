<script setup lang="ts">
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
    <main v-if="getTask">
        <div class="task">
            <p>Задание: 
               <span v-if="!isEditMode">{{ getTask.content }} </span>
               <input v-else :value="getTask.content" @keyup.enter="editParentTask" class="edit-input" />
            </p>
            <button class="btn edit-btn">
                <img src="/edit-document.png" alt="edit-task" title="Изменить задачу" @click="isEditMode = !isEditMode">
            </button>
        </div> 
        <input autofocus class="add-subtask" placeholder="Введите новую подзадачу" @keyup.enter="addSubtask" />
        <h3 class="subtask">Подзадачи: </h3>
        <div v-for="subtask in getSubtasks" >
            <div class="subtask-item">
                <p> {{ subtask.content }} </p>
                <button class="btn delete-btn">
                    <img src="/delete-subtask.png" alt="delete-subtask" title="Удалить подзадачу" @click="removeSubtask(subtask)">
                </button>
            </div> 
        </div>
    </main>
    <main v-else>
        <h1 class="error-msg">Такой задачи не существует</h1>
    </main>
</template>
  
<style scoped>
    .error-msg {
        text-align: center; 
        padding: 2rem 0;
    }
    .task {
        display: flex;
        justify-content: space-between;
        border: dashed hsla(160, 100%, 37%, 1);
        border-width: 2px;
        font-size: 1.17em;
        background-color: rgb(20, 20, 20); 
        padding: 16px;
        color: white;
        margin-bottom: 1rem;
    }
    .subtask {
        margin-bottom: 0.5rem;
    }
    .subtask-item {
        display: flex;
        justify-content: space-between;
        border: solid rgb(57, 57, 57); 
        border-width: 2px;
        background-color: rgb(20, 20, 20); 
        padding: 8px 12px;
        color: white;
    }
    .btn {
        border: none;
        background-color: inherit;
    }
    .btn img {
        cursor: pointer;
    }
    .edit-input {
      border-radius: 0.25em;
      padding: 0 0.5em;
      background-color: #d6d6d6;
    }
    .add-subtask {
        padding: 8px;
        font-size: 14px;
        width: 100%;
        background-color: inherit;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: white;
        margin: 8px 0px;
    }
    .add-subtask::placeholder {
        font-size: 14px;
    }
    .add-subtask:focus {
        border: solid white;
        border-width: 1px;
    } 

    @media screen and (max-width: 380px)  {
        .edit-input {
            width: 100px;
        }
    }
</style>
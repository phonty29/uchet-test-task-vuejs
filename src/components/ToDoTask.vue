<script>
    import {useTodoStore} from '@/stores/todo';
    export default {
      props: {
        task: {
          type: Object,
          required: true,
        }
      },
      data() {
        return {
          isEditMode: false
        }
      },
      setup() {
            const todoStore = useTodoStore();
            return { todoStore };
      },
      methods: {
        removeTask(task) {
          this.todoStore.removeTask(task);
        },
        markAs(task) {
          this.todoStore.markAs(this.task);
        },
        editTask(event) {
          const newContent = event.target.value.trim(); 
          this.todoStore.editTask(this.task, newContent);
          this.isEditMode = false;
        },
        redirectTo(event) {
          if (!event.target.closest(".edit-button") && 
              !event.target.closest(".delete-button") &&
              !event.target.closest(".checkbox-container") &&
              !event.target.closest(".edit-input")
            ) {
            this.$router.push(`/task/${this.task.id}`);
          }
        }
      }
   }
</script>

<template>
    <a class="todo-item"  @click="redirectTo">
        <label class="checkbox-container">
            <input type="checkbox" v-model="task.completed" @click="markAs" />
            <span class="checkbox"></span>
        </label>
        <p v-if="!isEditMode" :class="{ completed: task.completed }"> {{ task.content }} </p>
        <input v-else :value="task.content"  @keyup.enter="editTask" class="edit-input"/>
        <button @click="isEditMode = !isEditMode" class="edit-button"> E </button>
        <button @click="removeTask(task)" class="delete-button"> X </button>
      </a> 
</template>

<style scoped>
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
    .edit-button {
        border: none;
        font-weight: bold;
        background-color: rgb(20, 20, 20);
        color: white;
        font-size: 18px;
    }
    .delete-button {
        border: none;
        font-weight: bold;
        background-color: rgb(20, 20, 20);
        color: white;
        font-size: 18px;
    }
</style>

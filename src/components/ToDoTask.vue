<script>
    import {useTodoStore} from '@/stores/todo';
    import ElementsOfTaskLink from '@/utils/enum/ElementsOfTaskLink';
    import { toImg } from '@/utils/helpers/pathTo';
    export default {
      props: {
        task: {
          type: Object,
          required: true,
        }
      },
      data() {
        return {
          imgEdit: toImg("edit-document.png"),
          imgClose: toImg("close.png"),
          isEditMode: false,
          elementsOfTaskLink: ElementsOfTaskLink
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
        redirect(event) {
          if (!event.target.closest(this.elementsOfTaskLink.BUTTONS) && 
              !event.target.closest(this.elementsOfTaskLink.CHECKBOX) &&
              !event.target.closest(this.elementsOfTaskLink.INPUT) &&
              !this.isEditMode
            ) {
            this.$router.push(`/task/${this.task.id}`);
          }
        }
      }
   }
</script>

<template>
    <a class="task"  @click="redirect">
        <label class="checkbox-container">
            <input type="checkbox" v-model="task.completed" @click="markAs" />
            <span class="checkbox"></span>
        </label>
        <p v-if="!isEditMode" :class="{ completed: task.completed }"> {{ task.content }} </p>
        <input v-else :value="task.content"  @keyup.enter="editTask" class="edit-input"/>
        <div class="task-buttons">
          <button class="task-btn edit-btn">
            <img :src="imgEdit" alt="Edit task" title="Изменить задачу" @click="isEditMode = !isEditMode">
          </button>
          <button class="task-btn delete-btn">
            <img :src="imgClose" alt="Delete task" title="Удалить задачу" @click="removeTask(task)">
          </button>
        </div>
      </a> 
</template>

<style scoped>
    .task {
        display: flex;
        justify-content: space-between;
        border: solid rgb(57, 57, 57);
        border-width: 2px;
        background-color: rgb(20, 20, 20);
        padding: 16px;
        color: white;
    }
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
    .checkbox-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
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
    .checkbox-container input:checked ~ .checkbox:after {
        display: block;
    }
    .checkbox-container .checkbox:after {
        left: 10px;
        top: 5px;
        width: 6px;
        height: 11px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .completed {
        text-decoration: line-through;
        text-decoration-thickness: 2px;
        color: hsla(160, 100%, 37%, 1);
    }
    .edit-input {
      border-radius: 0.25em;
      padding: 0 0.5em;
      background-color: #d6d6d6;
    }
    .task-buttons {
      display: flex;
    }
    .task-btn {
      border: none;
      background-color: inherit;
    }
    .task-btn img {
      cursor: pointer;
    }

    @media screen and (max-width: 380px)  {
        .edit-input {
            width: 100px;
        }
    }
</style>

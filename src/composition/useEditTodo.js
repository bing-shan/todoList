import { ref } from "vue";

export function useEditTodo(todosRef) {
  let editingTodoRef = ref(null); //当前正在被修改的todo。
  function handleEditTodo(todo) {
    editingTodoRef.value = todo;
  }

  function doneEdit(value) {
    editingTodoRef.value = null;
  }

  return {
    editingTodoRef,
    handleEditTodo,
    doneEdit,
  };
}

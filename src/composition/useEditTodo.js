import { ref, computed } from "vue";

export function useEditTodo(todosRef) {
  let editingTodoRef = ref(null); //当前正在被修改的todo。
  let originTitle = null; //缓存初始title值。
  function handleEditTodo(todo) {
    originTitle = todo.title;
    editingTodoRef.value = todo;
  }

  function doneEdit(value) {
    editingTodoRef.value = null;
  }

  function cancelEdit(todo) {
    editingTodoRef.value = null;
    todo.title = originTitle;
  }

  function toggleCheckAll(e) {
    todosRef.value.forEach((todo) => {
      todo.completed = e.target.checked;
    });
  }

  const isCheckAll = computed(() => {
    return todosRef.value.filter((it) => !it.completed).length === 0;
  });

  return {
    editingTodoRef,
    handleEditTodo,
    doneEdit,
    cancelEdit,
    toggleCheckAll,
    isCheckAll
  };
}

import { ref, computed, nextTick } from "vue";

export function useEditTodo(todosRef) {
  let editingTodoRef = ref(null); //当前正在被修改的todo。
  let originTitle = null; //缓存初始title值。
  const editingInput = ref(null);
  function handleEditTodo(todo, index) {
    originTitle = todo.title.trim();
    editingTodoRef.value = todo;

    //双击自动获取焦点：
    nextTick(() => {
      editingInput.value[index].focus();
    });
  }

  function doneEdit(todo) {
    editingTodoRef.value = null;
    const title = todo.title.trim();
    if (title) {
      todo.title = title;
    } else {
      todosRef.value.splice(todosRef.value.indexOf(todo), 1);
    }
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
    isCheckAll,
    editingInput,
  };
}

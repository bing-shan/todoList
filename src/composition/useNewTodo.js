import { ref } from "vue";
import { generateId } from "../utils/todoStorage";

export default function useNewTodo(todosRef) {
  const newTodoRef = ref(""); //新任务的标题。
  function addTodo() {
    if (!newTodoRef.value) {
      return;
    }

    const todo = {
      title: newTodoRef.value,
      completed: false,
      id: generateId(),
    };
    todosRef.value.push(todo);
    newTodoRef.value = "";
  }
  return {
    newTodoRef,
    addTodo,
  };
}

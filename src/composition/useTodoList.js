import { ref, watchEffect } from "vue";
import * as todoStorage from "../utils/todoStorage";
export default function useTodoList() {
  const todosRef = ref(todoStorage.fetch());
  window.todosRef = todosRef; //用于在控制台测试
  watchEffect(() => {
    todoStorage.save(todosRef.value);
  });

  return {
    todosRef,
  };
}

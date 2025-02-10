import { ref, onMounted, onUnmounted, computed } from "vue";
import { filterFn } from "../utils/todoStorage";
const validHash = ["all", "completed", "active"];
export default function useFilter(todosRef) {
  const visibilityRef = ref("all");
  function handleHashChange(params) {
    console.log(params);

    const hash = location.hash.replace(/#\/?/, "");
    // console.log(hash);

    if (validHash.includes(hash)) {
      //有效的hash:
      visibilityRef.value = hash;
    } else {
      location.hash = "";
      visibilityRef.value = "all";
    }
  }
  onMounted(() => {
    window.addEventListener("hashchange", handleHashChange);
  });

  onUnmounted(() => {
    window.removeEventListener("hashchange", handleHashChange);
  });

  const filteredTodosRef = computed(() => {
    return filterFn(todosRef.value, visibilityRef.value);
  });

  const remainingTodosRef = computed(() => {
    return filterFn(todosRef.value, "active").length;
  });

  const completedTodosRef = computed(() => {
    return filterFn(todosRef.value, "completed").length;
  });

  return {
    visibilityRef,
    filteredTodosRef,
    remainingTodosRef,
    completedTodosRef,
  };
}

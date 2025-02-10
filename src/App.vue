<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
export default {
  setup() {
    return {
      todosRef: useTodoList().todosRef,
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
      // filteredTodos(todosRef,),
    };
  },
};
</script>

<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model.trim="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{ completed: todo.completed }"
            v-for="todo of filteredTodosRef"
            :key="todo.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label>{{ todo.title }}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ remainingTodosRef }}</strong>
          <span>item{{ remainingTodosRef === 1 ? "" : "s" }} left</span>
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{ selected: visibilityRef === 'all' }">All</a></li>
          <li><a href="#/active" :class="{ selected: visibilityRef === 'active' }">Active</a></li>
          <li>
            <a href="#/completed" :class="{ selected: visibilityRef === 'completed' }">Completed</a>
          </li>
        </ul>
        <button class="clear-completed" v-show="completedTodosRef" style="display: none">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

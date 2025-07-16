import { getContext } from "svelte";

export const TODO_STORE = Symbol("TODO_STORE");

export function createTodoStore() {
  let todos = $state([]);
  let filter = $state("all");

  let filteredTodos = $derived.by(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  });

  let completedCount = $derived(
    todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
  );

  function addTodo(title) {
    if (!title.trim()) return;

    todos.push({
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
    });
  }

  function editTodo(id, newTitle) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo && newTitle.trim()) {
      todo.title = newTitle.trim();
    }
  }

  function toggleTodo(id) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
  }

  function reorderTodos(newTodos) {  
    todos = newTodos;
  }

  function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);
  }

  function setFilter(newFilter) {
    filter = newFilter;
  }

  function loadFromStorage() {
    const saved = localStorage.getItem("todos");

    if (saved) {
      todos = JSON.parse(saved);
    }
  }

  function saveToStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  $effect(() => {
    saveToStorage();
  });

  loadFromStorage();

  return {
    get todos() {
      return todos;
    },
    get filter() {
      return filter;
    },
    get filteredTodos() {
      return filteredTodos;
    },
    get completedCount() {
      return completedCount;
    },

    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    reorderTodos,
    clearCompleted,
    setFilter,
  };
}

export function getTodoStore() {
  const store = getContext(TODO_STORE);
  if (!store) {
    throw new Error("TodoStore must be used within TodoProvider");
  }
  return store;
}

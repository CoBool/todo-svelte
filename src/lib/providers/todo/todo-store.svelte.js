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

  function reorderTodos(oldIndex, newIndex) {
    if (oldIndex === newIndex || oldIndex == null || newIndex == null) {
      return;
    }

    // dnd-kit-svelte 방식: 현재 필터된 배열 기준으로 처리
    if (filter === "all") {
      // 전체 필터: 직접 배열 조작
      const result = $state.snapshot(todos);
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      todos = result;
    } else {
      // 필터링된 상태: filteredTodos 기준으로 전체 배열 재구성
      const currentFiltered = $state.snapshot(filteredTodos);
      const [removed] = currentFiltered.splice(oldIndex, 1);
      currentFiltered.splice(newIndex, 0, removed);
      
      // 전체 배열에서 필터링된 항목들의 순서 업데이트
      const filteredIds = new Set(currentFiltered.map(todo => todo.id));
      const nonFilteredTodos = todos.filter(todo => !filteredIds.has(todo.id));
      
      // 새로운 순서로 배열 재구성
      const newTodos = [];
      let filteredIndex = 0;
      
      for (const originalTodo of todos) {
        if (filteredIds.has(originalTodo.id)) {
          newTodos.push(currentFiltered[filteredIndex]);
          filteredIndex++;
        } else {
          newTodos.push(originalTodo);
        }
      }
      
      todos = newTodos;
    }
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

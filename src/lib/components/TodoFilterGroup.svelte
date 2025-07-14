<script>
    import { getTodoStore } from "../providers/todo/todo-store.svelte";

    const TodoContext = getTodoStore();
    
</script>

<div class="flex flex-wrap gap-2 mb-6">
  <button
    onclick={() => TodoContext.setFilter("all")}
    class="px-4 py-2 rounded-lg font-medium transition-colors {TodoContext.filter === 'all'
      ? 'bg-blue-500 text-white'
      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
  >
    전체
  </button>
  <button
    onclick={() => TodoContext.setFilter("active")}
    class="px-4 py-2 rounded-lg font-medium transition-colors {TodoContext.filter ===
    'active'
      ? 'bg-blue-500 text-white'
      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
  >
    진행중
  </button>
  <button
    onclick={() => TodoContext.setFilter("completed")}
    class="px-4 py-2 rounded-lg font-medium transition-colors {TodoContext.filter ===
    'completed'
      ? 'bg-blue-500 text-white'
      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
  >
    완료
  </button>
  <button
    onclick={() => TodoContext.clearCompleted()}
    class="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
  >
    완료된 항목 삭제
  </button>
</div>

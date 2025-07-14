<script>
  import { getTodoStore } from "../providers/todo/todo-store.svelte";

  const { addTodo } = getTodoStore();

  let title = $state("");
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      title = "";
    }
  }}
  class="mb-6"
>
  <div class="flex gap-2">
    <input
      type="text"
      bind:value={title}
      placeholder="새로운 할 일을 입력하세요..."
      class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <button
      type="submit"
      class="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      추가
    </button>
  </div>
</form>

<script>
  import { getTodoStore } from "../providers/todo/todo-store.svelte";

  const TodoContext = getTodoStore();
  
</script>

<div class="flex items-center gap-2 mb-4">
  <input
    type="text"
    placeholder="Search..."
    class="w-full p-2 border border-gray-300 rounded"
    bind:value={TodoContext.searchQuery}
  />
</div>

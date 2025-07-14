<script>
  import { getTodoStore } from "../providers/todo/todo-store.svelte";

  let { todo, editId, handleEdit, handleEditCancel } = $props();

  const { toggleTodo, editTodo, deleteTodo } = getTodoStore();

  let editTitle = $state("");
</script>

<li class="p-4 transition-colors">
  <div class="flex items-center gap-3">
    <input
      type="checkbox"
      checked={todo.completed}
      onchange={() => toggleTodo(todo.id)}
      class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
    />
    <div class="flex-1 flex items-center gap-2">
      {#if editId === todo.id}
        <div class="flex gap-2 flex-1">
          <input
            type="text"
            bind:value={editTitle}
            onblur={() => {
              editTodo(todo.id, editTitle);
              handleEditCancel();
            }}
            onkeydown={(e) => {
              if (e.key === "Enter") {
                editTodo(todo.id, editTitle);
                handleEditCancel();
              }
              if (e.key === "Escape") {
                handleEditCancel();
              }
            }}
            class="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {@attach (node) => {
              node.focus();
              editTitle = todo.title;
            }}
          />
          <button
            onclick={() => {
              editTodo(todo.id, editTitle);
              handleEditCancel();
            }}
            class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            저장
          </button>
        </div>
      {:else}
        <p
          ondblclick={() => handleEdit(todo.id)}
          class="cursor-pointer flex-1 {todo.completed
            ? 'line-through text-gray-500'
            : 'text-gray-800'} hover:text-blue-600 transition-colors"
        >
          {todo.title}
        </p>
      {/if}
      <!-- 삭제 버튼 -->
      <button
        onclick={() => deleteTodo(todo.id)}
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        삭제
      </button>
    </div>
  </div>
</li>

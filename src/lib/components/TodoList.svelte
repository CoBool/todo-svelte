<script>
  import { tick } from "svelte";
  import { sortable } from "../actions/sortable.svelte";
  import { getTodoStore } from "../providers/todo/todo-store.svelte";

  import TodoItem from "./TodoItem.svelte";

  const TodoContext = getTodoStore();
  const filterText = $derived(
    TodoContext.filter === "all"
      ? "전체"
      : TodoContext.filter === "active"
        ? "진행중인"
        : "완료된"
  );

  let editId = $state(null);

  function handleEdit(id) {
    editId = id;
  }

  function handleEditCancel() {
    editId = null;
  }

  let sortableOptions = {
    forceFallback: true,
    ghostClass: "opacity-50",
    filter: "input,button", // input, button에서는 드래그 불가
    animation: 150,
    onEnd: (evt) => {
      TodoContext.reorderTodos(
        evt.oldIndex,
        evt.newIndex,
        TodoContext.filteredTodos
      );
    },
  };

  
</script>

{#if TodoContext.todos.length !== 0}
  {#if TodoContext.filteredTodos.length !== 0}
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <ul class="divide-y divide-gray-200" use:sortable={sortableOptions}>
        {#each TodoContext.filteredTodos as todo (todo.id)}
          <TodoItem {todo} {editId} {handleEdit} {handleEditCancel} />
        {/each}
      </ul>
    </div>
  {:else}
    <div
      class="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <p class="text-gray-500 text-lg">{filterText} 일이 없습니다.</p>
      <p class="text-gray-400 text-sm mt-2">필터를 변경해보세요!</p>
    </div>
  {/if}
{:else}
  <div
    class="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200"
  >
    <div class="text-gray-400 text-6xl mb-4">👀</div>
    <p class="text-gray-500 text-lg">할 일이 없습니다.</p>
    <p class="text-gray-400 text-sm mt-2">새로운 할 일을 추가해보세요!</p>
  </div>
{/if}

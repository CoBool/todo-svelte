<script>
  import { DndContext } from "@dnd-kit-svelte/core";
  import { SortableContext, arrayMove } from "@dnd-kit-svelte/sortable";

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

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = TodoContext.todos.findIndex(
      (item) => item.id === active.id
    );
    const newIndex = TodoContext.todos.findIndex((item) => item.id === over.id);
    TodoContext.reorderTodos(arrayMove(TodoContext.todos, oldIndex, newIndex));
  }
</script>

{#if TodoContext.todos.length !== 0}
  {#if TodoContext.filteredTodos.length !== 0}
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={TodoContext.filteredTodos}>
          <ul class="divide-y divide-gray-200">
            {#each TodoContext.filteredTodos as todo (todo.id)}
              <TodoItem {todo} {editId} {handleEdit} {handleEditCancel} />
            {/each}
          </ul>
        </SortableContext>
      </DndContext>
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

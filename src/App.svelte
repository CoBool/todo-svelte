<script>
  import Tasks from './Tasks.svelte'
  import Todo from "./lib/components/Todo.svelte";

  let items = $state([
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
  ]);

  import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
  } from "@dnd-kit-svelte/core";

  const sensors = useSensors(useSensor(PointerSensor));

  import { crossfade } from "svelte/transition";

  let activeId = $state(null);

  const activeTodo = $derived(items.find((item) => item.id === activeId));

  function handleDragStart(event) {
    activeId = event.active.id;
  }

  function handleDragOver(event) {
    console.log(event);
  }

  function handleDragEnd(event) {
    activeId = null;
  }

  import { SortableContext, arrayMove } from "@dnd-kit-svelte/sortable";

  const [send, recieve] = crossfade({ duration: 100 });
</script>

<main class="min-h-screen bg-gray-50 py-8">
  <Todo />
  <div class="p-4">
    <h1 class="text-2xl font-bold">Sortable 드래그 테스트 하는 영역</h1>
    <div class="flex flex-col gap-4">
      <DndContext
        {sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={items}>
          {#each items as item (item.id)}
            <div in:recieve={{key: item.id}} out:send={{key: item.id}}>
              <Tasks {item} />
            </div>
          {/each}
        </SortableContext>

        <DragOverlay>
          {#if activeTodo && activeId}
            <Tasks item={activeTodo} />
          {/if}
        </DragOverlay>
      </DndContext>
    </div>
  </div>
</main>

<style>
</style>

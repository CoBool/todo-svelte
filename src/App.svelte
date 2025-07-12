<script>
  import { draggable, droppable } from '@thisux/sveltednd';

  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { TodoProvider } from "./lib/providers/todo";
  import { getTodoStore } from "./lib/providers/todo/todo-store.svelte";

  let title = $state('');
  let editId = $state(null);
  let editTitle = $state('');

  function handleDrop(state) {
    console.log(state);
    const { draggedItem, targetContainer } = state;

  }
</script>

<main class="min-h-screen bg-gray-50 py-8">
  <TodoProvider>
    {@const { filteredTodos, addTodo, editTodo, deleteTodo, toggleTodo, filter, setFilter, clearCompleted } = getTodoStore()}
    
    <div class="max-w-2xl mx-auto px-4">
      <!-- 헤더 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
        <p class="text-gray-600">간단하고 효율적인 할 일 관리</p>
      </div>

      <!-- 입력 폼 -->
      <form 
        onsubmit={(e) => { 
          e.preventDefault();
          if (title.trim()) {
            addTodo(title);
            title = '';
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

      <!-- 필터 버튼들 -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button 
          onclick={() => setFilter('all')}
          class="px-4 py-2 rounded-lg font-medium transition-colors {filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
        >
          전체
        </button>
        <button 
          onclick={() => setFilter('active')}
          class="px-4 py-2 rounded-lg font-medium transition-colors {filter === 'active' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
        >
          진행중
        </button>
        <button 
          onclick={() => setFilter('completed')}
          class="px-4 py-2 rounded-lg font-medium transition-colors {filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
        >
          완료
        </button>
        <button 
          onclick={() => clearCompleted()}
          class="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          완료된 항목 삭제
        </button>
      </div>

      <!-- Todo 목록 -->
      {#if filteredTodos.length !== 0}
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ul class="divide-y divide-gray-200">
            {#each filteredTodos as todo (todo.id)}
              <li 
                in:fly={{ y: 200, duration: 400 }}
                out:fade={{ duration: 200 }}
                animate:flip
                use:draggable={
                  {
                    container: 'ul',
                    dragData: todo,
                  }
                }
                use:droppable={
                  {
                    container: 'ul',
                    callbacks: {
                      onDrop: handleDrop,
                    },
                  }
                }
                class="p-4 transition-colors svelte-dnd-touch-feedback"
              >
                <div class="flex items-center gap-3">
                  <!-- 체크박스 -->
                  <input 
                    type="checkbox" 
                    checked={todo.completed}
                    onchange={() => toggleTodo(todo.id)}
                    class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  
                  <!-- Todo 내용 -->
                  <div class="flex-1">
                    {#if editId === todo.id}
                      <div class="flex gap-2">
                        <input 
                          type="text" 
                          bind:value={editTitle} 
                          onblur={() => {
                            editId = null;
                            editTodo(todo.id, editTitle);
                            editTitle = '';
                          }}
                          onkeydown={(e) => {
                            if (e.key === 'Enter') {
                              editId = null;
                              editTodo(todo.id, editTitle);
                              editTitle = '';
                            }
                            if (e.key === 'Escape') {
                              editId = null;
                              editTitle = '';
                            }
                          }}
                          {@attach node => node.focus()}
                          class="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                          onclick={() => {
                            editId = null;
                            editTodo(todo.id, editTitle);
                          }}
                          class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                          저장
                        </button>
                      </div>
                    {:else}
                      <p 
                        ondblclick={() => {
                          editId = todo.id;
                          editTitle = todo.title;
                        }}
                        class="cursor-pointer {todo.completed ? 'line-through text-gray-500' : 'text-gray-800'} hover:text-blue-600 transition-colors"
                      >
                        {todo.title}
                      </p>
                    {/if}
                  </div>
                  
                  <!-- 삭제 버튼 -->
                  <button 
                    onclick={() => deleteTodo(todo.id)}
                    class="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {:else}
        <div class="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="text-gray-400 text-6xl mb-4">👀</div>
          <p class="text-gray-500 text-lg">할 일이 없습니다.</p>
          <p class="text-gray-400 text-sm mt-2">새로운 할 일을 추가해보세요!</p>
        </div>
      {/if}
    </div>
  </TodoProvider>
</main>

<style>
	
</style>
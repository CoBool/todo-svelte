<script>
  import { TodoProvider } from "../providers/todo";

  import TodoForm from "./TodoForm.svelte";
  import TodoFilterGroup from "./TodoFilterGroup.svelte";
  import TodoList from "./TodoList.svelte";
</script>

<TodoProvider>
  <div class="max-w-2xl mx-auto px-4">
    <!-- 헤더 -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
      <p class="text-gray-600">간단하고 효율적인 할 일 관리</p>
    </div>

    <!-- 입력 폼 -->
    <TodoForm />

    <!-- 필터 버튼들 -->
    <TodoFilterGroup />

    <!-- Todo 목록 -->
    <TodoList />
  </div>
</TodoProvider>

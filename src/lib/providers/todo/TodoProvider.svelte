<script>
    import { setContext } from "svelte";
    import { TODO_STORE, createTodoStore } from "./todo-store.svelte";

    let store = createTodoStore();
    setContext(TODO_STORE, store);

    let { children } = $props();
</script>

{@render children()}
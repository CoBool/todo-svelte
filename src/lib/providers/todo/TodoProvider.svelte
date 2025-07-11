<script>
    import { setContext } from "svelte";
    import { TODO_STORE, createTodoStore } from "./todo-store.svelte";

    let { children } = $props();

    let store = createTodoStore();

    setContext(TODO_STORE, store);
</script>

{@render children()}
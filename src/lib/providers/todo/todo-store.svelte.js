export const TODO_STORE = Symbol("TODO_STORE");

export function createTodoStore() {
    let todos = $state([]);
    let filter = $state("all");

    let filteredTodos = $derived.by(() => {
        switch (filter) {
            case 'active': return todos.filter(todo => !todo.completed);
            case 'completed': return todos.filter(todo => todo.completed);
            default: return todos;
        }
    });

    let completedCount = $derived(todos.filter(todo => todo.completed).length);

    function addTodo(title) {
        if (!title.trim()) return;

        todos.push({
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false
        })
    }

    function toggleTodo(id) {
        const todo = todos.find(todo => todo.id === id);
        if (todo) todo.completed = !todo.completed;
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
    }

    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
    }

    function setFilter(newFilter) {
        filter = newFilter;
    }

    return {
        get todos() { return todos; },
        get filter() { return filter; },
        get filteredTodos() { return filteredTodos; },
        get completedCount() { return completedCount; },

        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        setFilter,
    }
}
<script>
  import { CSS, styleObjectToString } from "@dnd-kit-svelte/utilities";
  import { useSortable } from "@dnd-kit-svelte/sortable";

  let { item } = $props();

  const {
    attributes,
    listeners,
    node,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({
    id: item.id,
  });

  const style = $derived(
    styleObjectToString({
      transform: CSS.Transform.toString(transform.current),
      transition: isSorting.current ? transition.current : undefined,
      zIndex: isDragging.current ? 1 : undefined,
    })
  );
</script>

<div bind:this={node.current} {...attributes.current} {...listeners.current} {style}>
  {item.title}
</div>

<script lang="ts">
    import { onMount } from "svelte";

    let { key }: { key: string } = $props();

    let visitors: number | null = $state(null);

    onMount(() => {
        let eventSource = new EventSource(`https://api.paperbark.horse/visitors/live?key=${key}`);

        eventSource.addEventListener("message", (event) => {
            let data = JSON.parse(event.data);

            if (data.event === "visitors-update") {
                visitors = data.active?.visitors ?? null;
            }
        });
    });
</script>

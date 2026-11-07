<script lang="ts">
    import { on } from "svelte/events";

    const poem = ["In the ancient glade", "The quiet shade", "Across old bark", "It's always dark"];

    let lines: string[] = $state([]);
    let el: HTMLElement;

    $effect(() => {
        let observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    observe();
                }
            },
            {
                root: null,
                rootMargin: "10px",
            },
        );

        observer.observe(el);

        let visibilityChangeOff = on(document, "visibilitychange", (event) => {
            if (document.visibilityState === "visible") {
                observe();
            }
        });

        return () => {
            observer.disconnect();
            visibilityChangeOff();
        };
    });

    function observe() {
        let linesRemaining = poem.map((line) => line);
        lines = [];

        while (linesRemaining.length > 0) {
            let index = Math.floor(Math.random() * linesRemaining.length);
            lines.push(linesRemaining[index]);
            linesRemaining.splice(index, 1);
        }
    }
</script>

<div bind:this={el}>
    {#each lines as line}
        <div>{line}</div>
    {/each}
</div>

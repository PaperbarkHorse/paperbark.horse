<script lang="ts">
    const poem = ["In the ancient glade", "The quiet shade", "Across old bark", "It's always dark"];

    let lines: string[] = $state([]);
    let el: HTMLElement;

    $effect(() => {
        let observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let linesRemaining = poem.map((line) => line);
                    lines = [];

                    while (linesRemaining.length > 0) {
                        let index = Math.floor(Math.random() * linesRemaining.length);
                        lines.push(linesRemaining[index]);
                        linesRemaining.splice(index, 1);
                    }
                }
            },
            {
                root: null,
                rootMargin: "10px",
            },
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    });
</script>

<div bind:this={el}>
    {#each lines as line}
        <div>{line}</div>
    {/each}
</div>

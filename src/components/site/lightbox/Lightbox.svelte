<script lang="ts">
    import { onMount } from "svelte";

    let open = $state(false);
    let images: string[] | undefined = $state();
    let selectedIndex = $state(0);

    function show(selectedEl: Element) {
        images = [];
        selectedIndex = 0;

        let group = selectedEl.getAttribute("data-lightbox") ?? "default";

        for (let containerEl of document.querySelectorAll(`[data-lightbox="${group}"]`)) {
            let imageEl = containerEl.querySelector("img");
            if (!imageEl) continue;

            images.push(imageEl.src);

            if (containerEl === selectedEl) {
                selectedIndex = images.length - 1;
            }
        }

        open = true;
    }

    function hide() {
        open = false;
        images = undefined;
    }

    function prevImage() {
        if (!open || images === undefined) return;

        selectedIndex--;

        if (selectedIndex < 0) {
            selectedIndex = images.length - 1;
        }
    }

    function nextImage() {
        if (!open || images === undefined) return;

        selectedIndex++;

        if (selectedIndex >= images.length) {
            selectedIndex = 0;
        }
    }

    onMount(() => {
        for (let containerEl of document.querySelectorAll("[data-lightbox]")) {
            let imageEl = containerEl.querySelector("img");
            if (!imageEl) continue;

            containerEl.addEventListener("click", () => {
                show(containerEl);
            });
        }
    });
</script>

{#if open && images !== undefined}
    <div class="lightbox">
        <div class="main-image">
            <img src={images[selectedIndex]} alt="" />
        </div>
        <div class="titlebar">
            <button class="close-button" onclick={() => hide()}>X</button>
        </div>
        {#if images.length > 1}
            <button class="prev-button" onclick={() => prevImage()}>&lt;</button>
            <button class="next-button" onclick={() => nextImage()}>&gt;</button>
        {/if}
        <div class="thumbnails">
            <div class="thumbnail-items">
                {#each images as image, index}
                    <button
                        class={["thumbnail", { selected: index === selectedIndex }]}
                        onclick={() => (selectedIndex = index)}
                    >
                        <img src={image} alt="" />
                    </button>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    :global(body:has(.lightbox)) {
        overflow: hidden;
        scrollbar-gutter: stable;
    }

    .lightbox {
        position: fixed;
        inset: 0;

        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "titlebar titlebar titlebar"
            "prev image next"
            "thumbnails thumbnails thumbnails";

        gap: 1rem;

        background-color: rgb(0, 0, 0, 70%);
        backdrop-filter: blur(5px);

        z-index: 1000;
    }

    .titlebar {
        grid-area: titlebar;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .prev-button {
        grid-area: prev;
    }

    .next-button {
        grid-area: next;
    }

    .prev-button,
    .next-button {
        height: 100%;
        max-height: 15rem;
        align-self: center;

        padding: 0.5rem;

        background-color: rgb(255, 255, 255, 5%);

        font-size: 2rem;
        color: white;

        &:hover {
            background-color: rgb(255, 255, 255, 20%);
        }
    }

    .close-button {
        padding: 0.5rem;

        background-color: rgb(255, 255, 255, 5%);

        font-size: 1rem;
        color: white;

        &:hover {
            background-color: rgb(255, 255, 255, 20%);
        }
    }

    .thumbnails {
        grid-area: thumbnails;

        display: flex;
        flex-direction: row;

        overflow-x: auto;

        .thumbnail-items {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-grow: 1;
        }

        .thumbnail {
            padding: 0.2rem;

            &.selected {
                background-color: rgb(255, 255, 255, 30%);
            }

            img {
                width: 5rem;
                aspect-ratio: 1/1;
                object-fit: contain;
            }
        }
    }

    .main-image {
        grid-area: image;

        display: flex;
        flex-direction: column;

        width: 100%;
        height: 100%;

        overflow: hidden;

        img {
            width: 100%;
            height: 100%;

            object-fit: contain;
        }
    }
</style>

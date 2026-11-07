<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import TaglineSpecialAncientGlade from "./TaglineSpecialAncientGlade.svelte";

    let { tagline }: { tagline: CollectionEntry<"tagline"> } = $props();
</script>

<a href={tagline.data.href} target="_blank" rel="noopener noreferrer">
    <div class="tagline-sticky-note theme-sticky-note">
        <div class="tagline-sticky-note-background"></div>
        <div class="tagline-sticky-note-content">
            {#if tagline.data.type === "text"}
                <div class="tagline-text">{@html tagline.data.text}</div>
            {/if}
            {#if tagline.data.type === "quote"}
                <div class="tagline-text">&ldquo;{@html tagline.data.text}&rdquo;</div>
            {/if}
            {#if tagline.data.type === "song"}
                <div class="tagline-text">&#9835;&nbsp;{@html tagline.data.text}&nbsp;&#9835;</div>
            {/if}
            {#if tagline.data.type === "special-ancient-glade"}
                <div class="tagline-text">
                    <TaglineSpecialAncientGlade />
                </div>
            {/if}
        </div>
    </div>
</a>

<style lang="scss">
    .tagline-text {
        max-width: 34ch;

        padding: 1.2rem 2.5rem;

        font-weight: var(--font-medium);
        text-align: center;
        text-wrap: balance;
        line-height: 1.25;
    }

    .tagline-sticky-note {
        --sticky-note-fold-size: 1.2rem;
        --sticky-note-corner-radius: 0.2rem;

        position: relative;

        filter: var(--filter-shadow-medium);
    }

    .tagline-sticky-note-background {
        position: absolute;
        inset: 0;

        border-radius: var(--sticky-note-corner-radius);

        background-image: var(--sticky-note-yellow-gradient);
        color: var(--text-black);

        clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - var(--sticky-note-fold-size)),
            calc(100% - var(--sticky-note-fold-size)) 100%,
            0 100%
        );
        z-index: -1;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            width: var(--sticky-note-fold-size);
            height: var(--sticky-note-fold-size);

            border-top-left-radius: var(--sticky-note-corner-radius);

            background-color: #00000012;
        }
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            width: var(--sticky-note-fold-size);
            height: var(--sticky-note-fold-size);

            border-top-left-radius: var(--sticky-note-corner-radius);

            background-color: rgba(0, 0, 0, 0.08);
        }
    }
</style>

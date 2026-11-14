<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import Tagline from "./Tagline.svelte";
    import { onMount } from "svelte";

    let { taglines }: { taglines: CollectionEntry<"tagline">[] } = $props();

    let tagline: CollectionEntry<"tagline"> | undefined = $state();

    onMount(() => {
        const params = new URLSearchParams(location.search);
        let seenTaglines: string[] = [];

        let forceTaglineId = params.get("tagline");
        if (forceTaglineId) {
            tagline = taglines.find((tagline) => tagline.id === forceTaglineId);
            return;
        }

        try {
            let seenData = localStorage.getItem("taglines-seen");

            if (seenData) {
                seenTaglines = JSON.parse(seenData);
            }
        } catch (err) {
            console.error(err);
        }

        let pickableTaglines = taglines.filter((tagline) => !tagline.data.festive);

        // if (site.isFestive() && Math.random() < 0.75) {
        //     pickableTaglines = taglines.filter((tagline) => tagline.data.festive);
        // }

        let unseenTaglines = pickableTaglines.filter((tagline) => !seenTaglines.includes(tagline.id));

        if (seenTaglines.length >= unseenTaglines.length) {
            seenTaglines = [];
            unseenTaglines = pickableTaglines;
        }
        while (seenTaglines.length >= 50) {
            seenTaglines.shift();
        }

        if (unseenTaglines.length > 0) {
            tagline = unseenTaglines[Math.floor(Math.random() * unseenTaglines.length)];

            seenTaglines.push(tagline.id);
            localStorage.setItem("taglines-seen", JSON.stringify(seenTaglines));
        }
    });
</script>

{#if tagline}
    <Tagline {tagline} />
{/if}

<!-- <script lang="ts">
    import Tagline from "./Tagline.svelte";

    let seenTaglines = [];

    try {
        let seenData = localStorage.getItem("taglines-seen");

        if (seenData) {
            seenTaglines = JSON.parse(seenData);
        }
    } catch (err) {
        console.error(err);
    }

    function refreshTagline() {
        const params = new URLSearchParams(location.search);

        if (seenTaglines.length >= taglines.length) {
            seenTaglines = [];
        }
        while (seenTaglines.length >= 50) {
            seenTaglines.shift();
        }

        let forcedMode = taglines.some((tagline) => tagline.data.force);
        let pickableTaglines = taglines.filter((tagline) =>
            forcedMode ? tagline.data.force : !seenTaglines.includes(tagline.id),
        );

        let tagline = pickableTaglines[Math.floor(Math.random() * pickableTaglines.length)];
        setTagline(tagline);

        seenTaglines.push(tagline.id);
        localStorage.setItem("taglines-seen", JSON.stringify(seenTaglines));
    }

    function setTagline(tagline) {
        let taglineText = document.getElementById("tagline-text");
        let taglineContainer = document.getElementById("tagline-container");

        if (!taglineText || !taglineContainer) return;

        if (tagline.data.type === "song") {
            taglineText.innerHTML = `&#9835;&nbsp;${tagline.data.text}&nbsp;&#9835;`;
        } else if (tagline.data.type === "quote") {
            taglineText.innerHTML = `&ldquo;${tagline.data.text}&rdquo;`;
        } else {
            taglineText.innerHTML = tagline.data.text;
        }

        if (tagline.data.href) {
            taglineContainer.setAttribute("href", tagline.data.href);
        } else {
            taglineContainer.removeAttribute("href");
        }

        taglineContainer.classList.remove("hidden");
    }

    refreshTagline();
</script> -->

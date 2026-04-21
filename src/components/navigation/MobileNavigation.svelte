<script lang="ts">
    let { children, menuIcon, closeIcon, site }: any = $props();

    let open = $state(false);

    function navContentClick(event: MouseEvent) {
        if (event.target instanceof HTMLAnchorElement && event.target.href) {
            let url = new URL(event.target.href, site);

            if (url.hash) {
                open = false;
            }
        }
    }
</script>

<div class="mobile-navigation" class:open>
    {#if open}
        <div class="nav-overlay">
            <button class="close-button" onclick={() => (open = false)}>
                {@render closeIcon()}
            </button>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <nav class="nav-content" onclick={navContentClick}>
                {@render children()}
            </nav>
        </div>
    {:else}
        <div class="nav-header">
            <button class="menu-button" onclick={() => (open = true)}>
                {@render menuIcon()}
            </button>
        </div>
    {/if}
</div>

<style lang="scss">
    :global(.mobile-navigation svg) {
        width: 2rem;
        height: 2rem;
    }

    .mobile-navigation {
        position: fixed;
        top: 0;
        left: 0;

        z-index: 500;

        .nav-header {
            margin: 0.5rem;
        }

        .nav-overlay {
            position: fixed;
            inset: 0;

            display: flex;
            flex-direction: column;

            padding: 0.5rem;
            gap: 1rem;

            background-color: rgba(0, 0, 0, 0.8);

            overscroll-behavior: contain;
            overflow-y: scroll;

            z-index: 500;
        }

        .nav-content {
            display: flex;
            flex-direction: column;

            gap: 1rem;
        }

        .menu-button,
        .close-button {
            display: flex;
            flex-direction: row;
            align-self: flex-start;

            aspect-ratio: 1;

            padding: 0.5rem;

            border-radius: 0.25rem;

            background-color: var(--paper-white);
            color: var(--text-black);

            box-shadow: var(--shadow-large);
        }
    }

    @media screen and (max-width: 800px) {
        :global(body:has(.mobile-navigation.open)) {
            overflow: hidden;
        }
    }

    @media screen and not (max-width: 800px) {
        .mobile-navigation {
            display: none;
        }
    }
</style>

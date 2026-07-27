<script lang="ts">
    import type { ComponentProps } from "svelte";
    import ActivityPony from "./ActivityPony.svelte";

    let activity: any = $state(null);

    const idleLines = {
        awake: [
            "Chilling",
            "Being a goober",
            "Enjoying life",
            "Living their best life",
            "Away from keyboard",
            "Doing something fun",
            "Enjoying peace and quiet",
        ],
        asleep: [
            "Sleeping peacefully",
            "Having a snooze",
            "Getting some rest",
            "Snuggled in bed",
            "Having nice dreams",
            "Catching Zzz's",
        ],
        morning: ["Waking up", "Crawling out of bed", "Fighting bed gravity"],
        evening: ["Getting a little sleepy", "All tuckered out", "Ready for bed", "Getting pretty tired"],
    };

    let wakeSate: "awake" | "asleep" | "morning" | "evening" = $derived.by(() => {
        let hour = new Date().getUTCHours();

        if (hour >= 1 && hour < 3) {
            return "evening";
        }
        if (hour >= 3 && hour < 11) {
            return "asleep";
        }
        if (hour >= 11 && hour < 13) {
            return "morning";
        }

        return "awake";
    });

    let activityName = $derived.by(() => {
        if (activity?.type === "music") {
            return "Listening to music";
        }

        let lines = idleLines[wakeSate] ?? ["Away from keyboard"];
        return lines[Math.floor(Math.random() * lines.length)];
    });

    let animation: ComponentProps<typeof ActivityPony>["animation"] = $derived.by(() => {
        if (activity?.type === "music") {
            return "sit-dance";
        }

        if (wakeSate === "asleep") {
            return "sleep";
        }
        if (wakeSate === "morning") {
            return "groggy";
        }
        if (wakeSate === "evening") {
            return "eepy";
        }

        return "sit";
    });
</script>

<div class="activity">
    <div class="details">
        <div class="detail-header">
            <h2 class="title">Paperbark is currently...</h2>
            <span class="activity-name">{activityName}</span>
        </div>
        {#if !activity}
            <div class="offline-info">
                I'm offline right now. Check back later when I'm doing something more interesting!
            </div>
        {/if}
        {#if activity?.type === "music"}
            <div class="music-playback">
                <img
                    src="https://lastfm.freetls.fastly.net/i/u/770x0/f9729c85a26975ec348c96d4dd234621.jpg#f9729c85a26975ec348c96d4dd234621"
                    alt=""
                    class="cover-image"
                />
                <div class="music-info">
                    <div class="music-details">
                        <span class="music-title">Bart Trip</span>
                        <span class="music-artist">Vylet Pony</span>
                        <!-- <span class="music-album"></span> -->
                    </div>
                    <div class="music-progress">
                        <div class="music-progress-bar"></div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <div class="activity-pony">
        <ActivityPony {animation} />
    </div>
</div>

<style lang="scss">
    .activity {
        display: grid;
        grid-template-columns: 1fr 10rem;
        grid-template-areas: "details pony";

        gap: 1rem;
    }

    .details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        grid-area: details;

        gap: 1.5rem;

        line-height: 1.1;

        .detail-header {
            display: flex;
            flex-direction: column;

            gap: 0.2rem;
        }

        .title {
            font-weight: var(--font-medium);
        }

        .activity-name {
            font-size: 1.75rem;
            font-weight: var(--font-semibold);
        }
    }

    .activity-pony {
        width: 100%;
    }

    .offline-info {
        line-height: 1.25;
    }

    .music-playback {
        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 0.5rem;

        .music-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;

            gap: 0.5rem;

            .music-details {
                display: flex;
                flex-direction: column;

                gap: 0.2rem;
            }

            .music-title {
                font-weight: var(--font-semibold);
            }
        }

        .cover-image {
            width: 5rem;
            aspect-ratio: 1 / 1;

            border-radius: 0.25rem;

            object-fit: cover;
        }

        .music-progress {
            height: 0.4rem;

            border-radius: 100rem;

            background-color: hsl(213, 50%, 90%);

            overflow: hidden;

            .music-progress-bar {
                width: 30%;
                height: 100%;

                background-color: hsl(213, 83%, 57%);
            }
        }
    }

    .activity-pony {
        grid-area: pony;
    }

    @container (width < 550px) {
        .activity {
            grid-template-columns: 1fr;
            grid-template-areas:
                "details"
                "pony";
        }

        .details {
            gap: 1rem;
        }

        .activity-pony {
            max-width: min(10rem, 60cqw);
            justify-self: center;
        }
    }
</style>

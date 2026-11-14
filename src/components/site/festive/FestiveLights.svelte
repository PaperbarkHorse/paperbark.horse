<script lang="ts">
    let lights: number[] = $state([0, 0, 0, 0, 0]);

    let lastTime = 0;

    $effect(() => {
        const params = new URLSearchParams(location.search);

        let frame = requestAnimationFrame(function render() {
            frame = requestAnimationFrame(render);
            let now = Date.now() / 1000;

            if (lastTime === -1) lastTime = now;

            let delta = now - lastTime;
            lastTime = now;

            if (delta === 0 || delta >= 1) return;

            let tick = Math.floor(now * 6);
            let program = Math.floor(now / 6) % 4;

            if (params.has("light-program")) {
                program = parseInt(params.get("light-program")!);
            }

            if (program === 0) {
                // Chase
                lights[tick % lights.length] = 1;
            }
            if (program === 1) {
                // In and out
                if (tick % 8 === 0) {
                    lights[2] = 1;
                }
                if (tick % 8 === 2) {
                    lights[1] = 1;
                    lights[3] = 1;
                }
                if (tick % 8 === 4) {
                    lights[0] = 1;
                    lights[4] = 1;
                }
                if (tick % 8 === 6) {
                    lights[1] = 1;
                    lights[3] = 1;
                }
            }
            // if (program === 2) {
            //     // Fill and clear
            //     if (tick % 7 === 0) {
            //         lights[2] = 1;
            //     }
            //     if (tick % 7 === 1) {
            //         lights[2] = 1;
            //         lights[3] = 1;
            //     }
            //     if (tick % 7 === 2) {
            //         lights[2] = 1;
            //         lights[3] = 1;
            //         lights[4] = 1;
            //     }
            //     if (tick % 7 === 3) {
            //         lights[2] = 1;
            //         lights[3] = 1;
            //         lights[4] = 1;
            //         lights[0] = 1;
            //     }
            //     if (tick % 7 === 4) {
            //         lights[2] = 1;
            //         lights[3] = 1;
            //         lights[4] = 1;
            //         lights[0] = 1;
            //         lights[1] = 1;
            //     }
            // }
            if (program === 2) {
                // Oscillate
                if (tick % 8 === 0) {
                    lights[0] = 1;
                }
                if (tick % 8 === 1) {
                    lights[1] = 1;
                }
                if (tick % 8 === 2) {
                    lights[2] = 1;
                }
                if (tick % 8 === 3) {
                    lights[3] = 1;
                }
                if (tick % 8 === 4) {
                    lights[4] = 1;
                }
                if (tick % 8 === 5) {
                    lights[3] = 1;
                }
                if (tick % 8 === 6) {
                    lights[2] = 1;
                }
                if (tick % 8 === 7) {
                    lights[1] = 1;
                }
            }
            if (program === 3) {
                // Shimmer
                for (let i = 0; i < lights.length; i++) {
                    lights[i] = Math.max(lights[i], Math.sin((now + i * 0.4) * Math.PI * 2) + 0.7);
                }
            }

            for (let i = 0; i < lights.length; i++) {
                lights[i] = Math.min(Math.max(lights[i] - delta * 4, 0), 1);
            }
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    });
</script>

<div class="festive-lights">
    <div class="base"></div>
    <div class="glow" style:--light={lights[0]}></div>
    <div class="glow" style:--light={lights[1]}></div>
    <div class="glow" style:--light={lights[2]}></div>
    <div class="glow" style:--light={lights[3]}></div>
    <div class="glow" style:--light={lights[4]}></div>
</div>
<div class="spacer"></div>

<style lang="scss">
    .festive-lights {
        position: absolute;
        top: -0.2rem;
        left: 0;
        right: 0;
        height: 6rem;
        z-index: 100;

        .base,
        .glow {
            position: absolute;
            inset: 0;

            background-size: auto 100%;
            background-position: 50% 0%;
        }

        .glow {
            opacity: var(--light, 0);
        }

        .base {
            background-image: url("/images/festive/lights-base.png");
            filter: brightness(75%) saturate(80%);
        }

        .glow:nth-child(2) {
            background-image: url("/images/festive/lights-glow-red.png");
        }
        .glow:nth-child(3) {
            background-image: url("/images/festive/lights-glow-yellow.png");
        }
        .glow:nth-child(4) {
            background-image: url("/images/festive/lights-glow-green.png");
        }
        .glow:nth-child(5) {
            background-image: url("/images/festive/lights-glow-blue.png");
        }
        .glow:nth-child(6) {
            background-image: url("/images/festive/lights-glow-purple.png");
        }

        @media screen and (prefers-reduced-motion: reduce) {
            .glow {
                opacity: 1;
            }
        }
    }

    .spacer {
        padding-top: 3rem;
    }

    @media screen and (max-width: 650px) {
        .festive-lights {
            height: 18.5vw;

            .base,
            .glow {
                background-position: calc(18.5vw * (960 / 169) * 0.5 + 50%) 0%;
            }
        }

        .spacer {
            padding-top: 5vw;
        }
    }
</style>

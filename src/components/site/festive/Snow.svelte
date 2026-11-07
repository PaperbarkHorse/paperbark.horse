<script lang="ts">
    type Particle = {
        i: number;
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        persistent: boolean;
        destroyed: boolean;
    };

    let canvas: HTMLCanvasElement;

    let lastTime = -1;

    let particleCount = 0;
    let particles: Particle[] = [];

    let margin = 50;

    let pointerX = 0;
    let pointerXLast = 0;
    let pointerY = 0;
    let pointerYLast = 0;

    $effect(() => {
        init();

        let ctx = canvas.getContext("2d")!;

        let frame = requestAnimationFrame(function render(now) {
            frame = requestAnimationFrame(render);
            now /= 1000;

            if (lastTime === -1) lastTime = now;

            let delta = now - lastTime;
            lastTime = now;

            let width = canvas.width;
            let height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            let pointerMoved = pointerX !== pointerXLast || pointerY !== pointerYLast;
            let pointerVx = 0;
            let pointerVy = 0;

            if (delta > 0) {
                pointerVx = (pointerX - pointerXLast) / delta;
                pointerVy = (pointerY - pointerYLast) / delta;
            }

            for (let particle of particles) {
                let vx = 0;
                let vy = 0;

                vx += Math.sin(particle.y / 400 + now) * 50;
                vx += Math.sin(particle.i + now * 2) * 50;

                vy += 80 * particle.size + 40;
                vy += Math.sin(particle.i + now) * 20;

                if (pointerMoved) {
                    let pointerDistance = Math.sqrt(
                        Math.pow(particle.x - pointerX, 2) + Math.pow(particle.y - pointerY, 2),
                    );
                    let force = clamp(1 - pointerDistance / 150, 0, 1) * delta;

                    particle.vx += clamp(pointerVx * force, -50, 50);
                    particle.vy += clamp(pointerVy * force, -50, 50);
                }

                particle.vx *= 0.98;
                particle.vy *= 0.98;

                particle.x += (vx + particle.vx) * delta;
                particle.y += (vy + particle.vy) * delta;

                if (particle.y > height + margin) {
                    particle.y -= height + margin * 2;
                    particle.x = Math.random() * (canvas.width + margin * 2) - margin;

                    if (!particle.persistent) particle.destroyed = true;
                }
                if (particle.x > width + margin) {
                    particle.x -= width + margin * 2;

                    if (!particle.persistent) particle.destroyed = true;
                }
                if (particle.x < -margin) {
                    particle.x += width + margin * 2;

                    if (!particle.persistent) particle.destroyed = true;
                }
            }

            for (let particle of particles) {
                let radius = particle.size * 2 + 3;
                let alpha = clamp(1 - particle.y / canvas.height, 0, 1);
                alpha *= particle.size * 0.5 + 0.5;
                alpha = clamp(alpha, 0, 1) * 0.7;

                ctx.fillStyle = "#ffffff";
                ctx.globalAlpha = clamp(alpha, 0, 1);
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, radius, 0, 2 * Math.PI, false);
                ctx.fill();
            }

            pointerXLast = pointerX;
            pointerYLast = pointerY;

            particles = particles.filter((p) => !p.destroyed);
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    });

    function init() {
        const params = new URLSearchParams(location.search);

        canvas.width = window.visualViewport?.width ?? window.innerWidth;
        canvas.height = window.visualViewport?.height ?? window.innerHeight;

        let particleDensity = 400;

        if (params.has("blizzard")) {
            particleDensity *= 8;
        }

        particleCount = Math.ceil(((canvas.width * canvas.height) / (1920 * 1080)) * particleDensity);

        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                i,
                x: Math.random() * (canvas.width + margin * 2) - margin,
                y: Math.random() * (canvas.height + margin * 2) - margin,
                vx: 0,
                vy: 0,
                size: Math.pow(Math.random(), 3),
                persistent: true,
                destroyed: false,
            });
        }
    }

    function onPointerMove(event: PointerEvent) {
        pointerX = event.pageX;
        pointerY = event.pageY;
    }

    // function onPointerDown(event: PointerEvent) {
    //     for (let i = 0; i < 4; i++) {
    //         let force = Math.random() * 200;
    //         let theta = Math.random() * Math.PI * 2;
    //         let vx = Math.cos(theta) * force;
    //         let vy = Math.sin(theta) * force - 100;

    //         particles.push({
    //             i: Math.floor(Math.random() * 1000),
    //             x: event.pageX,
    //             y: event.pageY,
    //             vx,
    //             vy,
    //             size: Math.random(),
    //             persistent: false,
    //             destroyed: false,
    //         });
    //     }
    // }

    function clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }
</script>

<svelte:window onresize={() => init()} onpointermove={onPointerMove} />

<canvas class="snow" bind:this={canvas}></canvas>

<style lang="scss">
    .snow {
        position: absolute;
        top: 0;
        width: 100%;

        user-select: none;
        pointer-events: none;
    }
</style>

<template>
    <section class="w-100 ">

        <section class="f f-space-between">

            <div class="about-myself pad-05 w-100 f gap-10 f-col f-wrap">
                <div class="w-100 pad-b--10">
                    <h3 class="text-center">About Myself</h3>
                </div>
                <div class="">
                    <p>I'm <span class="b">Arafat Sarkar</span> </p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed dolorem aliquid saepe nulla
                        necessitatibus, repudiandae minus unde, culpa, eligendi reiciendis quibusdam dolor quo vel
                        dolorum soluta voluptatem veritatis ut. Dignissimos?</p>
                </div>
                <div class="f gap-10">
                    <NuxtLink class="btn btn-primary" to="/contacts">Hire Me !</NuxtLink>
                    <NuxtLink to="/videos" class="btn btn-warning">Explore My Works !</NuxtLink>
                </div>
            </div>
            <div class="f gap-10">
                <NuxtImg class="img" src="images/about.png" />
            </div>
        </section>
        <section class="gear">
            <div class="single-gear ">
                <div class="img-gear">
                    <div class="overlay-gear">Camera</div>
                    <NuxtImg src="images/camera.png" />
                </div>

                <div class="pad--05 border-1 bordered-solid">
                    <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf </p>
                </div>
            </div>
            <div class="single-gear ">
                <div class="img-gear">
                    <div class="overlay-gear">Camera</div>
                    <NuxtImg src="images/camera.png" />
                </div>

                <div class="pad--05 border-1 bordered-solid">
                    <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf </p>
                </div>
            </div>
            <div class="single-gear ">
                <div class="img-gear">
                    <div class="overlay-gear">Camera</div>
                    <NuxtImg src="images/camera.png" />
                </div>

                <div class="pad--05 border-1 bordered-solid">
                    <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf </p>
                </div>
            </div>
            <div class="single-gear ">
                <div class="img-gear">
                    <div class="overlay-gear">Camera</div>
                    <NuxtImg src="images/camera.png" />
                </div>

                <div class="pad--05 border-1 bordered-solid">
                    <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf </p>
                </div>
            </div>
            <div class="single-gear ">
                <div class="img-gear">
                    <div class="overlay-gear">Camera</div>
                    <NuxtImg src="images/camera.png" />
                </div>

                <div class="pad--05 border-1 bordered-solid">
                    <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf </p>
                </div>
            </div>
            <div class="single-gear ">
                <div class="img-gear">
                    <div class="overlay-gear">Camera</div>
                    <NuxtImg src="images/camera.png" />
                </div>

                <div class="pad--05 border-1 bordered-solid">
                    <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf </p>
                </div>
            </div>
            <div class="single-gear ">
                <div class="img-gear">
                    <div class="overlay-gear">Camera</div>
                    <NuxtImg src="images/camera.png" />
                </div>

                <div class="pad--05 border-1 bordered-solid">
                    <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf </p>
                </div>
            </div>
            <div class="single-gear ">
                <div class="img-gear">
                    <div class="overlay-gear">Camera</div>
                    <NuxtImg src="images/camera.png" />
                </div>

                <div class="pad--05 border-1 bordered-solid ">
                    <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf </p>
                </div>
            </div>
        </section>

    </section>
</template>

<style lang="scss">
.about-myself {
    position: relative;
}

.gear {
    width: 90%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    margin: auto;
    position: relative;

    .single-gear {
        position: inherit;
        position: relative;

        .overlay-gear {
            position: absolute;
            padding: 0.2rem 0.5rem;
            right: 0;
            top: 0;
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
            font-size: 0.8rem;
            color: white;
            background-color: green;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;

        }

        .img-gear {
            position:relative;
            border: 1px solid #ccc;
        }
    }

}
</style>
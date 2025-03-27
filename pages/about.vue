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
            <div class="about-image">
                <NuxtImg class="img" src="images/about.png" />
            </div>
        </section>
        <section class="gear">
            <section class="inner-gear">
                <div class="single-gear">
                    <div class="img-gear">
                        <div class="overlay-gear">Camera</div>
                        <NuxtImg src="images/camera.png" />
                    </div>

                    <div class="pad--05 b-Gray-200 b-lrb--01">
                        <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf
                        </p>
                    </div>
                </div>
                <div class="single-gear ">
                    <div class="img-gear">
                        <div class="overlay-gear">Camera</div>
                        <NuxtImg src="images/camera.png" />
                    </div>

                    <div class="pad--05 b-Gray-200 b-lrb--01">
                        <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf
                        </p>
                    </div>
                </div>
                <div class="single-gear ">
                    <div class="img-gear">
                        <div class="overlay-gear">Camera</div>
                        <NuxtImg src="images/camera.png" />
                    </div>

                    <div class="pad--05 b-Gray-200 b-lrb--01">
                        <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf
                        </p>
                    </div>
                </div>
                <div class="single-gear ">
                    <div class="img-gear">
                        <div class="overlay-gear">Camera</div>
                        <NuxtImg src="images/camera.png" />
                    </div>

                    <div class="pad--05 b-Gray-200 b-lrb--01">
                        <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf
                        </p>
                    </div>
                </div>
                <div class="single-gear ">
                    <div class="img-gear">
                        <div class="overlay-gear">Camera</div>
                        <NuxtImg src="images/camera.png" />
                    </div>

                    <div class="pad--05 b-Gray-200 b-lrb--01">
                        <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf
                        </p>
                    </div>
                </div>
                <div class="single-gear ">
                    <div class="img-gear">
                        <div class="overlay-gear">Camera</div>
                        <NuxtImg src="images/camera.png" />
                    </div>

                    <div class="pad--05 b-Gray-200 b-lrb--01">
                        <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf
                        </p>
                    </div>
                </div>
                <div class="single-gear ">
                    <div class="img-gear">
                        <div class="overlay-gear">Camera</div>
                        <NuxtImg src="images/camera.png" />
                    </div>

                    <div class="pad--05 b-Gray-200 b-lrb--01">
                        <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf
                        </p>
                    </div>
                </div>
                <div class="single-gear ">
                    <div class="img-gear">
                        <div class="overlay-gear">Camera</div>
                        <NuxtImg src="images/camera.png" />
                    </div>

                    <div class="pad--05 b-Gray-200 b-lrb--01">
                        <p class="text-dotted-2">This is my description dsafasdfasdf dasfasdfa sfadsf asdf afd asdf adsf
                        </p>
                    </div>
                </div>
            </section>
        </section>

    </section>
</template>

<style lang="scss">
.about-myself {
    position: relative;
}

.about-image {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.gear {
    width: 100%;
    display: flex;
    justify-content: center;

    .inner-gear {
        width: 70%;
        height: auto;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
        position: relative;
        padding: 2rem 0;

        @media screen and (max-width: 1080px) {
            grid-template-columns: repeat(4, 1fr);
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (max-width: 520px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (max-width: 320px) {
            grid-template-columns: repeat(1, 1fr);
        }

        .single-gear {
            position: inherit;
            position: relative;
            z-index: 5;

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
                z-index: 5;
            }

            .img-gear {
                position: relative;
                width: 100%;
                aspect-ratio: 1;
                border: 1px solid #ccc;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 0.3s ease;

                    &:hover {
                        transform: scale(1.1);
                        transition: all 0.3s ease;
                    }

                }
            }
        }
    }
}
</style>
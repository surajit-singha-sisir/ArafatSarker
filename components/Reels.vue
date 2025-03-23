// pages/index.vue or any component
<template>
    <section class="reels">
        <div class="inner-reels res-container">
            <h2 class="text-center m-t-60">Reels</h2>
            <section class="reels-samples">
                <div class="bordered-circle chevron"><i class="m-chevron-left"></i></div>
                <div class="all-reels">
                    <RevealAnimation>
                        <div class="reel-container" data-direction="top">
                            <div class="reel">
                                <div class="title text-dotted-2">
                                    <p class="text-dotted-3">This is a reel title and more information and more</p>
                                </div>
                                <div class="thumbnail">
                                    <NuxtImg class="img h-full fit-cover" src="images/reel.jpg" />
                                </div>
                                <div class="play-icon" title="Play">
                                    <i class="m-play2"></i>
                                </div>
                                <div class="duration">
                                    <i class="m-facebook4"></i>
                                    <p>1 min</p>
                                </div>
                            </div>
                            <div class="reel">
                                <div class="title text-dotted-2">
                                    <p class="text-dotted-3">This is a reel title and more information and more</p>
                                </div>
                                <div class="thumbnail">
                                    <NuxtImg class="img h-full fit-cover" src="images/reel.jpg" />
                                </div>
                                <div class="play-icon" title="Play">
                                    <i class="m-play2"></i>
                                </div>
                                <div class="duration">
                                    <i class="m-facebook4"></i>
                                    <p>1 min</p>
                                </div>
                            </div>
                            <div class="reel">
                                <div class="title text-dotted-2">
                                    <p class="text-dotted-3">This is a reel title and more information and more</p>
                                </div>
                                <div class="thumbnail">
                                    <NuxtImg class="img h-full fit-cover" src="images/reel.jpg" />
                                </div>
                                <div class="play-icon" title="Play">
                                    <i class="m-play2"></i>
                                </div>
                                <div class="duration">
                                    <i class="m-facebook4"></i>
                                    <p>1 min</p>
                                </div>
                            </div>
                            <div class="reel">
                                <div class="title text-dotted-2">
                                    <p class="text-dotted-3">This is a reel title and more information and more</p>
                                </div>
                                <div class="thumbnail">
                                    <NuxtImg class="img h-full fit-cover" src="images/reel.jpg" />
                                </div>
                                <div class="play-icon" title="Play">
                                    <i class="m-play2"></i>
                                </div>
                                <div class="duration">
                                    <i class="m-facebook4"></i>
                                    <p>1 min</p>
                                </div>
                            </div>
                        </div>
                    </RevealAnimation>
                </div>
                <div class="bordered-circle chevron"><i class="m-chevron-right"></i></div>
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>

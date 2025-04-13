<template>
    <section class="reels">
        <div class="inner-reels res-container">
            <h2 class="text-center">Reels</h2>
            <section class="reels-samples">
                <div class="bordered-circle chevron" @click="revealPreviousItem">
                    <i class="m-chevron-left"></i>
                </div>
                <div class="all-reels">
                    <RevealAnimation class="f-center m-auto">
                        <div class="reel-container snap-x" :data-direction="randomDirection()" ref="reelContainer">
                            <div class="reel" v-for="(reel, index) in Reels" :key="index">
                                <div class="category">
                                    <p class="text-dotted-2 text-center">{{ reel.name }} Videos</p>
                                    <NuxtLink :to="`/reels/${reel.name.trim()}`" class="btn btn-primary btn-sm">View all
                                    </NuxtLink>
                                </div>
                                <NuxtImg class="img h-full object-cover"
                                    :src="`${URL}${reel.thumbnail[0] || '/placeholder.jpg'}`" :alt="reel.name"
                                    loading="lazy" />
                            </div>
                        </div>
                    </RevealAnimation>
                </div>
                <div class="bordered-circle chevron" @click="revealNextItem">
                    <i class="m-chevron-right"></i>
                </div>
            </section>

        </div>
    </section>
</template>


<script setup lang="ts">
const randomDirection = () => {
    const directions = ['left', 'right', 'top', 'bottom'];
    return directions[Math.floor(Math.random() * directions.length)];
};

const URL = 'https://arafatsarkar.com';
const reelContainer = ref<HTMLElement | null>(null);

interface FrontReels {
    name: string;
    thumbnail: string[];
}

const { data: Reels } = await useFetch<FrontReels[]>(`${URL}/api/api_category?type=reel`);

const getScrollAmount = () => {
    if (reelContainer.value) {
        const reelWidth = reelContainer.value.querySelector('.reel')?.clientWidth || 0;
        const gap = 16;
        return reelWidth + gap;
    }
    return 0;
};

const revealPreviousItem = () => {
    if (reelContainer.value) {
        const scrollAmount = getScrollAmount();
        reelContainer.value.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth',
        });
    }
};

const revealNextItem = () => {
    if (reelContainer.value) {
        const scrollAmount = getScrollAmount();
        reelContainer.value.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    }
};

</script>
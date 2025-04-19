<template>
    <header class="slider">
        <div class="inner-slider snap-y">
            <div class="video-container">
                <video :class="{ 'active': activeIndex === 0 }" ref="video1"
                    :src="activeIndex === 0 ? `${BASE_URL}${banner?.video1}` : ''" autoplay muted playsinline loop
                    @contextmenu.prevent></video>
                <video :class="{ 'active': activeIndex === 1 }" ref="video2"
                    :src="activeIndex === 1 ? `${BASE_URL}${banner?.video2}` : ''" autoplay muted playsinline loop
                    @contextmenu.prevent></video>
                <video :class="{ 'active': activeIndex === 2 }" ref="video3"
                    :src="activeIndex === 2 ? `${BASE_URL}${banner?.video3}` : ''" autoplay muted playsinline loop
                    @contextmenu.prevent></video>
            </div>
            <div class="dark-bg"></div>

            <div class="cta-values" :class="{ 'active': activeIndex === 0 }">
                <h1>{{ banner?.title1 }}</h1>
                <h2>{{ banner?.subtitle1 }}</h2>
            </div>
            <div class="cta-values" :class="{ 'active': activeIndex === 1 }">
                <h1>{{ banner?.title2 }}</h1>
                <h2>{{ banner?.subtitle2 }}</h2>
            </div>
            <div class="cta-values" :class="{ 'active': activeIndex === 2 }">
                <h1>{{ banner?.title3 }}</h1>
                <h2>{{ banner?.subtitle3 }}</h2>
            </div>

            <div class="slider-action-buttons">
                <div class="inner-action-btns">
                    <div class="boxes">
                        <span class="box" :class="{ 'active': activeIndex === 0 }" @click="handleBoxClick(0)"></span>
                        <span class="box" :class="{ 'active': activeIndex === 1 }" @click="handleBoxClick(1)"></span>
                        <span class="box" :class="{ 'active': activeIndex === 2 }" @click="handleBoxClick(2)"></span>
                    </div>
                    <div class="gredient-line"></div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const BASE_URL = 'https://arafatsarkar.com';

interface Banners {
    id: number;
    video1: string;
    video2: string;
    video3: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle1: string;
    subtitle2: string;
    subtitle3: string;
}

const { data: banner, error } = await useFetch<Banners>(`${BASE_URL}/api/api_banner`, {
    method: 'GET',
});

const activeIndex = ref(0);
const video1 = ref<HTMLVideoElement | null>(null);
const video2 = ref<HTMLVideoElement | null>(null);
const video3 = ref<HTMLVideoElement | null>(null);

const handleBoxClick = (index: number) => {
    if (index !== activeIndex.value) {
        // Pause all videos
        [video1, video2, video3].forEach((videoRef) => {
            if (videoRef.value) {
                videoRef.value.pause();
                videoRef.value.currentTime = 0; // Reset to start
            }
        });

        // Update active index
        activeIndex.value = index;

        // Play the selected video
        const selectedVideo = [video1, video2, video3][index];
        if (selectedVideo.value) {
            selectedVideo.value.load(); // Reload to ensure the new src is applied
            selectedVideo.value.play().catch((err) => console.error('Video play error:', err));
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

h1,
h2 {
    font-family: 'Montserrat', sans-serif;
}

.video-container video {
    display: none;
}

.video-container video.active {
    display: block;
}
</style>
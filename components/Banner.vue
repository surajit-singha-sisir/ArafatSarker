<template>
    <header class="slider">
        <div class="inner-slider">
            <div class="video-container">
                <video :class="{
                    'active': activeIndex === 0,
                    'left': activeIndex > 0,
                    'right': activeIndex < 0
                }" :src="`${BASE_URL}${banner?.video1}`" autoplay muted playsinline loop></video>
                <video :class="{
                    'active': activeIndex === 1,
                    'left': activeIndex > 1,
                    'right': activeIndex < 1
                }" :src="`${BASE_URL}${banner?.video2}`" autoplay muted playsinline loop></video>
                <video :class="{
                    'active': activeIndex === 2,
                    'left': activeIndex > 2,
                    'right': activeIndex < 2
                }" :src="`${BASE_URL}${banner?.video3}`" autoplay muted playsinline loop></video>
            </div>
            <div class="dark-bg"></div>

            <div class="cta-values" :class="{ 'active': activeIndex === 0 }">
                <h1>{{ banner?.title1 }}</h1>
                <h2>{{ banner?.subtitle1 }}</h2>
                <button type="button" class="m-t-10 button-3d">Watch Portfolio</button>
            </div>
            <div class="cta-values" :class="{ 'active': activeIndex === 1 }">
                <h1>{{ banner?.title2 }}</h1>
                <h2>{{ banner?.subtitle2 }}</h2>
                <button type="button" class="m-t-10 button-3d">Watch Portfolio</button>
            </div>
            <div class="cta-values" :class="{ 'active': activeIndex === 2 }">
                <h1>{{ banner?.title3 }}</h1>
                <h2>{{ banner?.subtitle3 }}</h2>
                <button type="button" class="m-t-10 button-3d">Watch Portfolio</button>
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
const BASE_URL = 'http://192.168.0.111:3000';

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
    method: 'GET'
})

const activeIndex = ref(0)

const handleBoxClick = (index: number) => {
    if (index !== activeIndex.value) {
        activeIndex.value = index
    }
}
</script>

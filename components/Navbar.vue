<template>
    <nav class="nav w-100 bg-Green-100 h--40 f-center-start b-b-1-solid b-Gray-100 bordered-shadow">
        <div class="inner-nav res-container m-auto">
            <div :class="['hamburger', { active: isHamburger }]" @click="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <!-- LOGO -->
            <NuxtLink to="/" class="logo w--80">
                <NuxtImg class="w-100" src="images/logo.svg" alt="Arafat Sarkar Portfolio Logo" />
            </NuxtLink>
            <ul class="nav-links f-centered gap-10" :class="{ active: isHamburger }" >
                <li class="nav-link">
                    <i class="m-chevron-right"></i>
                    <NuxtLink class="linked" to="/reels" :class="{ active: isHamburger }" @click="hamburger">REELS</NuxtLink>
                </li>
                <li class="nav-link">
                    <i class="m-chevron-right"></i>
                    <NuxtLink class="linked" to="/videos" :class="{ active: isHamburger }" @click="hamburger">VIDEOS</NuxtLink>
                </li>
                <li class="nav-link">
                    <i class="m-chevron-right"></i>
                    <NuxtLink class="linked" to="/#testimonial" :class="{ active: isHamburger }" @click="hamburger">TESTIMONIAL</NuxtLink>
                </li>

                <li class="nav-link">
                    <i class="m-chevron-right"></i>
                    <NuxtLink class="linked" to="/about" :class="{ active: isHamburger }" @click="hamburger">ABOUT</NuxtLink>
                </li>
                <li class="nav-link">
                    <i class="m-chevron-right"></i>
                    <NuxtLink class="linked" to="/contacts" :class="{ active: isHamburger }" @click="hamburger">CONTACTS</NuxtLink>
                </li>
            </ul>

        </div>

        <div class="a-bg" :class="{ active: isHamburger }" @click="hamburger"></div>
        <div class="a-bg2" :class="{ active: isHamburger }" @click="hamburger"></div>

    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isHamburger = ref(false);

const hamburger = () => {
    isHamburger.value = !isHamburger.value;
};


</script>
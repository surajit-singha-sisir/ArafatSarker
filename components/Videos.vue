<template>
    <section class="videos-container">
        <div class="inner-videos">
            <h2 class="text-center m-b-20">Videos</h2>

            <div class="front-video-container">
                <div class="row" v-for="(item, ind) in Videos" :key="ind">
                    <div class="video">
                        <div class="category">
                            <p class="text-dotted-2 text-center">{{ item.name }}</p>
                            <NuxtLink :to="`/videos/${item.name.trim()}`" class="btn btn-primary">
                                View all
                            </NuxtLink>
                        </div>
                        <RevealAnimation class="thumbs-loop">
                            <NuxtImg class="custom-image-prev" v-for="(image, index) in item.thumbnail" :key="index"
                                :src="`${URL}${image}`" :alt="item.name" loading="lazy" />
                        </RevealAnimation>
                    </div>
                </div>

            </div>

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

interface FrontVideos {
    name: string;
    thumbnail: string[];
}

const { data: Videos } = await useFetch<FrontVideos[]>(`${URL}/api/api_category?type=video`);


</script>
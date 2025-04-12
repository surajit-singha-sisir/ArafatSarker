<template>
    <section class="videos-container">
        <div class="inner-videos">
            <h2 class="text-center m-b-20">Videos</h2>
            <!-- <div class="video-container">
                <RevealAnimation class="front-video-container" ref="reelContainer">

                    <div class="video" v-for="(video, index) in Videos" :key="index"
                        :data-direction="randomDirection()">
                        <div class="category">
                            <p class="text-dotted-2 text-center">{{ video.name }} Videos</p>
                            <NuxtLink :to="`/videos/${video.name}`" class="btn btn-primary btn-sm">View all
                            </NuxtLink>
                        </div>
                        <NuxtImg class="img w-full object-cover"
                            :src="`${URL}${video.thumbnail[0] || '/placeholder.jpg'}`" :alt="video.name"
                            loading="lazy" />
                        <NuxtImg class="img w-full object-cover"
                            :src="`${URL}${video.thumbnail[1] || '/placeholder.jpg'}`" :alt="video.name"
                            loading="lazy" />
                        <NuxtImg class="img w-full object-cover"
                            :src="`${URL}${video.thumbnail[2] || '/placeholder.jpg'}`" :alt="video.name"
                            loading="lazy" />
                    </div>
                    <div class="rows">
                        <div class="video">
                            <div class="category">
                                <p class="text-dotted-2 text-center">Corporate Videos</p>
                                <NuxtLink :to="`/videos/`" class="btn btn-primary btn-sm">View all
                                </NuxtLink>
                            </div>
                            <NuxtImg class="custom-image-prev"
                                src="https://arafatsarkar.com/media/arafat/thumb-24.webp" alt="video.name"
                                loading="lazy" />
                            <NuxtImg class="custom-image-prev"
                                src="https://arafatsarkar.com/media/arafat/thumb-24.webp" alt="video.name"
                                loading="lazy" />
                            <NuxtImg class="custom-image-prev"
                                src="https://arafatsarkar.com/media/arafat/thumb-24.webp" alt="video.name"
                                loading="lazy" />
                        </div>
                    </div>
                </RevealAnimation>
            </div> -->

            <div class="front-video-container">
                <div class="row" v-for="(item, ind) in Videos" :key="ind">
                    <div class="video">
                        <div class="category">
                            <p class="text-dotted-2 text-center">{{ item.name }} Videos</p>
                            <NuxtLink :to="`/videos/${item.name.trim().replaceAll(' ', '-')}`" class="btn btn-primary">
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
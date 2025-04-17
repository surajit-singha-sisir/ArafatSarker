<template>
    <section class="reel-page">
        <div class="inner-reel-page">
            <div class="showreel">
                <div class="abs-center f-center f-col gap-20">
                    <h1 class="letter-spaced text-center">VIDEO SHOWCASE</h1>
                </div>
                <div class="overlay"></div>
            </div>

            <!-- CATEGORIES -->
            <div class="category-bar">
                <div class="inner-category-bar">
                    <NuxtLink :to="`#${item.category_name}`" class="cat-pointer" v-for="(item, i) in reelsData"
                        :key="i">
                        <i class="m-stop2"></i>
                        <p>{{ item.category_name }}</p>
                    </NuxtLink>
                </div>
            </div>

            <div class="content-container">
                <div :id="item.category_name" class="inner-content-container" v-for="(item, i) in reelsData" :key="i">
                    <h2>{{ item.category_name }}</h2>
                    <RevealAnimation class="g-res-3-col-container gap-05">
                        <div class="video-container-view" :data-direction="randomDirection()" ref="reelContainer"
                            v-for="(reel, index) in item.videos" :key="reel.id" :class="`box`">
                            <NuxtImg class="video-thumb video-thumb-height" :src="`${URL}${reel.thumbnail}`"
                                :alt="reel.title" @click="playReel(index, reel.reel_link)" />
                            <span class="video-title">
                                <p class="text-dotted-2">{{ reel.title }}</p>
                            </span>
                            <div class="play-icon" title="Play" @click="playReel(index, reel.reel_link)">
                                <i class="m-play2"></i>
                            </div>
                            <div class="facebook-link">
                                <NuxtLink target="_blank" :to="reel.reel_link">
                                    <i class="m-facebook4"></i>
                                </NuxtLink>
                            </div>
                        </div>
                    </RevealAnimation>
                    <div class="f-center w-100 pad-tb--10"><span v-if="loading" class="d-block loaderX"></span></div>
                    <div else class="w-100 f-center m-b-30 cur-pointer">
                        <NuxtLink :to="`/videos/${item.category_name}`"
                            :title="`See All Videos of ${item.category_name}`" type="button"
                            class="btn btn-primary m-t-20">
                            <p>See All</p>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <ModalBox v-if="showModal" :is-open="showModal" @close="closeModal">
                <template #main>
                    <VideoPlayer v-if="videoData && currentQuality && !videoError" :src="currentQuality"
                        :qualities="['hd', 'sd']" :initial-quality="quality" :muted="isMuted" :autoplay="true"
                        @error="handleVideoError" @loaded="onVideoLoaded" @quality-changed="setQuality" />
                    <div v-else-if="isVideoData && !videoError" class="facebook-reel-container facebook-vid-cont">
                        <iframe
                            :src="`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(currentReelLink)}`"
                            width="auto" height="900" style="border:none;" scrolling="no" frameborder="0"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            @error="handleVideoError"></iframe>
                    </div>
                    <VideoLoading v-if="loading || videoError" class="video-skeleton" />
                </template>
                <template #related>
                    <div class="related-videos">
                        <h4>Related Videos</h4>
                        <div class="w-100 f-center-start f-col gap-10">
                            <div v-for="(item, index) in allReels" :key="item.id"
                                class="f gap-10 video-border w-100 cur-pointer text-hov-u"
                                @click="playRelatedReel(index)">
                                <div class="col-1 border">
                                    <div class="w--60">
                                        <NuxtImg class="img square center" :src="`${URL}${item.thumbnail}`"
                                            :alt="item.title" />
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="title">{{ item.title }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </ModalBox>
        </div>
    </section>
</template>

<style scoped lang="scss">
.box:hover .video-title {
    top: 0 !important;
}

.facebook-vid-cont {
    overflow: hidden;
    height: 100%;
}

iframe {
    width: 100%;
}

.content-container {
    @media screen and (max-width: 520px) {
        width: 90% !important;
    }
}

.g-res-3-col-container {
    @media screen and (max-width: 980px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 520px) {
        grid-template-columns: repeat(1, 1fr);
    }
}

@media screen and (max-width: 768px) {
    .video-title {
        font-size: 0.8rem;
    }
}


.reel {
    width: 100% !important;
    aspect-ratio: 3/4 !important;
}

.box .facebook-link {
    aspect-ratio: 1;
    bottom: 1rem;
    display: block;
    position: absolute;
    right: 1rem;

    @media screen and (max-width: 768px) {
        display: none;
    }

    i {
        font-size: 1rem;
    }
}
</style>

<script setup lang="ts">
interface Video {
    id: number;
    created_at: string;
    type: string;
    thumbnail: string;
    title: string;
    reel_link: string;
    tag: string;
    hide: boolean;
    category: number;
}

interface Pagination {
    count: number;
    num_pages: number;
    current_page: number;
    next: string | null;
    previous: string | null;
    page_size: number;
}

interface Category {
    category_name: string;
    videos: Video[];
    pagination: Pagination;
}

interface ApiResponse {
    [categoryId: string]: Category;
}

interface VideoData {
    title?: string;
    hd?: string;
    sd?: string;
}

// State
const URL = ref('https://arafatsarkar.com');
const reelContainer = ref<HTMLElement | null>(null);
const loading = ref(false);
const error = ref<Error | null>(null);
const showModal = ref(false);
const videoData = ref<VideoData | null>(null);
const videoError = ref(false);
const isVideoData = ref(false);
const currentReelLink = ref('');
const quality = ref<'hd' | 'sd'>('hd');
const isMuted = ref(true);

// Fetch dynamic data
const { data: reelsData, status } = await useFetch<ApiResponse>(
    `${URL.value}/api/api_video?type=video`,
    {
        method: 'GET',
    }
);

const allReels = computed(() => {
    if (!reelsData.value) return [];
    return Object.values(reelsData.value).flatMap(category => category.videos);
});

const currentQuality = computed(() => {
    return quality.value === 'hd' ? videoData.value?.hd : videoData.value?.sd;
});

const randomDirection = () => {
    const directions = ['left', 'right', 'top', 'bottom'];
    return directions[Math.floor(Math.random() * directions.length)];
};

const fetchVideoData = async () => {
    const urlToFetch = currentReelLink.value
    if (!urlToFetch) {
        // error.value = 'Please provide a video URL'
        videoError.value = true
        return
    }

    loading.value = true
    videoError.value = false
    error.value = null
    const startTime = Date.now()
    const MIN_LOADING_TIME = 2000

    try {
        const response = await fetch(`https://arafatsarkar.com/api/video-info?link=${encodeURIComponent(urlToFetch)}`)
        const result = await response.json()
        videoData.value = result


        const elapsedTime = Date.now() - startTime
        const remainingTime = MIN_LOADING_TIME - elapsedTime
        if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime))
        }
        videoData.value = result

        if (result.status === 'success') {
            isVideoData.value = false
        } else {
            error.value = result.message || 'Failed to load reel'
            isVideoData.value = true
        }
    } catch (err) {
        const elapsedTime = Date.now() - startTime
        const remainingTime = MIN_LOADING_TIME - elapsedTime
        if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime))
        }
        videoError.value = true
        isVideoData.value = true
    } finally {
        loading.value = false
    }
}

const playVideo = (index: number, link: string) => {
    currentReelLink.value = link;
    showModal.value = true;
    fetchVideoData();
};
const playReel = (index: number, link: string) => {
    currentReelLink.value = link;
    showModal.value = true;
    fetchVideoData();
};

const playRelatedReel = (index: number) => {
    currentReelLink.value = allReels.value[index].reel_link;
    videoData.value = null;
    fetchVideoData();
};

const setQuality = (newQuality: string) => {
    const validQuality = newQuality === 'hd' || newQuality === 'sd' ? newQuality : 'hd';
    quality.value = validQuality;
};

const handleVideoError = () => {
    videoError.value = true;
};

const onVideoLoaded = () => {
    videoError.value = false;
};

const closeModal = () => {
    showModal.value = false;
    videoData.value = null;
    videoError.value = false;
    isVideoData.value = false;
    currentReelLink.value = '';
};



</script>

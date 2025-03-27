<template>
    <section class="videos-container">
        <div class="inner-videos">
            <h2 class="text-center m-b-20">Videos</h2>
            <div class="video-container">
                <RevealAnimation class="cols-1">
                    <div :data-direction="randomDirection()" v-for="item, index in videos.slice(0, 3)" :key="item.id"
                        :class="`box box-${index + 1}`" @click="playVideo(index)">
                        <NuxtImg class="video-thumb" :src="`${URL}${item.thumbnail}`" alt="" />
                        <span class="video-title">
                            <p class="text-dotted-2">{{ item.title }}</p>
                        </span>
                        <i class="m-play2"></i>
                    </div>
                </RevealAnimation>
                <RevealAnimation class="cols-2">
                    <div :data-direction="randomDirection()" v-for="item, index in videos.slice(3)" :key="item.id"
                        :class="`box box-${index + 4}`" @click="playVideo(index + 3)">
                        <NuxtImg class="video-thumb" :src="`${URL}${item.thumbnail}`" alt="" />
                        <span class="video-title">
                            <p class="text-dotted-2">{{ item.title }}</p>
                        </span>
                        <i class="m-play2"></i>
                    </div>
                </RevealAnimation>
            </div>
        </div>

        <!-- Modal -->
        <ModalBox v-if="showModal" :is-open="showModal" @close="closeModal">
            <template #main>
                <VideoPlayer v-if="videoData && currentQuality && !videoError" :src="currentQuality"
                    :qualities="['hd', 'sd']" :initial-quality="quality" :muted="isMuted" :autoplay="true"
                    @error="handleVideoError" @loaded="onVideoLoaded" @quality-changed="setQuality" />
                <div v-else-if="isVideoData && !videoError" class="facebook-reel-container">
                    <iframe
                        :src="`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(currentVideoLink)}`"
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
                        <div v-for="(item, index) in videos" :key="item.id"
                            class="f gap-10 video-border w-100 cur-pointer text-hov-u" @click="playRelatedVideo(index)">
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
        <div class="w-100 f-center m-t-20">
            <NuxtLink to="/videos" class="btn btn-primary">View All</NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
import ModalBox from './ModalBox.vue'
import VideoPlayer from './VideoPlayer.vue'
import VideoLoading from './VideoLoading.vue'

// Video Interface
interface Video {
    id: number;
    created_at: string;
    type: "video";
    thumbnail: string;
    title: string;
    reel_link: string;
    tag: string;
    hide: boolean;
    category: number;
}

interface VideoData {
    title?: string;
    hd?: string;
    sd?: string;
}

interface MediaData {
    video: Video[];
}

// Props
const props = defineProps<{
    initialUrl?: string;
}>()

// State
const showModal = ref(false)
const videoData = ref<VideoData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const quality = ref<'hd' | 'sd'>('hd')
const isMuted = ref(true)
const videoUrl = ref('')
const videoError = ref(false)
const isVideoData = ref(false)
const currentVideoLink = ref('')
const URL = 'http://192.168.0.111:3000'

// Fetch Video Data
const { data: mediaData } = await useFetch<MediaData>(`${URL}/api/api_recent`)
const videos = ref<Video[]>(mediaData.value?.video || [])

const currentQuality = computed(() => {
    return quality.value === 'hd' ? videoData.value?.hd : videoData.value?.sd
})

const randomDirection = () => {
    const directions = ['left', 'right', 'top', 'bottom']
    return directions[Math.floor(Math.random() * directions.length)]
}

const fetchVideoData = async () => {
    const urlToFetch = currentVideoLink.value
    if (!urlToFetch) {
        error.value = 'Please provide a video URL'
        videoError.value = true
        return
    }

    loading.value = true
    videoError.value = false
    error.value = null
    const startTime = Date.now()
    const MIN_LOADING_TIME = 2000

    try {
        const response = await fetch(`/api/video?url=${encodeURIComponent(urlToFetch)}`)
        const result = await response.json()

        const elapsedTime = Date.now() - startTime
        const remainingTime = MIN_LOADING_TIME - elapsedTime
        if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime))
        }

        if (result.status === 'success') {
            videoData.value = result.data
            isVideoData.value = false
        } else {
            error.value = result.message || 'Failed to load video'
            isVideoData.value = true
        }
    } catch (err) {
        const elapsedTime = Date.now() - startTime
        const remainingTime = MIN_LOADING_TIME - elapsedTime
        if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime))
        }
        error.value = 'Error fetching video: ' + (err instanceof Error ? err.message : String(err))
        videoError.value = true
        isVideoData.value = true
    } finally {
        loading.value = false
    }
}

const playVideo = (index: number) => {
    currentVideoLink.value = videos.value[index].reel_link
    videoUrl.value = currentVideoLink.value
    showModal.value = true
    fetchVideoData()
}

const playRelatedVideo = (index: number) => {
    currentVideoLink.value = videos.value[index].reel_link
    videoUrl.value = currentVideoLink.value
    videoData.value = null // Reset video data to trigger fetch
    fetchVideoData()
}

const setQuality = (newQuality: string) => {
    const validQuality = newQuality === 'hd' || newQuality === 'sd' ? newQuality : 'hd'
    quality.value = validQuality
}

const handleVideoError = () => {
    videoError.value = true
}

const onVideoLoaded = () => {
    videoError.value = false
}

const closeModal = () => {
    showModal.value = false
    videoData.value = null
    videoError.value = false
    isVideoData.value = false
    currentVideoLink.value = ''
}

onMounted(() => {
    videoUrl.value = props.initialUrl || ''
})
</script>
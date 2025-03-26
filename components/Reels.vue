<template>
    <section class="reels">
        <div class="inner-reels res-container">
            <h2 class="text-center">Reels</h2>
            <section class="reels-samples">
                <div class="bordered-circle chevron" @click="revealPreviousItem">
                    <i class="m-chevron-left"></i>
                </div>
                <div class="all-reels">
                    <RevealAnimation>
                        <div class="reel-container snap-x" :data-direction="randomDirection()" ref="reelContainer">
                            <div class="reel" v-for="(reel, index) in Reels" :key="reel.id">
                                <div class="title text-dotted-2">
                                    <p>{{ reel.title }}</p>
                                </div>
                                <div class="thumbnail">
                                    <NuxtImg class="img h-full fit-cover" :src="`${URL}${reel.thumbnail}`"
                                        :alt="reel.title" @click="playReel(index)" />
                                </div>
                                <div class="play-icon" title="Play" @click="playReel(index)">
                                    <i class="m-play2"></i>
                                </div>
                                <div class="duration">
                                    <NuxtLink target="_blank" :to="reel.reel_link">
                                        <i class="m-facebook4"></i>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </RevealAnimation>
                </div>
                <div class="bordered-circle chevron" @click="revealNextItem">
                    <i class="m-chevron-right"></i>
                </div>
            </section>

            <!-- Modal -->
            <ModalBox v-if="showModal" :is-open="showModal" @close="closeModal">
                <template #main>
                    <VideoPlayer v-if="videoData && currentQuality && !videoError" :src="currentQuality"
                        :qualities="['hd', 'sd']" :initial-quality="quality" :muted="isMuted" :autoplay="true"
                        @error="handleVideoError" @loaded="onVideoLoaded" @quality-changed="setQuality" />
                    <div v-else-if="isVideoData && !videoError" class="facebook-reel-container">
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
                            <div v-for="(item, index) in Reels" :key="item.id"
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
            <NuxtLink to="/reels" class="btn btn-primary m-t-20">View All</NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
import ModalBox from './ModalBox.vue';
import VideoPlayer from './VideoPlayer.vue';
import VideoLoading from './VideoLoading.vue';

interface VideoData {
    title?: string
    hd?: string
    sd?: string
}
const randomDirection = () => {
    const directions = ['left', 'right', 'top', 'bottom']
    return directions[Math.floor(Math.random() * directions.length)]
}

interface Reel {
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

interface MediaData {
    reel: Reel[];
    video: Reel[];
}

// Props
const props = defineProps<{
    initialUrl?: string
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
const currentReelLink = ref('')
const URL = 'http://192.168.0.111:3000'
const reelContainer = ref<HTMLElement | null>(null)

const { data: mediaData } = await useFetch<MediaData>(`${URL}/api/api_recent`)
const Reels = ref<Reel[]>(mediaData.value?.reel || [])

const currentQuality = computed(() => {
    return quality.value === 'hd' ? videoData.value?.hd : videoData.value?.sd
})

const fetchVideoData = async () => {
    const urlToFetch = currentReelLink.value
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
            error.value = result.message || 'Failed to load reel'
            isVideoData.value = true
        }
    } catch (err) {
        const elapsedTime = Date.now() - startTime
        const remainingTime = MIN_LOADING_TIME - elapsedTime
        if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime))
        }
        error.value = 'Error fetching reel: ' + (err instanceof Error ? err.message : String(err))
        videoError.value = true
        isVideoData.value = true
    } finally {
        loading.value = false
    }
}

const playReel = (index: number) => {
    currentReelLink.value = Reels.value[index].reel_link
    videoUrl.value = currentReelLink.value
    showModal.value = true
    fetchVideoData()
}

// New method for related videos
const playRelatedReel = (index: number) => {
    currentReelLink.value = Reels.value[index].reel_link
    videoUrl.value = currentReelLink.value
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
    currentReelLink.value = ''
}

const getScrollAmount = () => {
    if (reelContainer.value) {
        const reelWidth = reelContainer.value.querySelector('.reel')?.clientWidth || 0
        const gap = 16
        return reelWidth + gap
    }
    return 0
}

const revealPreviousItem = () => {
    if (reelContainer.value) {
        const scrollAmount = getScrollAmount()
        reelContainer.value.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        })
    }
}

const revealNextItem = () => {
    if (reelContainer.value) {
        const scrollAmount = getScrollAmount()
        reelContainer.value.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        })
    }
}

onMounted(() => {
    videoUrl.value = props.initialUrl || ''
})
</script>
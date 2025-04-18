<template>
    <section class="reel-page">
        <div class="inner-reel-page">
            <div class="showreel">
                <div class="abs-center f-center f-col gap-20">
                    <h1 class="letter-spaced">SHOWREEL</h1>
                    <NuxtLink to="#down" class="scroll-navigator" title="Scroll to reel categories">
                        <div class="border-round"></div>
                        <div class="navigator-anim"></div>
                    </NuxtLink>
                </div>
                <div class="overlay"></div>
            </div>

            <!-- CATEGORIES -->
            <div class="category-bar">
                <div class="inner-category-bar">
                    <NuxtLink :to="`#${item.category_name}`" class="cat-pointer" v-for="(item, i) in reelsData" :key="i"
                        :title="`Jump to ${item.category_name} reels`">
                        <i class="m-stop2"></i>
                        <p>{{ item.category_name }}</p>
                    </NuxtLink>
                </div>
            </div>

            <div class="content-container">
                <div :id="item.category_name" class="inner-content-container" v-for="(item, i) in reelsData" :key="i">
                    <h2>{{ item.category_name }}</h2>
                    <RevealAnimation>
                        <div class="grid-res-5 gap-10" :data-direction="randomDirection()" ref="reelContainer">
                            <div class="reel" v-for="(reel, index) in item.reels" :key="reel.id">
                                <div class="title">
                                    <p class="text-dotted-2">{{ reel.title }}</p>
                                </div>
                                <div class="thumbnail">
                                    <NuxtImg class="img fit-cover" :src="`${URL}${reel.thumbnail}`"
                                        :alt="`Thumbnail for ${reel.title} reel`" :title="`Watch ${reel.title} reel`"
                                        width="300" height="600" format="webp" quality="80" loading="lazy"
                                        @click="playReel(index, reel.reel_link)" />
                                </div>
                                <div class="play-icon" :title="`Play ${reel.title}`"
                                    @click="playReel(index, reel.reel_link)">
                                    <i class="m-play2"></i>
                                </div>
                                <div class="duration">
                                    <NuxtLink target="_blank" :to="reel.reel_link"
                                        :title="`Watch ${reel.title} on Facebook`">
                                        <i class="m-facebook4"></i>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </RevealAnimation>
                    <div class="f-center w-100 pad-tb--10">
                        <span v-if="loading" class="d-block loaderX"></span>
                    </div>
                    <div class="w-100 f-center m-b-30 cur-pointer">
                        <NuxtLink :to="`/reels/${item.category_name}`"
                            :title="`See all videos of ${item.category_name}`" type="button"
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
                    <div v-else-if="isVideoData && !videoError" class="facebook-reel-container">
                        <iframe :src="`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                            currentReelLink
                        )}`" width="auto" height="900" style="border: none" scrolling="no" frameborder="0"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            @error="handleVideoError"></iframe>
                    </div>
                    <VideoLoading v-if="loading || videoError" class="video-skeleton" />
                </template>
                <template #related>
                    <div class="related-videos">
                        <h4>Related Reels</h4>
                        <div class="w-100 f-center-start f-col gap-10">
                            <div v-for="(item, index) in allReels" :key="item.id"
                                class="f gap-10 video-border w-100 cur-pointer text-hov-u"
                                @click="playRelatedReel(index)">
                                <div class="col-1 border">
                                    <div class="w--60">
                                        <NuxtImg class="img square center" :src="`${URL}${item.thumbnail}`"
                                            :alt="`Thumbnail for ${item.title}`" width="60" height="60" format="webp"
                                            quality="80" loading="lazy" />
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

<script setup lang="ts">
interface Reel {
    id: number
    created_at: string
    type: string
    thumbnail: string
    title: string
    reel_link: string
    tag: string
    hide: boolean
    category: number
}

interface Pagination {
    count: number
    num_pages: number
    current_page: number
    next: string | null
    previous: string | null
    page_size: number
}

interface Category {
    category_name: string
    reels: Reel[]
    pagination: Pagination
}

interface ApiResponse {
    [categoryId: string]: Category
}

interface VideoData {
    title?: string
    hd?: string
    sd?: string
}

// State
const URL = ref('https://arafatsarkar.com')
const reelContainer = ref<HTMLElement | null>(null)
const loading = ref(false)
const error = ref<Error | null>(null)
const showModal = ref(false)
const videoData = ref<VideoData | null>(null)
const videoError = ref(false)
const isVideoData = ref(false)
const currentReelLink = ref('')
const quality = ref<'hd' | 'sd'>('hd')
const isMuted = ref(true)

// Fetch dynamic data
const { data: reelsData, status } = await useFetch<ApiResponse>(
    `${URL.value}/api/api_video?type=reel`,
    {
        method: 'GET',
    }
)

// Compute first reel for Schema.org
const firstReel = computed(() => {
    if (!reelsData.value) return null
    const categories = Object.values(reelsData.value)
    return categories[0]?.reels[0] || null
})

// SEO configuration using useHead (auto-imported from #imports)
useHead({
    title: computed(() => 'Arafat Sarkar | Showreels'),
    meta: [
        {
            name: 'description',
            content:
                'Discover the cinematic showreels of Arafat Sarkar, showcasing professional videography and filmmaking artistry from Bangladesh.',
        },
        {
            name: 'keywords',
            content:
                'Arafat Sarkar, showreels, cinematography, videography, Bangladesh, filmmaking, video portfolio',
        },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        {
            property: 'og:url',
            content: 'https://arafatsarkar.com/reels',
        },
        {
            property: 'og:title',
            content: 'Arafat Sarkar | Showreels',
        },
        {
            property: 'og:description',
            content:
                'Discover the cinematic showreels of Arafat Sarkar, showcasing professional videography and filmmaking artistry from Bangladesh.',
        },
        {
            property: 'og:image',
            content: computed(() =>
                firstReel.value
                    ? `${URL.value}${firstReel.value.thumbnail}`
                    : 'https://arafatsarkar.com/images/reels.png'
            ),
        },
        { property: 'og:site_name', content: 'Arafat Sarkar' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        {
            name: 'twitter:url',
            content: 'https://arafatsarkar.com/reels',
        },
        {
            name: 'twitter:title',
            content: 'Arafat Sarkar | Showreels',
        },
        {
            name: 'twitter:description',
            content:
                'Discover the cinematic showreels of Arafat Sarkar, showcasing professional videography and filmmaking artistry from Bangladesh.',
        },
        {
            name: 'twitter:image',
            content: computed(() =>
                firstReel.value
                    ? `${URL.value}${firstReel.value.thumbnail}`
                    : 'https://arafatsarkar.com/images/reels.png'
            ),
        },
        { name: 'twitter:creator', content: '@arafatsarkar' },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://arafatsarkar.com/reels',
        },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: computed(() =>
                firstReel.value
                    ? {
                        '@context': 'https://schema.org',
                        '@type': 'VideoObject',
                        name: firstReel.value.title,
                        description: `${firstReel.value.title} - A cinematic reel by Arafat Sarkar`,
                        thumbnailUrl: `${URL.value}${firstReel.value.thumbnail}`,
                        contentUrl: firstReel.value.reel_link,
                        uploadDate: firstReel.value.created_at,
                        publisher: {
                            '@type': 'Person',
                            name: 'Arafat Sarkar',
                            url: 'https://arafatsarkar.com',
                            sameAs: [
                                'https://www.facebook.com/arafatsarkarrasel1',
                                'https://twitter.com/arafatsarkarofficial',
                                'https://www.instagram.com/arafatsarkarofficial',
                                'https://www.linkedin.com/in/arafatsarkarofficial',
                            ],
                        },
                    }
                    : {}
            ),
        },
    ],
})

const allReels = computed(() => {
    if (!reelsData.value) return []
    return Object.values(reelsData.value).flatMap((category) => category.reels)
})

const currentQuality = computed(() => {
    return quality.value === 'hd' ? videoData.value?.hd : videoData.value?.sd
})

const randomDirection = () => {
    const directions = ['left', 'right', 'top', 'bottom']
    return directions[Math.floor(Math.random() * directions.length)]
}

const fetchVideoData = async () => {
    const urlToFetch = currentReelLink.value
    if (!urlToFetch) {
        error.value = new Error('Please provide a video URL')
        videoError.value = true
        return
    }

    loading.value = true
    videoError.value = false
    error.value = null
    const startTime = Date.now()
    const MIN_LOADING_TIME = 2000

    try {
        const response = await fetch(
            `https://arafatsarkar.com/api/video-info?link=${encodeURIComponent(
                urlToFetch
            )}`
        )
        const result = await response.json()
        videoData.value = result

        const elapsedTime = Date.now() - startTime
        const remainingTime = MIN_LOADING_TIME - elapsedTime
        if (remainingTime > 0) {
            await new Promise((resolve) => setTimeout(resolve, remainingTime))
        }

        if (result.status === 'success') {
            videoData.value = result.data
            isVideoData.value = false
        } else {
            error.value = new Error(result.message || 'Failed to load reel')
            isVideoData.value = true
        }
    } catch (err) {
        const elapsedTime = Date.now() - startTime
        const remainingTime = MIN_LOADING_TIME - elapsedTime
        if (remainingTime > 0) {
            await new Promise((resolve) => setTimeout(resolve, remainingTime))
        }
        error.value = err instanceof Error ? err : new Error(String(err))
        videoError.value = true
        isVideoData.value = true
    } finally {
        loading.value = false
    }
}

const playReel = (index: number, link: string) => {
    currentReelLink.value = link
    showModal.value = true
    fetchVideoData()
}

const playRelatedReel = (index: number) => {
    currentReelLink.value = allReels.value[index].reel_link
    videoData.value = null
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

</script>

<style scoped lang="scss">
.reel {
    width: 100% !important;
    aspect-ratio: 1/2 !important;

    .thumbnail {
        img {
            width: 100% !important;
        }
    }
}

@media screen and (max-width: 768px) {
    .content-container {
        width: 80% !important;
    }
}

@media screen and (min-width: 521px) and (max-width: 720px) {

    .g-res-container,
    .grid-res-container {
        grid-template-columns: repeat(1fr 1fr) !important;
    }
}
</style>
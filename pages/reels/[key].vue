<template>
  <section class="reel-page">
    <div class="inner-reel-page">
      <br /><br />

      <div class="content-container">
        <div :id="item.category_name" class="inner-content-container" v-for="(item, i) in reelsData" :key="i">
          <RevealAnimation>
            <div class="grid-res-5 gap-10" :data-direction="randomDirection()" ref="reelContainer">
              <div class="reel" v-for="(reel, index) in item.reels" :key="reel.id">
                <div class="title">
                  <p class="text-dotted-2">{{ reel.title }}</p>
                </div>
                <div class="thumbnail">
                  <NuxtImg class="img fit-cover" :src="`${URL}${reel.thumbnail}`" :alt="`${reel.title} reel thumbnail`"
                    :title="`Watch ${reel.title} reel`" width="300" height="600" format="webp" quality="80"
                    loading="lazy" @click="playReel(index, reel.reel_link)" />
                </div>
                <div class="play-icon" title="Play" @click="playReel(index, reel.reel_link)">
                  <i class="m-play2"></i>
                </div>
                <div class="duration">
                  <NuxtLink target="_blank" :to="reel.reel_link" :title="`Watch ${reel.title} on Facebook`">
                    <i class="m-facebook4"></i>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </RevealAnimation>
          <div class="f-center w-100 pad-tb--10">
            <span v-if="loading" class="d-block loaderX"></span>
          </div>
          <div v-if="item.pagination.has_next" class="w-100 f-center m-b-30 cur-pointer">
            <button type="button" class="btn btn-primary m-t-20" :disabled="loading" @click="fetchNextOffset(item)">
              <p>Load More</p>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <ModalBox v-if="showModal" :is-open="showModal" @close="closeModal">
        <template #main>
          <VideoPlayer v-if="videoData && currentQuality && !videoError" :src="currentQuality" :qualities="['hd', 'sd']"
            :initial-quality="quality" :muted="isMuted" :autoplay="true" @error="handleVideoError"
            @loaded="onVideoLoaded" @quality-changed="setQuality" />
          <div v-else-if="isVideoData && !videoError" class="facebook-reel-container">
            <iframe :src="`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
              currentReelLink
            )}`" width="auto" height="900" style="border:none;" scrolling="no" frameborder="0"
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
                class="f gap-10 video-border w-100 cur-pointer text-hov-u" @click="playRelatedReel(index)">
                <div class="col-1 border">
                  <div class="w--60">
                    <NuxtImg class="img square center" :src="`${URL}${item.thumbnail}`"
                      :alt="`${item.title} related reel thumbnail`" :title="`Watch ${item.title} related reel`"
                      width="60" height="60" format="webp" quality="80" loading="lazy" />
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
const router = useRoute()
const key = router.params.key as string

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
  has_next: boolean
  has_previous: boolean
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

const { data: reelsData, status } = await useFetch<ApiResponse>(
  `${URL.value}/api/api_video_page?category=${key}&page=1&type=reel`,
  {
    method: 'GET',
  }
)

const firstReel = computed(() => {
  if (!reelsData.value) return null
  const categories = Object.values(reelsData.value)
  return categories[0]?.reels[0] || null
})

useHead({
  title: computed(
    () =>
      `Arafat Sarkar | ${key.charAt(0).toUpperCase() + key.slice(1)} Reels`
  ),
  meta: [
    {
      name: 'description',
      content: computed(
        () =>
          `Explore ${key} reels by Arafat Sarkar, showcasing professional cinematography in Bangladesh. Watch stunning videography and filmmaking content.`
      ),
    },
    {
      name: 'keywords',
      content: computed(
        () => `Arafat Sarkar, ${key} reels, cinematography, videography, Bangladesh, filmmaking, portfolio`
      ),
    },
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: computed(() => `https://arafatsarkar.com/reels/${key}`),
    },
    {
      property: 'og:title',
      content: computed(
        () =>
          `${key.charAt(0).toUpperCase() + key.slice(1)} Reels | Arafat Sarkar Cinematography`
      ),
    },
    {
      property: 'og:description',
      content: computed(
        () =>
          `Explore ${key} reels by Arafat Sarkar, showcasing professional cinematography in Bangladesh. Watch stunning videography and filmmaking content.`
      ),
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
      content: computed(() => `https://arafatsarkar.com/reels/${key}`),
    },
    {
      name: 'twitter:title',
      content: computed(
        () =>
          `${key.charAt(0).toUpperCase() + key.slice(1)} Reels | Arafat Sarkar Cinematography`
      ),
    },
    {
      name: 'twitter:description',
      content: computed(
        () =>
          `Explore ${key} reels by Arafat Sarkar, showcasing professional cinematography in Bangladesh. Watch stunning videography and filmmaking content.`
      ),
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
      href: computed(() => `https://arafatsarkar.com/reels/${key}`),
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

const fetchNextOffset = async (categoryItem: Category) => {
  if (!categoryItem.pagination.has_next || loading.value) return

  loading.value = true
  error.value = null

  try {
    const nextPage = categoryItem.pagination.current_page + 1
    const nextUrl = `${URL.value}/api/api_video_page?category=${key}&page=${nextPage}&type=reel`

    const response = await fetch(nextUrl, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse = await response.json()

    Object.entries(result).forEach(([categoryId, categoryData]) => {
      if (reelsData.value?.[categoryId]) {
        reelsData.value[categoryId].reels = [
          ...reelsData.value[categoryId].reels,
          ...categoryData.reels,
        ]
        reelsData.value[categoryId].pagination = categoryData.pagination
      }
    })
  } catch (err) {
    error.value = err instanceof Error ? err : new Error('Failed to fetch next page')
    console.error('Error fetching next offset:', err)
  } finally {
    loading.value = false
  }
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
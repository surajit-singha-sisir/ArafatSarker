<template>
  <div class="reel-player-container">
    <p>{{ videoTitle }}</p>

    <!-- Loading State -->
    <div v-if="loading" class="loading">Loading reel...</div>

    <!-- Video Player -->
    <div v-else-if="videoData && currentQuality" class="player-wrapper">
      <VideoPlayer :src="currentQuality" :qualities="['hd', 'sd']" :initial-quality="quality" :muted="isMuted"
        :autoplay="true" @error="handleVideoError" @loaded="onVideoLoaded" @quality-changed="setQuality" />
    </div>

    <!-- Error Message -->
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import VideoPlayer from './VideoPlayer.vue'

// Types
interface VideoData {
  title?: string
  hd?: string
  sd?: string
}

// Define props
const props = defineProps<{
  initialUrl?: string
}>()

// State
const videoData = ref<VideoData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const quality = ref<'hd' | 'sd'>('hd')
const isMuted = ref(true)
const videoUrl = ref('')

// Computed
const videoTitle = computed(() => videoData.value?.title || 'Reel Video')
const currentQuality = computed(() => {
  return quality.value === 'hd' ? videoData.value?.hd : videoData.value?.sd
})

// Methods
const fetchVideoData = async () => {
  const urlToFetch = videoUrl.value || 'https://www.facebook.com/watch?v=504749452697358'
  if (!urlToFetch) {
    error.value = 'Please provide a video URL'
    return
  }

  loading.value = true
  error.value = null
  try {
    const response = await fetch(`/api/video?url=${encodeURIComponent(urlToFetch)}`)
    const result = await response.json()
    if (result.status === 'success') {
      videoData.value = result.data
    } else {
      error.value = result.message || 'Failed to load reel'
    }
  } catch (err) {
    error.value = 'Error fetching reel: ' + (err as Error).message
  } finally {
    loading.value = false
  }
}

const setQuality = (newQuality: string) => {
  // Type assertion to narrow the type to 'hd' | 'sd'
  const validQuality = newQuality === 'hd' || newQuality === 'sd' ? newQuality : 'hd'
  quality.value = validQuality
}

const handleVideoError = (message: string) => {
  error.value = 'Video playback error: ' + message
}

const onVideoLoaded = () => {
  // Optionally handle loaded state
}

// Lifecycle
onMounted(() => {
  videoUrl.value = props.initialUrl || ''
  fetchVideoData()
})
</script>

<style scoped>
.reel-player-container {
  padding: 20px;
  max-width: 800px;
  aspect-ratio: 2/3;
}

.loading {
  text-align: center;
}

.error-message {
  color: red;
}

.player-wrapper {
  position: relative;
}
</style>
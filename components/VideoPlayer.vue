<template>
  <div class="video-player">
    <video ref="video" :src="src" :muted="muted" :playback-rate="playbackRate" @timeupdate="updateProgress"
      @loadedmetadata="onLoadedMetadata" @error="onError" @click="togglePlay" class="video-element">
      Your browser does not support the video tag.
    </video>

    <!-- Controls -->
    <div class="controls" v-if="showControls">

      <!-- Progress Bar -->
      <input type="range" min="0" :max="duration" step="0.1" v-model="currentTime" @input="seek" class="progress-bar" />
      <aside class="f f-just-between gap-10 w-100">

        <div class="f-start-center gap-10">
          <!-- Play/Pause Button -->
          <div @click="togglePlay" class="cur-pointer">
            <i :class="{ 'm-play3': !isPlaying, 'm-pause4': isPlaying }"></i>
          </div>

          <!-- Volume Control -->
          <div class="volume-control">
            <div @click="toggleMute" class="relative">
              <i class="cur-pointer" @click="volumeControl"
                :class="{ 'm-volume-off': muted, 'm-volume-up': !muted }"></i>
            </div>

            <div class="volume-range" :class="{ 'hide': isVolumeControl }">
              <span class="ranges">
                <input type="range" class="volume-control" min="0" max="1" step="0.1" v-model="volume"
                  @input="setVolume" />
              </span>
            </div>
          </div>

          <span class="w--60 text--08">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        </div>
        <div class="f-start-center gap-10">
          <!-- Quality Toggle -->
          <div class="quality-toggle">
            <i class="m-cog cur-pointer" @click="getSettings"></i>
            <div v-for="q in qualities" :key="q" :class="{ active: currentQuality === q, 'hide': !isSettings }"
              @click="setQuality(q)">
              {{ q.toUpperCase() }}
            </div>
          </div>

          <!-- Fullscreen Toggle -->
          <span @click="toggleFullscreen">
            <i class="cur-pointer text--09"
              :class="{ 'm-fullscreen-alt': isFullscreen, 'm-fullscreen-exit-alt': !isFullscreen }"></i>
          </span>
        </div>
        <!-- Playback Speed -->
        <!-- <select v-model="playbackRate" @change="setPlaybackRate">
        <option value="0.5">0.5x</option>
        <option value="1" selected>1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select> -->

      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isSettings = ref(false);
const getSettings = () => {
  isSettings.value = !isSettings.value;
}

const isVolumeControl = ref(false);
const volumeControl = () => {
  isVolumeControl.value = !isVolumeControl.value;
}


// Define props with TypeScript
const props = defineProps<{
  src: string
  qualities: string[] // e.g., ['hd', 'sd']
  initialQuality?: string
  muted?: boolean
  autoplay?: boolean
}>()

const emit = defineEmits<{
  (e: 'error', message: string): void
  (e: 'loaded'): void
  (e: 'qualityChanged', quality: string): void
}>()

// State
const video = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const muted = ref(true)
const volume = ref(1)
const currentTime = ref(0)
const duration = ref(0)
const playbackRate = ref(1)
const currentQuality = ref<string>('hd')
const isFullscreen = ref(false)
const showControls = ref(true)

// Methods
const togglePlay = () => {
  if (video.value) {
    if (isPlaying.value) {
      video.value.pause()
    } else {
      video.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const toggleMute = () => {
  if (video.value) {
    muted.value = !muted.value
    video.value.muted = muted.value
  }
}

const setVolume = () => {
  if (video.value) { // Fixed: Removed 'Ascending'
    video.value.volume = Number(volume.value)
    muted.value = video.value.volume === 0
  }
}

const updateProgress = () => {
  if (video.value) {
    currentTime.value = video.value.currentTime
  }
}

const seek = () => {
  if (video.value) {
    video.value.currentTime = Number(currentTime.value)
  }
}

const setPlaybackRate = () => {
  if (video.value) {
    video.value.playbackRate = Number(playbackRate.value)
  }
}

const setQuality = (quality: string) => {
  if (video.value && quality !== currentQuality.value) {
    const wasPlaying = isPlaying.value
    const current = video.value.currentTime
    currentQuality.value = quality
    emit('qualityChanged', quality)
    video.value.load()
    video.value.currentTime = current
    if (wasPlaying) video.value.play()
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    video.value?.parentElement?.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const onLoadedMetadata = () => {
  if (video.value) {
    duration.value = video.value.duration
    emit('loaded')
  }
}

const onError = (e: Event) => {
  const target = e.target as HTMLVideoElement
  emit('error', target.error?.message || 'Unknown video error')
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' + secs : secs}`
}

// Lifecycle
onMounted(() => {
  if (props.autoplay && video.value) {
    video.value.play()
    isPlaying.value = true
  }
  currentQuality.value = props.initialQuality || 'hd'
})

onUnmounted(() => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }
})

// Watchers
watch(() => props.src, () => {
  if (video.value) {
    video.value.load()
    if (isPlaying.value) video.value.play()
  }
})

watch(() => props.muted, (newVal) => {
  muted.value = newVal || false
})
</script>

<style scoped lang="scss">
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-element {
  width: 100%;
  height: 100vh;
  background-color: #333;
}

.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2rem;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(0deg, #414141, #00000000);
  color: white;

  .progress-bar {
    position: absolute;
    top: -2rem;

    &::-webkit-slider-runnable-track {
      height: 3px;
      background: #e4e4e4;
      border: none;
    }
  }

  .volume-range {
    position: relative;
    // display: flex;
    align-items: center;
    transition: all 0.3s ease;

    .ranges {
      position: relative;
      display: flex;
      width: 3rem;
      transition: all 0.3s ease;
      // position: absolute;
      // left: -1.8rem;
      // top: -3.5rem;
      // width: 3rem;
      // transform: rotate(-90deg);
    }
  }

  .volume-control {
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    width: 3rem;
    margin-right: 1rem;
    -webkit-appearance: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 2px;
    background: #ccc;
    border: none;
  }

  input[type="range"]::-moz-range-track {
    height: 2px;
    background: #ccc;
    border: none;
  }

  /* Style the thumb (draggable part) */
  input[type="range"]::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    background: #008cff;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
  }

  input[type="range"]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #666;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }

  input[type="range"]:active::-webkit-slider-thumb {
    border: none;
    outline: none;
    background: none;
    /* Ensure no border when active */
  }

  /* Remove border on active state for Firefox */
  input[type="range"]:active::-moz-range-thumb {
    border: none;
    /* Ensure no border when active */
  }

  .progress-bar {
    flex-grow: 1;
  }

  .volume-control {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .quality-toggle button.active {
    background-color: #4caf50;
    color: white;
  }
}
</style>
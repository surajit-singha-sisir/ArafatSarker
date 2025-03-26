<template>
  <div class="video-player" :class="{ 'fullscreen-mobile': isFullscreen && isMobile && isHorizontal }"
    @click="handleVideoClick" @dblclick="handleDoubleClick">
    <video ref="video" :src="src" :muted="muted" :playback-rate="playbackRate" @timeupdate="updateProgress"
      @loadedmetadata="onLoadedMetadata" @error="onError" @mousemove="handleMouseMove" @mouseenter="showPlayPaused"
      @mouseleave="hidePlayPaused" class="video-element">
      Your browser does not support the video tag.
    </video>
    <div class="abs-center playPaused" :class="{ 'deactive': !isPlayPausedVisible }" @click.stop="togglePlay">
      <i :class="{ 'm-play2': !isPlaying, 'm-pause': isPlaying }"></i>
    </div>

    <div class="controls" v-if="showControls" @mousemove="handleMouseMove" @click.stop>
      <input type="range" min="0" :max="duration" step="0.1" v-model="currentTime" @input="seek" class="progress-bar" />
      <aside class="f f-just-between gap-10 w-100">
        <div class="f-start-center gap-newGap">
          <div @click="togglePlay" class="cur-pointer">
            <i :class="{ 'm-play3': !isPlaying, 'm-pause4': isPlaying }"></i>
          </div>
          <div class="volume-control">
            <div class="relative">
              <i class="cur-pointer" @click="toggleMute" :class="{ 'm-volume-off': muted, 'm-volume-up': !muted }"></i>
            </div>
            <div class="volume-range">
              <span class="ranges">
                <input type="range" class="volume-control" min="0" max="1" step="0.1" v-model="volume"
                  @input="setVolume" />
              </span>
            </div>
          </div>
          <span class="max-w--40 text-nowrap text--08">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        </div>
        <div class="f-start-center gap-10ś gap-newGap2">
          <span class="cur-pointer" @click="togglePictureInPicture">
            <i class="text--09 m-images1"></i>
          </span>
          <div class="quality-toggle" ref="qualityToggle">
            <i class="m-cog cur-pointer" @click="getSettings"></i>
            <div class="popup-config" :class="{ 'hide': !isSettings }">
              <div class="inner-popup-config">
                <div class="quality-set">
                  <span class="qualities" v-for="q in qualities" :key="q" :class="{ active: currentQuality === q }"
                    @click="setQuality(q)">
                    {{ q.toUpperCase() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span class="cur-pointer" @click="toggleFullscreen">
            <i class="text--09"
              :class="{ 'm-fullscreen-alt': isFullscreen, 'm-fullscreen-exit-alt': !isFullscreen }"></i>
          </span>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isSettings = ref(false)
const getSettings = () => {
  isSettings.value = !isSettings.value
}

const isVolumeControl = ref(false)
const volumeControl = () => {
  isVolumeControl.value = !isVolumeControl.value
}

const props = defineProps<{
  src: string
  qualities: string[]
  initialQuality?: string
  muted?: boolean
  autoplay?: boolean
}>()

const emit = defineEmits<{
  (e: 'error', message: string): void
  (e: 'loaded'): void
  (e: 'qualityChanged', quality: string): void
}>()

const video = ref<HTMLVideoElement | null>(null)
const qualityToggle = ref<HTMLElement | null>(null)
const isPlaying = ref(false)
const muted = ref(false)
const volume = ref(1)
const currentTime = ref(0)
const duration = ref(0)
const playbackRate = ref(1)
const currentQuality = ref<string>('hd')
const isFullscreen = ref(false)
const isPictureInPicture = ref(false)
const isMobile = ref(false)
const isHorizontal = ref(false)
const showControls = ref(true)
const controlsTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const cursorTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const isCursorVisible = ref(true)
const isPlayPausedVisible = ref(false)
const playPausedTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const togglePlay = () => {
  if (video.value) {
    if (isPlaying.value) {
      video.value.pause()
      showControls.value = true
    } else {
      video.value.play()
      resetControlsTimer()
    }
    isPlaying.value = !isPlaying.value
    showPlayPaused()
  }
}

const toggleMute = () => {
  if (video.value) {
    muted.value = !muted.value
    video.value.muted = muted.value
    volume.value = muted.value ? 0 : (video.value.volume === 0 ? 1 : video.value.volume)
    if (isPictureInPicture.value && document.pictureInPictureElement) {
      const pipVideo = document.pictureInPictureElement as HTMLVideoElement
      pipVideo.muted = muted.value
      pipVideo.volume = muted.value ? 0 : Number(volume.value) // Fix: volume is number, not muted boolean
    }
  }
}

const setVolume = () => {
  if (video.value) {
    video.value.volume = Number(volume.value)
    muted.value = video.value.volume === 0
    if (isPictureInPicture.value && document.pictureInPictureElement) {
      const pipVideo = document.pictureInPictureElement as HTMLVideoElement
      pipVideo.volume = Number(volume.value)
      pipVideo.muted = muted.value
    }
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
    if (isPlaying.value) {
      resetControlsTimer()
      resetCursorTimer()
    }
    if (isMobile.value && isHorizontal.value && video.value) {
      (screen.orientation as ScreenOrientation & { lock: (orientation: string) => Promise<void> })
        .lock('landscape')
        .catch((err: unknown) => console.error('Orientation lock failed:', err))
    }
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
    showControls.value = true
    showCursor()
    if (isMobile.value && isHorizontal.value) {
      (screen.orientation as ScreenOrientation & { unlock: () => void }).unlock()
    }
  }
}

const togglePictureInPicture = async () => {
  if (video.value) {
    if (!document.pictureInPictureElement) {
      try {
        await video.value.requestPictureInPicture()
        isPictureInPicture.value = true
        if (isPictureInPicture.value && document.pictureInPictureElement) {
          const pipVideo = document.pictureInPictureElement as HTMLVideoElement
          pipVideo.volume = Number(volume.value)
          pipVideo.muted = muted.value
        }
      } catch (error) {
        console.error('Picture-in-Picture failed:', error)
      }
    } else {
      await document.exitPictureInPicture()
      isPictureInPicture.value = false
    }
  }
}

const toggleMobileControls = () => {
  if (isMobile.value) {
    showControls.value = !showControls.value
    isPlayPausedVisible.value = showControls.value

    if (playPausedTimeout.value) {
      clearTimeout(playPausedTimeout.value)
    }

    if (showControls.value) {
      playPausedTimeout.value = setTimeout(() => {
        if (isPlaying.value) {
          showControls.value = false
          isPlayPausedVisible.value = false
        }
      }, 2000)
    }
  }
}

const handleVideoClick = () => {
  if (isMobile.value) {
    toggleMobileControls()
  } else {
    togglePlay()
  }
}

const handleMouseMove = () => {
  if (!isMobile.value) {
    showControlsTemporarily()
    resetCursorTimer()
    showPlayPaused()
  }
}

const handleDoubleClick = () => {
  if (isMobile.value) {
    togglePlay()
  } else {
    toggleFullscreen()
  }
}

const showControlsTemporarily = () => {
  if (!showControls.value) {
    showControls.value = true
  }
  resetControlsTimer()
}

const resetControlsTimer = () => {
  if (controlsTimeout.value) {
    clearTimeout(controlsTimeout.value)
  }
  controlsTimeout.value = setTimeout(() => {
    if (isPlaying.value) {
      showControls.value = false
    }
  }, 2000)
}

const resetCursorTimer = () => {
  if (cursorTimeout.value) {
    clearTimeout(cursorTimeout.value)
  }
  if (!isCursorVisible.value) {
    showCursor()
  }
  cursorTimeout.value = setTimeout(() => {
    if (isPlaying.value) {
      hideCursor()
    }
  }, 2000)
}

const hideCursor = () => {
  if (video.value) {
    video.value.style.cursor = 'none'
    isCursorVisible.value = false
  }
}

const showCursor = () => {
  if (video.value) {
    video.value.style.cursor = 'auto'
    isCursorVisible.value = true
  }
}


const showPlayPaused = () => {
  if (playPausedTimeout.value) {
    clearTimeout(playPausedTimeout.value)
  }
  isPlayPausedVisible.value = true
  playPausedTimeout.value = setTimeout(() => {
    isPlayPausedVisible.value = false
  }, 2000)
}

const hidePlayPaused = () => {
  if (playPausedTimeout.value) {
    clearTimeout(playPausedTimeout.value)
  }
  playPausedTimeout.value = setTimeout(() => {
    isPlayPausedVisible.value = false
  }, 2000)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    event.preventDefault()
    togglePlay()
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (isSettings.value && qualityToggle.value && !qualityToggle.value.contains(event.target as Node)) {
    isSettings.value = false
  }
}

const checkAspectRatio = () => {
  if (video.value) {
    const aspectRatio = video.value.videoWidth / video.value.videoHeight
    isHorizontal.value = aspectRatio > 1
  }
}

const onLoadedMetadata = () => {
  if (video.value) {
    duration.value = video.value.duration
    checkAspectRatio()
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

const checkMobile = () => {
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

onMounted(() => {
  checkMobile()
  if (props.autoplay && video.value) {
    video.value.play()
    isPlaying.value = true
    resetControlsTimer()
    resetCursorTimer()
  }
  currentQuality.value = props.initialQuality || 'hd'
  window.addEventListener('keydown', handleKeyDown)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }
  if (isMobile.value && isHorizontal.value) {
    (screen.orientation as ScreenOrientation & { unlock: () => void }).unlock()
  }
  if (controlsTimeout.value) {
    clearTimeout(controlsTimeout.value)
  }
  if (cursorTimeout.value) {
    clearTimeout(cursorTimeout.value)
  }
  if (playPausedTimeout.value) {
    clearTimeout(playPausedTimeout.value)
  }
  window.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('click', handleClickOutside)
})

watch(() => props.src, () => {
  if (video.value) {
    video.value.load()
    if (isPlaying.value) video.value.play()
  }
})

watch(() => props.muted, (newVal) => {
  muted.value = newVal ?? false
  if (video.value) {
    video.value.muted = muted.value
    if (isPictureInPicture.value && document.pictureInPictureElement) {
      (document.pictureInPictureElement as HTMLVideoElement).muted = muted.value
    }
  }
})

watch(() => isPlaying.value, (newVal) => {
  if (newVal) {
    resetControlsTimer()
    resetCursorTimer()
  } else {
    if (controlsTimeout.value) {
      clearTimeout(controlsTimeout.value)
    }
    if (cursorTimeout.value) {
      clearTimeout(cursorTimeout.value)
    }
    showControls.value = true
    showCursor()
  }
})
</script>

<style scoped lang="scss">
.video-player {
  position: relative;
  width: 100%;
  height: 100%;

  &.fullscreen-mobile {
    @media screen and (max-width: 768px) {
      transform: rotate(90deg);
      transform-origin: center;
      width: 100vh;
      height: 100vw;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }

  .playPaused {
    cursor: pointer;
    font-size: 2.5rem;
    color: #e7e7e7;
    text-shadow: 0 2px 3px #333;
    opacity: 0.8;
    transition: all 0.3s ease;

    &.deactive {
      opacity: 0;
      transition: all 0.3s ease;
    }
  }

  .video-element {
    width: 100%;
    height: 100%;
    background-color: #333;
  }

  .controls {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2rem;
    margin-bottom: 0;
    width: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(0deg, #2b2b2b, #00000000);
    color: white;
    transition: all 0.3s ease;
    opacity: 1;

    @media screen and (max-width: 768px) {
      height: 2rem;
    }

    &.hide {
      opacity: 0;
      transition: all 0.3s ease;
    }

    .progress-bar {
      position: absolute;
      top: -1.1rem;
      width: 100%;
      height: 3px;
      -webkit-appearance: none;
      transition: all 0.3s ease;

      @media screen and (max-width: 768px) {
        top: -0.9rem;
      }

      &::-webkit-slider-runnable-track {
        height: 3px;
        background: #e4e4e4;
        border: none;
        transition: all 0.3s ease;
      }

      &::-moz-range-track {
        height: 3px;
        background: #e4e4e4;
        border: none;
        transition: all 0.3s ease;
      }

      &::-webkit-slider-thumb {
        width: 0.9rem;
        height: 0.9rem;
        margin-top: -6px;
        background: #ffffff;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        -webkit-appearance: none;
        transition: all 0.3s ease;
      }

      &::-moz-range-thumb {
        width: 0.85rem;
        height: 0.85rem;
        background: #666;
        border-radius: 50%;
        cursor: pointer;
        border: none;
      }
    }

    .gap-newGap {
      gap: 1rem;
    }

    @media screen and (max-width: 768px) {
      .gap-newGap {
        gap: 0.2rem !important;
      }
      .gap-newGap2 {
        gap: 0.5rem !important;
      }
    }

    .volume-control {
      display: flex;
      align-items: center;
      gap: 5px;

      .relative {
        display: flex;
        align-items: center;
      }

      .volume-range {
        position: relative;
        align-items: center;
        transition: all 0.3s ease;

        .ranges {
          position: relative;
          display: flex;
          width: 3rem;
          transition: all 0.3s ease;

          @media screen and (max-width: 768px) {
            width: 2rem;
          }

          .volume-control {
            padding: 0;
            background: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            width: 3rem;
            height: 0;
            margin-right: 1rem;
            -webkit-appearance: none;

            @media screen and (max-width: 768px) {
              width: 2rem;
            }

            &::-webkit-slider-thumb {
              margin-top: -4px;
              width: 0.65rem !important;
              height: 0.65rem !important;
              background: #e2e2e2 !important;
              border: 2px solid #fff;
            }

            &::-webkit-slider-runnable-track {
              height: 2px;
              background: #ccc;
              border: none;
            }

            &::-moz-range-track {
              height: 2px;
              background: #ccc;
              border: none;
            }

            &::-webkit-slider-thumb {
              width: 0.8rem;
              height: 0.8rem;
              background: #ffffff;
              border-radius: 50%;
              border: none;
              cursor: pointer;
              -webkit-appearance: none;
            }

            &::-moz-range-thumb {
              width: 0.85rem;
              height: 0.85rem;
              background: #666;
              border-radius: 50%;
              cursor: pointer;
              border: none;
            }
          }
        }
      }
    }

    .popup-config {
      position: relative;
      width: 100%;
      height: auto;

      &.hide {
        display: none;
      }

      .inner-popup-config {
        position: absolute;
        width: 7rem;
        height: 7rem;
        top: -10rem;
        right: -2rem;
        border-radius: 0.2rem;
        box-shadow: 0 2px 4px #363636;
        padding: 0.5rem;
        background-color: #3f3f3f;

        .quality-set {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: #fff;

          .qualities {
            position: relative;
            padding: 0.5rem;
            border-radius: 0.2rem;
            font-size: 0.8rem;
            color: #fff;
            cursor: pointer;

            &.active {
              background-color: #4d4d4d;
              box-shadow: 0 1px 3px #363636;
              color: #fff;

              &::before {
                content: '\f2e6';
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                font-size: 0.8rem;
                margin-right: 0.5rem;
                font-family: 'mastorsIcons' !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
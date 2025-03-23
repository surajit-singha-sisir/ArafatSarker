<template>
  <div>
    <video
      ref="videoPlayer"
      src="http://192.168.0.111:3000/media/arafat/close_up_shot_of_diya_oil_lamps_celebrating_festival_of_diwali_burning_in_the_dar_A92uIj0.mp4"
      autoplay
      muted
      playsinline
      loop
    ></video>
    <button @click="togglePlayPause">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Create a reference to the video element
const videoPlayer = ref<HTMLVideoElement | null>(null)
// Track playing state
const isPlaying = ref(true) // Set to true since autoplay is enabled

// Toggle play/pause functionality
const togglePlayPause = () => {
  if (videoPlayer.value) {
    if (isPlaying.value) {
      videoPlayer.value.pause()
    } else {
      videoPlayer.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

// Optional: Ensure the video reference is properly set up when component mounts
onMounted(() => {
  if (videoPlayer.value) {
    // Set initial state based on autoplay
    isPlaying.value = !videoPlayer.value.paused
  }
})
</script>
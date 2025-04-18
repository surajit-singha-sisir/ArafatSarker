<template>
  <div class="video-modal-box" :class="{ 'modal-outs': !isModalOpen, 'modal-ins': isModalOpen }">
    <div class="inner-modal-box">
      <button class="abs-top-right cur-pointer" @click="closeModal"><i class="m-cross1"></i></button>
      <aside class="main-window">
        <slot name="main" />
      </aside>
      <aside class="related-window scroll-bar">
        <slot name="related" />
      </aside>
    </div>
    <span class="overlay-dark" @click="closeModal"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  isOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isModalOpen = ref(true)

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = '';
  setTimeout(() => {
    emit('close')
  }, 500)
}

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscKey)
  document.body.style.overflow = 'hidden';
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscKey)
  document.body.style.overflow = '';
})
</script>

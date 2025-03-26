<!-- VideoModal.vue -->
<template>
  <div class="video-modal-box" :class="{ 'modal-out': !isModalOpen, 'modal-in': isModalOpen }">
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
  document.body.classList.add('no-scroll')
  window.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.body.classList.remove('no-scroll')
  window.removeEventListener('keydown', handleEscKey)
})
</script>

<style scoped>
/* :global(body.no-scroll) {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: fixed;
  scrollbar-width: none;
  -ms-overflow-style: none;
} */
/* :global(body.no-scroll::-webkit-scrollbar) {
  display: none;
} */
</style>
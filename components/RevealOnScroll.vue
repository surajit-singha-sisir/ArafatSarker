<!-- components/RevealOnScroll.vue -->
<template>
  <div ref="revealContainer" class="reveal-container" :class="{ 'revealed': isRevealed }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const revealContainer = ref<HTMLElement | null>(null)
const isRevealed = ref<boolean>(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!revealContainer.value) return

  observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          isRevealed.value = true
          // Stop observing after animation triggers once
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2, // Trigger when 20% of container is visible
      rootMargin: '0px' // No margin offset
    }
  )

  // Observe the container itself
  observer.observe(revealContainer.value)

  // Add reveal-item class to all children initially
  const items = revealContainer.value.children as HTMLCollection
  Array.from(items).forEach((item: Element) => {
    item.classList.add('reveal-item')
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.reveal-container {
  overflow: hidden;
}

.reveal-item {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease-out;
}

.reveal-container.revealed .reveal-item {
  opacity: 1;
  transform: translateY(0);
}
</style>
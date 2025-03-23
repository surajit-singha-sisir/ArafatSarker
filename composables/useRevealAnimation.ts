// composables/useRevealAnimation.ts
import { reactive, onMounted, onUnmounted, computed } from 'vue'
import type { Ref } from 'vue'

export function useRevealAnimation(targetRef: Ref<HTMLElement | null>) {
  const state = reactive({
    isVisible: false
  })

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of element is visible
  }

  const getAnimationStyles = (): string => `
    .revealed [data-direction] {
      opacity: 0;
      transition: all 0.6s ease-out;
    }

    .revealed.visible [data-direction] {
      opacity: 1;
    }

    .revealed.visible [data-direction="left"] {
      transform: translateX(0);
    }
    .revealed [data-direction="left"] {
      transform: translateX(-50px);
    }

    .revealed.visible [data-direction="right"] {
      transform: translateX(0);
    }
    .revealed [data-direction="right"] {
      transform: translateX(50px);
    }

    .revealed.visible [data-direction="top"] {
      transform: translateY(0);
    }
    .revealed [data-direction="top"] {
      transform: translateY(-50px);
    }

    .revealed.visible [data-direction="bottom"] {
      transform: translateY(0);
    }
    .revealed [data-direction="bottom"] {
      transform: translateY(50px);
    }
  `

  const applyStyles = (): HTMLStyleElement => {
    const styleElement: HTMLStyleElement = document.createElement('style')
    styleElement.textContent = getAnimationStyles()
    document.head.appendChild(styleElement)
    return styleElement
  }

  onMounted(() => {
    const styleElement: HTMLStyleElement = applyStyles()

    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            state.isVisible = true
            observer.unobserve(entry.target)
          }
        })
      },
      observerOptions
    )

    if (targetRef.value) {
      observer.observe(targetRef.value)
    }

    onUnmounted(() => {
      observer.disconnect()
      document.head.removeChild(styleElement)
    })
  })

  return {
    isVisible: computed(() => state.isVisible)
  }
}
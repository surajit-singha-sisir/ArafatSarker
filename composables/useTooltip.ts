// useTooltip.ts
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface TooltipOptions {
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  offset?: number
}

export function useTooltip(
  triggerElement: Ref<HTMLElement | null>,
  tooltipElement: Ref<HTMLElement | null>,
  options: TooltipOptions = {}
) {
  const isVisible = ref(false)
  const { 
    position = 'top', 
    delay = 200, 
    offset = 8 
  } = options

  let showTimeout: number | null = null
  let hideTimeout: number | null = null

  const updatePosition = () => {
    if (!triggerElement.value || !tooltipElement.value || !isVisible.value) return

    const triggerRect = triggerElement.value.getBoundingClientRect()
    const tooltipRect = tooltipElement.value.getBoundingClientRect()

    let top: number
    let left: number

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left - tooltipRect.width - offset
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + offset
        break
    }

    if (tooltipElement.value) {
      tooltipElement.value.style.top = `${top + window.scrollY}px`
      tooltipElement.value.style.left = `${left + window.scrollX}px`
    }
  }

  const showTooltip = () => {
    console.log('showTooltip called')
    if (hideTimeout) clearTimeout(hideTimeout)
    showTimeout = setTimeout(() => {
      isVisible.value = true
      console.log('Tooltip shown, isVisible:', isVisible.value)
      requestAnimationFrame(updatePosition)
    }, delay) as unknown as number
  }

  const hideTooltip = () => {
    console.log('hideTooltip called')
    if (showTimeout) clearTimeout(showTimeout)
    hideTimeout = setTimeout(() => {
      isVisible.value = false
      console.log('Tooltip hidden, isVisible:', isVisible.value)
    }, 100) as unknown as number // Small delay to prevent flicker
  }

  const setupEvents = () => {
    if (!triggerElement.value) {
      console.log('Trigger element not found')
      return () => {}
    }

    const element = triggerElement.value
    console.log('Setting up events on:', element)

    element.addEventListener('mouseenter', showTooltip)
    element.addEventListener('mouseleave', hideTooltip)
    element.addEventListener('focus', showTooltip)
    element.addEventListener('blur', hideTooltip)

    return () => {
      element.removeEventListener('mouseenter', showTooltip)
      element.removeEventListener('mouseleave', hideTooltip)
      element.removeEventListener('focus', showTooltip)
      element.removeEventListener('blur', hideTooltip)
    }
  }

  onMounted(() => {
    const cleanupEvents = setupEvents()
    window.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)

    onUnmounted(() => {
      cleanupEvents()
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
      if (showTimeout) clearTimeout(showTimeout)
      if (hideTimeout) clearTimeout(hideTimeout)
    })
  })

  return {
    isVisible,
    showTooltip,
    hideTooltip,
  }
}
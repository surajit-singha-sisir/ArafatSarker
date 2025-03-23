// components/RevealAnimation.vue
<template>
  <div ref="target" :class="{ 'revealed': true, 'visible': isVisible, 'overflow-hidden': isVisible }">
    <slot></slot>


    <!-- <span data-direction="left">Span Element</span>
    <p data-direction="right">Paragraph Element</p>
    <div data-direction="left">Div Element</div>
    <p data-direction="left">Paragraph Element</p>
    <div data-direction="right">Div Element</div> -->
  </div>
</template>

<script setup lang="ts">
import { useRevealAnimation } from '~/composables/useRevealAnimation'
import { computed } from 'vue'

const target = ref<HTMLElement | null>(null)
const { isVisible } = useRevealAnimation(target)
</script>
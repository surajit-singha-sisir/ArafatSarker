<template>
    <div class="testimonial-container res-container">
        <div class="gapped"></div>

        <div class="title">
            <h2>TESTIMONIAL</h2>
            <div class="arrows">
                <button type="button" @click="previous" class="btn btn-rounded"
                    :class="{ 'btn-primary': isPrevious, 'btn-secondary': !isPrevious }" title="Previous Testimonial">
                    <i class="m-chevron-left"></i>
                </button>
                <button type="button" @click="next" class="btn btn-rounded"
                    :class="{ 'btn-primary': isNext, 'btn-secondary': !isNext }" title="Next Testimonial">
                    <i class="m-chevron-right"></i>
                </button>
            </div>
        </div>

        <div class="testimonial-slider">
            <transition :name="direction">
                <div v-if="testimonials" class="testimonialX" :key="currentIndex">
                    <aside class="img-round">
                        <NuxtImg :src="`https://arafatsarkar.com/${testimonials[currentIndex]?.user_profile}`"
                            alt="testimonial person image" />
                    </aside>
                    <aside class="details">
                        <span class="quote-left i-position"><i class="m-left-quote"></i></span>
                        <div class="testimonial">
                            {{ testimonials[currentIndex]?.testimonial }}
                        </div>
                        <div class="customer-info">
                            <b>{{ testimonials[currentIndex]?.name }}</b>
                            <p>{{ testimonials[currentIndex]?.desgination }}</p>
                        </div>
                        <span class="quote-right ib-position"><i class="m-right-quote"></i></span>
                    </aside>
                </div>
                <div v-else>
                    <p>No testimonials available.</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped lang="scss">
.title {
    h2 {}
}

@media screen and (max-width: 768px) {
    .title {
        flex-wrap: wrap;

        h2 {
            font-size: 1.2rem;
        }
    }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Testimonial {
    id: number;
    name: string;
    desgination: string;
    address: string;
    user_profile: string;
    testimonial: string;
    hide: boolean;
    created_at: string;
}

const currentIndex = ref(0)
const isPrevious = ref(false)
const isNext = ref(true)
const autoPlayInterval = ref<NodeJS.Timeout | null>(null)
const direction = ref('right')

const { data: testimonials, error } = await useFetch<Testimonial[]>('https://arafatsarkar.com/api/api_testimonial', {
    default: () => []
})

const startAutoPlay = () => {
    autoPlayInterval.value = setInterval(() => {
        next()
    }, 5000)
}

const stopAutoPlay = () => {
    if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value)
    }
}

const next = () => {
    if (!testimonials.value || testimonials.value.length === 0) return

    stopAutoPlay()
    direction.value = 'right'
    currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
    updateButtonStates()
    startAutoPlay()
}

const previous = () => {
    if (!testimonials.value || testimonials.value.length === 0) return

    stopAutoPlay()
    direction.value = 'slide'
    currentIndex.value = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length
    updateButtonStates()
    startAutoPlay()
}

const updateButtonStates = () => {
    if (!testimonials.value || testimonials.value.length <= 1) {
        isPrevious.value = false
        isNext.value = false
        return
    }

    isPrevious.value = currentIndex.value > 0
    isNext.value = currentIndex.value < testimonials.value.length - 1
}

onMounted(() => {
    updateButtonStates()
    startAutoPlay()
})

onUnmounted(() => {
    stopAutoPlay()
})
</script>
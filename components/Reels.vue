<template>
    <section class="reels">
        <div class="inner-reels res-container">
            <h2 class="text-center">Reels</h2>
            <section class="reels-samples">
                <div class="bordered-circle chevron" @click="revealPreviousItem"><i class="m-chevron-left"></i></div>
                <div class="all-reels">
                    <RevealAnimation>
                        <div class="reel-container snap-x" data-direction="top" ref="reelContainer">
                            <div class="reel" v-for="(reel, index) in Reels" :key="index">
                                <div class="title text-dotted-2">
                                    <p class="text-dotted-2">{{ reel?.title }}</p>
                                </div>
                                <div class="thumbnail">
                                    <NuxtImg class="img h-full fit-cover" :src="`${URL}${reel.thumbnail}`"
                                        :alt="reel.title" />
                                </div>
                                <div class="play-icon" title="Play" @click="playReel(index)">
                                    <i class="m-play2"></i>
                                </div>
                                <div class="duration">
                                    <NuxtLink target="_blank" :to="reel.reel_link"><i class="m-facebook4"></i>
                                    </NuxtLink>
                                    <p>1 min</p>
                                </div>
                            </div>
                        </div>
                    </RevealAnimation>
                </div>
                <div class="bordered-circle chevron" @click="revealNextItem"><i class="m-chevron-right"></i></div>
            </section>

            <!-- Modal for playing reel -->
            <div v-if="showModal" class="modal" @click.self="closeModal">
                <div class="modal-content">
                    <button class="close-btn" @click="closeModal"><i class="m-cross1"></i></button>
                    <iframe :src="currentReelLink" frameborder="0" allowfullscreen class="reel-iframe"></iframe>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const URL = 'http://192.168.0.111:3000';

interface Reel {
    id: number;
    created_at: string;
    type: string;
    thumbnail: string;
    title: string;
    reel_link: string;
    tag: string;
    hide: boolean;
    category: number;
}

interface MediaData {
    reel: Reel[];
    video: Reel[];
}

const { data: mediaData, error } = await useFetch<MediaData>(`${URL}/api/api_recent`);
const Reels = ref<Reel[]>(mediaData.value?.reel || []);
const reelContainer = ref<HTMLElement | null>(null);
const showModal = ref(false);
const currentReelLink = ref('');

// Play reel functionality
const playReel = (index: number) => {
    currentReelLink.value = Reels.value[index].reel_link;
    showModal.value = true;
};

// Close modal
const closeModal = () => {
    showModal.value = false;
    currentReelLink.value = '';
};

// Calculate scroll amount (one item width)
const getScrollAmount = () => {
    if (reelContainer.value) {
        const reelWidth = reelContainer.value.querySelector('.reel')?.clientWidth || 0;
        const gap = 16; // 1rem gap converted to pixels
        return reelWidth + gap; // Include gap in scroll amount
    }
    return 0;
};

// Scroll to reveal previous item
const revealPreviousItem = () => {
    if (reelContainer.value) {
        const scrollAmount = getScrollAmount();
        reelContainer.value.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    }
};

// Scroll to reveal next item
const revealNextItem = () => {
    if (reelContainer.value) {
        const scrollAmount = getScrollAmount();
        reelContainer.value.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
};
</script>

<style scoped>
/* Modal styles remain in component */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    position: relative;
    width: 90%;
    height: 90%;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    border: none;
    background: none;
    cursor: pointer;
}

.reel-iframe {
    width: 100%;
    height: 450px;
}
</style>
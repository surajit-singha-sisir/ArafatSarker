<template>
    <div class="video-skeleton">
    </div>
</template>

<style scoped>
.video-skeleton {
    width: 100%;
    height: 100%;
    background: #071827;
    position: relative;
}

.video-skeleton::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            transparent,
            #071827,
            transparent);
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.video-skeleton {
    animation: pulse 3s infinite ease-in-out;
}

@keyframes pulse {
    0% {
        background-color: #103a5c;
    }

    50% {
        background-color: #071827;
    }

    100% {
        background-color: #132738;
    }
}
</style>
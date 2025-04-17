<template>
    <main class="w-100">

        <Head>
            <Title>{{ seo.title }}</Title>
            <Meta name="description" :content="seo.description" />
            <Meta name="keywords" :content="seo.keywords" />
            <Link rel="canonical" :href="seo.canonical" />

            <!-- Open Graph / Facebook -->
            <Meta property="og:type" content="website" />
            <Meta property="og:url" :content="seo.canonical" />
            <Meta property="og:title" :content="seo.title" />
            <Meta property="og:description" :content="seo.description" />
            <Meta property="og:image" :content="seo.ogImage" />
            <Meta property="og:site_name" content="Arafat Sarkar" />
            <Meta property="og:locale" content="en_US" />

            <!-- Twitter -->
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:url" :content="seo.canonical" />
            <Meta name="twitter:title" :content="seo.title" />
            <Meta name="twitter:description" :content="seo.description" />
            <Meta name="twitter:image" :content="seo.ogImage" />
            <Meta name="twitter:creator" content="@arafatsarkar" />

            <!-- Schema.org for Google -->
            <SchemaOrgPerson name="Arafat Sarkar" jobTitle="Cinematographer" :url="seo.canonical"
                :description="seo.description" :telephone="aboutData?.phone || '+880168817402'"
                :email="aboutData?.email || 'arafatsarkar@gmail.com'" :address="{
                    '@type': 'PostalAddress',
                    addressLocality: 'Chattagram',
                    addressCountry: 'Bangladesh'
                }" :sameAs="[
            'https://www.facebook.com/arafatsarkarrasel1',
            'https://twitter.com/arafatsarkarofficial',
            'https://www.instagram.com/arafatsarkarofficial',
            'https://www.linkedin.com/in/arafatsarkarofficial'
        ]" />
        </Head>

        <section class="about-sections">
            <article class="about-myself pad-05 w-100 f gap-10 f-col f-wrap">
                <div class="w-100 pad-b--10">
                    <h1 class="text-center">About Myself!</h1>
                </div>
                <div v-if="aboutPending" class="loading">
                    <p>Loading bio...</p>
                </div>
                <div v-else-if="aboutError" class="error">
                    <p>Failed to load bio. Please try again later.</p>
                </div>
                <div v-else>
                    <p>I'm <span class="b">{{ aboutData?.name || 'Arafat Sarkar' }}</span> !</p>
                    <p v-html="formattedMessage" />
                </div>
                <div class="f gap-10">
                    <NuxtLink class="btn btn-primary" to="/contacts">Hire Me!</NuxtLink>
                    <NuxtLink to="/videos" class="btn btn-warning">Explore My Works!</NuxtLink>
                </div>
            </article>
            <div class="about-image">
                <NuxtImg class="img" src="images/about.png" alt="Arafat Sarkar, Cinematographer in Bangladesh"
                    width="600" height="800" format="webp" quality="80" loading="lazy" />
            </div>
        </section>
        <h2 class="text-center pad-t--50">My Gearlist</h2>
        <section class="gear w-100">
            <section class="inner-gear">
                <div v-if="gearPending" class="loading">
                    <p>Loading gear...</p>
                </div>
                <div v-else-if="gearError" class="error">
                    <p>Failed to load gear list. Please try again later.</p>
                </div>
                <div v-else-if="!gearData?.length" class="empty">
                    <p>No gear available at the moment.</p>
                </div>
                <div v-else v-for="gear in gearData" :key="gear.id" class="single-gear">
                    <div class="img-gear">
                        <div class="overlay-gear">{{ gear.name }}</div>
                        <NuxtImg
                            :src="gear.image ? `${BASE_URL}${gear.image}` : `https://dummyimage.com/200x200/ccc/fff.png?text=${encodeURIComponent(gear.name)}`"
                            :alt="`${gear.name} for cinematography`" width="200" height="200" format="webp" quality="80"
                            loading="lazy" />
                    </div>
                    <div class="pad--05 b-Gray-200 b-lrb--01">
                        <p class="text-dotted-2">{{ gear.details }}</p>
                    </div>
                </div>
            </section>
        </section>
    </main>
</template>

<script setup lang="ts">
const BASE_URL = 'https://arafatsarkar.com';

// Interface for Bio API
interface AboutData {
    id: number;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}

// Interface for Gear API
interface GearData {
    id: number;
    created_at: string;
    name: string;
    image: string | null;
    details: string;
}

// Fetch bio data
const { data: aboutDataRaw, pending: aboutPending, error: aboutError } = await useFetch<AboutData | AboutData[]>('https://arafatsarkar.com/api/api_about', {
    method: 'GET',
    server: false,
});

// Normalize bio data
const aboutData = computed(() => {
    if (Array.isArray(aboutDataRaw.value)) {
        return aboutDataRaw.value[0] || null;
    }
    return aboutDataRaw.value || null;
});

// Format bio message
const formattedMessage = computed(() => {
    if (aboutData.value?.message) {
        return aboutData.value.message.replace(/\r\n\r\n/g, '</p><p>').replace(/\r\n/g, '<br>');
    }
    return 'A passionate cinematographer driven by storytelling through visuals.';
});

// Fetch gear data
const { data: gearData, pending: gearPending, error: gearError } = await useFetch<GearData[]>('https://arafatsarkar.com/api/api_gear', {
    method: 'GET',
    server: false,
});

// Dynamic SEO configuration
const seo = computed(() => ({
    title: `${aboutData.value?.name || 'Arafat Sarkar'} | About`,
    description:
        aboutData.value?.message.slice(0, 160) ||
        'Learn about Arafat Sarkar, a passionate cinematographer from Bangladesh, showcasing his journey, gear, and creative vision in videography and filmmaking.',
    keywords: 'Arafat Sarkar, cinematographer, Bangladesh, videography, drone photography, filmmaking, gear, portfolio',
    canonical: 'https://arafatsarkar.com/about',
    ogImage: 'https://arafatsarkar.com/images/about.png',
}));
</script>

<style lang="scss">
.about-sections {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
        flex-direction: column-reverse;

        .about-image {
            height: 60vh;
        }
    }
}

.about-myself {
    position: relative;
    max-width: 50%;
    padding: 1rem;

    @media screen and (max-width: 768px) {
        max-width: 100%;
    }

    p {
        font-size: 1.1rem;
        line-height: 1.4;
        color: #555;
        margin-bottom: 1rem;
    }


    .loading,
    .error {
        text-align: center;
        color: #555;
        font-size: 1.1rem;
    }
}

.about-image {
    position: relative;
    height: 90vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
    }

    @media screen and (max-width: 768px) {
        height: 60vh;
    }
}

.gear {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2rem 0;

    .inner-gear {
        width: 80%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        padding: 2rem 0;
        justify-content: center;

        @media screen and (max-width: 1080px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (max-width: 520px) {
            grid-template-columns: 1fr;
        }

        .loading,
        .error,
        .empty {
            grid-column: 1 / -1;
            text-align: center;
            color: #555;
            font-size: 1.1rem;
        }

        .single-gear {
            position: relative;
            background: white;
            border-radius: 0.5rem;

            .overlay-gear {
                position: absolute;
                padding: 0.3rem 0.75rem;
                right: 0;
                top: 0;
                border-top-left-radius: 0.5rem;
                border-bottom-left-radius: 0.5rem;
                font-size: 0.9rem;
                color: white;
                background-color: #006400;
                z-index: 5;
            }

            .img-gear {
                position: relative;
                width: 100%;
                aspect-ratio: 1;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;

                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }

            .pad--05 {
                padding: 1rem;
                text-align: center;

                p {
                    font-size: 0.95rem;
                    line-height: 1.5;
                    color: #555;
                }
            }
        }
    }
}
</style>
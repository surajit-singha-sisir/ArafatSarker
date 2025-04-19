<template>
    <section>
        <!-- SEO Configuration using @nuxtjs/seo -->

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
            <SchemaOrgWebSite name="Arafat Sarkar" :url="seo.canonical"
                description="Arafat Sarkar - Professional Cinematographer showcasing stunning reels, videos, and testimonials."
                :publisher="{
                    '@type': 'Organization',
                    name: 'Arafat Sarkar',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://arafatsarkar.com/images/logo.svg'
                    }
                }" creator="KEHEM IT" :potentialAction="{
                    '@type': 'SearchAction',
                    target: 'https://arafatsarkar.com/search?q={search_term_string}',
                    'query-input': 'required name=search_term_string'
                }" />
            <SchemaOrgPerson name="Arafat Sarkar" jobTitle="Cinematographer" :url="seo.canonical" :sameAs="[
                'https://www.facebook.com/arafatsarkarrasel1',
                'https://twitter.com/arafatsarkarofficial',
                'https://www.instagram.com/arafatsarkarofficial',
                'https://www.linkedin.com/in/arafatsarkarofficial'
            ]" />
        </Head>
        <!-- <NuxtOgImage component="OgImage" :props="{ title: 'Home Page' }" /> -->
        <Banner id="banner" />
        <Reels id="reels" />
        <Videos id="portfolio" />
        <Testimonials id="testimonial" />
        <Companies id="company" />
    </section>
</template>

<script setup lang="ts">
const seo = {
    title: "Arafat Sarkar | Cinematographer Portfolio",
    description: "Discover Arafat Sarkar's cinematography portfolio, featuring captivating reels, professional videos, filmmaking.",
    keywords: "cinematographer, Arafat Sarkar, portfolio, videography, reels, filmmaking, professional videos",
    canonical: "https://arafatsarkar.com",
    ogImage: "https://arafatsarkar.com/images/about.png"
}

defineOgImageComponent('NuxtSeo', {
    title: 'Arafat Sarkar | Cinematographer Portfolio',
    description: "Discover Arafat Sarkar's cinematography portfolio, featuring captivating reels, professional videos",
    colorMode: 'white',
});
</script>
<template>
    <footer class="footer-container">
        <div class="inner-footer res-container">
            <div class="logo">
                <NuxtImg class="img" src="images/logo-white.svg" />
            </div>
            <div class="socials" v-if="data">
                <NuxtLink :to="data.facebook" class="social-link bordered-circle"><i class="m-facebook3"></i></NuxtLink>
                <NuxtLink :to="data.twitter" class="social-link bordered-circle"><i class="m-x2 text-09"></i></NuxtLink>
                <NuxtLink :to="data.instagram" class="social-link bordered-circle"><i class="m-instagram1"></i>
                </NuxtLink>
                <NuxtLink :to="data.linkedin" class="social-link bordered-circle"><i class="m-linkedin3"></i></NuxtLink>
                <NuxtLink :to="data.whatsapp" class="social-link bordered-circle"><i class="m-whatsapp1"></i></NuxtLink>
                <NuxtLink :to="data.youtube" class="social-link bordered-circle"><i class="m-youtube1"></i></NuxtLink>
                <NuxtLink :to="data.email" class="social-link bordered-circle"><i class="m-mail5"></i></NuxtLink>
            </div>
            <div class="other-links">
                <NuxtLink to="/">Achievements</NuxtLink>
                <NuxtLink to="/">Newsletter</NuxtLink>
                <NuxtLink to="/">FAQ</NuxtLink>
            </div>
        </div>
        <div class="credits">Design & Developed by <NuxtLink to="https://kehem.com/">KEHEM IT</NuxtLink>
        </div>
    </footer>
</template>


<script setup lang="ts">

interface Socials {
    id: number
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
    youtube: string
    whatsapp: string
    email: string
}

const { data, error } = await useFetch<Socials>('http://192.168.0.111:3000/api/api_social');


</script>
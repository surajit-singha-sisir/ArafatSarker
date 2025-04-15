<template>
    <footer class="footer-container">
        <div class="inner-footer res-container">
            <div class="logo">
                <NuxtImg class="img" src="images/logo-white.svg" alt="Arafat Sarkar Portfolio Logo"/>
            </div>
            <div class="socials" v-if="data">
                <NuxtLink v-if="data.facebook" :to="data.facebook" title="Facebook" class="social-link bordered-circle"><i class="m-facebook3"></i></NuxtLink>
                <NuxtLink v-if="data.twitter" :to="data.twitter" title="TwitterX" class="social-link bordered-circle"><i class="m-x2 text-09"></i></NuxtLink>
                <NuxtLink v-if="data.instagram" :to="data.instagram" title="Instagram" class="social-link bordered-circle"><i class="m-instagram1"></i>
                </NuxtLink>
                <NuxtLink v-if="data.linkedin" :to="data.linkedin" title="Linkedin" class="social-link bordered-circle"><i class="m-linkedin3"></i></NuxtLink>
                <NuxtLink v-if="data.whatsapp" :to="data.whatsapp" title="Whatsapp" class="social-link bordered-circle"><i class="m-whatsapp1"></i></NuxtLink>
                <NuxtLink v-if="data.youtube" :to="data.youtube" title="Youtube" class="social-link bordered-circle"><i class="m-youtube1"></i></NuxtLink>
                <NuxtLink v-if="data.email" :to="data.email" title="Email" class="social-link bordered-circle"><i class="m-mail5"></i></NuxtLink>
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

const { data, error } = await useFetch<Socials>('https://arafatsarkar.com/api/api_social');


</script>
<template>
    <section class="f f-col gap-10 companies">
        <h1 class="text-center">Collaborate Companies</h1><br>
        <div class="inner-comp">
            <div class="comp-item" v-for="item in data" :key="item.id">
                <div class="w-100 h-100 f-center">
                    <p class="comp-name">{{ item.name }}</p>
                    <NuxtImg :src="`${URL}${item.logo}`" :alt="item.name" loading="lazy" />
                </div>
            </div>
        </div><br><br><br>
    </section>
</template>

<style lang="scss">
.companies {
    position: relative;
    width: 90%;
    margin: 0 auto;
    margin-top: 5rem;

    h1 {
        color: #444144;

        @media screen and (max-width: 520px) {
            font-size: 1.2rem;
            font-weight: 600;
        }
    }

    .inner-comp {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        @media screen and (max-width: 920px) {
            flex-wrap: wrap;
        }

        @media screen and (max-width: 520px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            width: 90%;

            .comp-item {
                width: 100%;

                .comp-name {
                    font-size: 0.7rem;
                }
            }
        }
    }

    .comp-item {
        position: relative;
        width: 10rem;
        aspect-ratio: 1;
        overflow: hidden;
        box-shadow: 0 2px 4px #ccc;
        padding: 0.5rem;

        .comp-name {
            position: absolute;
            bottom: -100%;
            background-color: #444144;
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
            transition: all 0.3s ease;
            color: #fff;
        }

        &:hover .comp-name {
            bottom: 0;
            transition: all 0.3s ease;
        }

        img {
            width: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
}
</style>


<script setup lang="ts">
interface Companies {
    id: number,
    name: string,
    logo: string
}
const URL = 'https://arafatsarkar.com';
const { data, error } = useLazyFetch<Companies[]>(`${URL}/api/api_arafat_company`, {
    method: 'GET'
})

</script>
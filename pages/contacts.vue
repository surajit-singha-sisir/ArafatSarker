<template>
  <section class="contact-page">
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
      <SchemaOrgPerson
        name="Arafat Sarkar"
        jobTitle="Cinematographer"
        :url="seo.canonical"
        :description="seo.description"
        :email="contactInfo.email"
        :telephone="contactInfo.phone"
        :address="{
          '@type': 'PostalAddress',
          addressLocality: 'Chattagram',
          addressCountry: 'Bangladesh'
        }"
        :sameAs="[
          'https://www.facebook.com/arafatsarkarrasel1',
          'https://twitter.com/arafatsarkarofficial',
          'https://www.instagram.com/arafatsarkarofficial',
          'https://www.linkedin.com/in/arafatsarkarofficial'
        ]"
      />
    </Head>

    <div class="banner">
      <NuxtImg class="banner-img" src="images/contact.png" alt="Arafat Sarkar Contact Image" />
    </div>
    <div class="g-res-2-col-container gap-10 res-container m-auto">
      <form action="" method="post" class="form f-center-start gap-20 f-col m-b-20">
        <h4>Contact Me !</h4>
        <div class="input-container border-all shadow">
          <input required type="text" class="input-field" placeholder=" ">
          <span class="placeholder-text star">Enter Your Name</span>
        </div>
        <div class="input-container border-all shadow">
          <input required type="email" class="input-field" placeholder=" ">
          <span class="placeholder-text">Enter Your Email</span>
        </div>
        <div class="input-container border-all shadow">
          <input required type="number" class="input-field" placeholder=" ">
          <span class="placeholder-text star">Enter Your Phone</span>
        </div>
        <div class="input-container border-all shadow">
          <textarea required name="message" id="message" placeholder="" class="input-field"></textarea>
          <span class="placeholder-text star">Enter Your Message</span>
        </div>
        <span>I will contact you as soon as possible through your mobile or email</span>
        <div class="f-center w-100">
          <input type="submit" value="Submit">
        </div>
      </form>
      <div class="about-section m-b-20">
        <div class="card-container">
          <div class="profile">
            <NuxtImg src="images/profile.png" alt="Arafat Sarkar Profile Image"/>
          </div>
          <div class="profile-card">
            <div class="w-100 f gap-10 f-col m-t-40">
              <table>
                <tbody>
                  <tr>
                    <td>E-mail</td>
                    <td>:</td>
                    <td>arafat@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>:</td>
                    <td>+88018548548</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ContactInfo {
  email: string;
  phone: string;
}

const contactInfo: ContactInfo = {
  email: 'arafat@gmail.com',
  phone: '+88018548548',
};

const seo = computed(() => ({
  title: 'Arafat Sarkar | Contacts',
  description: 'Get in touch with Arafat Sarkar, a professional cinematographer based in Bangladesh, for inquiries about videography, filmmaking, or collaborations.',
  keywords: 'Arafat Sarkar, cinematographer, contact, Bangladesh, videography, filmmaking, portfolio',
  canonical: 'https://arafatsarkar.com/contact',
  ogImage: 'https://arafatsarkar.com/images/profile.png',
}));
</script>

<style lang="scss">
@use "assets/styles/core/variables.scss" as *;

.about-section {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  z-index: 5;

  .profile {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 7rem;
    aspect-ratio: 1;
    border: 7px solid #fff;
    border-radius: 50%;
    z-index: 5;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .profile-card {
    position: relative;
    display: flex;
    width: 25rem;
    height: 11rem;
    border-radius: 0.4rem;
    padding: 1rem;
    margin-top: 4rem;
    background-color: $hard;
    box-shadow: 0 1px 5px #00000034;
    z-index: 2;

    @media screen and (max-width: 768px) {
      width: 100% !important;
    }
  }
}

.banner {
  display: block;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  margin-bottom: 2rem;

  .banner-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;

    .banner-img {
      width: 120%;
      height: auto;
      object-position: center;
    }
  }
}

.g-res-2-col-container {
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
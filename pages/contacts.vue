<template>
    <section class="contact-page">
        <div class="banner">
            <NuxtImg class="banner-img" src="images/contact.png" />
        </div>
        <div class="g-res-2-col-container gap-10 res-container m-auto">
            <form action="" method="post" class="form f-center-start gap-20 f-col m-b-20">
                <h4>Contact Me !</h4>
                <div class="input-container border-all shadow"><input required type="text" class="input-field"
                        placeholder=" "><span class="placeholder-text star">Enter Your Name</span></div>
                <div class="input-container border-all shadow"><input required type="email" class="input-field"
                        placeholder=" "><span class="placeholder-text">Enter Your Email</span></div>
                <div class="input-container border-all shadow"><input required type="number" class="input-field"
                        placeholder=" "><span class="placeholder-text star">Enter Your Phone</span></div>
                <div class="input-container border-all shadow"><textarea required name="message" id="message"
                        placeholder="" class="input-field"></textarea><span class="placeholder-text star">Enter Your
                        Message</span></div>
                <span>I will contact you as soon as possible through your mobile or email</span>
                <div class="f-center w-100"><input type="submit" value="Submit"></div>
            </form>
            <div class="about-section m-b-20">
                <div class="card-container">
                    <div class="profile">
                        <NuxtImg src="images/profile.png" />
                    </div>
                    <div class="profile-card">
                        <div class="w-100 f gap-10 f-col m-t-40">
                            <table>
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
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


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
<template>
    <div class="container">
        <div class="navbar-container">
            <div class="navbar">
                <nuxt-link to="/admin/tournaments">
                    <div class="navbar__items">
                    Tournamets
                    </div>
                </nuxt-link>
                <nuxt-link to="leagues">
                    <div class="navbar__items">
                    Leagues
                    </div>
                </nuxt-link>
                <nuxt-link to="players">
                    <div class="navbar__items">
                    Players
                    </div>
                </nuxt-link>
                <nuxt-link to="payments">
                    <div class="navbar__items">
                    Payments
                    </div>
                </nuxt-link>
                <nuxt-link to="calender">
                    <div class="navbar__items">
                    Calender
                    </div>
                </nuxt-link>
                <nuxt-link to="teams">
                    <div class="navbar__items">
                    Teams
                    </div>
                </nuxt-link>
                <nuxt-link to="news">
                    <div class="navbar__items">
                    NEWS
                    </div>
                </nuxt-link>
                <nuxt-link to="games">
                    <div class="navbar__items">
                    Games
                    </div>
                </nuxt-link>
            </div>
            <div style="margin-top: 44px">
                <Nuxt></Nuxt>
            </div>
        </div>
    </div>
</template>

<script>import { mapGetters } from "vuex";

export default {
    computed: { ...mapGetters(['getUser']) },
    watch: {
        getUser () {
            if (!this.getUser.isAdmin || !this.getUser) {
                console.log(!this.getUser)
                console.log(this.getUser.isAdmin)
                this.$router.push('/')
                this.$toast.error('LogIn to admin account')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar-container {
    max-width: 1170px;
    margin: auto;
}
a {
    color: #f5f5f5;
    text-decoration: none;
    display: flex;
    /* text-align: center; */
    align-items: center;
    justify-content: center;
    max-width: 294px;
    height: 100%;
    width: 100%;
    border: 2px solid #20252B;
    transition: all 0.5s ease-in-out;
}
a:hover {
  color: #0F1215;
  background: #D8DFEB;
}
a.nuxt-link-exact-active {
  color: #0F1215;
  background: #D8DFEB;
}

.navbar {
    height: 90px;
    max-width: 1170px;
    margin: auto;
    display: flex;
    align-items: center;

    &__items {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
    }
}
.container {
    padding: 10px;
}
@media screen and (max-width: 1440px) {
    .container {
        margin-left: 120px;
    }
}

@media screen and (max-width: 1100px) {
    .container {
        margin-left: 65px;
    }
}
@media screen and (max-width: 850px) {
    .container {
        margin-left: 0;
    }
}

</style>
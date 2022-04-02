<template>
    <div>
        <div class="container">
             <div class="block">
                <span>New/Edit Player</span>
            </div>
        </div>
        <div class="block__edit">
            <div class="block__edit-items">
                <div class="block__edit-title">
                    <p>Basic info</p>
                    <span @click="basicInfo = false" v-if="basicInfo">—</span>
                    <span @click="basicInfo = true" v-else>+</span>
                </div>
                <div v-if="basicInfo">
                    <div class="block__edit-date">
                        <div>
                            <label for="name">Name</label>
                            <input type="text" id="name" v-model="name">
                        </div>
                    </div>
                    <div class="block__edit-date">
                        <div>
                            <label for="ID">ID</label>
                            <input type="text" id="ID" v-model="id" disabled>
                        </div>
                    </div>
                    <div class="block__edit-date">
                        <div>
                            <label for="SEX">SEX</label>
                             <select name="SEX" id="SEX" v-model="sex">
                                <option value="" selected disabled>Select SEX*</option>
                                <option value="male">male</option>
                                <option value="famele">famele</option>
                            </select>
                        </div>
                    </div>
                    <div class="block__edit-date">
                        <div>
                            <label for="Age">Age</label>
                            <input type="text" id="Age" v-model="age">
                        </div>
                    </div>
                    <div class="block__edit-date">
                        <div>
                            <label for="Nationality">Nationality</label>
                            <input type="text" id="Nationality" v-model="nationality">
                        </div>
                    </div>
                    <div class="block__edit-date">
                        <div>
                            <label for="Web-site">Web-site</label>
                            <input type="text" id="Web-site" v-model="webSite">
                        </div>
                    </div>
                    <div class="block__edit-date">
                        <div>
                            <label for="URL">URL</label>
                            <div class="forInput">
                                <div class="doit">
                                    <span>Doit.gg/user</span>
                                </div>
                                <input type="text" id="URL" v-model="urlId" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block__edit-items">
                <div class="block__edit-title">
                    <p>Advance</p>
                    <span @click="advance = false" v-if="advance">—</span>
                    <span @click="advance = true" v-else>+</span>
                </div>
                <div v-if="advance">
                    <div class="block__edit-date">
                        <div>
                            <label for="name">Avatar 128 x 128</label>
                            <UI-inputfile name="avatar url" :path="`players/${this.id}/avatar`" :img="avatarImg" @uploadFile="uploadAvatarImg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="player-edit__form-btns">
            <div @click="deleteUser">
                <UI-button class="player-edit__form-btn secondary" type="button">Delete user</UI-button>
            </div>
            <UI-button class="player-edit__form-btn secondary">Save changes</UI-button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: 'playerId',
    data () {
        return {
            basicInfo: false,
            advance: false,
            id: Number(this.$route.params.id),
            avatarImg: '',
            age: null,
            name: null,
            sex: null,
            nationality: null,
            webSite: null,
            urlId: null
        }
    },
    computed: {
        ...mapGetters(['getAllUsers'])
    },
    async mounted () {
        if (this.getAllUsers) {
            await this.$store.dispatch("userAction", this.$fire.auth.currentUser.uid)
        }
    },
    methods: {
        uploadAvatarImg (e) {
            this.avatarImg = e
        },
        deleteUser() {
            this.$store.dispatch('setPlayerDataAction', {
              id: this.id,
              delete: true
            })
            this.$router.push({
              path: '/admin/players',
              query: {
                  edit: true
              }
            })
            this.$toast.success('User have been deleted')
        },
    },
    watch: {
        getAllUsers (value) {
            if (this.getAllUsers[this.id]) {
                this.avatarImg = this.getAllUsers[this.id].img
                this.urlId = this.id
                this.age = this.getAllUsers[this.id].age
                this.name = this.getAllUsers[this.id].name
                this.nationality = this.getAllUsers[this.id].country
                this.webSite = this.getAllUsers[this.id].webSite
                this.sex = this.getAllUsers[this.id].sex
            }
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    color: #D8DFEB;
}
.player-edit__form {
    color: #CCCDCD;
    max-width: 620px;
    margin: 0 auto;
    &-btns {
        margin-top: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 34px;
    }
    &-btn {
      max-width: 160px;
    }
}
.block {
    max-width: 657px;
    margin: auto;
    background: #D8DFEB;
    height: 82px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 22px;
        line-height: 100%;
        /* identical to box height, or 22px */

        text-align: center;

        color: #0F1215;
    }
}
.block__edit {
    margin-top: 22px;
    &-date {
        padding: 0 44px 44px 44px;
        label {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 100%;
            display: block;
            margin-bottom: 12px;
        }
        option {
            
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
        }
        select, input, textarea {
            background: #0F1215;
            border: 2px solid #20252B;
            box-sizing: border-box;
            border-radius: 4px;
            width: 100%;
            height: 40px;
        }
        .label-reg {
            width: auto;
            padding: 12px 22px;
            background: #1A222D;
            color: #0A61E1;
            border: none;
            cursor: pointer;
            font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        transition: all 0.6s ease-in-out;
        }
        .label-reg:hover {
            background: linear-gradient(180deg, #2788F6 0%, #0960E0 100%);
            color: #F5F5F5;
        }

        .btn-reg {
            opacity: 0;
            position: absolute;
            z-index: -1;
            width: auto;
        }

        .btn-reg:checked + .label-reg {
            background: linear-gradient(180deg, #2788F6 0%, #0960E0 100%);
            color: #F5F5F5;
        }
        .checkbox {
            height:16px; width:auto; margin: 0;
            background: #0F1215;
                border: 2px solid #20252B;
                box-sizing: border-box;
                border-radius: 4px;
                    position: absolute;
            z-index: -1;
            opacity: 0;
        }
        .checkbox+label::before {
            cursor: pointer;
            content: "";
            display: flex;
            justify-content: center;
            position: relative;
            width: 17px;
            height: 17px;
            border: 2px solid #20252b;
            margin-right: 10px;
        }
        .checkbox:checked+label:before {
            background-repeat: no-repeat;
            background-position: 50%;
            background-image: url(static/ui/Vector1.png);
        }
    }
    &-items {
        border: 1px solid #20252B;
        max-width: 600px;
        margin: auto;
    }
    &-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 44px 30px;

        p {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 500;
            font-size: 22px;
            line-height: 100%;
            /* identical to box height, or 22px */


            color: #CCCDCD;
            margin: 0;
            padding: 0;
        }
        span {
            cursor: pointer;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 500;
            font-size: 22px;
            line-height: 100%;
            /* identical to box height, or 22px */

            text-align: right;

            color: #CCCDCD;
        }
    }

}
.forInput {
    display: flex;
    align-items: center;
    .doit {
        background: #20252B;
        border: 2px solid #20252B;
        box-sizing: border-box;
        border-radius: 4px 0px 0px 4px;
        height: 40px;
        
        display: flex;
        align-items: center;
        span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
            /* identical to box height, or 16px */
            color: #78828F;
        }
    }
}
</style>
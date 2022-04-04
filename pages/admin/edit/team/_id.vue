<template>
    <div>
        <div class="container">
             <div class="block">
                <span>New/Edit Team</span>
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
                            <label for="name">Team name</label>
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
                            <label for="Main Game">Main Game</label>
                             <select name="Main Game" id="Main Game" v-model="mainGame">
                                <option value="" selected disabled>Select Main Game*</option>
                                <option value="male">Main Game</option>
                                <option value="famele">Main Game</option>
                            </select>
                        </div>
                    </div>
                    <div class="block__edit-date">
                        <div>
                            <label for="teamLeader">Team Leader</label>
                            <select name="teamLeader" id="teamLeader" v-model="teamLeader">
                                <option value="" selected disabled>Select Team Leader*</option>
                                <option v-for="items in this.getAllUsers" :value="{id: items.id, name: items.username}" :key="items.id">{{ items.username }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="block__edit-date">
                        <div>
                            <label for="Country">Country</label>
                            <UI-dropdown class="secondary" :title="country || 'Choose a country'"
                            @updateSelect="updateCountry"
                            :items="countryList"/>
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
                                    <span>Doit.gg/team</span>
                                </div>
                                <input type="text" id="URL" v-model="urlId" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block__edit-items">
                <div class="block__edit-title">
                    <p>Players</p>
                    <span @click="players = false" v-if="players">—</span>
                    <span @click="players = true" v-else>+</span>
                </div>
                <div v-if="players">
                    <div class="block__edit-date">
                        <div class="players">
                            <div class="players-btn">List of players</div>
                            <div class="players-btn" @click="editList = !editList">Edit list of players</div>
                        </div>
                        <table>
                            <thead>
                                <th>id</th>
                                <th>nickname</th>
                            </thead>
                            <tbody>
                                <tr v-for="item in this.players" :key="item.id">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td v-if="editList" class="delete" @click="deletePlayer">x</td>
                                </tr>
                            </tbody>
                        </table>
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
            <div @click="deleteTeams">
                <UI-button class="player-edit__form-btn secondary" type="button">Delete user</UI-button>
            </div>
            <div @click="save">
                <UI-button class="player-edit__form-btn secondary">Save changes</UI-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getNames } from "country-list"
export default {
    name: 'teamId',
    data () {
        return {
            basicInfo: false,
            advance: false,
            players: false,
            editList: false,
            id: Number(this.$route.params.id),
            avatarImg: '',
            country: null,
            name: null,
            mainGame: null,
            players: [],
            teamLeader: null,
            webSite: null,
            urlId: null,
            countryList: null,
            date: new Date().toLocaleDateString()
        }
    },
    computed: {
        ...mapGetters(['getAllUsers'])
    },
    async mounted () {
        this.countryList = getNames()
        if (this.getAllUsers) {
            await this.$store.dispatch("userAction", this.$fire.auth.currentUser.uid)
        }
        setTimeout(() => {
            this.urlId = this.id
        }, 500)
    },
    methods: {
        uploadAvatarImg (e) {
            this.avatarImg = e
        },
        updateCountry (e) {
            this.country = e
        },
        deleteTeams() {
            this.$store.dispatch('setTeamAction', {
              id: this.id,
              delete: true
            })
            this.$router.push({
              path: '/admin/teams',
              query: {
                edit: true
              }
            })
            this.$toast.success('Team have been changed')
        },
        deletePlayer(id) {
            if(Object.keys(this.players).length === 1) {
              return this.$toast.error('There must be at least 1 player')
            }
            delete this.players[id]
            this.$toast.success('Success')
        },
        async save() {
            if(!this.name && !this.mainGame && !this.teamLeader && !this.country && !this.webSite && !this.avatarImg) {
                return this.$toast.error('All fields are required!')
            }
            this.$store.dispatch('setTeamAction', {
                id: this.id,
                name: this.name,
                game: this.mainGame,
                leader: this.teamLeader,
                country: this.country,
                date: this.date,
                website: this.webSite,
                img: this.avatarImg,
            })
            this.$router.push({
              path: '/admin/teams',
              query: {
                edit: true
              }
            })
            this.$toast.success('Team have been changed')
        },
    },
    watch: {
        getAllUsers (value) {
            if (this.getAllUsers[this.id]) {
                this.avatarImg = this.getAllUsers[this.id].img
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
.delete {
    cursor: pointer;
}
table {
    margin-top: 10px;
    th, td {
        padding: 10px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        /* identical to box height, or 16px */


        color: #CCCDCD;
    }
}

.players {
    display: flex;
    align-items: center;
    &-btn {
      color: #0A61E1;
      font-weight: 700;
      padding: 12px 16px;
      background-color: #1A222D;
      cursor: pointer;
      max-width: 150px;
      font-family: 'Rubik';
      margin-right: 15px;
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */

text-align: center;
    }
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
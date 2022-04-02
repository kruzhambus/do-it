<template>
    <div class="container">
        <div class="tournament">
            <span>New/Edit Touranment</span>
        </div>
        <div class="tournament__edit">
            <div class="tournament__edit-items">
                <div class="tournament__edit-title">
                    <p>Basic info</p>
                    <span @click="basicInfo = false" v-if="basicInfo">—</span>
                    <span @click="basicInfo = true" v-else>+</span>
                </div>
                <div v-if="basicInfo">
                    <div class="tournament__edit-date">
                        <div>
                            <label for="host">Host</label>
                            <select name="host" id="host">
                                <option value="" selected disabled>Select host</option>
                            </select>
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                            <label for="name">Tournament name*</label>
                            <input type="text" id="name">
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                            <label for="URL">URL</label>
                            <div class="forInput">
                                <div class="doit">
                                    <span>Doit.gg/</span>
                                </div>
                                <input type="text" id="URL">
                            </div>
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                            <label for="QuickRules">Quick Rules</label>
                            <textarea name="QuickRules" id="QuickRules" style="height:184px" placeholder="You can write here somebody about your tournament...."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tournament__edit">
            <div class="tournament__edit-items">
                <div class="tournament__edit-title">
                    <p>GAME INFO</p>
                    <span @click="gameInfo = false" v-if="gameInfo">—</span>
                    <span @click="gameInfo = true" v-else>+</span>
                </div>
                <div v-if="gameInfo">
                    <div class="tournament__edit-date">
                        <div>
                            <label for="Game">Game</label>
                            <select name="Game" id="Game">
                                <option value="" selected disabled>The game or sport being played</option>
                            </select>
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                            <label for="Type">Type</label>
                            <div style="display:flex; margin-bottom: 10px">
                                <input  style="height:16px; width:auto" type="radio" name="Type" id="Type">
                                <label for="Type" style="margin-bottom: 0">Single stage tournament</label>
                            </div>
                            <div style="display:flex; margin-bottom: 10px">
                                <input  style="height:16px; width:auto" type="radio" name="Type" id="Type">
                                <label for="Type"  style="margin-bottom: 0">Two stage tournament</label>
                            </div>
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                            <label for="Format">Format*</label>
                            <select name="Format" id="Format">
                                <option value="" selected disabled>The game format</option>
                            </select>
                            <div style="display:flex; margin-top: 10px">
                                <input class="checkbox" type="checkbox" name="checkbox" id="checkbox">
                                <label for="checkbox" style="margin-bottom: 0; display:flex; align-items:center;font-weight: 400;">Include a match for 3rd place</label>
                            </div>
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                            <div class="d-flex">
                                <div>
                                    <label for="Mode">Mode*</label>
                                    <select name="Mode" id="Mode">
                                        <option value="" selected disabled>Select Mode*</option>
                                        <option value="1x1">1 vs 1</option>
                                        <option value="2x2">2 vs 2</option>
                                        <option value="3x3">3 vs 3</option>
                                        <option value="5x5">5 vs 5</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="Mode" style="text-align: center">Map voting system</label>
                                    <select name="Mode" id="Mode" style="width: 276px">
                                        <option value="" selected disabled>Select voting system*</option>
                                        <option value="1x1">1 vs 1</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                            <label>Main Banner 370x200*</label>
                             <UI-inputfile name="main banner" :path="`tournaments/${this.id}/main-banner`" :img="titleImg" @uploadFile="uploadMainBannerImg"/>
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                            <label>Torunamnet background min 2000 x 3000</label>
                            <UI-inputfile name="main banner" :path="`tournaments/${this.id}/background`" :img="bgImg" @uploadFile="uploadBgBannerImg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tournament__edit">
            <div class="tournament__edit-items">
                <div class="tournament__edit-title">
                    <p>REGISTRATION</p>
                    <div v-if="register">
                        <input class="checkbox" type="checkbox" id="reg">
                        <label style="display:flex; align-items:center" for="reg">Don’t Aprove players automaticly</label>
                    </div>
                    <span @click="register = false" v-if="register">—</span>
                    <span @click="register = true" v-else>+</span>
                </div>
                <div v-if="register">
                    <div class="tournament__edit-date">
                        <div>
                            <label for="nameReg">Registration*</label>
                            <div class="d-flex">
                                <input type="radio" id="free" class="btn-reg" value="Free" v-model="registrationType"/>
                                <label for="free" class="label-reg">Free</label>
                                <input type="radio" id="Paid" class="btn-reg" value="Paid" v-model="registrationType"/>
                                <label for="Paid" class="label-reg">Paid</label>
                                <input type="radio" id="PRERMIUM" class="btn-reg" value="PRERMIUM" v-model="registrationType"/>
                                <label for="PRERMIUM" class="label-reg">PRERMIUM</label>
                                <input type="radio" id="PRIVATE" class="btn-reg" value="PRIVATE" v-model="registrationType"/>
                                <label for="PRIVATE" class="label-reg">PRIVATE</label>
                            </div>
                        </div>
                        <div v-if="registrationType === 'Paid'">
                            <label for="coast">Register cost</label>
                            <input type="text" id="coast">
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                             <div>
                                <label style="display:flex; align-items:center" for="CheckinTime">Start time*</label>
                                <div>
                                    <date-picker is-dark v-model="startTime" mode="dateTime" is24hr>
                                      <template v-slot="{ inputValue, inputEvents }">
                                        <input class="date-time" :value="inputValue" v-on="inputEvents" />
                                      </template>
                                    </date-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                             <div>
                                <label style="display:flex; align-items:center" for="CheckinTime">Estimated end*</label>
                                <div>
                                    <date-picker is-dark v-model="estimatedTime" mode="dateTime" is24hr>
                                      <template v-slot="{ inputValue, inputEvents }">
                                        <input class="date-time" :value="inputValue" v-on="inputEvents" />
                                      </template>
                                    </date-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tournament__edit-date">
                        <div>
                             <div>
                                <input class="checkbox" type="checkbox" id="CheckinTime">
                                <label style="display:flex; align-items:center" for="CheckinTime">Checkin Time</label>
                            </div>
                            <div>
                                <select name="Mode" id="Mode" style="width: 276px">
                                    <option value="30" selected>30 minute</option>
                                    <option value="20">20 minute</option>
                                    <option value="10">10 minute</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tournament__edit">
            <div class="tournament__edit-items">
                <div class="tournament__edit-title">
                    <p>Leagues</p>
                    <span @click="leagues = false" v-if="leagues">—</span>
                    <span @click="leagues = true" v-else>+</span>
                </div>
            
                <div class="tournament__edit-date" v-if="leagues">
                    <div>
                         <div>
                            <div class="d-flex">
                                <label style="display:flex; align-items:center" for="CheckinTime">Connect tournament with league</label>
                                <input type="radio" id="chooseLeague" class="btn-reg" v-model="chooseLeague"/>
                                <label for="chooseLeague" class="label-reg">Choose League</label>
                            </div>
                            <UI-cheackbox @updateCheckbox="updateCheckbox">
                              <span>
                                  Only League System
                              </span>
                            </UI-cheackbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DatePicker } from "v-calendar";
export default {
    components: { DatePicker },
    data () {
        return {
            basicInfo: false,
            gameInfo: false,
            register: false,
            registrationType: '',
            startTime: '',
            estimatedTime: '',
            titleImg: '',
            id: Number(this.$route.params.id),
            bgImg: '',
            leagues: false,
            chooseLeague: false,
            onlyLeagueSystem: ''
        }
    },
    methods: {
        uploadMainBannerImg (img) {
            this.titleImg = img
        },
        uploadBgBannerImg (img) {
            this.bgImg = img
        },
        updateCheckbox (d) {
            this.onlyLeagueSystem = d
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    color: #CCCDCD;
}
.datepicker {
    position: relative;
    &__title {
      position: relative;
      display: block;
      width: 100%;
      text-align: left;
      padding: 12px 30px 12px 16px;
      color: #CCCDCD;
      border: 1px solid #20252B;
      border-radius: 2px;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      &::after {
        content: '';
        width: 22px;
        height: 22px;
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: auto;
      }
    }
    &__calendar {
      display: none;
      position: absolute;
      top: 44px;
      z-index: 1;
    }
  }
  .datepicker.active .datepicker__calendar {
    display: block;
  }
.d-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.btn-reg {
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

.btn-reg:hover {
    background: linear-gradient(180deg, #2788F6 0%, #0960E0 100%);
    color: #F5F5F5;
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
.tournament__edit {
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


.tournament {
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

</style>
import { onValue, ref } from "firebase/database"
import db from "../static/db"

export const state = () => ({
    user: {},
    players: {},
})

export const getters = {
    getUser(state) {
        return state.user
    },
    getAllUsers(state) {
        return state.players
    }
}

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setAllUser (state, users) {
        state.players = users
    },
    setPlayerData (state, player) {
        if(player.delete) {
          return delete state.players[player.id]
        }
        if(state.players[player.id]) {
            state.players[player.id].name = player.name
            state.players[player.id].username = player.username
            state.players[player.id].sex = player.sex
            state.players[player.id].country = player.country
            state.players[player.id].age = player.age
            state.players[player.id].img = player.img
        }
    },
}

export const actions = {
    userAction(context, uid) {
        const usersRef = ref(db, 'users')
        onValue(usersRef, (snapshot) => {
          const users = snapshot.val()
          context.commit('setAllUser', users)
          if (uid) {
            Object.keys(users).forEach((userDB) => {
                if(users[userDB].uid === uid) {
                  context.commit('setUser', users[userDB])
                }
            })
          }
        })
    },
    setPlayerDataAction(context, player) {
        context.commit('setPlayerData', player)
    },
}
import { onValue, ref } from "firebase/database"
import db from "../static/db"

export const state = () => ({
    user: {},
    players: {},
    teams: {}
})

export const getters = {
    getUser(state) {
        return state.user
    },
    getAllUsers(state) {
        return state.players
    },
    getTeams (state) {
        return state.teams
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
        if(!state.players[player.id]) {
            state.players[player.id] = {
              id: player.id
            }
        }
        state.players[player.id].rank = 'user'
        state.players[player.id].subscribe = 'free'
        state.players[player.id].created = new Date().toLocaleDateString
        state.players[player.id].name = ''
        state.players[player.id].username = player.username
        state.players[player.id].sex = player.sex
        state.players[player.id].country = player.country
        state.players[player.id].age = player.age
        state.players[player.id].img = player.img
    },
    setTeams (state, team) {
        state.teams = team
    },
    setTeam (state, team) {
        const id = Number(team.id)
        if(team.delete) {
          return delete state.teams[team.id]
        }
        if(!state.teams[id]) {
          state.teams[id] = {
            id: team.id
          }
        }
        state.teams[team.id].name = team.name
        state.teams[team.id].game = team.game
        state.teams[team.id].leader = team.leader
        state.teams[team.id].country = team.country
        state.teams[team.id].creationDate = team.date
        state.teams[team.id].website = team.website
        state.teams[team.id].img = team.img
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
    setTeamAction(context, teams) {
      context.commit('setTeam', teams)
    },
    setTeamsAction(context) {
        const teamsRef = ref(db, 'teams')
        onValue(teamsRef, (snapshot) => {
          context.commit('setTeams', snapshot.val())
        })
    },
}
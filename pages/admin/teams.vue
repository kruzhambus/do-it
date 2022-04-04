<template>
    <div>
        <AdminTop label ="team" :editor="edit" @edit="editChange" @cancel="cancel" @save="save" />
        <div>
            <table class="container">
            	<thead>
            		<tr>
            			<th>
                            <div class="d-flex">
                                Team
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                Leader
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                Main Game
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                Creation Date
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
            		</tr>
            	</thead>
            	<tbody>
            		<tr v-for="item in this.getTeams" :key="item.uid">
            			<td>{{ item.name }}</td>
            			<td>{{ item.leader.name }}</td>
            			<td>{{ item.game }}</td>
                        <td>{{ item.creationDate  }}</td>
                        <td v-if="edit"><nuxt-link :to="`/admin/edit/team/${ item.id }`">edit</nuxt-link></td>
            		</tr>
            	</tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
    computed: { ...mapGetters(['getTeams']) },
    async mounted () {
        if (!this.getTeams) {
            await this.$store.dispatch('setTeamsAction')
        }
    },
    data () {
        return {
            edit: this.$route.query.edit ? true : false,
            str: 'adssad'
        }
    },
    methods: {
        editChange (e) {
            this.edit = e
        },
        cancel () {
            this.$store.dispatch('setTeamsAction')
            this.$toast.success('Cancel')
        },
        async save() {
            try {
              await this.$fire.database.ref('teams').set(this.getTeams)
            } catch (e) {
              return this.$toast.error(e)
            }
            this.$toast.success('Changes have been save')
        },
    }
}
</script>

<style scoped lang="scss">
* {
    color: #E6E6E6;
    font-family: 'Rubik';
}
.container {
    max-width: 1170px;
    width: 100%;
    margin: auto;
    border: 2px solid #20252B;
    padding: 10px;
}
.d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
}
td {
    font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */


/* #67707A */

color: #67707A;
}
td {
    padding: 10px;
}
th {
    cursor: pointer;
    font-size: 16px;
    line-height: 100%;
    /* identical to box height, or 16px */
    
    text-transform: uppercase;
    
    /* grey */
    
    color: #E6E6E6;
}
@media screen and (max-width: 760px) {
    td {
        padding: 0;
    }
}
</style>
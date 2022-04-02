<template>
    <div>
        <AdminTop label ="player" :editor="edit" @edit="editChange" @cancel="cancel" @save="save" />
        <div>
            <table class="container">
            	<thead>
            		<tr>
            			<th>
                            <div class="d-flex">
                                Nickname
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                Password
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                Country
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                Team
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                Name
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                Created
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                Age
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
                        <th>
                            <div class="d-flex">
                                rank
                                <img src="/ui/sort.svg" alt="">
                            </div>
                        </th>
            		</tr>
            	</thead>
            	<tbody>
            		<tr v-for="item in this.getAllUsers" :key="item.uid">
            			<td>{{ item.username }}</td>
            			<td>{{ item.password.replace(/[^\s]/g, "*") }}</td>
            			<td>{{ item.country.substr(0, 14) }}</td>
                        <td>team</td>
            			<td>{{ item.name  }}</td>
                        <td>{{ new Date(item.dateRegistration).toLocaleDateString()  }}</td>
                        <td>{{ item.age  }}</td>
                        <td>{{ item.rank  }}</td>
                        <td v-if="edit"><nuxt-link :to="`/admin/edit/player/${ item.id }`">edit</nuxt-link></td>
            		</tr>
            	</tbody>
            </table>
        </div>
    </div>
</template>

<script>import { mapGetters } from "vuex";


export default {
    computed: { ...mapGetters(['getAllUsers']) },
    async mounted () {
        if (!this.getAllUsers) {
            await this.$store.dispatch("userAction", this.$fire.auth.currentUser.uid)
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
            this.$store.dispatch('userAction')
        },
        async save() {
            try {
              await this.$fire.database.ref('users').set(this.getAllUsers)
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
</style>
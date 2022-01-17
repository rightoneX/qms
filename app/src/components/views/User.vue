<template>
  <div class="user">
    <!-- <div class="formodal"> -->
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add New User</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Group Name" v-model="editedItem.name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Description" v-model="editedItem.description"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!-- </div> -->
    <v-data-table
      :items="User"
      :headers="headers"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.lastName }}</td>
        <td class="text-xs-left">{{ props.item.firstName }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="duplicateItem(props.item)">
            <v-icon color="blue darken-2">list</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getData">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import apiService from '@/Services/ApiService'
export default {
  name: 'user',
  data () {
    return {
      User: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        description: ''
      },
      headers: [
        {
          text: 'Role Name',
          align: 'left',
          sortable: true,
          value: 'lastName'
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'fisrtName'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    async getData () {
      const responseUser = await apiService.fetchUserByTenant(JSON.parse(localStorage.user).tenant_id)
      this.User = responseUser.data
      console.log(this.User.firstName)
    },

    async save () {
      try {
        if (this.editedIndex === -1) {
        //   await apiService.addUser({
        //   firstName: this.register.firstName,
        //   lastName: this.register.lastName,
        //   email: this.register.email,
        //   password: this.register.password,
        //   tenant_id: uuidTenant,
        //   group_id: uuidGroup,
        //   permission_id: 'Super User'
        // })
          this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          await apiService.addUser(this.editedItem)
          this.User.push(this.editedItem)
        } else {
          await apiService.updateUser(this.editedItem)
          Object.assign(this.User[this.editedIndex], this.editedItem)
        }
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
        this.getData()
        this.close()
      }
    },

    async errorMessage () {
      const $this = this
      $this.$swal({
        title: 'Request failed !',
        text: 'Please check your entery data !',
        type: 'info',
        showCancelButton: false
      })
    },

    async deleteItem (user) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          apiService.deleteUser(user.id)
          location.reload()
          const index = this.User.indexOf(user)
          this.User.splice(index, 1)
        }
      })
    },

    editItem (item) {
      this.editedIndex = this.User.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    duplicateItem (item) {
      this.editedIndex = this.User.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedIndex = -1
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>

<style>

</style>

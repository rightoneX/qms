<template>
  <div class="role">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add New Role</v-btn>
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
    </div>
    <v-data-table
      :headers="headers"
      :items="Role"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
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
  name: 'role',
  data () {
    return {
      Role: [],
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
          value: 'name'
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'description'
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
      const responseRole = await apiService.fetchRoleByTenant(JSON.parse(localStorage.user).tenant_id)
      this.Role = responseRole.data
    },

    async save () {
      try {
        if (this.editedIndex === -1) {
          // this.editedItem.id = Math.random().toString(36).substr(2, 9)
          this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          await apiService.addRole(this.editedItem)
          this.Role.push(this.editedItem)
        } else {
          await apiService.updateRole(this.editedItem)
          Object.assign(this.Role[this.editedIndex], this.editedItem)
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

    async deleteItem (role) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          apiService.deleteRole(role.id)
          location.reload()
          const index = this.Role.indexOf(role)
          this.Role.splice(index, 1)
        }
      })
    },

    editItem (item) {
      this.editedIndex = this.Role.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    duplicateItem (item) {
      this.editedIndex = this.Role.indexOf(item)
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

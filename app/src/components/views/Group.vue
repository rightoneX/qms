<template>
  <div class="group">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add New Group</v-btn>
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
                  <v-select
                    :items="Role"
                    item-value="id"
                    item-text="name"
                    label="Select a Role"
                    return-object
                    v-model="selectedrole"
                    ></v-select>
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
      :items="Group"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name}}</td>
        <td class="text-xs-left">{{ props.item.role.name }}</td>
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
  name: 'group',
  data () {
    return {
      Group: [],
      Role: [],
      selectedrole: null,
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        role: '',
        description: ''
      },
      headers: [
        {
          text: 'Group Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Role',
          align: 'left',
          sortable: true,
          value: 'role.name'
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'description'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      requiredRule: [
        (v) => !!v || 'Field is required'
      ]
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Group' : 'Edit Group'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    async getData () {
      const responseGroup = await apiService.fetchGroupByTenant(JSON.parse(localStorage.user).tenant_id)
      this.Group = responseGroup.data
      const responseRole = await apiService.fetchRoleByTenant(JSON.parse(localStorage.user).tenant_id)
      this.Role = responseRole.data
    },

    async save () {
      this.editedItem.role_id = this.selectedrole.id
      try {
        if (this.editedIndex === -1) {
          // this.editedItem.id = Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
          this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          await apiService.addGroup(this.editedItem)
          this.Group.push(this.editedItem)
        } else {
          await apiService.updateGroup(this.editedItem)
          Object.assign(this.Group[this.editedIndex], this.editedItem)
        }
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
        this.getData()
        this.close()
      }
      this.selectedrole = null
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

    async deleteItem (group) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          apiService.deleteGroup(group.id)
          const index = this.Group.indexOf(group)
          this.Group.splice(index, 1)
        }
      })
    },

    duplicateItem (item) {
      this.editedIndex = this.Group.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.selectedrole = this.editedItem.role_id
      this.editedIndex = -1
      this.dialog = true
    },

    editItem (item) {
      this.editedIndex = this.Group.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.selectedrole = this.editedItem.role_id
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.selectedrole = null
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>

<style>

</style>

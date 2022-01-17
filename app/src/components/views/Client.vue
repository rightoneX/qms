<template>
  <div class="client">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add New Client</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="Relation"
                    item-value="id"
                    item-text="id"
                    label="Select a Relation"
                    return-object
                    v-model="selectedrelation"
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Name" v-model="editedItem.name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Profile" v-model="editedItem.profile"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Url" v-model="editedItem.url"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Phone" v-model="editedItem.phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Fax" v-model="editedItem.fax"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Country" v-model="editedItem.country"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="City" v-model="editedItem.city"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Address" v-model="editedItem.address"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Postbox" v-model="editedItem.postbox"></v-text-field>
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
      :items="Client"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
      item-key="name"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.relation_id}}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.profile}}</td>
        <td class="text-xs-left">{{ props.item.url}}</td>
        <td class="text-xs-left">{{ props.item.phone}}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
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
import { EventBus } from '@/components/layout/Application'
export default {
  name: 'client',
  data () {
    return {
      search: '',
      Client: [],
      Relation: [],
      selectedrelation: null,
      rowsPerPageItems: [10, 20, 30, 40],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        profile: '',
        relation_id: '',
        phone: '',
        fax: '',
        url: '',
        email: '',
        country: '',
        city: '',
        address: '',
        postbox: ''
      },
      headers: [
        {
          text: 'Relation',
          align: 'left',
          sortable: true,
          value: 'relation_id'
        },
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Profile',
          align: 'left',
          sortable: true,
          value: 'profile'
        },
        {
          text: 'Url',
          align: 'left',
          sortable: true,
          value: 'url'
        },
        {
          text: 'Phone',
          align: 'left',
          sortable: true,
          value: 'phone'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ]
    }
  },
  created () {
  // Using the server bus for the searching
    EventBus.$on('EVENT_SEARCH', (search) => {
      this.search = search
    })
  },
  mounted () {
    this.getData()
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    // get all data from the database server
    async getData () {
      const responseClient = await apiService.fetchClientByTenant(JSON.parse(localStorage.user).tenant_id)
      this.Client = responseClient.data
      const responseRelation = await apiService.fetchRelation()
      this.Relation = responseRelation.data
    },

    async save () {
      this.editedItem.relation_id = this.selectedrelation.id
      try {
        if (this.editedIndex === -1) {
          // this.editedItem.id = Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
          this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          // console.log(this.editedItem)
          await apiService.addClient(this.editedItem)
          this.Client.push(this.editedItem)
        } else {
          await apiService.updateClient(this.editedItem)
          Object.assign(this.Client[this.editedIndex], this.editedItem)
        }
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
        this.close()
      }
      this.getData()
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

    async deleteItem (item) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          apiService.deleteClient(item.id)
          const index = this.Client.indexOf(item)
          this.Client.splice(index, 1)
        }
      })
    },

    editItem (item) {
      this.editedIndex = this.Client.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.selectedrelation = this.editedItem.relation_id
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.selectedrelation = null
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="contact">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add New Contact</v-btn>
         <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="Client"
                    item-value="id"
                    item-text="name"
                    label="Select a Client"
                    return-object
                    v-model="selectedclient"
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="First Name" v-model="editedItem.firstName"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Last Name" v-model="editedItem.lastName"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Mobile" v-model="editedItem.mobile"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Phone" v-model="editedItem.phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Position" v-model="editedItem.position"></v-text-field>
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
      :items="Contact"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.client.name }}</td>
        <td class="text-xs-left">{{ props.item.firstName }}</td>
        <td class="text-xs-left">{{ props.item.lastName }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.mobile}}</td>
        <td class="text-xs-left">{{ props.item.position}}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <!-- <v-btn icon class="mx-0" @click="duplicateItem(props.item)">
            <v-icon color="blue darken-2">list</v-icon>
          </v-btn> -->
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
  name: 'contact',
  data () {
    return {
      search: '',
      Contact: [],
      Client: [],
      selectedclient: null,
      rowsPerPageItems: [10, 20, 30, 40],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        firstName: '',
        client: '',
        lastName: '',
        mobile: '',
        phone: '',
        email: '',
        position: ''
      },
      headers: [
        {
          text: 'Company',
          align: 'left',
          sortable: true,
          value: 'client.name'
        },
        {
          text: 'First Name',
          align: 'left',
          sortable: true,
          value: 'firstName'
        },
        {
          text: 'Last Name',
          align: 'left',
          sortable: true,
          value: 'lastName'
        },
        {
          text: 'Email',
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Phone',
          align: 'left',
          sortable: true,
          value: 'mobile'
        },
        {
          text: 'Position',
          align: 'left',
          sortable: true,
          value: 'position'
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
      return this.editedIndex === -1 ? 'New Contact' : 'Edit Contact'
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
      const responseContact = await apiService.fetchContactByTenant(JSON.parse(localStorage.user).tenant_id)
      this.Contact = responseContact.data
    },

    async save () {
      this.editedItem.client_id = this.selectedclient.id
      try {
        if (this.editedIndex === -1) {
          // this.editedItem.id = Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
          this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          await apiService.addContact(this.editedItem)
          this.Contact.push(this.editedItem)
        } else {
          await apiService.updateContact(this.editedItem)
          Object.assign(this.Contact[this.editedIndex], this.editedItem)
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
          apiService.deleteContact(item.id)
          const index = this.Contact.indexOf(item)
          this.Contact.splice(index, 1)
        }
      })
    },

    duplicateItem (item) {
      this.editedIndex = this.Contact.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedIndex = -1
      this.selectedclient = this.editedItem.client_id
      this.dialog = true
    },

    editItem (item) {
      this.editedIndex = this.Contact.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.selectedclient = this.editedItem.client_id
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.selectedclient = null
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>

<style>

</style>

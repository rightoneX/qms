<template>
  <div class="product">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add New Product</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="ProductType"
                    item-value="id"
                    item-text="name"
                    label="Select a Type"
                    v-model="selectedproducttype"
                    return-object
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="Client"
                    item-value="id"
                    item-text="name"
                    label="Select a Brand"
                    v-model="selectedclient"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Code" v-model="editedItem.name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Description" v-model="editedItem.description"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Picture" v-model="editedItem.picture"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Datasheet" v-model="editedItem.datasheet"></v-text-field>
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
      :items="Product"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.producttype.name }}</td>
        <td class="text-xs-left">{{ props.item.client.name }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.picture }}</td>
        <td class="text-xs-left">{{ props.item.datasheet }}</td>
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
import { EventBus } from '@/components/layout/Application'
export default {
  name: 'product',
  data () {
    return {
      search: '',
      Product: [],
      ProductType: [],
      selectedproducttype: [],
      Client: [],
      selectedclient: [],
      rowsPerPageItems: [10, 20, 30, 40],
      dialog: false,
      editedIndex: -1,
      producttype: [],
      editedItem: {
        producttype: '',
        client: '',
        code: '',
        sn: '',
        picture: '',
        datasheet: ''
      },
      headers: [
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'producttype.name'
        },
        {
          text: 'Brand',
          align: 'left',
          sortable: true,
          value: 'client.name'
        },
        {
          text: 'Code',
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
        {
          text: 'Picture',
          align: 'left',
          sortable: true,
          value: 'picture'
        },
        {
          text: 'Datasheet',
          align: 'left',
          sortable: true,
          value: 'datasheet'
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
      return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
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
      const responseProduct = await apiService.fetchProductByTenant(JSON.parse(localStorage.user).tenant_id)
      this.Product = responseProduct.data
      const responseProductType = await apiService.fetchProductTypeByTenant(JSON.parse(localStorage.user).tenant_id)
      this.ProductType = responseProductType.data
      const responseClient = await apiService.fetchClientByTenantAndRelation(JSON.parse(localStorage.user).tenant_id, 'Supplier')
      this.Client = responseClient.data
    },

    async save () {
      try {
        if (this.editedIndex === -1) {
          // this.editedItem.id = Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
          this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          this.editedItem.client_id = this.selectedclient.id
          this.editedItem.producttype_id = this.selectedproducttype.id
          await apiService.addProduct(this.editedItem)
          this.Product.push(this.editedItem)
        } else {
          this.editedItem.client_id = this.selectedclient.id
          this.editedItem.producttype_id = this.selectedproducttype.id
          await apiService.updateProduct(this.editedItem)
          Object.assign(this.Product[this.editedIndex], this.editedItem)
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
          apiService.deleteProduct(item.id)
          location.reload()
          const index = this.Product.indexOf(item)
          this.Product.splice(index, 1)
        }
      })
    },

    duplicateItem (item) {
      this.editedIndex = this.ProductType.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedIndex = -1
      this.dialog = true
    },

    editItem (item) {
      this.editedIndex = this.Product.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.selectedproducttype = this.editedItem.producttype_id
      this.selectedclient = this.editedItem.client_id
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.selectedclient = null
        this.selectedproducttype = null
      }, 300)
    }
  }
}
</script>

<style>

</style>

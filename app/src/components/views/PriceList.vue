<template>
  <div class="pricelist">
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
                    :items="Brand"
                    item-value="id"
                    item-text="name"
                    label="Select a Brand"
                    v-model="selectedbrand"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="ProductType"
                    item-value="producttype.id"
                    item-text="producttype.name"
                    label="Select a Type"
                    v-model="selectedproducttype"
                    return-object
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="ProductSelect"
                    item-value="id"
                    item-text="name"
                    label="Select a Product"
                    v-model="selectedproduct"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Cost" v-model="editedItem.cost"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="Currency"
                    item-value="id"
                    item-text="id"
                    label="Select a Currency"
                    v-model="selectedcurrency"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="Supplier"
                    item-value="id"
                    item-text="name"
                    label="Select a Supplier"
                    v-model="selectedsupplier"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Note" v-model="editedItem.note"></v-text-field>
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
      :items="PriceList"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.client.name }}</td>
        <td class="text-xs-left">{{ props.item.product.client.name }}</td>
        <td class="text-xs-left">{{ props.item.product.producttype.name }}</td>
        <td class="text-xs-left">{{ props.item.product.name }}</td>
        <td class="text-xs-left">{{ currencySign+props.item.cost }}</td>
        <td class="text-xs-left">{{ props.item.currency_id }}</td>
        <td class="text-xs-left">{{ props.item.note }}</td>
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
  name: 'pricelist',
  data () {
    return {
      search: '',
      currencySign: '$',
      PriceList: [],
      Product: [],
      selectedproduct: [],
      ProductType: [],
      ProductTypeListSearch: [],
      selectedproducttype: {
        producttype: ''
      },
      Client: [],
      selectedclient: [],
      Brand: [],
      selectedbrand: [],
      Supplier: [],
      selectedsupplier: [],
      Currency: [],
      selectedcurrency: [],
      ProductSelect: [],
      rowsPerPageItems: [10, 20, 30, 40],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        client: '',
        client_id: '',
        product_id: '',
        product: {
          client: '',
          name: '',
          producttype: ''
        },
        cost: '',
        currency_id: '',
        note: '',
        producttype: ''
      },
      headers: [
        {
          text: 'Supplyer',
          align: 'left',
          sortable: true,
          value: 'client.name'
        },
        {
          text: 'Brand',
          align: 'left',
          sortable: true,
          value: 'product.client.name'
        },
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'product.producttype.name'
        },
        {
          text: 'Product',
          align: 'left',
          sortable: true,
          value: 'product.name'
        },
        {
          text: 'Cost',
          align: 'left',
          sortable: true,
          value: 'cost'
        },
        {
          text: 'Currency',
          align: 'left',
          sortable: true,
          value: 'currency_id'
        },
        {
          text: 'Note',
          align: 'left',
          sortable: true,
          value: 'note'
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
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    selectedbrand () {
      this.buildProductTypeList(this.selectedbrand.id)
    },
    selectedproducttype () {
      this.buildProductList(this.selectedbrand.id, this.selectedproducttype.producttype.id)
    }
  },
  methods: {
    // get all data from the database server
    async getData () {
      const responsePriceList = await apiService.fetchPriceListByTenant(JSON.parse(localStorage.user).tenant_id)
      this.PriceList = responsePriceList.data
      const responseCurrency = await apiService.fetchCurrency()
      this.Currency = responseCurrency.data
      const responseSupplier = await apiService.fetchClientByTenantAndRelation(JSON.parse(localStorage.user).tenant_id, 'Supplier')
      this.Supplier = responseSupplier.data
      const responseBrand = await apiService.fetchClientByTenantAndRelation(JSON.parse(localStorage.user).tenant_id, 'Supplier')
      this.Brand = responseBrand.data
    },

    async buildProductTypeList (client) {
      if (client) {
        this.ProductType = [] // clearn up for new product type list
        const responseData = await apiService.fetchProductByClient(client)
        this.ProductType = responseData.data
      }
    },

    async buildProductList (client, producttype) {
      if (client && producttype) {
        this.ProductSelect = [] // clearn up for new product list
        const responseData = await apiService.fetchProductByClientAndProducttype(client, producttype)
        this.ProductSelect = responseData.data
      }
    },

    async save () {
      try {
        if (this.editedIndex === -1) {
          this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          this.editedItem.client_id = this.selectedsupplier.id
          this.editedItem.product_id = this.selectedproduct.id
          this.editedItem.currency_id = this.selectedcurrency.id
          await apiService.addPriceList(this.editedItem)
          this.PriceList.push(this.editedItem)
        } else {
          await apiService.updatePriceList(this.editedItem)
          Object.assign(this.PriceList[this.editedIndex], this.editedItem)
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
          apiService.deletePriceList(item.id)
          location.reload()
          const index = this.PriceList.indexOf(item)
          this.PriceList.splice(index, 1)
        }
      })
    },

    duplicateItem (item) {
      this.editedIndex = this.PriceList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedIndex = -1
      this.dialog = true
    },

    editItem (item) {
      this.editedIndex = this.PriceList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // this.buildProductTypeList(this.editedItem.product.client.idclient)
      // console.log(this.editedItem.product.client.idclient)
      // console.log(this.editedItem.product.client.name)
      // this.responseProductType = apiService.fetchProductByClient(this.editedItem.product.client.idclient)
      // this.ProductType = this.responseProductType.data
      // console.log(this.ProductType)
      // X
      this.selectedbrand = this.editedItem.product.client.name
      this.selectedsupplier = this.editedItem.client.name
      this.selectedproducttype = this.editedItem.product.producttype.id
      this.selectedproduct = this.editedItem.product.name
      this.selectedcurrency = this.editedItem.currency_id
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.selectedbrand = ''
        this.selectedsupplier = ''
        this.selectedproducttype = ''
        this.selectedproduct = ''
        this.selectedcurrency = ''
      }, 300)
    }
  }
}
</script>

<style>

</style>

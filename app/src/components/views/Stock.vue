<template>
  <div class="stock">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add New Stock Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
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
                  <v-select
                    :items="Brand"
                    item-value="product.client.id"
                    item-text="product.client.name"
                    label="Select a Brand"
                    v-model="selectedbrand"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="ProductType"
                    item-value="product.producttype.id"
                    item-text="product.producttype.name"
                    label="Select a Tyep"
                    v-model="selectedproducttype"
                    return-object
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="Product"
                    item-value="product.id"
                    item-text="product.name"
                    label="Select a Product"
                    v-model="selectedproduct"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Serial Number" v-model="editedItem.sn"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Note" v-model="editedItem.note"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="StockCondition"
                    item-value="id"
                    item-text="id"
                    label="Select a Condition"
                    v-model="selectedstockcondition"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="StockStatus"
                    item-value="id"
                    item-text="id"
                    label="Select a Status"
                    v-model="selectedstockstatus"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="StockLocation"
                    item-value="id"
                    item-text="name"
                    label="Select a Stock Location"
                    v-model="selectedstocklocation"
                    return-object
                  ></v-select>
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
      :items="Stock"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.pricelist.product.client.name }}</td>
        <td class="text-xs-left">{{ props.item.pricelist.product.producttype.name }}</td>
        <td class="text-xs-left">{{ props.item.pricelist.product.name }}</td>
        <td class="text-xs-left">{{ props.item.pricelist.product.description }}</td>
        <td class="text-xs-left">{{ props.item.sn }}</td>
        <td class="text-xs-left">{{ props.item.stocklocation.name }}</td>
        <td class="text-xs-left">{{ props.item.stockcondition_id }}</td>
        <td class="text-xs-left">{{ props.item.stockstatus_id }}</td>
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
  name: 'stock',
  data () {
    return {
      search: '',
      Stock: [],
      Product: [],
      selectedproducttypelist: [],
      ProductList: [],
      selectedproduct: [],
      selectedproducttype: [],
      Brand: [],
      selectedbrand: [],
      PriceList: [],
      Supplier: [],
      selectedsupplier: [],
      ProductType: [],
      Client: [],
      Currency: [],
      selectedcurrency: [],
      StockStatus: [],
      selectedstockstatus: [],
      StockLocation: [],
      selectedstocklocation: [],
      StockCondition: [],
      selectedstockcondition: [],
      rowsPerPageItems: [10, 20, 30, 40],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        sn: '',
        note: '',
        stockin: '',
        stockout: '',
        tenant_id: '',
        product_id: '',
        producttype_id: '',
        stocklocation_id: '',
        stockstatus_id: '',
        stockcondition_id: '',
        pricelist_id: '',
        client_id: '',
        product: ''
      },
      headers: [
        {
          text: 'Brand',
          align: 'left',
          sortable: true,
          value: 'pricelist.product.client.name'
        },
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'pricelist.product.producttype.name'
        },
        {
          text: 'Product',
          align: 'left',
          sortable: true,
          value: 'pricelist.product.name'
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'pricelist.product.description'
        },
        {
          text: 'S/N',
          align: 'left',
          sortable: true,
          value: 'sn'
        },
        {
          text: 'Stock Location',
          align: 'left',
          sortable: true,
          value: 'stocklocation.name'
        },
        {
          text: 'Condition',
          align: 'left',
          sortable: true,
          value: 'stockcondition_id'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: true,
          value: 'stockstatus_id'
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
      return this.editedIndex === -1 ? 'New Stock Item' : 'Edit Stock Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    selectedsupplier () {
      this.buildBrandList(this.selectedsupplier.id)
    },
    selectedbrand () {
      this.buildProductTypeList(this.selectedsupplier.id, this.selectedbrand.product.client.id)
    },
    selectedproducttype () {
      this.buildProductList(this.selectedsupplier.id, this.selectedbrand.product.client.id, this.selectedproducttype.product.producttype.id)
    }
    // ,
    // selectedproduct () {
    //   this.getPriceList(this.selectedsupplier.id, this.selectedbrand.product.client.id, this.selectedproducttype.product.producttype.id, this.selectedproduct.product.id)
    // }

  },
  methods: {
    // get all data from the database server
    async getData () {
      // extract the stock list for this tenant
      const responseStock = await apiService.fetchStockByTenant(JSON.parse(localStorage.user).tenant_id)
      this.Stock = responseStock.data
      // extract list of the clients as supplier
      const responseSupplier = await apiService.fetchClientByTenantAndRelation(JSON.parse(localStorage.user).tenant_id, 'Supplier')
      this.Supplier = responseSupplier.data
      // extract list of the clients as supplier
      const responseStockCondition = await apiService.fetchStockCondition()
      this.StockCondition = responseStockCondition.data
      // extract list of the clients as supplier
      const responseStockStatus = await apiService.fetchStockStatus()
      this.StockStatus = responseStockStatus.data
      // extract the stock location for this tenant
      const responseStockLocation = await apiService.fetchStockLocationByTenant(JSON.parse(localStorage.user).tenant_id)
      this.StockLocation = responseStockLocation.data
    },

    async buildBrandList (client) {
      if (client) {
        this.Brand = [] // clearn up for new product type list
        const responseData = await apiService.fetchPriceListByClient(client)
        this.Brand = responseData.data
      }
    },

    async buildProductTypeList (client, brand) {
      if (client && brand) {
        this.ProductType = [] // clearn up for new product type list
        const responseData = await apiService.fetchPriceListByClientAndBrand(client, brand)
        this.ProductType = responseData.data
      }
    },

    async buildProductList (client, brand, producttype) {
      if (client && brand && producttype) {
        this.Product = [] // clearn up for new product type list
        const responseData = await apiService.fetchPriceListByClientAndBrandAndProductType(client, brand, producttype)
        this.Product = responseData.data
      }
    },

    // async getPriceList (client, brand, producttype, product) {
    //   if (client && brand && producttype) {
    //     // const responseData = await apiService.fetchPriceListByClientAndBrandAndProductTypeAndProduct(client, brand, producttype, product)
    //     // this.PriceProduct = responseData.data
    //     console.log(this.selectedproduct.id)
    //   }
    // },

    async save () {
      try {
        if (this.editedIndex === -1) {
          // this.editedItem.id = Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
          this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          this.editedItem.pricelist_id = this.selectedproduct.id
          this.editedItem.stockcondition_id = this.selectedstockcondition.id
          this.editedItem.stockstatus_id = this.selectedstockstatus.id
          this.editedItem.stocklocation_id = this.selectedstocklocation.id
          await apiService.addStock(this.editedItem)
          this.Stock.push(this.editedItem)
        } else {
          await apiService.updateStock(this.editedItem)
          Object.assign(this.Stock[this.editedIndex], this.editedItem)
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
          apiService.deleteStock(item.id)
          location.reload()
          const index = this.Stock.indexOf(item)
          this.Stock.splice(index, 1)
        }
      })
    },

    editItem (item) {
      this.editedIndex = this.Stock.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    duplicateItem (item) {
      this.editedIndex = this.Stock.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedIndex = -1
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.selectedproduct = ''
        this.selectedbrand = ''
        this.selectedproducttype = ''
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>

<style>

</style>

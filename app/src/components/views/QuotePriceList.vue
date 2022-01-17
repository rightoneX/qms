<template>
  <div class="stock">
    <!-- <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">New Quote List</v-btn>
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
                    item-value="idclient"
                    item-text="name"
                    label="Select a Supplier"
                    v-model="selectedsupplier"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="Brand"
                    item-value="product.idclient"
                    item-text="product.client.name"
                    label="Select a Brand"
                    v-model="selectedbrand"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="ProductType"
                    item-value="product.idproducttype"
                    item-text="product.producttype.name"
                    label="Select a Tyep"
                    v-model="selectedproducttype"
                    return-object
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="Product"
                    item-value="idproduct"
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
                    name="idstockcondition"
                    label="Select a Condition"
                    v-model="selectedstockcondition"
                    item-text="idstockcondition"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="StockStatus"
                    name="idstockstatus"
                    label="Select a Status"
                    v-model="selectedstockstatus"
                    item-text="idstockstatus"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="StockLocation"
                    name="name"
                    label="Select a Stock Location"
                    v-model="selectedstocklocation"
                    item-text="name"
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
    </div> -->
    <v-data-table
      :headers="headers"
      :items="QuoteBlock"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.idquoteblock }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.revision }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.note }}</td>
        <td class="text-xs-left">{{ props.item.idtenant }}</td>
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
      QuoteBlock: [],
      // StockStatus: [],
      // selectedstockstatus: [],
      // StockLocation: [],
      // selectedstocklocation: [],
      // StockCondition: [],
      // selectedstockcondition: [],
      rowsPerPageItems: [10, 20, 30, 40],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        sn: '',
        note: '',
        stockin: '',
        stockout: '',
        idtenant: '',
        idproduct: '',
        idproducttype: '',
        idstocklocation: '',
        idstockstatus: '',
        idstockcondition: '',
        idpricelist: '',
        idclient: ''
      },
      headers: [
        {
          text: 'Block Name',
          align: 'left',
          sortable: true,
          value: 'name'
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
      return this.editedIndex === -1 ? 'New Quote List' : 'Edit Quote List'
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
      // extract the stock list for this tenant
      const responseData = await apiService.fetchQuoteBlock()
      this.QuoteBlock = responseData.data
    },

    // async save () {
    //   try {
    //     if (this.editedIndex === -1) {
    //       this.editedItem.idstock = Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
    //       this.editedItem.idtenant = JSON.parse(localStorage.user).idtenant
    //       this.editedItem.idpricelist = this.PriceProduct[0].idpricelist // this.editedItem.idpricelist
    //       console.log(this.editedItem.idpricelist)
    //       this.editedItem.idstockcondition = this.selectedstockcondition.idstockcondition
    //       // console.log(this.editedItem.idstockcondition)
    //       this.editedItem.idstockstatus = this.selectedstockstatus.idstockstatus
    //       // console.log(this.editedItem.idstockstatus)
    //       this.editedItem.idstocklocation = this.selectedstocklocation.idstocklocation
    //       // console.log(this.editedItem.idstocklocation)
    //       await apiService.addStock(this.editedItem)
    //       this.Stock.push(this.editedItem)
    //     } else {
    //       await apiService.updateStock(this.editedItem)
    //       Object.assign(this.Stock[this.editedIndex], this.editedItem)
    //     }
    //   } catch (err) {
    //     this.errorMessage()
    //     return console.log(err.message)
    //   } finally {
    //     this.close()
    //   }
    //   this.getData()
    // },

    // async errorMessage () {
    //   const $this = this
    //   $this.$swal({
    //     title: 'Request failed !',
    //     text: 'Please check your entery data !',
    //     type: 'info',
    //     showCancelButton: false
    //   })
    // },

    // async deleteItem (stock) {
    //   const $this = this
    //   $this.$swal({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.value) {
    //       apiService.deleteStock(stock.idstock)
    //       location.reload()
    //       const index = this.Stock.indexOf(stock)
    //       this.Stock.splice(index, 1)
    //     }
    //   })
    // },

    // editItem (item) {
    //   this.editedIndex = this.Stock.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialog = true
    // },

    // duplicateItem (item) {
    //   this.editedIndex = this.Stock.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.editedIndex = -1
    //   this.dialog = true
    // },

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

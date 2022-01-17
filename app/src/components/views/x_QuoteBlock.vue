<template>
  <div class="pricelist">
    <div class="formodal">
      <v-dialog v-model="dialogQuoteBlock" max-width="900px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Create Quote Block</v-btn>
     <!-- ++++++++++++++++++++++++++++++++++++++++QUOTE BLOCK ++++++++++++++++++++++++++++++++++++++++++++++ -->
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Name" v-model="editedItem.name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Description" v-model="editedItem.description"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4> <!-- v-if="!editedItem.id"-->
                  <v-text-field label="Total Cost" v-text="editedItem.cost" :prefix="currencySign"></v-text-field>
                </v-flex>
                <!-- +++++++++++++++++++++ADD ITEM TO QUOTE FROM PRICE LIST++++++++++++++++++++++++++++++++ -->
                  <v-dialog v-model="dialogQuotePriceList" max-width="1000px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">Add New Item</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-text-field
                              flat
                              solo-inverted
                              label="Search"
                              prepend-icon="search"
                              class="hidden-sm-and-down"
                              v-model="searchPriceList"
                            ></v-text-field>
                            <v-data-table
                              :items="PriceList"
                              :headers="headersPriceList"
                              :rows-per-page-items="rowsPerPagePriceListItems"
                              class="elevation-1"
                              :search="searchPriceList"
                            >
                              <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.client.name }}</td>
                                <td class="text-xs-left">{{ props.item.product.client.name }}</td>
                                <td class="text-xs-left">{{ props.item.product.producttype.name }}</td>
                                <td class="text-xs-left">{{ props.item.product.name }}</td>
                                <td class="text-xs-left">{{ currencySign+props.item.cost }}</td>
                                <td class="text-xs-left">{{ props.item.currency_id }}</td>
                                <td class="text-xs-left"><input class="input-qty" v-model="props.item.qty" placeholder="1"></td>
                                <td class="text-xs-left"><input class="input-qty" v-model="props.item.margin" placeholder="0"></td>
                                <td class="justify-center layout px-0">
                                  <v-btn icon class="mx-0" @click="addPriceList(props.item)">
                                    <v-icon color="teal">add</v-icon>
                                  </v-btn>
                                </td>
                              </template>
                            </v-data-table>
                          </v-layout>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="cancelQuotePriceList">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                <!-- +++++++++++++++++++++ADD ITEM TO QUOTE FROM PRICE LIS END+++++++++++++++++++++++++++++ -->
               <!-- +++++++++++++++++++++QUOTE BLOCK EDITING++++++++++++++++++++++++++++++++++++++++++++++ -->
                <template v-if="editedItem.id">
                  <div class="item-list-block">
                    <v-btn color="primary" dark class="mb-2" @click="addItemQuotePriceList()">
                      Add Item
                    </v-btn>
                    <v-data-table
                      :items="QuotePriceList"
                      :headers="headersQuotePriceList"
                      :rows-per-page-items="rowsPerPageItems"
                      class="elevation-1"
                      :search="search"
                    >
                      <template slot="items" slot-scope="props" >
                        <td class="text-xs-left">{{ props.item.brand }}</td>
                        <td class="text-xs-left">{{ props.item.type }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ currencySign+props.item.cost }}</td>
                        <td class="text-xs-left">{{ props.item.qty }}</td>
                        <td class="text-xs-left">{{ currencySign+props.item.price }}</td>
                        <td class="text-xs-left">{{ props.item.margin }} %</td>
                        <td class="justify-center layout px-0">
                          <v-btn icon class="mx-0" @click="editItemQuotePriceList(props.item)">
                            <v-icon color="teal">edit</v-icon>
                          </v-btn>
                          <v-btn icon class="mx-0" @click="deleteItemQuotePriceList(props.item)">
                            <v-icon color="pink">delete</v-icon>
                          </v-btn>
                        </td>
                      </template>
                    </v-data-table>
                  </div>
                </template>
               <!-- +++++++++++++++++++++QUOTE BLOCK EDITING END +++++++++++++++++++++++++++++++++++++++++ -->
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="cancelQuoteBlock">Close</v-btn>
            <v-btn v-if="!editedItem.id" color="blue darken-1" flat @click.native="saveQuoteBlock">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
     <!-- ++++++++++++++++++++++++++++++++++++++++QUOTE BLOCK END++++++++++++++++++++++++++++++++++++++++++++++ -->
    </div>
    <v-data-table
      :items="QuoteBlock"
      :headers="headersQuoteBlock"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props" >
        <td class="text-xs-left" @click="editItemQuoteBlock(props.item)">{{ props.item.name}}</td>
        <td class="text-xs-left" @click="editItemQuoteBlock(props.item)">{{ props.item.description}}</td>
        <td class="text-xs-left" @click="editItemQuoteBlock(props.item)">{{ currencySign+props.item.cost }}</td>
        <td class="text-xs-left" @click="editItemQuoteBlock(props.item)">{{ props.item.user.lastName + ' ' + props.item.user.firstName }}</td>
        <td class="text-xs-left" @click="editItemQuoteBlock(props.item)">{{ getDataFormat (props.item.createdAt) }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItemQuoteBlock(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <!-- <v-btn icon class="mx-0" @click="duplicateItem(props.item)">
            <v-icon color="blue darken-2">list</v-icon>
          </v-btn> -->
          <v-btn icon class="mx-0" @click="deleteItemQuoteBlock(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import apiService from '@/Services/ApiService'
import { EventBus } from '@/components/layout/Application'
import moment from 'moment'
export default {
  name: 'pricelist',
  data () {
    return {
      search: '',
      searchPriceList: '',
      rowsPerPageItems: [10, 20, 30, 40],
      rowsPerPagePriceListItems: [5, 7, 10],
      currencySign: '$ ',
      currentQuoteBlock: '',
      PriceList: [],
      itemPriceListQTY: '1',
      editedItemQty: {
        qty: ''
      },
      QuotePriceList: [],
      dialogQuotePriceList: false,
      editedIndexQPL: -1,
      editedItemQPL: {
        name: '',
        description: '',
        cost: '',
        user: {
          firstName: '',
          lastName: ''
        }
      },
      QuoteBlock: [],
      dialogQuoteBlock: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
        cost: '',
        user: {
          firstName: '',
          lastName: ''
        }
      },
      headersQuoteBlock: [
        {
          text: 'Block Name',
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
          text: 'Cost',
          align: 'left',
          sortable: true,
          value: 'cost'
        },
        {
          text: 'Created By',
          align: 'left',
          sortable: true,
          value: 'user.lastName'
        },
        {
          text: 'Created At',
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      headersQuotePriceList: [
        {
          text: 'Brand',
          align: 'left',
          sortable: true,
          value: 'brand'
        },
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'type'
        },
        {
          text: 'Model',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Cost',
          align: 'left',
          sortable: true,
          value: 'cost'
        },
        {
          text: 'Qty',
          align: 'left',
          sortable: true,
          value: 'qty'
        },
        {
          text: 'Price',
          align: 'left',
          sortable: true,
          value: 'price'
        },
        {
          text: 'Margin',
          align: 'left',
          sortable: true,
          value: 'margin'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      headersPriceList: [
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
          text: 'Qty',
          align: 'left',
          sortable: true,
          value: 'qty'
        },
        {
          text: 'Margin',
          align: 'left',
          sortable: true,
          value: 'margin'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ]
    }
  },
  created () {
  // Using the server bus for the content searching
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
    },
    newQuote () {
      return this.editedIndex === -1 ? this.creatNewQuote('new') : this.creatNewQuote('ex')
    }
  },
  watch: {
    dialogQuoteBlock (val) {
      val || this.cancelQuoteBlock()
    },
    dialogQuotePriceList (val) {
      val || this.cancelQuotePriceList()
    }
  },
  methods: {
    async getData () {
      const responseQuoteBlockData = await apiService.fetchQuoteBlockByTenant(JSON.parse(localStorage.user).tenant_id)
      this.QuoteBlock = responseQuoteBlockData.data
      this.getPriceList()
    },

    async getPriceList () {
      const responsePriceList = await apiService.fetchPriceListByTenant(JSON.parse(localStorage.user).tenant_id)
      this.PriceList = responsePriceList.data
    },

    async getQuotePriceListData (quoteblockId) {
      const responseQuotePriceListData = await apiService.fetchQuotePriceListByQuoteBlock(quoteblockId)
      this.QuotePriceList = responseQuotePriceListData.data
      this.currentQuoteBlock = quoteblockId
    },

    getDataFormat (value) {
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
      }
    },

    addItemQuotePriceList () {
      this.dialogQuotePriceList = true
    },

    async saveQuoteBlock () {
      try {
        this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
        this.editedItem.user_id = JSON.parse(localStorage.user).id
        if (this.editedIndex === -1) { // add new quote block
          this.editedItem.cost = '0'
          await apiService.addQuoteBlock(this.editedItem)
          this.QuoteBlock.push(this.editedItem)
          // this.dialogQuoteBlock = true
          // this.editItemQuoteBlock(this.editedItem) // once the quote block is created open for edition
          // console.log(this.editedItem)
        } else { // update existing quote block
          this.editedItem.id = this.currentQuoteBlock
          await apiService.updateQuoteBlock(this.editedItem)
          Object.assign(this.QuoteBlock[this.editedIndex], this.editedItem)
        }
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
        if (this.editedIndex === -1) { // if its updeated do not close the form
          this.cancelQuoteBlock()
        }
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

    async deleteItemQuoteBlock (item) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          apiService.deleteQuoteBlock(item.id)
          const index = this.QuoteBlock.indexOf(item)
          this.QuoteBlock.splice(index, 1)
        }
      })
    },

    editItemQuoteBlock (item) {
      this.editedIndex = this.QuoteBlock.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.getQuotePriceListData(this.editedItem.id)
      this.dialogQuoteBlock = true
      console.log(item)
    },

    cancelQuoteBlock () {
      this.dialogQuoteBlock = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    duplicateItem (item) {
      this.editedIndex = this.QuoteList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedIndex = -1
      this.dialogQuoteBlock = true
    },

    async deleteItemQuotePriceList (item) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          apiService.deleteQuotePriceList(item.id)
          const index = this.QuotePriceList.indexOf(item)
          this.QuotePriceList.splice(index, 1)
          this.getTotalBlockQuoteItemPrice() // find total cost of all items in this module
        }
      })
    },

    cancelQuotePriceList () {
      this.dialogQuotePriceList = false
      setTimeout(() => {
        this.editedItemQPL = Object.assign({}, this.defaultItem)
        this.editedIndexQPL = -1
      }, 300)
    },

    async addPriceList (item) {
      try {
        // if (this.editedIndex === -1) {
        // supplyer
        this.editedItemQPL.brand = item.product.client.name
        this.editedItemQPL.type = item.product.producttype.name
        this.editedItemQPL.name = item.product.name
        this.editedItemQPL.cost = item.cost
        if (!item.qty) { item.qty = '1' } // check if user enter the quantity
        this.editedItemQPL.qty = item.qty
        if (!item.margin) { item.margin = '0' } // check if user enter the margin
        this.editedItemQPL.margin = item.margin
        item.price = ((parseInt(item.cost, 10) + ((parseInt(item.margin, 10) / 100) * parseInt(item.cost, 10))) * parseInt(item.qty, 10))
        this.editedItemQPL.price = item.price
        // general infromation
        this.editedItemQPL.pricelist_id = item.id
        this.editedItemQPL.quoteblock_id = this.currentQuoteBlock
        this.editedItemQPL.tenant_id = JSON.parse(localStorage.user).tenant_id
        this.editedItemQPL.user_id = JSON.parse(localStorage.user).id
        await apiService.addQuotePriceList(this.editedItemQPL)
        this.getPriceList()
        // this.editedItemQPL = null
        this.QuotePriceList.push(this.editedItemQPL)
        this.getTotalBlockQuoteItemPrice() // find total cost of all items in this module
        // }
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
        this.cancelQuotePriceList()
      }
      this.dialogQuotePriceList = false
    },

    getTotalBlockQuoteItemPrice () { // loop to get total block price list for this Block Quote
      try {
        let tmpSum = 0
        if (this.QuotePriceList.length > 0) {
          for (let i = 0; this.QuotePriceList.length > i; i++) {
            tmpSum = parseInt(tmpSum, 10) + parseInt(this.QuotePriceList[i].price, 10)
          }
        }
        this.editedIndex = 0 // updated mode
        this.editedItem.cost = tmpSum
        this.saveQuoteBlock()
      } catch (err) {
        return console.log(err.message)
      }
    }

  }
}
</script>
<style>
/* .btn-item-add-title {
  padding-right: 10px;
  float: left;
} */
.text-xs-left {
  width: 200px;
}
.dialog-price-list {
  position: relative;
}
.input-qty {
  width: 20px;
  color: red;
}
</style>

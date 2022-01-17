<template>
  <div class="quoteblocklist">
    <!-- <div class="formodal"> -->
      <!-- ++++++++++++++++++++++++++++++++++++++++QUOTE BLOCK ++++++++++++++++++++++++++++++++++++++++++++++ -->
       <v-dialog v-model="dialogQuoteBlock" max-width="900px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Create Price Block</v-btn>
         <v-card>
          <v-card-title>
            <span class="headline">{{ dialogQuoteBlockTitle }}</span>
          </v-card-title>
          <v-card-text>
              <v-layout wrap>
                <v-flex xs4 px-1>
                  <v-text-field label="Name" v-model="editedItem.name"></v-text-field>
                </v-flex>
                <v-flex xs6 px-1>
                  <v-text-field label="Description" v-model="editedItem.description"></v-text-field>
                </v-flex>
                <!-- +++++++++++++++++++++ADD ITEM TO QUOTE FROM PRICE LIST++++++++++++++++++++++++++++++++ -->
                  <v-dialog v-model="dialogPriceList" max-width="1000px">
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
                              :rows-per-page-items="rowsPriceList"
                              :search="searchPriceList"
                              class="elevation-1"
                            >
                              <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.client.name }}</td>
                                <td class="text-xs-left">{{ props.item.product.client.name }}</td>
                                <td class="text-xs-left">{{ props.item.product.producttype.name }}</td>
                                <td class="text-xs-left">{{ props.item.product.name }}</td>
                                <td class="text-xs-left">{{ currencySign+props.item.cost }}</td>
                                <td class="text-xs-left">{{ props.item.currency_id }}</td>
                                <td class="text-xs-left"><input class="input-data" v-model="props.item.qty" placeholder="1"></td>
                                <td class="text-xs-left"><input class="input-data" v-model="props.item.margin" placeholder="0">%</td>
                                <td class="justify-center layout px-0">
                                  <v-btn icon class="mx-0" @click="saveQuoteBlockPriceList(props.item)">
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
                        <v-btn color="blue darken-1" flat @click.native="cancelPriceList">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                <!-- +++++++++++++++++++++ADD ITEM TO QUOTE FROM PRICE LIS END+++++++++++++++++++++++++++++ -->
                  <v-dialog v-model="dialogQuoteBlockItem" max-width="900px">
                    <v-card>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-data-table
                              :items="QuoteBlockItem"
                              :headers="headersQuoteBlockItem"
                              class="elevation-1"
                              hide-actions
                            >
                              <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.brand }}</td>
                                <td class="text-xs-left">{{ props.item.type }}</td>
                                <td class="text-xs-left">{{ props.item.name }}</td>
                                <td class="text-xs-left">{{ currencySign+props.item.cost }}</td>
                                <td class="text-xs-left"><input class="input-data" v-model="props.item.qty"></td>
                                <td class="text-xs-left">{{ currencySign+props.item.price }}</td>
                                <td class="text-xs-left"><input class="input-data" v-model="props.item.margin">%</td>
                                <td class="text-xs-left">
                                  <v-btn color="blue darken-1" flat @click.native="updateQuoteBlockItem(props.item)">Update</v-btn>
                                  <!-- <v-btn icon class="mx-0" @click="updateQuoteBlockItem(props.item)">
                                    <v-icon color="teal">update</v-icon>
                                  </v-btn> -->
                                </td>
                              </template>
                            </v-data-table>
                          </v-layout>
                        </v-container>
                      </v-card-text>
                      <!-- <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="closeQuoteBlockItem">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="updateQuoteBlockItem(item)">Close</v-btn>
                      </v-card-actions> -->
                    </v-card>
                  </v-dialog>
               <!-- +++++++++++++++++++++QUOTE BLOCK EDITING++++++++++++++++++++++++++++++++++++++++++++++ -->
                  <div class="item-list-block" v-if="editedItem.id">
                    <v-flex xs4 px-1>
                      <v-text-field label="Total Cost"  v-model="editedItem.cost" :prefix="currencySign" readonly></v-text-field>
                    </v-flex>
                    <v-btn color="primary" dark class="mb-2" @click="addItemFromPriceList()">Add Item</v-btn>
                    <v-data-table
                      :items="QuotePriceList"
                      :headers="headersQuotePriceList"
                      :rows-per-page-items="rowsQuotePriceList"
                      :search="search"
                      class="elevation-1"
                    >
                      <template slot="items" slot-scope="props" >
                        <td class="text-xs-left">{{ props.item.brand }}</td>
                        <td class="text-xs-left">{{ props.item.type }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ currencySign+props.item.cost }}</td>
                        <td class="text-xs-left">{{ props.item.qty }}</td>
                        <!-- <td class="text-xs-left"><input class="input-data" v-model="props.item.qty"></td> -->
                        <!-- <td class="text-xs-left"><input v-model="props.item.qty"></td> -->
                        <td class="text-xs-left">{{ currencySign+props.item.price }}</td>
                        <td class="text-xs-left">{{ props.item.margin }} %</td>
                        <!-- <td class="text-xs-left"><input class="input-data" v-model="props.item.margin">%</td> -->
                        <td class="justify-center layout px-0">
                          <v-btn icon class="mx-0" @click="editQuoteBlockItem(props.item)">
                            <v-icon color="teal">edit</v-icon>
                          </v-btn>
                          <v-btn icon class="mx-0" @click="deletePriceList(props.item)">
                            <v-icon color="pink">delete</v-icon>
                          </v-btn>
                        </td>
                      </template>
                    </v-data-table>
                  </div>
               <!-- +++++++++++++++++++++QUOTE BLOCK EDITING END +++++++++++++++++++++++++++++++++++++++++ -->
              </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="blue darken-1" flat @click.native="closeQuoteBlock">Close</v-btn> -->
            <v-btn v-if="!editedItem.id" color="blue darken-1" flat @click.native="saveQuoteBlock">Create</v-btn>
            <v-btn v-if="editedItem.id" color="blue darken-1" flat @click.native="updateQuoteBlock">Close</v-btn>
          </v-card-actions>
        </v-card>
       </v-dialog>
      <!-- ++++++++++++++++++++++++++++++++++++++++QUOTE BLOCK END++++++++++++++++++++++++++++++++++++++++++++++ -->
    <!-- </div> -->
    <v-data-table
      :items="QuoteBlock"
      :headers="headersQuoteBlock"
      :rows-per-page-items="rowsQuoteBlock"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props" >
        <td class="text-xs-left" @click="editQuoteBlock(props.item)">{{ props.item.name }}</td>
        <td class="text-xs-left" @click="editQuoteBlock(props.item)">{{ props.item.description }}</td>
        <td class="text-xs-left" @click="editQuoteBlock(props.item)">{{ currencySign+props.item.cost }}</td>
        <td class="text-xs-left" @click="editQuoteBlock(props.item)">{{ props.item.user.lastName + ' ' + props.item.user.firstName }}</td>
        <td class="text-xs-left" @click="editQuoteBlock(props.item)">{{ convertDataFormat (props.item.createdAt) }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editQuoteBlock(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="duplicateQuoteBlock(props.item)">
            <v-icon color="blue darken-2">list</v-icon> <!-- TO DO -->
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteQuoteBlock(props.item)">
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
import Currency from 'currency.js'
export default {
  name: 'quoteblocklist',
  data () {
    return {
      // Quote Block
      search: '',
      currencySign: '$',
      rowsQuoteBlock: [10, 20, 30, 40],
      currentQuoteBlock: '',
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
          value: 'user.lastName',
          value1: 'user.firstName'
        },
        {
          text: 'Created At',
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      QuoteBlock: [],
      dialogQuoteBlock: false,
      editedQuoteBlockIndex: -1,
      editedItem: {},
      // Price List
      rowsPriceList: [5, 7, 10, 20],
      searchPriceList: '',
      PriceList: [],
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
      ],
      // Quote Price List
      QuotePriceList: [],
      rowsQuotePriceList: [5, 7, 10],
      dialogPriceList: false,
      editedItemQPL: {},
      itemQty: '',
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
      dialogQuoteBlockItem: false,
      editedQuoteBlockItemIndex: -1,
      QuoteBlockItem: [],
      headersQuoteBlockItem: [
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
    this.getQuoteBlockList()
    // this.getPriceList()
  },
  computed: {
    dialogQuoteBlockTitle () {
      return this.editedQuoteBlockIndex === -1 ? 'New Quote Block' : 'Edit Quote Block'
    }
  },
  watch: {
    dialogQuoteBlock (val) {
      val || this.closeQuoteBlock()
    },
    dialogPriceList (val) {
      val || this.cancelPriceList()
    }
  },
  methods: {
    async getQuoteBlockList () {
      const responseQuoteBlockData = await apiService.fetchQuoteBlockByTenant(JSON.parse(localStorage.user).tenant_id)
      this.QuoteBlock = responseQuoteBlockData.data
    },

    async getPriceList () {
      const responsePriceList = await apiService.fetchPriceListByTenant(JSON.parse(localStorage.user).tenant_id)
      this.PriceList = responsePriceList.data
    },

    async getQuotePriceListData (quoteblockId) {
      const responseQuotePriceListData = await apiService.fetchQuotePriceListByQuoteBlock(quoteblockId)
      this.QuotePriceList = responseQuotePriceListData.data
    },

    async getQuoteBlockItem (id) {
      const responseQuoteBlockItem = await apiService.fetchQuotePriceListById(id)
      this.QuoteBlockItem = responseQuoteBlockItem.data
    },

    convertDataFormat (value) {
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
      }
    },

    // Quote Block ******************************************************
    async saveQuoteBlock () {
      try {
        this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
        this.editedItem.user_id = JSON.parse(localStorage.user).id
        if (this.editedQuoteBlockIndex === -1) { // add new quote block
          this.editedItem.cost = '0' // new quote block
          const responseQuoteBlock = await apiService.addQuoteBlock(this.editedItem)
          this.editQuoteBlock(responseQuoteBlock.data) // once the quote block is created open for edition
          // console.log('save block')
        } else { // update existing quote block
          this.editedItem.id = this.currentQuoteBlock
          await apiService.updateQuoteBlock(this.editedItem)
          // Object.assign(this.QuoteBlock[this.editedQuoteBlockIndex], this.editedItem)
          // console.log('update block')
        }
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
      }
      this.getQuotePriceListData(this.currentQuoteBlock)
      this.getQuoteBlockList()
    },

    async deleteQuoteBlock (item) {
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

    editQuoteBlock (item) {
      this.editedItem = Object.assign({}, item)
      this.getQuotePriceListData(this.editedItem.id)
      this.currentQuoteBlock = this.editedItem.id
      this.getPriceList() // get item price list
      this.dialogQuoteBlock = true
    },

    updateQuoteBlock () {
      this.PriceList = []
      this.editedQuoteBlockIndex = 0 // update mode
      this.saveQuoteBlock()
      this.closeQuoteBlock()
    },

    closeQuoteBlock () {
      this.dialogQuoteBlock = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedQuoteBlockIndex = -1
      }, 300)
    },

    duplicateQuoteBlock (item) {
      // TO DO
    },

    editQuoteBlockItem (item) {
      this.getQuoteBlockItem(item.id)
      this.dialogQuoteBlockItem = true
    },

    updateQuoteBlockItem (item) {
      this.editedQuoteBlockItemIndex = 0 // update mode
      this.saveQuoteBlockPriceList(item)
    },

    closeQuoteBlockItem () {
      this.dialogQuoteBlockItem = false
    },

    async reupdateQuoteBlockItem (item) {
      try {
        // this.editedItemQPL.pricelist_id = item.id
        // this.editedItemQPL.quoteblock_id = this.currentQuoteBlock
        // this.editedItemQPL.tenant_id = JSON.parse(localStorage.user).tenant_id
        // this.editedItemQPL.user_id = JSON.parse(localStorage.user).id
        // this.editedItemQPL.brand = item.product.client.name
        // this.editedItemQPL.type = item.product.producttype.name
        // this.editedItemQPL.name = item.product.name
        // this.editedItemQPL.cost = item.cost
        if (!item.qty) { item.qty = '2' } // check if user enter the quantity, by default qty = 1
        // this.editedItemQPL.qty = item.qty
        if (!item.margin) { item.margin = '0' } // check if user enter the margin, by default margin = 0%
        // this.editedItemQPL.margin = item.margin
        // ****************** Margin and Qty Price calculation ***************
        let margin = parseInt(item.margin, 10) / 100 // ( cost + ((margin / 100) * cost) ) * qty
        let present = Currency(margin).multiply(item.cost)
        let costpresent = Currency(item.cost).add(present)
        let costtotal = Currency(costpresent).multiply(item.qty)
        this.editedItemQPL.price = costtotal
        // ********************************************************************
        await apiService.addQuotePriceList(this.editedItemQPL)
        this.QuotePriceList.push(this.editedItemQPL)
        this.getTotalBlockQuoteItemPrice() // find total cost of all items in this module
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
        this.cancelPriceList()
      }
      // this.PriceList = []
      this.dialogPriceList = false
    },
    // Price List ******************************************************
    addItemFromPriceList () {
      this.dialogPriceList = true
    },

    async deletePriceList (item) {
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

    cancelPriceList () {
      this.dialogPriceList = false
      setTimeout(() => {
        this.editedItemQPL = Object.assign({}, this.defaultItem)
      }, 300)
    },
    // Quote Block Price List *********************************************
    async saveQuoteBlockPriceList (item) {
      try {
        if (!item.qty) { item.qty = '1' } // check if user enter the quantity, by default qty = 1
        this.editedItemQPL.qty = item.qty
        if (!item.margin) { item.margin = '0' } // check if user enter the margin, by default margin = 0%
        this.editedItemQPL.margin = item.margin
        // ****************** Margin and Qty Price calculation ***************
        let margin = parseInt(item.margin, 10) / 100 // ( cost + ((margin / 100) * cost) ) * qty
        let present = Currency(margin).multiply(item.cost)
        let costpresent = Currency(item.cost).add(present)
        let costtotal = Currency(costpresent).multiply(item.qty)
        this.editedItemQPL.price = costtotal
        // ********************************************************************
        if (this.editedQuoteBlockItemIndex === -1) { // add new quote block
          this.editedItemQPL.quoteblock_id = this.currentQuoteBlock
          this.editedItemQPL.tenant_id = JSON.parse(localStorage.user).tenant_id
          this.editedItemQPL.user_id = JSON.parse(localStorage.user).id
          this.editedItemQPL.pricelist_id = item.id
          this.editedItemQPL.brand = item.product.client.name
          this.editedItemQPL.type = item.product.producttype.name
          this.editedItemQPL.name = item.product.name
          this.editedItemQPL.cost = item.cost
          // console.log('line here')
          await apiService.addQuotePriceList(this.editedItemQPL)
        } else { // update existing quote block
          // TO DO
          // console.log('updated')
          this.editedItemQPL.id = item.id
          await apiService.updateQuotePriceList(this.editedItemQPL)
        }
        this.QuotePriceList.push(this.editedItemQPL)
        this.getTotalBlockQuoteItemPrice() // find total cost of all items in this module
        this.editedQuoteBlockItemIndex = -1 // get back to new quote block mode
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
        this.cancelPriceList()
      }
      // this.PriceList = []
      this.dialogPriceList = false
      this.dialogQuoteBlockItem = false
    },

    getTotalBlockQuoteItemPrice () { // loop to get total block price list for this Block Quote
      try {
        let tmpSum = 0
        if (this.QuotePriceList.length > 0) {
          for (let i = 0; this.QuotePriceList.length > i; i++) {
            tmpSum = Currency(tmpSum).add(this.QuotePriceList[i].price)
          }
        }
        this.editedQuoteBlockIndex = 0 // updated mode
        // if (tmpSum === 0) { tmpSum = '0.00' }
        this.editedItem.cost = Currency(tmpSum).format()
        this.saveQuoteBlock() // save the total quote block to db
      } catch (err) {
        return console.log(err.message)
      }
    },
    // DB Error Message ******************************************************
    async errorMessage () {
      const $this = this
      $this.$swal({
        title: 'Request failed !',
        text: 'Please check your entery data !',
        type: 'info',
        showCancelButton: false
      })
    }
  }
}
</script>
<style>
/* .btn-item-add-title {
  padding-right: 10px;
  float: left;
} */
.headline {
  margin-bottom: 0px;
  padding-bottom: 0px;
}
.text-xs-left {
  width: 200px;
}
.dialog-price-list {
  position: relative;
}
.input-data {
  width: 20px;
  color: red;
}
</style>

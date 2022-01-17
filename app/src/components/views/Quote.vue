<template>
  <div class="Quote">
      <v-list-tile-content>
        <v-list-tile-title>Quote {{ Quote.number }} </v-list-tile-title>
      </v-list-tile-content>
      <v-flex xs12 sm6 md4 >
        <div class="text-truncate">Created By {{ Quote.user.firstName + ' ' + Quote.user.lastName }}</div>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field label="Title" v-model="Quote.name"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field label="Total price" v-model="Quote.totalprice"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-select
          :items="QuoteStatus"
          item-value="id"
          item-text="id"
          label="Select a Status"
          v-model="selectedquotestatus"
          return-object
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field label="Project Address" v-model="Quote.address"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field label="Description" v-model="Quote.description"></v-text-field>
      </v-flex>
      <!-- Client Quote Request Entry Form  -->
      <div class="formodal">
        <v-dialog v-model="dialogQuoteRequest" max-width="800px">
          <v-btn color="primary" dark slot="activator" class="mb-2">New Request</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">New Request</span>
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
                      v-model="selectedclient"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="Contact"
                      item-value="id"
                      item-text="lastName"
                      label="Select a Contact"
                      v-model="selectedcontact"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="date"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Picker in menu"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="QuoteRequestStatus"
                      item-value="id"
                      item-text="id"
                      label="Select a Status"
                      v-model="selectedquoterequeststatus"
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
              <v-btn color="blue darken-1" flat @click.native="closeQuoteRequest">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="saveQuoteRequest">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <!-- Client Request List -->
      <v-data-table
            :items="QuoteRequest"
            :headers="headers"
            :rows-per-page-items="rowsPerPageItems"
            class="elevation-1"
            :search="search"
      >
      <template slot="items" slot-scope="props" >
        <td class="text-xs-left">{{ props.item.client.name }}</td>
        <td class="text-xs-left">{{ props.item.contact.lastName + ' ' + props.item.contact.firstName }}</td>
        <td class="text-xs-left">{{ props.item.contact.email }}</td>
        <td class="text-xs-left">{{ props.item.note }}</td>
        <td class="text-xs-left">{{ props.item.requestedby }}</td>
        <td class="text-xs-left">{{ props.item.quoterequeststatus_id }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItemQuoteRequest(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItemQuoteRequest(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-flex>
      <v-text-field multi-line label="Workscope" v-model="Quote.workscope"></v-text-field>
    </v-flex>
    <!-- Quote Block List -->
    <v-list-tile-content>
      <v-list-tile-title>Total Quote Price  {{ TotalQuotePrice }} </v-list-tile-title>
    </v-list-tile-content>
    <div class="formodal">
        <v-dialog v-model="dialogQuoteBlock" max-width="1200px">
          <v-btn color="primary" dark slot="activator" class="mb-2">New Block</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">New Ietms Block</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field label="Block Name" v-model="blockEditedItem.name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field label="Description" v-model="blockEditedItem.description"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field label="Qty" v-model="blockEditedItem.qty"></v-text-field>
                  </v-flex>
                  <v-btn color="primary" dark slot="activator" class="mb-2">Add Item</v-btn>
                </v-layout>
                <!-- Add New Item from Price List -->
               <v-data-table v-bind:headers="quoteBlockItemHeaders" :items="bloodsugars" hide-actions>
                <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.value }}</td>
                <td class="text-xs-right">{{ props.item.time }}</td>
              </template>
              </v-data-table>
                <!-- End of the itme list -->
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="closeQuoteBlock">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="saveQuoteBlock">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <!-- Quote Equipment Block -->
      <v-data-table
            :items="QuoteBlockList"
            :headers="quoteblockheaders"
            :rows-per-page-items="rowsPerPageItems"
            class="elevation-1"
            hide-actions
        >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.quoteblock.name }}</td>
          <td>{{ props.item.quoteblock.description }}</td>
          <td>{{'$' + props.item.cost }}</td>
          <td>{{ props.item.qty }}</td>
          <td>{{ props.item.margin + ' %'}}</td>
          <td>{{'$' +  props.item.price }}</td>
          <div>{{ getTotalQuotePrice(props.item.price) }}</div>
          <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItemQuoteBlockList(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="duplicateItemQuoteBlockList(props.item)">
            <v-icon color="blue darken-2">list</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItemQuoteBlockList(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
        </template>
      </v-data-table>
            <v-btn color="primary" @click.native="updateQuote">Update</v-btn>
  </div>
</template>

<script>
import apiService from '@/Services/ApiService'
export default {
  name: 'Quote',
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      totalPrice: 0,
      search: '',
      QuoteBlockItemList: '',
      TotalQuotePrice: '',
      QuoteRequest: [],
      QuoteRequestStatus: [],
      selectedquoterequeststatus: '',
      Client: [],
      selectedclient: [],
      Contact: [],
      selectedcontact: [],
      QuoteStatus: [],
      selectedquotestatus: [],
      QuoteBlock: [],
      rowsPerPageItems: [5, 10, 15, 20],
      dialogQuoteRequest: false,
      dialogQuoteBlock: false,
      client: '',
      QuoteBlockList: [],
      quoteBlockListItem: {
        qty: '',
        price: '',
        cost: '',
        margin: ''
      },
      blockEditedIndex: -1,
      blockEditedItem: {
        name: '',
        revision: '',
        note: '',
        description: ''
      },
      editedIndex: -1,
      editedItem: {
        contact: '',
        client: '',
        requestedby: '',
        requeststatus: ''
      },
      Quote: {
        user: ''
      },
      headers: [
        {
          text: 'Client',
          align: 'left',
          sortable: true,
          value: 'client_id'
        },
        {
          text: 'Contact',
          align: 'left',
          sortable: true,
          value: 'contact.firstName'
        },
        {
          text: 'Email',
          align: 'left',
          sortable: true,
          value: 'contact.email'
        },
        {
          text: 'Note',
          align: 'left',
          sortable: true,
          value: 'note'
        },
        {
          text: 'Requested by',
          align: 'left',
          sortable: true,
          value: 'requestedby'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: true,
          value: 'quoterequeststatus_id'
        },
        { text: 'Update Status', value: 'name', sortable: false, align: 'center' }
      ],
      quoteblockheaders: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'quoteblock.name'
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'quoteblock.description'
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
          text: 'Margin',
          align: 'left',
          sortable: true,
          value: 'margin'
        },
        {
          text: 'Sell Price',
          align: 'left',
          sortable: true,
          value: 'price'
        },
        { text: 'Update Status', value: 'name', sortable: false, align: 'center' }
      ],
      quoteBlockItemHeaders: [
        {
          text: 'Brand',
          align: 'left',
          sortable: true,
          value: 'value'
        },
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'time'
        },
        {
          text: 'Model',
          align: 'left',
          sortable: true,
          value: 'model'
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
        {
          text: 'Price',
          align: 'left',
          sortable: true,
          value: 'price'
        }
      ],
      bloodsugars: [
        {
          value: 86,
          time: '12/17 02:56:18'
        },
        {
          value: 92,
          time: '12/17 06:12:47'
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    selectedclient () {
      this.buildContactList(this.selectedclient.id)
    }
  },
  methods: {
    async getData () {
      const responseQuoteData = await apiService.fetchQuoteByTenantAndNumber(JSON.parse(localStorage.user).tenant_id, this.$route.params.number)
      this.Quote = responseQuoteData.data
      // Client Quote Request
      const responseRequestData = await apiService.fetchQuoteRequestByQuote(this.Quote.id)
      this.QuoteRequest = responseRequestData.data
      // console.log(this.QuoteRequest)
      const responseClient = await apiService.fetchClientByTenantAndRelation(JSON.parse(localStorage.user).tenant_id, 'Purchaser')
      this.Client = responseClient.data
      // console.log(this.Client)
      const responseQuoteRequestStatusData = await apiService.fetchQuoteRequestStatus()
      this.QuoteRequestStatus = responseQuoteRequestStatusData.data
      // Main Quote status
      const responseQuoteStatusData = await apiService.fetchQuoteStatus()
      this.QuoteStatus = responseQuoteStatusData.data
      this.selectedquotestatus.id = this.Quote.quotestatus_id
      // Quote Block List
      const responseQuoteBlockListData = await apiService.fetchQuoteBlockListByQuote(this.Quote.id)
      this.QuoteBlockList = responseQuoteBlockListData.data

      // Quote Price List ByQuoteBlock
      // const responseQuoteBlockListData = await apiService.fetchQuotePriceListByQuoteBlock(this.QuoteBlock.id)
      // this.QuoteBlockList = responseQuoteBlockListData.data
    },

    async buildContactList (client) {
      if (client) {
        this.Contact = []
        const responseData = await apiService.fetchContactByClient(client)
        this.Contact = responseData.data
        console.log(this.Contact)
      }
    },

    async deleteItemQuoteRequest (item) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          apiService.deleteQuoteRequest(item.id)
          // location.reload()
          const index = this.QuoteRequest.indexOf(item)
          this.QuoteRequest.splice(index, 1)
        }
      })
    },

    editItem (item) {
      this.editedIndex = this.QuoteRequest.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // this.selectedbrand = this.editedItem.product.client.name
      // this.selectedsupplier = this.editedItem.client.name
      // this.selectedproducttype = this.editedItem.product.producttype.id
      // this.selectedproduct = this.editedItem.product.name
      // this.selectedcurrency = this.editedItem.currency_id
      this.dialogQuoteRequest = true
    },

    async updateQuote () {
      try {
        this.Quote.quotestatus_id = this.selectedquotestatus.id
        await apiService.updateQuote(this.Quote)
      } catch (err) {
        return console.log(err.message)
      } finally {
        this.close()
      }
    },

    async saveQuoteRequest () {
      try {
        if (this.editedIndex === -1) {
          this.editedItem.quote_id = this.Quote.id
          this.editedItem.revision = '1'
          this.editedItem.description = 'description'
          this.editedItem.requestedby = this.date
          this.editedItem.contact_id = this.selectedcontact.id
          this.editedItem.client_id = this.selectedclient.id
          this.editedItem.quoterequeststatus_id = this.selectedquoterequeststatus.id
          await apiService.addQuoteRequest(this.editedItem)
          this.QuoteRequest.push(this.editedItem)
        } else {
          await apiService.updateQuoteRequest(this.editedItem)
          Object.assign(this.QuoteRequest[this.editedIndex], this.editedItem)
        }
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
        this.closeQuoteRequest()
      }
      this.getData()
    },

    closeQuoteRequest () {
      this.dialogQuoteRequest = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        // this.selectedquotestatus = ''
      }, 300)
    },

    // Quote Block section .............................
    async saveQuoteBlock () {
      try {
        if (this.blockEditedIndex === -1) {
          // Create the Quote Block
          this.blockEditedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          this.blockEditedItem.user_id = JSON.parse(localStorage.user).id
          var newQuoteBlock = await apiService.addQuoteBlock(this.blockEditedItem)
          // Create the Quote Block List and attached it to the current quote
          this.quoteBlockListItem.quoteblock_id = newQuoteBlock.data.id
          this.quoteBlockListItem.quote_id = this.Quote.id
          this.quoteBlockListItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          this.quoteBlockListItem.qty = this.blockEditedItem.qty // '1'
          this.quoteBlockListItem.price = '1.00'
          this.quoteBlockListItem.cost = '1.00'
          this.quoteBlockListItem.margin = '1'
          await apiService.addQuoteBlockList(this.quoteBlockListItem)
          this.QuoteBlock.push(this.blockEditedItem)
        } else {
          await apiService.updateQuoteBlock(this.blockEditedItem)
          Object.assign(this.QuoteBlock[this.blockEditedIndex], this.blockEditedItem)
        }
      } catch (err) {
        this.errorMessage()
        return console.log(err.message)
      } finally {
        this.closeQuoteBlock()
      }
      this.getData()
    },

    closeQuoteBlock () {
      this.dialogQuoteBlock = false
      setTimeout(() => {
        this.blockEditedItem = Object.assign({}, this.defaultItem)
        this.blockEditedIndex = -1
        // this.selectedquotestatus = ''
      }, 300)
    },

    async deleteItemQuoteBlockList (item) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          apiService.deleteQuoteBlockList(item.id)
          // location.reload()
          const index = this.QuoteBlockList.indexOf(item)
          this.QuoteBlockList.splice(index, 1)
        }
      })
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

    getTotalQuotePrice (blockPrice) {
      console.log(blockPrice)
      // this.totalPrice = this.totalPrice + blockPrice
      // console.log(currency('-$5,000').add(1234.56))
      // this.TotalQuotePrice = blockPrice
    }
  }
}
</script>

<style>
.info_block {
  margin: 30px 0px 20px 30px;
  list-style: none;
}
</style>

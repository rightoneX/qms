<template>
  <div class="pricelist">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add New Quote</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Quote Number" v-model="editedItem.number">{{ newQuote }}
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Title" v-model="editedItem.name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Total Price" v-model="editedItem.totalprice"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Revision" v-model="editedItem.revision"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Description" v-model="editedItem.description"></v-text-field>
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
      :items="QuoteList"
      :headers="headers"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props" >
      <router-link :to="{ path: `quote/${props.item.number}` }" tag="td">{{ props.item.number }}</router-link>
      <router-link :to="{ path: `quote/${props.item.number}` }" tag="td" class="text-xs-left">{{ props.item.name }}</router-link>
      <router-link :to="{ path: `quote/${props.item.number}` }" tag="td">{{ props.item.totalprice }}</router-link>
      <router-link :to="{ path: `quote/${props.item.number}` }" tag="td">{{ props.item.description }}</router-link>
      <router-link :to="{ path: `quote/${props.item.number}` }" tag="td">{{ props.item.quotestatus.id }}</router-link>
      <router-link :to="{ path: `quote/${props.item.number}` }" tag="td">{{ props.item.user.lastName + ' ' + props.item.user.firstName }}</router-link>
      <router-link :to="{ path: `quote/${props.item.number}` }" tag="td">{{ getDataFormat (props.item.createdAt) }}</router-link>
        <!-- <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.totalprice }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.quotestatus.id }}</td>
        <td class="text-xs-left">{{ props.item.user.lastName + ' ' + props.item.user.firstName }}</td>
        <td class="text-xs-left">{{ getDataFormat (props.item.createdAt) }}</td> -->
        <td class="justify-center layout px-0">
          <!-- <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn> -->
          <!-- <v-btn icon class="mx-0" @click="duplicateItem(props.item)">
            <v-icon color="blue darken-2">list</v-icon>
          </v-btn> -->
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <!-- <template slot="no-data">
        <v-btn color="primary" @click="getData">Reset</v-btn>
      </template> -->
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
      Tenant: [],
      QuoteList: [],
      QuoteCount: [],
      QuoteStatus: [],
      selectedquotestatus: [],
      rowsPerPageItems: [10, 20, 30, 40],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        number: '',
        title: '',
        totalprice: '',
        note: '',
        quotestatus: '',
        user: {
          firstName: '',
          lastName: ''
        }
      },
      headers: [
        {
          text: 'Quote Number',
          align: 'left',
          sortable: true,
          value: 'number'
        },
        {
          text: 'Title',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Price',
          align: 'left',
          sortable: true,
          value: 'totalprice'
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'description'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: true,
          value: 'quotestatus_id'
        },
        {
          text: 'User',
          align: 'left',
          sortable: true,
          value: 'user.lastName'
        },
        {
          text: 'Created',
          align: 'left',
          sortable: true,
          value: 'createdAt'
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
    },
    newQuote () {
      return this.editedIndex === -1 ? this.creatNewQuote('new') : this.creatNewQuote('ex')
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    async getData () {
      // get all data from the database server
      const responseTenantData = await apiService.fetchTenantById(JSON.parse(localStorage.user).tenant_id)
      this.Tenant = responseTenantData.data
      const responseData = await apiService.fetchQuoteByTenant(JSON.parse(localStorage.user).tenant_id)
      // get all quotes
      this.QuoteList = (responseData.data).rows
      // get number of records in quote db
      this.QuoteCount = (responseData.data).count
      // get highest quote number
      const responseQuoteStatusData = await apiService.fetchQuoteStatus()
      this.QuoteStatus = responseQuoteStatusData.data
    },

    creatNewQuote (value) {
      // check if it is new quote or existing
      if (value === 'new') {
        this.editedItem.number = this.Tenant.quotecode + this.newQuoteNumber()
        this.editedItem.revision = '1.0'
      } else {
        this.editedItem.number = this.Tenant.quotecode + this.QuoteList.number
      }
    },

    newQuoteNumber () {
      var index = this.QuoteCount - 1 // get a total quontity of tenant quotes
      var tmp1 = 0
      var tmp2 = 0
      while (index >= 0) { // search the highest quote number
        tmp1 = this.QuoteList[index].number.replace(this.Tenant.quotecode, '') // remove code sufix from quote number
        if (tmp1 >= tmp2) {
          tmp2 = tmp1
        }
        index--
      }
      tmp2 = parseInt(tmp2) + 1 // increas existing highest quote number by one
      if (tmp2 === 1) { // if it is first tenant quote
        tmp2 = this.Tenant.quotefirstnumber + tmp2
      }
      return tmp2
    },

    getDataFormat (value) {
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
      }
    },

    async save () {
      try {
        if (this.editedIndex === -1) {
          // this.editedItem.id = Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
          this.editedItem.tenant_id = JSON.parse(localStorage.user).tenant_id
          this.editedItem.user_id = JSON.parse(localStorage.user).id
          this.editedItem.quotestatus_id = this.selectedquotestatus.id
          await apiService.addQuote(this.editedItem)
          this.QuoteList.push(this.editedItem)
        } else {
          await apiService.updateQuote(this.editedItem)
          Object.assign(this.QuoteList[this.editedIndex], this.editedItem)
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
          apiService.deleteQuote(item.id)
          // location.reload()
          const index = this.QuoteList.indexOf(item)
          this.QuoteList.splice(index, 1)
        }
      })
    },

    duplicateItem (item) {
      this.editedIndex = this.QuoteList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedIndex = -1
      this.dialog = true
    },

    editItem (item) {
      this.editedIndex = this.QuoteList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // this.getQuoteNumber()
      // this.editedItem.number = 'HHHHHHHH'
      // this.selectedbrand = this.editedItem.product.client.name
      this.selectedquotestatus = this.editedItem.quotestatus.id
      // this.selectedproducttype = this.editedItem.product.producttype.id
      // this.selectedproduct = this.editedItem.product.name
      // this.selectedcurrency = this.editedItem.currency_id
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.selectedquotestatus = ''
      }, 300)
    }
  }
}
</script>

<style>

</style>

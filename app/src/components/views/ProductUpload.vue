<template>
  <div id="app">
    <div class="container">
      <div class="panel panel-sm">
        <div class="panel-heading">
          <h4>Product CSV Import</h4>
        </div>
        <div class="panel-body">
          <div v-if="fileButtons === 1" class="file-btn">
            <div class="col-sm-9">
              <input type="file" id="csv_file" name="csv_file" class="form-control" @change="loadCSV($event)">
            </div>
          </div>
          <div v-if="importButtons === 1" class="import-btn">
           <v-btn color="primary" dark slot="activator" class="mb-2" @click.native="entryData">Import</v-btn>
          </div>
          <div v-if="progressBar === 1" class="span6">
            <div class="text-xs-center">
            <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :value="progress"
              color="primary"
            >
              {{ progress }}%
            </v-progress-circular>
            </div>
          </div>
          <div v-if="progressList === 1" class="span6">
            <div id="messageBox">
              {{ entryMessageCount }}
            </div>
            <v-container
              id="scroll-target"
              style="max-height: 300px"
              class="scroll-y"
            >
            <div id="messageBox">
              {{ entryMessage }}
            </div>
            </v-container>
          </div>
          <div v-if="entryList === 1">
            <v-container
              id="scroll-target"
              style="max-height: 300px"
              class="scroll-y"
            >
              <div v-if="parse_csv">
                <v-data-table
                  v-bind:headers="headersCSV"
                  :items="parse_csv"
                  hide-actions
                  :search="search"
                >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-right">{{ props.item.type }}</td>
                  <td class="text-xs-right">{{ props.item.typeDescription }}</td>
                  <td class="text-xs-right">{{ props.item.productBrand }}</td>
                  <td class="text-xs-right">{{ props.item.productBarcode }}</td>
                  <td class="text-xs-right">{{ props.item.productCode }}</td>
                  <td class="text-xs-right">{{ props.item.productDescription }}</td>
                  <td class="text-xs-right">{{ props.item.productPic }}</td>
                  <td class="text-xs-right">{{ props.item.productDatasheet }}</td>
                  <td class="text-xs-right">{{ props.item.cost }}</td>
                  <td class="text-xs-right">{{ props.item.currency }}</td>
                  <td class="text-xs-right">{{ props.item.supplyer }}</td>
                  <td class="text-xs-right">{{ props.item.note }}</td>
                </template>
                </v-data-table>
              </div>
            </v-container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/Services/ApiService'
import { EventBus } from '@/components/layout/Application'
export default {
  name: 'app',
  data () {
    return {
      search: '',
      progress: '',
      fileButtons: 1,
      importButtons: 0,
      progressBar: -1,
      entryList: -1,
      progressList: -1,
      entryMessage: '',
      entryMessageCount: '',
      channel_name: '',
      channel_fields: [],
      channel_entries: [],
      parse_header: [],
      parse_csv: [],
      sortOrders: {},
      sortKey: '',
      headersCSV: [
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'type'
        },
        {
          text: 'Type Description',
          align: 'left',
          sortable: true,
          value: 'typeDescription'
        },
        {
          text: 'Brand',
          align: 'left',
          sortable: true,
          value: 'productBrand'
        },
        {
          text: 'Barcode',
          align: 'left',
          sortable: true,
          value: 'productBarcode'
        },
        {
          text: 'Code',
          align: 'left',
          sortable: true,
          value: 'productCode'
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'productDescription'
        },
        {
          text: 'Picture',
          align: 'left',
          sortable: true,
          value: 'productPic'
        },
        {
          text: 'Data Sheet',
          align: 'left',
          sortable: true,
          value: 'productDatasheet'
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
          value: 'currency'
        },
        {
          text: 'Supplyer',
          align: 'left',
          sortable: true,
          value: 'supplyer'
        },
        {
          text: 'Note',
          align: 'left',
          sortable: true,
          value: 'note'
        }
      ],
      Client: [],
      newClient: [],
      Contact: [],
      editedItem: {
        type: '',
        typeDescription: '',
        productBrand: '',
        productBarcode: '',
        productCode: '',
        productDescription: '',
        productPic: '',
        productDatasheet: '',
        cost: '',
        currency: '',
        supplyer: '',
        note: ''
      }
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  created () {
  // Using the server bus for the searching
    EventBus.$on('EVENT_SEARCH', (search) => {
      this.search = search
    })
  },
  methods: {
    csvJSON (csv) {
      var vm = this
      var lines = csv.split('\n')
      var result = []
      var headers = lines[0].split(',')
      vm.parse_header = lines[0].split(',')
      lines[0].split(',').forEach(function (key) {
        vm.sortOrders[key] = 1
      })
      lines.map(function (line, indexLine) {
        if (indexLine < 1) return // Jump header line
        var obj = {}
        var currentline = line.split(',')
        headers.map(function (header, indexHeader) {
          obj[header] = currentline[indexHeader]
        })
        result.push(obj)
      })
      // result.pop() // remove the last item because undefined values
      return result // JavaScript object
    },

    loadCSV (e) {
      var vm = this
      if (window.FileReader) {
        var reader = new FileReader()
        reader.readAsText(e.target.files[0])
        // show the list ofthe items
        this.fileButtons = 1
        this.importButtons = 1
        this.progressBar = -1
        this.entryList = 1
        // Handle errors load
        reader.onload = function (event) {
          var csv = event.target.result
          vm.parse_csv = vm.csvJSON(csv)
        }
        reader.onerror = function (evt) {
          if (evt.target.error.name === 'NotReadableError') {
            alert('Canno\'t read file !')
          }
        }
      } else {
        alert('FileReader are not supported in this browser.')
      }
    },

    async entryData () { // Entry Data to DB
      if (this.parse_csv.length !== 0) {
        // show the progress bar, hide file button, import button and list
        this.fileButtons = -1
        this.importButtons = -1
        this.progressBar = 1
        this.entryList = -1
        this.progressList = 1
        var tenantId = JSON.parse(localStorage.user).tenant_id //  get the tenant id

        for (var i = 0; i < this.parse_csv.length; i++) { // main loop of all entered records
          this.progress = parseInt(100 / (parseInt(this.parse_csv.length - 1) / i)) // progress bar
          this.entryMessageCount = 'The total records to enter is ' + this.parse_csv.length + ', left records to check: ' + (this.parse_csv.length - i) // msg of total records and count down

          await new Promise((resolve, reject) => setTimeout(resolve, 1000))
          let responseType = await apiService.fetchProductTypeByTenantAndName(tenantId, this.parse_csv[i].type.trim())
          this.Type = responseType.data

          if (await this.Type.length === 0) { // if product type does not exist create one
            this.saveType(this.parse_csv[i], tenantId)
          } else {
            try { // the product type is already exist
              await new Promise((resolve, reject) => setTimeout(resolve, 1000))
              this.saveProduct(this.parse_csv[i], tenantId, this.Type[0].id)
            } catch (err) {
            }
          }
        }
      }
      this.entryMessageCount = 'The records had been imported to the data base'
      this.progressBar = -1
      // this.entryList = -1 // the importing is done
      // location.reload()
    },

    async saveType (entryData, tenantId) {
      try {
        this.editedItem.name = entryData.type.trim()
        this.editedItem.description = entryData.typeDescription
        this.editedItem.tenant_id = tenantId
        //
        const responseNewType = await apiService.addProductType(this.editedItem)
        this.newType = responseNewType.data
        this.entryMessage = 'New type ' + entryData.type + ' had been added' + '\n' + this.entryMessage
        this.saveProduct(entryData, tenantId, this.newType.id)
      } catch (err) {
        this.entryMessage = 'New type ' + entryData.type + ' had NOT been added' + '\n' + this.entryMessage
        return console.log(err.message)
      }
    },

    async saveProduct (entryData, tenantId, typeId) {
      try {
        // get brand id
        await new Promise((resolve, reject) => setTimeout(resolve, 1000))
        const responseBrand = await apiService.fetchClientByTenantAndName(tenantId, entryData.productBrand.trim())
        this.Brand = responseBrand.data
        //
        this.editedItem.client_id = this.Brand[0].id
        this.editedItem.producttype_id = typeId
        this.editedItem.tenant_id = tenantId
        this.editedItem.barcode = entryData.productBarcode
        this.editedItem.name = entryData.productCode
        this.editedItem.description = entryData.productDescription
        this.editedItem.picture = entryData.productPic
        this.editedItem.datasheet = entryData.productDatasheet
        //
        const responseProduct = await apiService.addProduct(this.editedItem)
        this.Product = responseProduct.data
        this.entryMessage = 'The product ' + entryData.productBrand + ' ' + entryData.productCode + ' had been added' + '\n' + this.entryMessage
        //
        this.editedItem.cost = entryData.cost
        this.editedItem.note = entryData.note
        this.editedItem.product_id = this.Product.id
        // get supplyer id
        await new Promise((resolve, reject) => setTimeout(resolve, 1000))
        const responseSupplyer = await apiService.fetchClientByTenantAndName(tenantId, entryData.supplyer.trim())
        this.Supplyer = responseSupplyer.data
        //
        this.editedItem.client_id = this.Supplyer[0].id // entryData.supplyer
        this.editedItem.currency_id = entryData.currency
        this.savePriceList(this.editedItem)
      } catch (err) {
        this.entryMessage = 'The product ' + entryData.productBrand + ' ' + entryData.productCode + ' had NOT been added' + '\n' + this.entryMessage
        return console.log(err.message)
      }
    },

    async savePriceList (entryData) {
      try {
        if (entryData.cost > 0) {
          await apiService.addPriceList(entryData)
          this.entryMessage = 'The item ' + entryData.productBrand + ' ' + entryData.name + ' added to the price list' + '\n' + this.entryMessage
        } else {
          this.entryMessage = 'The item ' + entryData.productBrand + ' ' + entryData.name + ' NOT added to the price list' + '\n' + this.entryMessage
        }
      } catch (err) {
        this.entryMessage = 'The item ' + entryData.productBrand + ' ' + entryData.name + ' NOT added to the price list' + '\n' + this.entryMessage
        return console.log(err.message)
      }
    },

    async errorMessage () {
      const $this = this
      $this.$swal({
        title: 'Request failed !',
        text: 'Please check your entery data !',
        type: 'info',
        showCancelButton: false
      })
    }
    // Contact : 1 - Supplier, 2 - Purchaser, 3 - Parther (both buy&sell), 4 - Staff
  }
}
</script>

<style>
  .v-progress-circular {
    margin: 1rem
  }
  #messageBox {
   white-space:pre
  }
  .console-msg {
    list-style: none
  }
  .import-btn {
    float: right;
  }
  .file-btn {
    float: left;
    width: 50%;
  }
</style>

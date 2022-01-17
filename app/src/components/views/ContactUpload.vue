<template>
  <div id="app">
    <div class="container">
      <div class="panel panel-sm">
        <div class="panel-heading">
          <h4>Client Contact CSV Import</h4>
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
                  <td class="text-xs-right">{{ props.item.name }}</td>
                  <td class="text-xs-right">{{ props.item.profile }}</td>
                  <td class="text-xs-right">{{ props.item.companyEmail}}</td>
                  <td class="text-xs-right">{{ props.item.companyPhone }}</td>
                  <td class="text-xs-right">{{ props.item.fax }}</td>
                  <td class="text-xs-right">{{ props.item.url }}</td>
                  <td class="text-xs-right">{{ props.item.country}}</td>
                  <td class="text-xs-right">{{ props.item.city }}</td>
                  <td class="text-xs-right">{{ props.item.address}}</td>
                  <td class="text-xs-right">{{ props.item.postbox }}</td>
                  <td class="text-xs-right">{{ props.item.relation }}</td>
                  <td class="text-xs-right">{{ props.item.firstName }}</td>
                  <td class="text-xs-right">{{ props.item.lastName }}</td>
                  <td class="text-xs-right">{{ props.item.position }}</td>
                  <td class="text-xs-right">{{ props.item.phone }}</td>
                  <td class="text-xs-right">{{ props.item.mobile }}</td>
                  <td class="text-xs-right">{{ props.item.email }}</td>
                  <td class="text-xs-right">{{ props.item.carReg }}</td>
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
          text: 'Company',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Profile',
          align: 'left',
          sortable: true,
          value: 'profile'
        },
        {
          text: 'Company Email',
          align: 'left',
          sortable: true,
          value: 'companyEmail'
        },
        {
          text: 'Company Phone',
          align: 'left',
          sortable: true,
          value: 'companyPhone'
        },
        {
          text: 'Fax',
          align: 'left',
          sortable: true,
          value: 'fax'
        },
        {
          text: 'Url',
          align: 'left',
          sortable: true,
          value: 'url'
        },
        {
          text: 'Country',
          align: 'left',
          sortable: true,
          value: 'country'
        },
        {
          text: 'City',
          align: 'left',
          sortable: true,
          value: 'city'
        },
        {
          text: 'Address',
          align: 'left',
          sortable: true,
          value: 'address'
        },
        {
          text: 'Postbox',
          align: 'left',
          sortable: true,
          value: 'postbox'
        },
        {
          text: 'Relation',
          align: 'left',
          sortable: true,
          value: 'relation'
        },
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'firstName'
        },
        {
          text: 'Family',
          align: 'left',
          sortable: true,
          value: 'lastName'
        },
        {
          text: 'Postion',
          align: 'left',
          sortable: true,
          value: 'postion'
        },
        {
          text: 'Phone',
          align: 'left',
          sortable: true,
          value: 'phone'
        },
        {
          text: 'Mobile',
          align: 'left',
          sortable: true,
          value: 'mobile'
        },
        {
          text: 'Email',
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Car Reg',
          align: 'left',
          sortable: true,
          value: 'carReg'
        }
      ],
      Client: [],
      newClient: [],
      Contact: [],
      editedItem: {
        name: '',
        profile: '',
        relation_id: '',
        companyPhone: '',
        fax: '',
        url: '',
        compnayEmail: '',
        country: '',
        city: '',
        address: '',
        postbox: '',
        lastName: '',
        firstName: '',
        tenant_id: '',
        client_id: '',
        email: '',
        position: '',
        phone: '',
        mobile: '',
        carReg: ''
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
      result.pop() // remove the last item because undefined values
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
        this.progressList = 1
        this.entryList = -1
        var tenantId = JSON.parse(localStorage.user).tenant_id //  get the tenant id

        for (var i = 0; i < this.parse_csv.length; i++) { // main loop of all entered records
          this.progress = parseInt(100 / (this.parse_csv.length / i)) // progress bar
          this.entryMessageCount = 'The total records to enter is ' + this.parse_csv.length + ', left records to check: ' + (this.parse_csv.length - i) // msg of total records and count down

          await new Promise((resolve, reject) => setTimeout(resolve, 1000))
          let responseClient = await apiService.fetchClientByTenantAndName(tenantId, this.parse_csv[i].name.trim())
          this.Client = responseClient.data

          if (await this.Client.length === 0) { // if client does not exist create one
            this.saveClient(this.parse_csv[i], tenantId)
          } else {
            try { // check if the contact of this client already exist
              await new Promise((resolve, reject) => setTimeout(resolve, 1000))
              const responseContact = await apiService.fetchContactByClientAndName(this.Client[0].id, this.parse_csv[i].firstName.trim(), this.parse_csv[i].lastName.trim())
              this.Contact = responseContact.data
            } catch (err) {
              this.saveContact(this.parse_csv[i], tenantId, this.Client[0].id)
            }
          }
        }
      }
      this.entryMessageCount = 'The records had been imported to the data base'
      this.progressBar = -1
      // this.entryList = -1 // the importing is done
      // location.reload()
    },

    async saveClient (entryData, tenantId) {
      try {
        this.editedItem.name = entryData.name.trim()
        this.editedItem.profile = entryData.profile
        this.editedItem.relation_id = entryData.relation
        this.editedItem.phone = entryData.companyPhone
        this.editedItem.fax = entryData.fax
        this.editedItem.url = entryData.url
        this.editedItem.email = entryData.companyEmail
        this.editedItem.country = entryData.country
        this.editedItem.city = entryData.city
        this.editedItem.address = entryData.address
        this.editedItem.postbox = entryData.postbox
        this.editedItem.tenant_id = tenantId

        const responseNewClient = await apiService.addClient(this.editedItem)
        this.newClient = responseNewClient.data

        this.entryMessage = 'The client ' + entryData.name + ' had been added' + '\n' + this.entryMessage

        this.saveContact(entryData, tenantId, this.newClient.id)
      } catch (err) {
        // this.errorMessage()
        return console.log(err.message)
      }
    },

    async saveContact (entryData, tenantId, clientId) {
      try {
        this.editedItem.firstName = entryData.firstName
        this.editedItem.lastName = entryData.lastName
        this.editedItem.email = entryData.email
        this.editedItem.position = entryData.position
        this.editedItem.phone = entryData.phone
        this.editedItem.mobile = entryData.mobile
        this.editedItem.client_id = clientId
        this.editedItem.tenant_id = tenantId
        await apiService.addContact(this.editedItem)
        this.entryMessage = 'The contact ' + entryData.firstName + ' ' + entryData.lastName + ' added' + '\n' + this.entryMessage
        console.log('New Contact Add')
      } catch (err) {
        // this.errorMessage()
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

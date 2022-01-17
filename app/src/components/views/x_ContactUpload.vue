<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
          <form class="form">
            <vue-csv-import
              v-model="csv"
              ref="importer"
              :map-fields="['name', 'profile', 'email', 'phone', 'fax', 'url', 'country', 'city', 'address', 'postbox', 'relation',  'firstName', 'lastName', 'position', 'phone', 'mobile', 'email']"
            ></vue-csv-import>
          </form>
          {{ csv }}
        </div>
        <div class="row">
          <v-data-table
            :items="csv"
            :headers="headersCSVEntry"
            hide-actions
            class="elevation-1"
          >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name}}</td>
            <td class="text-xs-left">{{ props.item.firstName}}</td>
            <td class="text-xs-left">{{ props.item.lastName}}</td>
            <td class="text-xs-left">{{ props.item.mobile}}</td>
          </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCsvImport from './ContactUploadModule.vue'
export default {
  name: 'app',
  components: {
    VueCsvImport
  },
  data () {
    return {
      csv: null,
      headersCSVEntry: [
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
          value: 'email'
        },
        {
          text: 'Phone',
          align: 'left',
          sortable: true,
          value: 'phone'
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
        }
      ]
    }
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
#app .container {
    text-align: left;
}
</style>

<template>
  <div class="tenant">
            <h4 class="display-1">Company Profile</h4>
            <v-list-tile class="info_block">
              <!-- <v-list-tile-action>
                <v-icon color="indigo">title</v-icon>
              </v-list-tile-action> -->
              <v-flex xs12 sm6 md4>
                <v-text-field label="Company Name" v-model="tenant.name"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <!-- <v-list-tile-action>
                <v-icon color="indigo">title</v-icon>
              </v-list-tile-action> -->
              <v-flex xs12 sm6 md4>
                <v-text-field label="Profile" v-model="tenant.profile"></v-text-field>
              </v-flex>
            </v-list-tile>
             <v-list-tile class="info_block">
              <!-- <v-list-tile-action>
                <v-icon color="indigo">web</v-icon>
              </v-list-tile-action> -->
              <v-flex xs12 sm6 md4>
                <v-text-field label="Web Site" v-model="tenant.url"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <!-- <v-list-tile-action>
                <v-icon color="indigo">email</v-icon>
              </v-list-tile-action> -->
              <v-flex xs12 sm6 md4>
                <v-text-field label="Email" v-model="tenant.email"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <!-- <v-list-tile-action>
                <v-icon color="indigo">phone</v-icon>
              </v-list-tile-action> -->
              <v-flex xs12 sm6 md4>
                <v-text-field label="Phone" v-model="tenant.phone"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <!-- <v-list-tile-action>
                <v-icon color="indigo">printer</v-icon>
              </v-list-tile-action> -->
              <v-flex xs12 sm6 md4>
                <v-text-field label="Fax" v-model="tenant.fax"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <!-- <v-list-tile-action>
                <v-icon color="indigo">location_on</v-icon>
              </v-list-tile-action> -->
              <v-flex xs12 sm6 md4>
                <v-text-field label="Country" v-model="tenant.country"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <v-flex xs12 sm6 md4>
                <v-text-field label="City" v-model="tenant.city"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <v-flex xs12 sm6 md4>
                <v-text-field label="Address" v-model="tenant.address"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <v-flex xs12 sm6 md4>
                <v-text-field label="Postbox" v-model="tenant.postbox"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <v-flex xs12 sm6 md4>
                <v-text-field label="Quote Code" v-model="tenant.quotecode"></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-list-tile class="info_block">
              <v-flex xs12 sm6 md4>
                <v-text-field label="First Quote Number" v-model="tenant.quotefirstnumber"></v-text-field>
              </v-flex>
            </v-list-tile>
                  <v-btn color="primary" @click.native="update">Update</v-btn>
  </div>
</template>

<script>
import apiService from '@/Services/ApiService'
export default {
  name: 'tenant',
  data () {
    return {
      tenant: []
    }
  },
  mounted () {
    this.gettenant()
  },
  methods: {
    async gettenant () {
      // select the user company
      console.log(JSON.parse(localStorage.user).id)
      const response = await apiService.fetchTenantById(JSON.parse(localStorage.user).tenant_id)
      this.tenant = response.data
    },
    async update () {
      try {
        await apiService.updateTenant(this.tenant)
      } catch (err) {
        return console.log(err.message)
      } finally {
        this.close()
      }
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

<template>
  <div class="profile">
            <h4 class="display-1">Profile</h4>
              <v-flex xs12 sm6 md4>
                <v-text-field label="First Name" v-model="user.firstName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Last Name" v-model="user.lastName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Phone Number" v-model="user.phone"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Company Position" v-model="user.position"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Email" v-model="user.email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Password"
                  type='password'
                  :counter="3"
                  :rules="passwordRules"
                  required
                  v-model="user.password">
                </v-text-field>
              </v-flex>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click.native="update">Update</v-btn>
  </div>
</template>

<script>
import apiService from '@/Services/ApiService'
export default {
  name: 'profile',
  data () {
    return {
      user: JSON.parse(localStorage.user),
      valid: true,
      valid2: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ]
    }
  },
  methods: {
    async update () {
      try {
        await apiService.updateUser(this.user)
        // update user infromation
        localStorage.user = JSON.stringify(this.user)
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

</style>

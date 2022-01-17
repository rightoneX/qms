<template>
  <div>
    <v-app>
      <v-navigation-drawer v-if="loggedIn"
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
      >
        <!-- HOME MENU  -->
        <v-list dense >
          <v-list-tile v-for="(item, i) in homemenu" :key="i" :to="{path: item.path}">
            <v-icon v-html="item.icon"></v-icon>
             <v-list-tile-title v-text="item.label"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-expansion-panel>
          <!-- COMPNAY MENU -->
          <v-expansion-panel-content>
            <div slot="header">
              <v-icon>dashboard</v-icon>
              Company
            </div>
              <v-list dense >
                <v-list-tile v-for="(item, i) in companymenu" :key="i" :to="{path: item.path}" >
                    <v-icon v-html="item.icon"></v-icon>
                    <v-list-tile-title v-text="item.label"></v-list-tile-title>
                </v-list-tile>
              </v-list>
          </v-expansion-panel-content>
          <!-- PARTNER MENU -->
          <v-expansion-panel-content>
            <div slot="header">
              <v-icon>people</v-icon>
              People
            </div>
              <v-list dense >
                <v-list-tile v-for="(item, i) in partnermenu" :key="i" :to="{path: item.path}">
                    <v-icon v-html="item.icon"></v-icon>
                    <v-list-tile-title v-text="item.label"></v-list-tile-title>
                </v-list-tile>
              </v-list>
          </v-expansion-panel-content>
          <!-- PRODUCT MENU -->
          <v-expansion-panel-content>
            <div slot="header">
              <v-icon>list</v-icon>
              Product
            </div>
              <v-list dense >
                <v-list-tile v-for="(item, i) in productmenu" :key="i" :to="{path: item.path}">
                    <v-icon v-html="item.icon"></v-icon>
                    <v-list-tile-title v-text="item.label"></v-list-tile-title>
                </v-list-tile>
              </v-list>
          </v-expansion-panel-content>
          <!-- STOCK MENU -->
          <v-expansion-panel-content>
            <div slot="header">
              <v-icon>assessment</v-icon>
              Stock
            </div>
              <v-list dense >
                <v-list-tile v-for="(item, i) in stockmenu" :key="i" :to="{path: item.path}">
                    <v-icon v-html="item.icon"></v-icon>
                    <v-list-tile-title v-text="item.label"></v-list-tile-title>
                </v-list-tile>
              </v-list>
          </v-expansion-panel-content>
          <!-- QUOTE MENU -->
          <v-expansion-panel-content>
            <div slot="header">
              <v-icon>assignment</v-icon>
              Quote
            </div>
              <v-list dense >
                <v-list-tile v-for="(item, i) in quotemenu" :key="i" :to="{path: item.path}">
                    <v-icon v-html="item.icon"></v-icon>
                    <v-list-tile-title v-text="item.label"></v-list-tile-title>
                </v-list-tile>
              </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-navigation-drawer>
      <v-toolbar
        color="primary" dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3" v-if="loggedIn">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down" v-text="appTitle"></span>
        </v-toolbar-title>
        <!-- Search bar -->
        <v-text-field
          flat
          solo-inverted
          label="Search"
          prepend-icon="search"
          class="hidden-sm-and-down"
          v-model="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <!-- User is not logged in -->
        <v-menu v-if="!loggedIn" open-on-hover top offset-y>
          <v-btn icon large slot="activator">
            <v-avatar size="32px" tile>
              <img
                src="../../assets/user-icon.svg"
                alt="Login"
              >
            </v-avatar>
          </v-btn>
          <v-list>
            <v-list-tile :key="items.login.title" @click.stop="dialogLogin = true">
              <v-list-tile-title v-text="items.login.title"></v-list-tile-title>
            </v-list-tile>
            <v-list-tile :key="items.register.title" @click.stop="dialogRegister = true">
              <v-list-tile-title v-text="items.register.title"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <!-- User logged in -->
        <v-menu v-if="loggedIn">
          <v-btn icon large slot="activator" href="#/logout">
            <v-icon>lock</v-icon>
          </v-btn>
        </v-menu>
        <v-dialog v-model="dialogLogin" max-width="800px">
          <v-card>
            <v-card-text>
              <v-card-title>
                <span class="headline">Login</span>
              </v-card-title>
              <v-alert outline color="error" icon="warning" :value="error" v-text="error"></v-alert>
              <v-form v-model="valid" ref="formLogin" lazy-validation>
                <v-text-field
                  prepend-icon="person"
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
                  required
                  type="text"
                  placeholder="your@email.com"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  label="Password"
                  v-model="password"
                  :rules="passwordRules"
                  :counter="10"
                  required
                  type="password"
                  placeholder="your password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed large color="primary" @click.prevent="login">Sign in</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogRegister" max-width="800px">
          <v-card>
            <v-card-text>
              <v-card-title>
                <span class="headline">Register</span>
              </v-card-title>
              <v-alert outline color="error" icon="warning" :value="error" v-text="error"></v-alert>
              <v-form v-model="valid2" ref="formRegister" lazy-validation>
                <v-text-field
                  prepend-icon="face"
                  label="Name"
                  v-model="register.firstName"
                  :rules="nameRules"
                  required
                  type="text"
                  placeholder="Your name"
                ></v-text-field>
                <v-text-field
                  prepend-icon="person"
                  label="Lastname"
                  v-model="register.lastName"
                  required
                  type="text"
                  placeholder="Your lastname"
                ></v-text-field>
                <v-text-field
                  prepend-icon="person"
                  label="E-mail"
                  v-model="register.email"
                  :rules="emailRules"
                  required
                  type="text"
                  placeholder="your@email.com"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  label="Password"
                  v-model="register.password"
                  :rules="passwordRules"
                  :counter="10"
                  required
                  type="password"
                  placeholder="Password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed large color="primary" dark @click.prevent="addUser">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer
        app
        fixed
        color="primary" dark>
        <span class="copy-right-div">Copyright&copy; 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import apiService from '@/Services/ApiService'
import Vue from 'vue'
export const EventBus = new Vue()
export default {
  mounted () {
    this.path = this.$route.path
    this.loadPage() // redirect to the different page
  },
  data () {
    return {
      tenant: [],
      tabs: null,
      dialogLogin: false,
      dialogRegister: false,
      drawer: null,
      appTitle: 'Menu ',
      loginTitle: 'Login Form',
      path: '/',
      search: [],
      searchtitle: [],
      homemenu: [
        {path: '/', label: 'Home', icon: 'home'}
      ],
      companymenu: [
        {path: '/api/analytics', label: 'Analytics', icon: 'assessment'},
        {path: '/api/profile', label: 'Profile', icon: 'account_box'},
        {path: '/api/user', label: 'User', icon: 'people'},
        {path: '/api/company', label: 'Company', icon: 'dashboard'},
        {path: '/api/role', label: 'Role', icon: 'folder'},
        {path: '/api/group', label: 'Group', icon: 'folder'}
      ],
      partnermenu: [
        {path: '/api/client', label: 'Client', icon: 'note_add'},
        {path: '/api/contact', label: 'Contact', icon: 'note_add'},
        {path: '/api/contactupload', label: 'Upload', icon: 'add'}
      ],
      productmenu: [
        {path: '/api/producttype', label: 'Product Type', icon: 'list'},
        {path: '/api/product', label: 'Product', icon: 'list'},
        {path: '/api/pricelist', label: 'Price List', icon: 'list'},
        {path: '/api/productupload', label: 'Upload', icon: 'add'}
      ],
      stockmenu: [
        {path: '/api/stocklocation', label: 'Stock Location', icon: 'assessment'},
        {path: '/api/stock', label: 'Stock', icon: 'assessment'}
      ],
      quotemenu: [
        // {path: '/api/quotenew', label: 'New Quote', icon: 'assignment'},
        {path: '/api/quotelist', label: 'Quote List', icon: 'assignment'},
        // {path: '/api/quotepricelist', label: 'Quote Price List', icon: 'assignment'},
        {path: '/api/quoteblock', label: 'Quote Block', icon: 'assignment'}
      ],
      logout: [
        {path: '/logout', label: 'Logout', icon: 'lock'}
      ],
      items: {
        login: {title: 'login'},
        register: {title: 'register'}
      },
      register: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        idtenant: ''
      },
      valid: true,
      valid2: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length <= 10 || 'Password must be no less than 7 characters'
      ],
      error: false
    }
  },
  computed: {
    loggedIn: {
      get: () => {
        return Boolean(localStorage.getItem('user'))
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.search = ''
      this.path = to.path
    },
    search () {
      // share the seach data between components
      EventBus.$emit('EVENT_SEARCH', this.search)
    }
  },
  methods: {
    loadPage () {
      if (!localStorage.user) { // user is NOT loged in
        this.$router.replace('/') // go to Welcome page
      } else { // user is loged in
        if (this.path === '/') {
          // this.$router.replace('/api/analytics') // go to Analytics page
        }
      }
    },
    login () {
      if (this.$refs.formLogin.validate()) {
        apiService.userLogin({
          email: this.email,
          password: this.password
        })
          .then(response => this.loginSuccessful(response))
          .catch(response => this.loginFailed(response))
      }
    },
    loginSuccessful (response) {
      this.error = false
      localStorage.user = JSON.stringify(response.data) // load a session to the local storage
      this.$router.replace('/api/analytics') // go to Analytics page
      this.$router.go('/')
    },
    loginFailed (response) {
      this.error = response.response.data.message || 'Error Login'
      delete localStorage.user
      delete localStorage.token
    },
    async addUser () {
      if (this.$refs.formRegister.validate()) {
        var newTenant = await apiService.addTenant({
          name: 'My New Company',
          email: this.register.email
        })
        var uuidTenant = newTenant.data.id
        // create new role for users of this tenant
        var newRole = await apiService.addRole({
          tenant_id: uuidTenant,
          name: 'Administrator',
          description: 'Full access'
        })
        var uuidRole = newRole.data.id
        // create new role for users of this tenant
        var newGroup = await apiService.addGroup({
          role_id: uuidRole,
          tenant_id: uuidTenant,
          name: 'Administrator Group',
          description: 'Full access to all function'
        })
        var uuidGroup = newGroup.data.id
        await apiService.addUser({
          firstName: this.register.firstName,
          lastName: this.register.lastName,
          email: this.register.email,
          password: this.register.password,
          tenant_id: uuidTenant,
          group_id: uuidGroup,
          permission_id: 'Super User'
        })
          .then(response => this.loginSuccessful(response))
          .catch(response => this.loginFailed(response))
      }
    }
  }
}
</script>

<style>
.copy-right-div {
  padding-left: 10px;
}
</style>

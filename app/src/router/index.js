import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import Profile from '@/components/views/Profile'
import Company from '@/components/views/Company'
import User from '@/components/views/User'
import Analytics from '@/components/views/Analytics'
import Role from '@/components/views/Role'
import Group from '@/components/views/Group'
import Client from '@/components/views/Client'
import Contact from '@/components/views/Contact'
import ContactUpload from '@/components/views/ContactUpload'
import ProductType from '@/components/views/ProductType'
import Product from '@/components/views/Product'
import ProductUpload from '@/components/views/ProductUpload'
import PriceList from '@/components/views/PriceList'
import StockLocation from '@/components/views/StockLocation'
import Stock from '@/components/views/Stock'
import Logout from '@/components/views/Logout'
import Quote from '@/components/views/Quote'
import QuoteList from '@/components/views/QuoteList'
import QuotePriceList from '@/components/views/QuotePriceList'
import QuoteBlock from '@/components/views/QuoteBlock'
import Vuetify from 'vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#7986CB', // '#7986CB' main colour
    secondary: '#e57373',
    accent: '#9c27b0',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})
Vue.use(VueSweetalert2)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/api/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/api/company',
      name: 'Company',
      component: Company
    },
    {
      path: '/api/analytics',
      name: 'Analytics',
      component: Analytics
    },
    {
      path: '/api/user',
      name: 'User',
      component: User
    },
    {
      path: '/api/role',
      name: 'Role',
      component: Role
    },
    {
      path: '/api/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/api/client',
      name: 'Client',
      component: Client
    },
    {
      path: '/api/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/api/contactupload',
      name: 'ContactUpload',
      component: ContactUpload
    },
    {
      path: '/api/producttype',
      name: 'ProductType',
      component: ProductType
    },
    {
      path: '/api/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/api/productupload',
      name: 'ProductUpload',
      component: ProductUpload
    },
    {
      path: '/api/pricelist',
      name: 'Price List',
      component: PriceList
    },
    {
      path: '/api/stocklocation',
      name: 'StockLocation',
      component: StockLocation
    },
    {
      path: '/api/stock',
      name: 'Stock',
      component: Stock
    },
    {
      path: '/api/quote/:number',
      name: 'Quote',
      component: Quote,
      props: true
    },
    {
      path: '/api/quotelist',
      name: 'QuoteList',
      component: QuoteList
    },
    {
      path: '/api/quotepricelist',
      name: 'QuotePriceList',
      component: QuotePriceList
    },
    {
      path: '/api/quoteblock',
      name: 'QuoteBlock',
      component: QuoteBlock
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})

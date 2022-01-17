<template>
  <div class="analytics">
    <GChart
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
    />
    <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
// import apiService from '@/Services/ApiService'
import { GChart } from 'vue-google-charts'
export default {
  name: 'analytics',
  components: {
    GChart
  },
  data () {
    return {
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350],
        ['2018', 1030, 540, 340]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017'
        }
      }
    }
  },
  mounted () {
    // none
  },
  computed: {
    // none
  },
  watch: {
    // none
  },
  methods: {
    // none
  }
}
</script>

<style>

</style>

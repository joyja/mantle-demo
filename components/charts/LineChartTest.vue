<template>
  <div>
    <line-chart
      :chart-data="datacollection"
      :options="options"
      :styles="{ height: '250px' }"
    ></line-chart>
  </div>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
import fromUnixTime from 'date-fns/fromUnixTime'
// import differenceInSeconds from 'date-fns/differenceInSeconds'
import LineChart from './LineChart'

export default {
  components: {
    LineChart,
  },
  props: {
    edgeNodes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
              ticks: {
                maxTicksLimit: 10,
              },
            },
          ],
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    }
  },
  computed: {
    datacollection() {
      if (this.edgeNodes.length > 1) {
        const tankLevelMetric = this.edgeNodes[1].devices[0].metrics.find(
          (metric) => metric.name === 'Tank1.Level'
        )
        const inletFlowMetric = this.edgeNodes[1].devices[0].metrics.find(
          (metric) => metric.name === 'Inlet Flow'
        )
        const outletFlowMetric = this.edgeNodes[1].devices[0].metrics.find(
          (metric) => metric.name === 'Outlet Flow'
        )
        // const labels = metric.history.map((row) => {
        //   return fromUnixTime(row.timestamp)
        // })
        const tankLevelData = tankLevelMetric.history
          .map((row) => {
            return {
              y: row.value,
              x: fromUnixTime(row.timestamp),
            }
          })
          .sort((a, b) => {
            return a.timestamp - b.timestamp
          })
        const inletFlowData = inletFlowMetric.history
          .map((row) => {
            return {
              y: row.value,
              x: fromUnixTime(row.timestamp),
            }
          })
          .sort((a, b) => {
            return a.timestamp - b.timestamp
          })
        const outletFlowData = outletFlowMetric.history
          .map((row) => {
            return {
              y: row.value,
              x: fromUnixTime(row.timestamp),
            }
          })
          .sort((a, b) => {
            return a.timestamp - b.timestamp
          })
        return {
          datasets: [
            {
              label: 'Tank 1 Level',
              borderColor: colors.indigo.darken4,
              fill: false,
              data: tankLevelData,
              tension: 0,
            },
            {
              label: 'Inlet Flow',
              borderColor: colors.indigo.base,
              fill: false,
              data: inletFlowData,
              tension: 0,
            },
            {
              label: 'Outlet Flow',
              borderColor: colors.indigo.lighten4,
              fill: false,
              data: outletFlowData,
              tension: 0,
            },
          ],
        }
      }
      return {}
    },
  },
  mounted() {
    // this.fillData()
  },
  methods: {
    // fillData() {
    //   this.datacollection = {
    //     labels: [this.getRandomInt(), this.getRandomInt()],
    //     datasets: [
    //       {
    //         label: 'Data One',
    //         backgroundColor: '#f87979',
    //         data: [this.getRandomInt(), this.getRandomInt()],
    //       },
    //       {
    //         label: 'Data One',
    //         backgroundColor: '#f87979',
    //         data: [this.getRandomInt(), this.getRandomInt()],
    //       },
    //     ],
    //   }
    // },
    // getRandomInt() {
    //   return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    // },
  },
}
</script>

<style></style>

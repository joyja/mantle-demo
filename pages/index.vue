<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card class="flex-grow-0 flex-shrink-1" style="flex-basis: 800px">
        <v-card-text>
          <jar-process :edge-nodes="edgeNodes" />
        </v-card-text>
      </v-card>
    </v-row>
    <v-row justify="center" align="center">
      <v-card class="mt-3 flex-grow-0 flex-shrink-1" style="flex-basis: 800px">
        <v-card-text class="d-flex justify-space-between align-center">
          <div class="d-flex flex-column align-center">
            <div class="mb-1">Inlet Flow (gpm)</div>
            <v-progress-circular
              class="mx-1"
              :rotate="90"
              :size="100"
              :width="15"
              :value="inletFlow"
              >{{ inletFlow }}</v-progress-circular
            >
          </div>
          <div class="d-flex flex-column align-center">
            <div class="mb-1">Tank Level (gal)</div>
            <v-progress-circular
              class="mx-1"
              :rotate="90"
              :size="100"
              :width="15"
              :value="tankLevel"
              >{{ tankLevel }}</v-progress-circular
            >
          </div>
          <div class="d-flex flex-column align-center">
            <div class="mb-1">Outlet Flow (gpm)</div>
            <v-progress-circular
              class="mx-1"
              :rotate="90"
              :size="100"
              :width="15"
              :value="outletFlow"
              >{{ outletFlow }}</v-progress-circular
            >
          </div>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row justify="center" align="center">
      <v-card class="mt-3 flex-grow-0 flex-shrink-1" style="flex-basis: 800px">
        <v-card-text>
          <jar-line-chart :edge-nodes="edgeNodes"></jar-line-chart>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row v-if="false" justify="center" align="center">
      <v-card class="mt-5">
        <v-list v-if="edgeNodes.length > 1">
          <v-list-item
            v-for="metric in edgeNodes[1].devices[0].metrics"
            :key="metric.name"
          >
            <v-list-item-content>
              <v-list-item-title
                >{{ metric.name }}:
                {{
                  metric.datatype === 'Float'
                    ? parseFloat(metric.value).toFixed(2)
                    : metric.value
                }}</v-list-item-title
              >
              <v-list-item-subtitle>{{ metric.datatype }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import graphql from '~/graphql'
import Process from '~/components/Process'
import LineChartTest from '~/components/charts/LineChartTest'

export default {
  components: {
    jarProcess: Process,
    jarLineChart: LineChartTest,
  },
  async asyncData({ app, params }) {
    const provider = app.apolloProvider
    const client = provider.defaultClient
    let error = null
    const edgeNodes = await client
      .query({
        query: graphql.query.edgeNodes,
      })
      .then(({ data: { edgeNodes } }) => {
        return edgeNodes
      })
      .catch((e) => {
        error = e
      })
    return {
      edgeNodes,
      error,
    }
  },
  data() {
    return {
      edgeNodes: [],
      lineChart: {
        data: {},
        options: {},
      },
    }
  },
  computed: {
    tankLevel() {
      if (this.edgeNodes.length > 1) {
        return parseFloat(
          this.edgeNodes[1].devices[0].metrics.find(
            (metric) => metric.name === 'Tank1.Level'
          ).value
        ).toFixed(0)
      }
      return 0
    },
    inletFlow() {
      if (this.edgeNodes.length > 1) {
        return parseFloat(
          this.edgeNodes[1].devices[0].metrics.find(
            (metric) => metric.name === 'Inlet Flow'
          ).value
        ).toFixed(0)
      }
      return 0
    },
    outletFlow() {
      if (this.edgeNodes.length > 1) {
        return parseFloat(
          this.edgeNodes[1].devices[0].metrics.find(
            (metric) => metric.name === 'Outlet Flow'
          ).value
        ).toFixed(0)
      }
      return 0
    },
  },
  apollo: {
    edgeNodes: {
      query: graphql.query.edgeNodes,
      pollInterval: 2500,
    },
  },
}
</script>

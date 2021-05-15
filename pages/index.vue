<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card class="flex-grow-0 flex-shrink-1" style="flex-basis: 800px">
        <v-card-text>
          <jar-process />
        </v-card-text>
      </v-card>
    </v-row>
    <v-row justify="center" align="center">
      <v-card class="mt-5">
        <v-list v-if="edgeNodes.length > 0">
          <v-list-item
            v-for="metric in edgeNodes[0].devices[0].metrics"
            :key="metric.name"
          >
            <v-list-item-content>
              <v-list-item-title
                >{{ metric.name }}: {{ metric.value }}</v-list-item-title
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

export default {
  components: {
    jarProcess: Process,
  },
  data() {
    return {
      edgeNodes: [],
    }
  },
  apollo: {
    edgeNodes: {
      query: graphql.query.edgeNodes,
      pollInterval: 2500,
    },
  },
}
</script>

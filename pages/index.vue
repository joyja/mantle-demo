<template>
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
</template>

<script>
import graphql from '~/graphql'

export default {
  data() {
    return {
      edgeNodes: [],
    }
  },
  apollo: {
    edgeNodes: {
      query: graphql.query.edgeNodes,
      pollInterval: 5000,
    },
  },
}
</script>

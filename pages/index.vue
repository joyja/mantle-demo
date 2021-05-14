<template>
  <v-container>
    <v-row justify="center" align="center">
      <jar-process />
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
}
</script>

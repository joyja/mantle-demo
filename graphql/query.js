// eslint-disable-next-line
import gql from 'graphql-tag'
import fragment from './fragment'

const edgeNodes = gql`
  query EdgeNodes {
    edgeNodes {
      ...EdgeNodeBasic
      devices {
        ...EdgeDeviceBasic
        metrics {
          ...EdgeDeviceMetricBasic
        }
      }
    }
  }
  ${fragment.edgeNode}
  ${fragment.edgeDevice}
  ${fragment.edgeDeviceMetric}
`

export default {
  edgeNodes,
}

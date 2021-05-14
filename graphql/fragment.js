// eslint-disable-next-line
import gql from 'graphql-tag'

const edgeNode = gql`
  fragment EdgeNodeBasic on EdgeNode {
    group
    name
    description
    createdOn
  }
`

const edgeDevice = gql`
  fragment EdgeDeviceBasic on EdgeDevice {
    name
    description
    createdOn
  }
`

const edgeDeviceMetric = gql`
  fragment EdgeDeviceMetricBasic on EdgeDeviceMetric {
    name
    description
    datatype
    value
    timestamp
    createdOn
  }
`

export default {
  edgeNode,
  edgeDevice,
  edgeDeviceMetric,
}

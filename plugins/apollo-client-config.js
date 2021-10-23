import { InMemoryCache } from 'apollo-cache-inmemory'
export default function (context) {
  return {
    httpEndpoint: process.env.mantleHttpEndoint,
    wsEndpoint: process.env.mantleWsEndpoint,
    cache: new InMemoryCache({}),
  }
}

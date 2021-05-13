import { InMemoryCache } from 'apollo-cache-inmemory'
export default function (context) {
  return {
    httpEndpoint: `https://mantle1.jarautomation.io`,
    wsEndpoint: `wss://mantle1.jarautomation.io`,
    cache: new InMemoryCache({}),
  }
}

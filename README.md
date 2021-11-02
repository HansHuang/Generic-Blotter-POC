# Generic Blotter POC

POC projects for generic blotter, idea is calculate/enrich/aggregate/ all necessary data in batch job and publish ready-to-use dataset to Ignite server. GraphQL server directly query & subscribe data from Ignite. **Never do data aggregation in GraphQL server layer.**


### Web UI
Simplified grid component + GraphQL client
```sh
npm i
npm run build
```

### Web Server

1. Start GraphQL server supports both Query & Subscription
2. Listen/subscript date update from Ignite server
2. Host Web UI as well


```sh
npm i
npm run dev
```

### Ignite Server

```sh
# Start Ignite docker image 
```

### Batch Job

Generic data and publish to Ignite server

```sh
npm i
npm run dev
```



const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
    phoneNumber: String
  }
  type Query {
    hello: String
    users: [User]
  }
  type Subscription {
    users: [User]
  }
`);

module.exports = schema;
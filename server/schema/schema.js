const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require("lodash");

const { typeDefs: User, resolvers: userResolvers } = require("./types/User");

const Query = `
  type Query {
    hello: String
  }

  type Mutation {
    _empty: String
  }

  type hello {
    hello: String
  }
`;


const resolver = {
  hello: () => {
    return 'Hello World!'
  }
};

const typeDefs = [Query, User];

const resolvers = merge(resolver, userResolvers);

module.exports = {
  resolvers,
  schema: makeExecutableSchema({ 
    typeDefs, 
    resolvers,
    logger: { log: e => console.log('\x1b[31m%s\x1b[0m', e.message) }
  }),
}
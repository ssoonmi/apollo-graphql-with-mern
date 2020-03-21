const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString }
  })
});

module.exports = UserType;

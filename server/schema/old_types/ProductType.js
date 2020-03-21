const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } = graphql;

const ProductType = new GraphQLObjectType({
  name: 'ProductType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    weight: { type: GraphQLFloat }
  })
});

module.exports = ProductType;
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLList } = graphql;

const UserType = require("./UserType");
const ProductType = require("./ProductType");
const CategoryType = require("./CategoryType");

const User = mongoose.model("User");
const Product = mongoose.model("Product");
const Category = mongoose.model("Category");

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { _id }) {
        return User.findById(_id);
      }
    },
    
  })
});

module.exports = RootQueryType;

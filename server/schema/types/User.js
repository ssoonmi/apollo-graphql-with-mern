const mongoose = require("mongoose");

const User = mongoose.model("User");
const Product = mongoose.model("Product");
const Category = mongoose.model("Category");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretOrKey = require("../../config/keys").secretOrKey;

const typeDefs = `
  extend type Query {
    users: [User]
    user(_id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(email: String!, password: String!): User
    logIn(email: String!, password: String!): User
  }

  type User {
    _id: ID
    email: String
    token: String
    loggedIn: Boolean
  }
`;

const Query = {
  users: () => {
    return User.find({});
  },
  user: (_, { _id }) => {
    return User.findById(_id);
  },
  me: (_, __, context) => {
    const token = (context.headers && context.headers.authorization) || "";
    const { _id } = jwt.verify(token, secretOrKey);
    return User.findById(_id);
  }
};

const Mutation = {
  signUp: async (_, { email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    user.token = jwt.sign({ _id: user._id }, secretOrKey);
    user.loggedIn = true;
    return user;
  },
  logIn: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = jwt.sign({ _id: user._id }, secretOrKey);
      user.loggedIn = true;
      return user;
    }
    return new Error("Invalid email/password");
  }
};

module.exports = {
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User: {}
  }
};
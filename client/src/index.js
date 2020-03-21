import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from 'apollo-link';
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloProvider } from "@apollo/react-hooks";

import gql from "graphql-tag";

const cache = new InMemoryCache();

const links = [];
let uri = ""; // production uri

if (process.env.NODE_ENV !== "production") {
  const errorLink = onError(({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  });
  links.push(errorLink);

  uri = "http://localhost:5000/graphql";
}

const httpLink = new HttpLink({
  uri,
  headers: {
    authorization: localStorage.getItem("token")
  }
});

links.push(httpLink);

const client = new ApolloClient({
  cache,
  link: ApolloLink.from(links)
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token")
  }
});

client
  .query({
    query: gql`
      query Hello {
        hello
      }
    `
  })
  .then(result => console.log(result))
  .catch(() => {});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

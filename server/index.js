const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const expressPlayground = require("graphql-playground-middleware-express")
.default;

require('./models');
const { schema, resolvers } = require('./schema/schema');
const db = require('./config/keys').mongoURI;

const app = express();

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:3000' }));
}

app.get("/", (req, res) => res.send("Hello World"));

const morgan = require("morgan");
app.use(morgan("dev"));
const graphqlLogger = require('./logger');

app.use(
  "/graphql",
  graphqlHTTP((req, res, params) => {
    graphqlLogger(req, res, params);
    return {
      schema: schema,
      rootValue: resolvers
    }
  })
);

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

if (process.env.NODE_ENV === 'production') {
  const path = require("path");
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
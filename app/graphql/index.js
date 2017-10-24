const graphqlHTTP = require('express-graphql'),
  schema = require('./schema/event');

module.exports = (app, path) => {
  app.use(path, graphqlHTTP({
    schema: schema,
    graphiql: true
  }));
}

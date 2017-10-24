const Model = require('../../mongoose/model/event');
const GraphQLJSON = require('graphql-type-json');
const {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const Event = new GraphQLObjectType({
  name: 'Event',
  fields: {
    type: { type: GraphQLString },
    data: { type: GraphQLJSON },
    timestamp: { type: GraphQLString },
    version: { type: GraphQLInt }         // TODO how to increment version from multiple clients sending events....
  }
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      read: {
        type: new GraphQLList(Event),
        args: {
          version: { name: 'version', type: GraphQLInt }
        },
        resolve: (_, { version }) => {
          return new Promise((resolve, reject) => {
            Model.find({ version: { $gt: version }}, (err, docs) => {    // TODO find with version greater than from....
              err ? reject(err) : resolve(docs.map((doc) => {
                doc.data = JSON.parse(doc.data.toString());
                return doc;
              }));
            });
          });
        }
      }
    }
  })
});

const Model = require('../../mongoose/model/event');
const GraphQLJSON = require('graphql-type-json');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const Event = new GraphQLObjectType({
  name: 'Event',
  fields: {
    aggregateId: { type: GraphQLString },
    data: { type: GraphQLJSON },
    version: { type: GraphQLInt }
  }
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      read: {
        type: new GraphQLList(Event),
        args: {
          version: { name: 'version', type: GraphQLInt }        // TODO input type of aggregateId, version
        },
        resolve: (_, { version }) => {
          return new Promise((resolve, reject) => {
            Model.find({ version: { $gt: version }}, (err, docs) => {
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

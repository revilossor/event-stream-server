const Model = require('../../mongoose/model/event');
const GraphQLJSON = require('graphql-type-json');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const Event = new GraphQLObjectType({
  name: 'Event',
  fields: {
    aggregateId: { type: GraphQLString },
    data: { type: GraphQLJSON },
    version: { type: GraphQLInt }
  }
});

const EventSelector = new GraphQLInputObjectType({
  name: 'EventSelector',
  fields: {
    aggregateId: { type: new GraphQLNonNull(GraphQLString) },
    version: { type: GraphQLInt }
  }
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      read: {
        type: new GraphQLList(Event),
        args: {
          selector: { name: 'selector', type: new GraphQLNonNull(EventSelector) }
        },
        resolve: (_, { selector }) => {
          const version = selector.version || 0;
          return new Promise((resolve, reject) => {
            Model.find({
              aggregateId: selector.aggregateId,
              version: { $gt: version }
            }, (err, docs) => {
              err ? reject(err) : resolve(docs);
            });
          });
        }
      }
    }
  })
});

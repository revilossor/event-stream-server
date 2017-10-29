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
      getEvents: {
        type: new GraphQLList(Event),
        args: {
          selector: { name: 'selector', type: new GraphQLNonNull(EventSelector) }
        },
        resolve: (_, { selector }) => {
          const find = {
            aggregateId: selector.aggregateId
          };
          if(selector.version) {
            find.version = { $lte: selector.version };
          }
          return new Promise((resolve, reject) => {
            Model.find(find, (err, docs) => {
              err ? reject(err) : resolve(docs);
            });
          });
        }
      }
    }
  })
});

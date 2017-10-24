const Model = require('../../mongoose/model/event');
const GraphQLJSON = require('graphql-type-json');
const {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const Event = new GraphQLObjectType({
  name: 'Event',
  fields: {
    data: { type: GraphQLJSON }
  }
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      read: {
        type: new GraphQLList(Event),
        args: {
          from: { name: 'from', type: GraphQLString }
        },
        resolve: (_, { from }) => {
          return new Promise((resolve, reject) => {
            Model.find({}, (err, docs) => {    // TODO find with id greater than from....
              err ? reject(err) : resolve(docs.map((doc) => {
                doc.data = JSON.parse(doc.data.toString())
                return doc;
              }));
            });
          });
        }
      }
    }
  })
});

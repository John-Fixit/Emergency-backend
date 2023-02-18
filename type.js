const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require("graphql");

const organizationType = new GraphQLObjectType({
    name: "organization_type",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      description: { type: GraphQLString },
      category: { type: GraphQLString },
      response: { type: GraphQLString },
      status: { type: GraphQLBoolean },
    }),
  });

  const messageType = new GraphQLObjectType({
    name: "message_type",
    fields: () => ({
      id: { type: GraphQLID },
      category: { type: GraphQLString },
      message: {
        type: new GraphQLObjectType({
          name: "message",
          fields: () => ({
            text: { type: GraphQLString },
            voice: { type: GraphQLString },
            video: { type: GraphQLString },
          }),
        }),
      },
      location: {
        type: GraphQLString,
      },
      createrAt: { type: GraphQLString },
      suggestedMeasure: {type: GraphQLString},
      response: {type: GraphQLString },
      status: {type: GraphQLBoolean },
    }),
  });
  
  module.exports = { organizationType, messageType }
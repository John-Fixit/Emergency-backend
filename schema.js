const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
} = require("graphql");
const { messageModel } = require("./Models/messagesModel");
const { orgModel } = require("./Models/orgModel");
const { organizationType, messageType } = require("./type");

//queries
const RootQuery = new GraphQLObjectType({
  name: "root_query",
  fields: {
    getAllOrg: {
      type: new GraphQLList(organizationType),
      resolve(parent, args) {
        let res = orgModel
          .find({})
          .then((res) => {
            if (res) {
              return res;
            }
          })
          .catch((err) => {
            return { response: "Please check your connection", status: false };
          });
        return res;
      },
    },

    getSingleOrg: {
      type: organizationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let res = orgModel
          .findById(args.id)
          .then((res) => {
            if (res) {
              const { name, email, category, description } = res;
              return {
                response: "No error Organization!",
                status: true,
                name,
                email,
                category,
                description,
              };
            } else {
              return {
                response: "Organization with the email provided is not found!",
                status: false,
              };
            }
          })
          .catch((err) => {
            console.log(err);
            return {
              response: "Organization with the email provided is not found!",
              status: false,
            };
          });
        return res;
      },
    },
  },
});

//mutation
const _mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addOrg: {
      type: organizationType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        category: {
          type: new GraphQLNonNull(
            new GraphQLEnumType({
              name: "category",
              values: {
                vehicleAccident: { value: "Vehicle Accident" },
                fireAccident: { value: "Fire Accident" },
                robbery: { value: "Robbery" },
                riot: { value: "Riot" },
              },
            })
          ),
          default: "",
        },
      },
      resolve(parent, args) {
        const { name, email, description, category } = args;

        let newOrg = new orgModel({ name, email, description, category })
          .save()
          .then((res) => {
            console.log(res);
            if (res) {
              return {
                response: "Organization Added successfully",
                status: true,
                res,
              };
            }
          })
          .catch((err) => {
            if (err.code === 11000) {
              return {
                response: "Email entered has already been registered!",
                status: false,
              };
            } else
              return {
                response: "Internal server error, try again",
                status: false,
              };
          });

        return newOrg;
      },
    },

    sendMessage: {
      type: messageType,
      args: {
        text: { type: GraphQLString },
        voice: { type: GraphQLString },
        video: { type: GraphQLString },
        location: { type: new GraphQLNonNull(GraphQLString) },
        category: {
          type: new GraphQLNonNull(
            new GraphQLEnumType({
              name: "msg_category",
              values: {
                vehicleAccident: { value: "Vehicle Accident" },
                fireAccident: { value: "Fire Accident" },
                robbery: { value: "Robbery" },
                riot: { value: "Riot" },
              },
            })
          ),
          default: "",
        },
      },
      resolve(parent, args) {
        const { text, voice, video, category, location } = args;
        // if(!!voice){ // upload the voice record }
        // if(!!video){// upload video}
        let newMsg = messageModel.create({
          category,
          message: { text, voice, video },
          location,
        }).then((res)=>{
            const {category, message, location} = res
            return {response: "Message sent", suggestedMeasure: "I will tell you what to do", category, message, location}
        }).catch((err)=>{
            return {response: err.message, status: false}
        });

        return newMsg
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: _mutation,
});

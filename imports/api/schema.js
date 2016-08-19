import { Random } from 'meteor/random';

export const typeDefs = [`
type Email {
  address: String
  verified: Boolean
}

type User {
  emails: [Email]
  username: String
  randomString: String
}

type Query {
  user(id: String!): User
}

schema {
  query: Query
}
`];

export const resolvers = {
  Query: {
    async user(root, args, context) {
      // Only return the current user, for security

      // XXX context is undefined in this repro, so removing the check so graphiql works
      return await Meteor.users.findOne(args.id);
    },
  },
  User: {
    emails: ({emails}) => emails,
    randomString: () => Random.id(),
  }
}

import { ApolloServer } from 'apollo-server-express';
import schema from './schemas';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers
});

export default apolloServer;

import { gql } from 'apollo-server';

const userSchema = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(username: String!, password: String!, phone: String!): User!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    phone: String!
    permissions: [String!]
  }
`;

export default userSchema;

import { IFieldResolver } from 'apollo-server-express';

type UserQuery = {
  users: IFieldResolver<{}, {}>;
  user: IFieldResolver<{}, {}, { id: string }>;
};

const userResolver = {
  Query: {} as UserQuery
};

export default userResolver;

import { IFieldResolver } from 'apollo-server-express';
import user from '../../models/user';

type UserQuery = {
  users: IFieldResolver<{}, {}>;
  user: IFieldResolver<{}, {}, { id: string }>;
};

const userResolver = {
  Query: {
    users: () => user.find(),
    user: (_, { id }) => user.where('id', id).findOne()
  } as UserQuery
};

export default userResolver;

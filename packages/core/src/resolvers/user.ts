import { IFieldResolver } from 'apollo-server-express';

const users: Record<string, any> = {
  '123123123': { id: '123123123', username: 'test1', password: 'test1', phone: '1231231231', permissions: ['admin'] }
};

type UserQuery = {
  users: IFieldResolver<{}, {}>;
  user: IFieldResolver<{}, {}, { id: string }>;
};

const userResolver = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (_, { id }) => {
      return users[id];
    }
  } as UserQuery
};

export default userResolver;

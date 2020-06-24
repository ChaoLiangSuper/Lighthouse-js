import DirecoryConfigModel from '../models/DirectoryConfig';
import UserModel from '../models/User';
import { ValueTypes } from '@lighthousejs/types/constants';

export const initialize = () => {
  DirecoryConfigModel.bulkCreate(
    [
      {
        directoryName: 'directory1',
        fields: [
          {
            fieldName: 'number field',
            defaultVaule: '',
            type: ValueTypes.NUMBER
          },
          {
            fieldName: 'string field',
            defaultVaule: '',
            type: ValueTypes.STRING
          }
        ]
      },
      {
        directoryName: 'directory2',
        fields: [
          {
            fieldName: 'number field',
            defaultVaule: '',
            type: ValueTypes.NUMBER
          }
        ]
      }
    ],
    { ignoreDuplicates: true }
  );

  UserModel.bulkCreate(
    [
      {
        username: 'admin',
        password: '$2b$10$I0WcdnIf.dqSVsjznu5fgOUyGyngB5obAvrBHDGabZENlHNzQUjqK',
        permissions: ['admin']
      }
    ],
    { ignoreDuplicates: true }
  );
};

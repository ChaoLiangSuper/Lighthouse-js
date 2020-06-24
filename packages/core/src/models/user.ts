import * as Sequelize from 'sequelize';
import { UserAttributes } from '@lighthousejs/types/User';

const TABLE_NAME = 'lh_users';

class UserModel extends Sequelize.Model implements UserAttributes {
  readonly id: string;
  username: string;
  password: string;
  phone: string | null;
  permissions: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static initialize(sequelize: Sequelize.Sequelize) {
    this.init(
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4
        },
        username: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        phone: {
          type: Sequelize.DataTypes.STRING
        },
        permissions: {
          type: Sequelize.DataTypes.JSON,
          allowNull: false
        }
      },
      {
        tableName: TABLE_NAME,
        sequelize,
        timestamps: true
      }
    );
  }

  static async getAllUsers() {
    try {
      const rows = await this.findAll();
      return {
        data: rows,
        rowCount: rows.length
      };
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  static async getOneUser(userId: UserAttributes['id']) {
    try {
      const data = await this.findOne({ where: { id: userId } });
      return data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  static async getOneUserByUsername(username: UserAttributes['username']) {
    try {
      const data = await this.findOne({ where: { username } });
      return data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  static async addUser(newUser: Pick<UserAttributes, 'username' | 'password' | 'permissions'>) {
    try {
      const data = await this.create(newUser);
      return data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  static async updateUser(userId: UserAttributes['id'], updatedRecordData: Partial<UserAttributes>) {
    try {
      const [, rows] = await this.update(updatedRecordData, { where: { id: userId }, returning: true });
      return rows[0];
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
}

export default UserModel;

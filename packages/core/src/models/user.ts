import * as Sequelize from 'sequelize';

const TABLE_NAME = 'lh_users';

export interface UserAttributes {
  readonly id: string;
  username: string;
  password: string;
  phone: string | null;
  permissions: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

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
    const rows = await this.findAll();
    return {
      data: rows,
      rowCount: rows.length
    };
  }

  static async getOneUser(userId: UserAttributes['id']) {
    const data = await this.findOne({ where: { id: userId } });
    return data;
  }

  static async getOneUserByUsername(username: UserAttributes['username']) {
    const data = await this.findOne({ where: { username } });
    return data;
  }

  static async addUser(newUser: Pick<UserAttributes, 'username' | 'password' | 'permissions'>) {
    const data = await this.create(newUser);
    return data;
  }

  static async updateUser(userId: UserAttributes['id'], updatedRecordData: Partial<UserAttributes>) {
    const [, rows] = await this.update(updatedRecordData, { where: { id: userId } });
    return rows[0];
  }
}

export default UserModel;

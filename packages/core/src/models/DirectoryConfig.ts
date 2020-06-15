import * as Sequelize from 'sequelize';
import { DirectoryConfigAttributes, FieldConfig } from '../../../types/DirectoryConfig';

const TABLE_NAME = 'lh_directory_config';

class DirectoryConfigModel extends Sequelize.Model implements DirectoryConfigAttributes {
  readonly id: string;
  directoryName: string;
  fields: FieldConfig[];
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
        directoryName: {
          unique: true,
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        fields: {
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

  static async getAllDirectoryConfigs() {
    try {
      const rows = await this.findAll();
      return {
        data: rows,
        rowCount: rows.length
      };
    } catch (err) {
      return Promise.reject(err.errors[0].message);
    }
  }

  static async getOndDirectoryConfig(directoryConfigId: DirectoryConfigAttributes['id']) {
    try {
      const data = await this.findOne({ where: { id: directoryConfigId } });
      return data;
    } catch (err) {
      return Promise.reject(err.errors[0].message);
    }
  }

  static async addDirectoryConfig(newDirectoryConfig: Pick<DirectoryConfigAttributes, 'directoryName' | 'fields'>) {
    try {
      const data = await this.create(newDirectoryConfig);
      return data;
    } catch (err) {
      return Promise.reject(err.errors[0].message);
    }
  }

  static async updateDirectoryConfig(updatedDirectoryConfig: Partial<DirectoryConfigAttributes>) {
    try {
      const [, rows] = await this.update(updatedDirectoryConfig, {
        where: { id: updatedDirectoryConfig.id },
        returning: true
      });
      return rows[0];
    } catch (err) {
      return Promise.reject(err.errors[0].message);
    }
  }
}

export default DirectoryConfigModel;

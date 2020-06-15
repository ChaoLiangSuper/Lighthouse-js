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
    const rows = await this.findAll();
    return {
      data: rows,
      rowCount: rows.length
    };
  }

  static async getOndDirectoryConfig(directoryConfigId: DirectoryConfigAttributes['id']) {
    const data = await this.findOne({ where: { id: directoryConfigId } });
    return data;
  }

  static async addDirectoryConfig(newDirectoryConfig: Pick<DirectoryConfigAttributes, 'directoryName' | 'fields'>) {
    const data = await this.create(newDirectoryConfig);
    return data;
  }

  static async updateDirectoryConfig(updatedDirectoryConfig: Partial<DirectoryConfigAttributes>) {
    const [, rows] = await this.update(updatedDirectoryConfig, { where: { id: updatedDirectoryConfig.id } });
    return rows[0];
  }
}

export default DirectoryConfigModel;

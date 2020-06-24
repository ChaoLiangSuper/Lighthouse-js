import * as Sequelize from 'sequelize';
import { RecordDataAttributes, DataType } from '@lighthousejs/types/RecordData';

const TABLE_NAME = 'lh_record_data';

class RecordDataModel extends Sequelize.Model implements RecordDataAttributes {
  readonly id: string;
  readonly directoryConfigId: string;
  data: Record<string, DataType>;
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
        directoryConfigId: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false
        },
        data: {
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

  static async getAllRecordData(directoryConfigId: RecordDataAttributes['directoryConfigId']) {
    try {
      const rows = await this.findAll({ where: { directoryConfigId } });
      return {
        data: rows,
        rowCount: rows.length
      };
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  static async getOneRecordData(
    directoryConfigId: RecordDataAttributes['directoryConfigId'],
    recordDataId: RecordDataAttributes['id']
  ) {
    try {
      const data = await this.findOne({ where: { directoryConfigId, id: recordDataId } });
      return data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  static async addRecordData(
    directoryConfigId: RecordDataAttributes['directoryConfigId'],
    newRecordData: Pick<RecordDataAttributes, 'data'>
  ) {
    try {
      const data = await this.create({
        ...newRecordData,
        directoryConfigId
      });
      return data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  static async updateRecordData(
    directoryConfigId: RecordDataAttributes['directoryConfigId'],
    recordDataId: RecordDataAttributes['id'],
    updatedRecordData: Partial<RecordDataAttributes>
  ) {
    try {
      const [, rows] = await this.update(updatedRecordData, {
        where: { directoryConfigId, id: recordDataId },
        returning: true
      });
      return rows[0];
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
}

export default RecordDataModel;

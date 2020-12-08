import db from '../db'
import MachinePriceModel from './machinePriceModel'

export class Machine extends db.Model {
    get hasTimestamps() {
        return true
    }

    get tableName() {
        return 'machine'
    }

    machinePriceMode() {
        return this.belongsTo(MachinePriceModel, 'machine_id', 'id')
    }

    priceModels() {
        return this.hasMany(MachinePriceModel)
    }
}
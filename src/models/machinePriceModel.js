import db from '../db'
import { PriceModel } from './priceModel'
import { Machine } from './machine'

const Bookshelf = require('bookshelf')
export class MachinePriceModel extends db.Model {
    get hasTimestamps() {
        return true
    }

    get tableName() {
        return 'machine_price_model'
    }

    priceModel() {
        return this.belongsTo(PriceModel)
    }

    machine() {
        return this.belongsTo(Machine)
    }
}
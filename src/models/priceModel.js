import db from '../db'
import { PriceConfig } from './priceConfig'
import { MachinePriceModel } from './machinePriceModel'
const Bookshelf = require('bookshelf')
export class PriceModel extends db.Model {
    get hasTimestamps() {
        return true
    }

    get tableName() {
        return 'price_model'
    }

    pricing() {
        return this.hasMany(PriceConfig)
    }

    machinePriceModel() {
        return this.hasMany(MachinePriceModel)
    }
}
import db from '../db'
import PriceModel from './priceModel'
const Bookshelf = require('bookshelf')
export class PriceConfig extends db.Model {
    get hasTimestamps() {
        return true
    }
    
    get tableName() {
        return 'price_config'
    }
}
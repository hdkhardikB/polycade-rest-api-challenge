import { PriceModel, PriceConfig } from '../models'
import { error } from '../utils'
const priceModalService = {
    getAllPriceModels: async () => {
        try {
            const priceModelsQuery = new PriceModel()
            const result = await priceModelsQuery.fetchAll()
            return result.toJSON()
        } catch (err) {
            throw err
        }
    },
    savePriceModel: async (ctx) => {
        try {
            const { name, is_active, description } = ctx.request.body
            
            const newPriceConfigData = { name, is_active, description }

            const priceSaveQuery = await new PriceModel().save(newPriceConfigData)

            return priceSaveQuery.id
        } catch (err) {
            throw err
        }
    },
    getPriceModelById: async (ctx) => {
        try {
            const { pmId } = ctx.params
            
            if (!pmId) {
                throw error(404, 'Record not found')
            }
            const priceModelDetailQuery = new PriceModel()
            const result = await priceModelDetailQuery.where({ id: pmId }).fetch({
                withRelated: [
                    'pricing'
                ]
            })
            return result.toJSON()
        } catch (err) {
            
            throw err
        }
    },
    updatePriceModelById: async (ctx) => {
        try {
            const { pmId } = ctx.params
            const { name, is_active, description } = ctx.request.body
            if (!pmId) {
                throw error(404, 'Record not found')
            }
            const newPriceModelData = { name, is_active, description }

            await new PriceModel().where({ id: pmId }).save(newPriceModelData, { patch: true })

            return "Ok"
        } catch (err) {
            throw err
        }
    },
    getPricesForModel: async (ctx) => {
        try {
            const { pmId } = ctx.params
            if (!pmId) {
                throw error(404, 'Record not found')
            }
            const priceConfigsQuery = new PriceConfig().where({ price_model_id: pmId })
            const result = await priceConfigsQuery.fetchAll()
            return result.toJSON()
        } catch (err) {
            throw err
        }
    },
    savePriceConfigForPriceModel: async (ctx) => {
        try {
            const { pmId } = ctx.params
            const { name, is_active, price, time } = ctx.request.body
            if (!pmId) {
                throw error(404, 'Record not found')
            }
            const newPriceConfigData = { name, is_active, price, time, price_model_id: pmId }

            await new PriceConfig(newPriceConfigData).where({ id: pmId }).save()

            return "Ok"
        } catch (err) {
            throw err
        }
    },
    deletePriceFromModel: async (ctx) => {
        try {
            const { priceId, pmId } = ctx.params
            if (!priceId || !pmId) {
                throw error(404, 'Record not found')
            }
            await new PriceConfig().where({ price_model_id: pmId, id: priceId }).destroy({ require: false })
            return "Ok"
        } catch (err) {
            throw err
        }
    }
}
export default priceModalService
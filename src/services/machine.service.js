import { MachinePriceModel, PriceModel } from '../models'
import { error } from '../utils'
const machineService = {
    getPricesForMachine: async (ctx) => {
        try {

            const { machineId } = ctx.params
            if (!machineId) {
                throw error(404, 'Record not found')
            }
            const machinePriceQuery = await new MachinePriceModel().where({ machine_id: machineId }).fetch({ require: false, columns: ['price_model_id'] })

            let priceModelQuery = new PriceModel()
            if (machinePriceQuery) {
                const { price_model_id } = machinePriceQuery.toJSON()
                priceModelQuery = priceModelQuery.where({ id: price_model_id })
            } else {

                priceModelQuery = priceModelQuery.where({ is_default: true })
            }

            const result = await priceModelQuery.fetch({
                withRelated: [
                    'pricing'
                ]
            })

            return result.toJSON()
        } catch (err) {
            throw err
        }
    },
    deletePriceModelForMachine: async (ctx) => {
        try {
            const { machineId, pmId } = ctx.params
            if (!machineId || !pmId) {
                throw error(404, 'Record not found')
            }
            await new MachinePriceModel().where({ price_model_id: pmId, machine_id: machineId }).destroy({ require: false })
            return "Ok"
        } catch (err) {
            throw err
        }
    },
    updatePriceModelForMachine: async (ctx) => {
        try {
            const { machineId, pmId } = ctx.params
            if (!machineId || !pmId) {
                throw error(404, 'Record not found')
            }
            const newMachinePriceModel = { price_model_id: pmId, machine_id: machineId, is_active: true }

            const result = await new MachinePriceModel().where({ machine_id: machineId }).fetch({ require: false })
            // To check if machine has price model set already
            if (!result) {
                await new MachinePriceModel(newMachinePriceModel).save()
            } else {
                await new MachinePriceModel().where({ machine_id: machineId }).save(newMachinePriceModel, { patch: true })
            }
            return "Ok"
        } catch (err) {
            throw err
        }
    }
}
export default machineService
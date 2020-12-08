// import { expect } from 'chai';
import { PriceModelService } from '../services';
const tracker = require('mock-knex').getTracker()

describe('PriceModelService', () => {
    describe('Get all price model in the system', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('should return all price model in the system', async () => {
            tracker.on('query', query => {
                query.response([{
                    id: 1,
                    name: 'Long play',
                    is_active: true,
                    is_default: false,
                    description: 'Sample description',
                    created_at: '2020-12-03 15:52:05.215423+05:30',
                    updated_at: '2020-12-03 19:02:38.193+05:30'
                }, {
                    id: 2,
                    name: 'Value saver',
                    is_active: true,
                    is_default: true,
                    description: 'Sample description',
                    created_at: '2020-12-03 15:52:05.215423+05:30',
                    updated_at: '2020-12-03 19:02:38.193+05:30'
                }]);
            });
            const result = await PriceModelService.getAllPriceModels()
            expect(typeof result).toBe('object');
            expect(result).toHaveLength(2)
            expect(typeof result.find(model => model.is_default === true)).toBe('object')
        });

        afterEach(() => {
            tracker.uninstall()
        })
    })

    describe('Get price configurations for given price model', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('Should return list of price configurations for given model', async () => {
            tracker.on('query', query => {
                query.response([
                    {
                        id: 1,
                        price_model_id: 2,
                        name: '60 minutes',
                        is_active: true,
                        price: 15,
                        time: 60,
                        created_at: '2020-12-03 15:53:33.314387+05:30', updated_at: '2020-12-03 15:53:33.314387+05:30'
                    },
                    {
                        id: 2,
                        price_model_id: 3,
                        name: '10 minutes',
                        is_active: true,
                        price: 3,
                        time: 10,
                        created_at: '2020-12-03 15:53:33.314387+05:30',
                        updated_at: '2020-12-03 15:53:33.314387+05:30'
                    }
                ]);
            });
            const pmId = 1
            const result = await PriceModelService.getPricesForModel({ params: { pmId } })
            expect(typeof result).toBe('object');
            expect(result).toHaveLength(2)
        })

        afterEach(() => {
            tracker.uninstall()
        })
    })

    describe('Creates a new pricing model in the system', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('Should create new pricing model', async () => {
            const name = "Best value pack"
            const is_active = true
            const description = "A sample price config"
            tracker.on('query', query => {
                query.response([{
                    id: 2,
                    name,
                    is_active,
                    description,
                    created_at: Date(),
                    updated_at: Date()
                }]);
            })

            const request = { body: { name, is_active, description } }
            const result = await PriceModelService.savePriceModel({ request })
            expect(typeof result).toBe('number')
            expect(result).toBe(2)
        })

        afterEach(() => {
            tracker.uninstall()
        })
    })

    describe('Get price model detail for given id', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('Should return detailed price model with price configuration', async () => {
            tracker.on('query', (query, step) => {
                [
                    firstQuery => {
                        query.response([{
                            id: 1,
                            name: 'Long play',
                            is_active: true,
                            is_default: false,
                            description: 'Sample description',
                            created_at: '2020-12-03 15:52:05.215423+05:30',
                            updated_at: '2020-12-03 19:02:38.193+05:30'
                        }]);
                    },
                    secondQuery => {
                        query.response([
                            { id: 1, price_model_id: 1, name: '60 minutes', is_active: true, price: 15, time: 60, created_at: '2020-12-03 15:53:33.314387+05:30', updated_at: '2020-12-03 15:53:33.314387+05:30' }
                        ]);
                    }
                ][step - 1]()
            });
            const pmId = 1
            const result = await PriceModelService.getPriceModelById({ params: { pmId } })
            expect(typeof result).toBe('object');
            expect(result).toHaveProperty('pricing')
            expect(typeof result.pricing).toBe('object')
            expect(result.pricing).toHaveLength(1)
        })

        it('Should throw an error if price model id is not passed', async () => {
            try {
                await PriceModelService.getPriceModelById({ params: {} })
            } catch (err) {

                expect(err).toStrictEqual(new Error('Record not found'));
            }
        })

        afterEach(() => {
            tracker.uninstall()
        })
    })

    describe('Updates existing price model meta data', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('Should update price model detials except price config', async () => {
            tracker.on('query', query => {
                query.response({ id: 2 })
            })
            const pmId = 2
            const body = { name: "Value combo", is_active: true, description: "updated value combo" }
            const context = { request: { body }, params: { pmId } }
            const result = await PriceModelService.updatePriceModelById(context)
            expect(result).toBe("Ok")
        })

        afterEach(() => {
            tracker.uninstall()
        })
    })

    describe('Create new price config for price model', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('Should add new price config for given price model', async () => {
            const pmId = 2
            const name = "30 Minutes fun"
            const is_active = true
            const price = 10
            const time = 30
            tracker.on('query', query => {
                query.response([{ id: 3, name, is_active, price, time, price_model_id: pmId }])
            })
            const body = { name, is_active, price, time }
            const context = { request: { body }, params: { pmId } }
            const result = await PriceModelService.savePriceConfigForPriceModel(context)
            expect(result).toBe("Ok")
        })

        afterEach(() => {
            tracker.uninstall()
        })
    })

    describe('Removes price config from model', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('Should throw an error if price model id not passed', async () => {
            try {
                const priceId = 1
                await PriceModelService.deletePriceFromModel({ params: { priceId } })
            } catch (err) {
                expect(err).toStrictEqual(new Error('Record not found'));
            }
        })

        it('Should throw an error if price id is not passed', async () => {
            try {
                const pmId = 2
                await PriceModelService.deletePriceFromModel({ params: { pmId } })
            } catch (err) {
                expect(err).toStrictEqual(new Error('Record not found'));
            }
        })

        it('Should remove price config from given model', async () => {
            tracker.on('query', query => {
                query.response({ id: 2 })
            })
            const pmId = 2
            const priceId = 1
            const result = await PriceModelService.deletePriceFromModel({ params: { pmId, priceId } })
            expect(result).toBe("Ok")
        })

        afterEach(() => {
            tracker.uninstall()
        })
    })
})
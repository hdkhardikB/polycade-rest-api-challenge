import { MachineService } from '../services';
const tracker = require('mock-knex').getTracker()

describe('MachineService', () => {
    describe('Get price config for machine', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('Should return price model with its pricing if machine has price configured', async () => {
            tracker.on('query', (query, step) => {
                [
                    firstQuery => {
                        query.response([{
                            machine_id: 1,
                            price_model_id: 2,
                            is_active: true,
                            created_at: '2020-12-03 16:00:48.279037+05:30',
                            updated_at: '2020-12-03 17:54:34.212+05:30'
                        }]);
                    },
                    secondQuery => {
                        query.response([{
                            id: 2,
                            name: 'Value saver',
                            is_active: true,
                            is_default: false,
                            description: 'Sample description',
                            created_at: '2020-12-03 15:52:05.215423+05:30',
                            updated_at: '2020-12-03 19:02:38.193+05:30'
                        }]);
                    },
                    thirdQuery => {
                        query.response([
                            { id: 1, price_model_id: 2, name: '60 minutes', is_active: true, price: 15, time: 60, created_at: '2020-12-03 15:53:33.314387+05:30', updated_at: '2020-12-03 15:53:33.314387+05:30' }
                        ]);
                    }
                ][step - 1]();
            });
            const machineId = 1
            const result = await MachineService.getPricesForMachine({ params: { machineId } })

            expect(typeof result).toBe('object');
            expect(result).toHaveProperty('is_default', false);
            expect(result).toHaveProperty('pricing');
            expect(typeof result.pricing).toBe('object')
            expect(result.pricing).toHaveLength(1)

        });

        it('Should return default price model with its pricing if machine does not have price configured', async () => {
            tracker.on('query', (query, step) => {
                [
                    firstQuery => {

                        query.response(null);
                    },
                    secondQuery => {
                        query.response([{
                            id: 3,
                            name: 'Default',
                            is_active: true,
                            is_default: true,
                            description: 'Sample description',
                            created_at: '2020-12-03 15:56:25.754789+05:30',
                            updated_at: '2020-12-03 15:56:25.754789+05:30'
                        }]);
                    },
                    thirdQuery => {

                        query.response([
                            { id: 2, price_model_id: 3, name: '10 minutes', is_active: true, price: 3, time: 10, created_at: '2020-12-03 15:53:33.314387+05:30', updated_at: '2020-12-03 15:53:33.314387+05:30' }
                        ]);
                    }
                ][step - 1]();
            });
            const machineId = 3
            const result = await MachineService.getPricesForMachine({ params: { machineId } })
            expect(typeof result).toBe('object');
            expect(result).toHaveProperty('is_default', true);
            expect(result).toHaveProperty('pricing');
            expect(typeof result.pricing).toBe('object')
            expect(result.pricing).toHaveLength(1)
        });

        afterEach(() => {
            tracker.uninstall()
        })
    })

    describe('Deletes pricing model for machine', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('Should delete pricing model for given machine', async () => {
            tracker.on('query', query => {
                query.response({ id: 1 })
            })
            const machineId = 1
            const pmId = 1
            const result = await MachineService.deletePriceModelForMachine({ params: { machineId, pmId } })
            expect(result).toBe('Ok')
        })

        afterEach(() => {
            tracker.uninstall()
        })
    })

    describe('Sets pricing model for machine', () => {
        beforeEach(() => {
            tracker.install();
        });

        it('Should throw an error if machine id is not passed', async () => {
            try {
                const pmId = 1
                await MachineService.updatePriceModelForMachine({ params: { pmId } })
            } catch (err) {
                expect(err).toStrictEqual(new Error('Record not found'));
            }
        })

        it('Should throw an error if price model is not passed', async () => {
            try {
                
                const machineId = 1
                await MachineService.updatePriceModelForMachine({ params: { machineId } })
            } catch (err) {
                expect(err).toStrictEqual(new Error('Record not found'));
            }
        })

        it('Should set pricing model for given machine if price model is not set', async () => {
            tracker.on('query', query => {
                query.response({ id: 1 })
            })
            const machineId = 1
            const pmId = 1
            const result = await MachineService.updatePriceModelForMachine({ params: { pmId, machineId } })
            expect(result).toBe('Ok')
        })

        it('Should update pricing model for given machine if price model is already', async () => {
            tracker.on('query', query => {
                query.response({ id: 1 })
            })
            const machineId = 1
            const pmId = 2
            const result = await MachineService.updatePriceModelForMachine({ params: { pmId, machineId } })
            expect(result).toBe('Ok')
        })

        afterEach(() => {
            tracker.uninstall()
        })
    })
})
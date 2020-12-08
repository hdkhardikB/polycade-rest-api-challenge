import Router from 'koa-router';
import { MachineService } from '../services'
import { wrap } from '../utils';

export const MachineRouter = new Router({
    prefix: '/machines',
});

MachineRouter
    .put('/:machineId/prices/:pmId', wrap(MachineService.updatePriceModelForMachine))
    .delete('/:machineId/prices/:pmId', wrap(MachineService.deletePriceModelForMachine))
    .get('/:machineId/prices', wrap(MachineService.getPricesForMachine))

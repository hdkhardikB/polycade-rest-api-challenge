import Router from 'koa-router';
import { PriceModelService } from '../services'
import { wrap } from '../utils';

export const PriceModelRouter = new Router({
    prefix: '/pricing-models',
});

PriceModelRouter
    .get('/', wrap(PriceModelService.getAllPriceModels))
    .post('/', wrap(PriceModelService.savePriceModel))
    .get('/:pmId', wrap(PriceModelService.getPriceModelById))
    .put('/:pmId', wrap(PriceModelService.updatePriceModelById))
    .get('/:pmId/prices', wrap(PriceModelService.getPricesForModel))
    .post('/:pmId/prices', wrap(PriceModelService.savePriceConfigForPriceModel))
    .delete('/:pmId/prices/:priceId', wrap(PriceModelService.deletePriceFromModel))
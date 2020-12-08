import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { MachineRouter } from './machine.router'
import { PriceModelRouter } from './priceModel.router'

export const appRouter = new Router();

appRouter
    .use(bodyParser())
    .use(PriceModelRouter.routes(), PriceModelRouter.allowedMethods())
    .use(MachineRouter.routes(), MachineRouter.allowedMethods())
import Koa from 'koa'
import { appRouter } from './routes'
import { createReadStream } from 'fs';
const app = new Koa()
const PORT = process.env.PORT || 1337

app
  .use(appRouter.routes())
  .use((ctx, next) => {
    ctx.type = 'html';
    ctx.body = `<html>

    <head>
        <title>Polycade Engineering Node.js REST API Challenge</title>
        <style>
            img {
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
            </style>
    </head>
    
    <body>
        <img style="width:50%;" src="https://i.imgur.com/jcvsFKh.png" />
    </body>
    
    </html>`
  })
  .listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
  )

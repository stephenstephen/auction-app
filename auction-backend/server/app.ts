import 'reflect-metadata'
import http from 'http'
import { Server as IOServer } from 'socket.io'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/core'
import { AuctionEntity, BidEntity, UserEntity } from '../database/entities'
import { AuctionController, BidController, UserController, AuthController } from './routes'
import 'dotenv/config'
import { setupSocketIO } from './socket'
import { startAuctionCron } from './cron/auctionCron'

export const DI = {} as {
  server: http.Server
  orm: MikroORM
  em: EntityManager
  userRepository: EntityRepository<UserEntity>
  auctionRepository: EntityRepository<AuctionEntity>
  bidRepository: EntityRepository<BidEntity>
  io?: IOServer
}

export const app = express()
const port = process.env.SERVER_PORT || 3000

const httpServer = http.createServer(app)

export const io = new IOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

DI.io = io

export const init = (async () => {
  setupSocketIO();
  DI.orm = await MikroORM.init()
  DI.em = DI.orm.em
  DI.userRepository = DI.orm.em.getRepository(UserEntity)
  DI.auctionRepository = DI.orm.em.getRepository(AuctionEntity)
  DI.bidRepository = DI.orm.em.getRepository(BidEntity)

  app.use(express.json())
  app.use(cors())
  app.use((req: Request, res: Response, next: NextFunction) =>
    RequestContext.create(DI.orm.em, next),
  )
  app.get('/', (req: Request, res: Response) =>
    res.json({
      message:
        'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!',
    }),
  )
  app.use('/auctions', AuctionController)
  app.use('/users', UserController)
  app.use('/auth', AuthController)
  app.use('/bids', BidController)
  app.use((req, res) => res.status(404).json({ message: 'No route found' }))

  // Affichage récursif des routes Express dans la console
  function printRoutes(stack: any[], prefix = '') {
    stack.forEach((layer: any) => {
      if (layer.route && layer.route.path) {
        const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(', ');
        console.log(`${methods} ${prefix}${layer.route.path}`);
      } else if (layer.name === 'router' && layer.handle.stack) {
        // Génère le préfixe à partir de la regexp du routeur
        let routePrefix = '';
        if (layer.regexp && layer.regexp.source) {
          // Extrait le préfixe du regexp
          const match = layer.regexp.source
            .replace('^\\/', '/')
            .replace('\\/?$', '')
            .match(/\/(\w+)/);
          if (match) {
            routePrefix = match[0];
          }
        }
        printRoutes(layer.handle.stack, prefix + routePrefix);
      }
    });
  }

  console.log('--- Liste des routes Express ---');
  printRoutes(app._router.stack);

  DI.server = httpServer.listen(port, () => {
    console.log(
      `MikroORM express TS example + Socket.IO started at http://localhost:${port}`,
    )
    startAuctionCron();
  })
})()

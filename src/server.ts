import { translationModel } from './components/translation/translationModel'
import { sentenceModel } from './components/sentences/sentenceModel'
import express, { NextFunction, Request, Response } from 'express'
import authMiddleware from './common/middlewares/authMiddleware'
import translationRouter from './components/translation/router'
import { errorService } from './common/services/errorService'
import sentenceRouter from './components/sentences/router'
import viewsRouter from './components/view/router'
import config from './config'
import axios from 'axios'
import db from './db'

const { handle } = errorService()

const app = express()


app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/src/views')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// translation api
const trModel = translationModel(axios, { key: config.deepl.key, url: config.deepl.url })
app.use('/api/v1/translate', authMiddleware(config.secret), translationRouter(trModel))
// sentences api
const sModel = sentenceModel(db)
app.use('/api/v1/sentences', authMiddleware(config.secret), sentenceRouter(sModel))
// Public views
app.use('/public', viewsRouter)
// Redirect to home page
app.get('/', (_req, res) => res.redirect('/public'))
// Api error handling
app.use('/api/v1', (err: Error, _req: Request, res: Response, _next: NextFunction) => handle(err, res))
// Page not found
app.use((_req, res) => res.render('error', { error: { code: 404, title: 'NOT FOUND' } }))

process.on('uncaughtException', handle)

export default app
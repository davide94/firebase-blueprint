import * as express from 'express'
import * as cors from 'cors'
import * as functions from 'firebase-functions'
import { validate } from '../../middleware/validator'
import { errorMiddleware } from '../../middleware/error'
import { getUser } from './get-user'
import { createUser } from './create-user'
import { deleteUser } from './delete-user'
import createUserSchema from './schema/create-user-schema'

const app = express()

app.use(express.json())
app.use(cors({ origin: true }))

app.get('/:id', (req: express.Request, res: express.Response) => {
  res.send(getUser(req.params.id))
})
app.post(
  '/',
  validate({ body: createUserSchema }),
  (req: express.Request, res: express.Response) => {
    res.send(createUser(req.body))
  }
)
app.delete('/:id', (req: express.Request, res: express.Response) => {
  res.send(deleteUser(req.params.id))
})

app.use(errorMiddleware)

export const users = functions.https.onRequest(app)

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import models from './models/index.js'
import routes from './routes';
import { v4 as uuidv4 } from 'uuid';

console.log(models.users);
console.log(models.messages);

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('./session', routes.session)
app.use('./user', routes.user)
app.use('./message', routes.message)

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1]
    };
    next();
})

app.get('/session', (req, res) => {
    return res.send(
        req.context.models.users[req.context.me.id]
    )
})


app.get('/users', (req, res) => {
    return res.send(Object.values(req.context.models.users))
})

app.get('/users/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId])
})

app.post('/users', (req, res) => {
    return res.send('POST method on user resource')
})

app.put('/users/:userId', (req, res) => {
    console.log(req.params);
    return res.send(
        `PUT method on user/${req.params.userId} resource`)
})

app.delete('/users/:userId', (req, res) => {
    console.log(req.params);
    return res.send(
        `DELETE method on user/${req.params.userId} resource`)
})

/////// Messages ///////
///////         ///////

app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages))
})

app.get('/messages/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
})

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
  
    req.context.models.messages[id] = message;
  
    return res.send(message);
})

app.put('/messages/:messageId', (req, res) => {
    console.log(req.params);
    return res.send(
        `PUT method on user/${req.params.userId} resource`)
})

app.delete('/messages/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
      } = req.context.models.messages;
    
      req.context.models.messages = otherMessages;
    
      return res.send(message);
  });


app.listen(process.env.PORT, () => console.log(`Server is listening on PORT 3000`));
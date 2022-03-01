import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import models from './models/index.js'
import { v4 as uuidv4 } from 'uuid';

console.log(models.users);
console.log(models.messages);

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.me = users[1];
    next();
})

app.get('/session', (req, res) => {
    return res.send(users[req.me.id])
})


app.get('/users', (req, res) => {
    return res.send(Object.values(users))
})

app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId])
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
    return res.send(Object.values(messages))
})

app.get('/messages/:messageId', (req, res) => {
        console.log(req.params);
        res.send(req.params)
})

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.me.id
    }
    messages[id] = message;
    res.send(message)
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
    } = messages;
  
    messages = otherMessages;
  
    return res.send(message);
  });


app.listen(process.env.PORT, () => console.log(`Server is listening on PORT 3000`));
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { users } from './users.js';
// import { messages } from './messages.js';

const messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  };


const app = express();
app.use(cors());

app.get('/users', (req, res) => {
    return res.send(Object.values(users))
})

app.get('/users/userId', (req, res) => {
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

app.get('/messages', (req, res) => {
    return res.send(Object.values(messages))
})

app.get('/messages/:messageId', (req, res) => {
        console.log(req.params);
        res.send(req.params)
})

app.post('/messages', (req, res) => {
    return res.send('POST method on user resource')
})

app.put('/messages/:messageId', (req, res) => {
    console.log(req.params);
    return res.send(
        `PUT method on user/${req.params.userId} resource`)
})

app.delete('/messages/:messageId', (req, res) => {
    console.log(req.params);
    return res.send(
        `DELETE method on user/${req.params.userId} resource`)
})


app.listen(process.env.PORT, () => console.log(`Server is listening on PORT 3000`));
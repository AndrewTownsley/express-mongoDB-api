import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());

app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user resource')
})

app.post('/users', (req, res) => {
    return res.send('POST method on user resource')
})

app.put('/users/:userId', (req, res) => {
    return res.send(
        `PUT method on user/${req.params.userId} resource`)
})

app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE method on user/${req.params.userId} resource`)
})

app.listen(process.env.PORT, () => console.log(`Server is listening on PORT 3000`));
import express from 'express';

const app = express();

const PORT = 5555;

app.get('/', (req, res) => {
   res.send('Hello');
});

app.listen(PORT, () => {
   console.log('server ok', PORT);
});
const express = require('express');
const {json, urlencoded} = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes');

app.use(cors()); // Add cors middleware

// Initializing bodyparser
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true }));


app.get('/', (_, res) => {
    res.send('Everything\'s peaches');
});

app.use('/api/v1', userRouter)

app.listen(process.env.PORT || 4000, () => `Server is running on port ${process.env.PORT || 4000}`);
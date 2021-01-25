// const app = express();
const app = require('./app')
const { PORT } = require('./config')

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

module.exports = {app};


// const express = require('express');
// const app = express();
//
// const PORT = process.env.PORT || 8000;
//
// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//
// module.exports = {app};

const mongoose = require('mongoose');
const url = process.env.DATABASE_URL || 'mongodb://paschal:paschal1122334455@ds243317.mlab.com:43317/sterling'
mongoose.connect(url, {useNewUrlParser: true})
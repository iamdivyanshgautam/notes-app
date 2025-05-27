const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://iamdivyanshgautam:Rajubhaiya%401@divyansh-cluster.iesfecn.mongodb.net/?retryWrites=true&w=majority&appName=divyansh-cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

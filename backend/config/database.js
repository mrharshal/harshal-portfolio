const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`🗄️  Database: ${conn.connection.name}`);
    console.log(`🔗 Connection State: ${conn.connection.readyState}`);
    
    // Listen for connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('🔧 Troubleshooting tips:');
    
    if (error.message.includes('authentication failed')) {
      console.log('   - Check username and password in connection string');
      console.log('   - Verify database user exists in MongoDB Atlas');
      console.log('   - Ensure user has proper permissions');
    } else if (error.message.includes('network') || error.message.includes('timeout')) {
      console.log('   - Check internet connection');
      console.log('   - Verify IP address is whitelisted in MongoDB Atlas');
      console.log('   - Try adding 0.0.0.0/0 to IP whitelist for testing');
    }
    
    console.log('🚀 Server will continue running without database...');
  }
};

module.exports = connectDB;
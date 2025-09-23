const { config } = require('dotenv');
const { Pool } = require('pg');

// Load environment variables
config({ path: '.env.local' });

async function testDatabase() {
  console.log('🔍 Testing database connection...');
  
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    // Test basic connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful!', result.rows[0]);

    // Check if tables exist
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📋 Tables in database:', tables.rows.map(r => r.table_name));

    // Check if users table exists and is accessible
    try {
      const userCount = await pool.query('SELECT COUNT(*) FROM users');
      console.log('👥 Users table accessible, current count:', userCount.rows[0].count);
    } catch (error) {
      console.error('❌ Error accessing users table:', error.message);
    }

    // Try to insert a test user
    try {
      await pool.query(`
        INSERT INTO users (id, name, email, "imageUrl", "createdAt", "updatedAt") 
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET 
          name = EXCLUDED.name,
          email = EXCLUDED.email,
          "imageUrl" = EXCLUDED."imageUrl",
          "updatedAt" = NOW()
      `, ['test_user_123', 'Test User', 'test@example.com', 'https://example.com/avatar.jpg']);
      
      console.log('✅ Successfully inserted/updated test user');

      // Check if the user exists
      const testUser = await pool.query('SELECT * FROM users WHERE id = $1', ['test_user_123']);
      console.log('👤 Test user found:', testUser.rows[0]);

      // Clean up test user
      await pool.query('DELETE FROM users WHERE id = $1', ['test_user_123']);
      console.log('🧹 Test user cleaned up');

    } catch (error) {
      console.error('❌ Error with user operations:', error.message);
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await pool.end();
  }
}

testDatabase();
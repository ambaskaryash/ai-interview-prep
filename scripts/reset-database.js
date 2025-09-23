const { config } = require('dotenv');
const { Pool } = require('pg');

// Load environment variables
config({ path: '.env.local' });

async function resetDatabase() {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log('🗑️  Dropping all tables...');
    
    // Drop all tables in the correct order (respecting foreign key constraints)
    await pool.query('DROP TABLE IF EXISTS "questions" CASCADE;');
    await pool.query('DROP TABLE IF EXISTS "interviews" CASCADE;');
    await pool.query('DROP TABLE IF EXISTS "job_info" CASCADE;');
    await pool.query('DROP TABLE IF EXISTS "users" CASCADE;');
    
    // Drop enums
    await pool.query('DROP TYPE IF EXISTS "job_infos_experience_level" CASCADE;');
    await pool.query('DROP TYPE IF EXISTS "questions_question_difficulty" CASCADE;');
    
    console.log('✅ All tables and types dropped successfully!');
    
  } catch (error) {
    console.error('❌ Error dropping tables:', error.message);
  } finally {
    await pool.end();
  }
}

resetDatabase();
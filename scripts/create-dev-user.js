const { config } = require('dotenv');
const { Pool } = require('pg');

// Load environment variables
config({ path: '.env.local' });

async function createDevUser() {
  console.log('👤 Creating development user...');
  
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    // Create the user with the ID from the error message
    const userId = 'user_320VErja8gcoK1X0Z7CFIkPGjbS';
    
    await pool.query(`
      INSERT INTO users (id, name, email, "imageUrl", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET 
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        "imageUrl" = EXCLUDED."imageUrl",
        "updatedAt" = NOW()
    `, [userId, 'Development User', 'dev@example.com', 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yWk1QcUZzc3VKSWFsWXRhMXNxOEJEQiIsInJpZCI6InVzZXJfMzIwVkVyamE4Z2NvSzFYMFo3Q0ZJa1BHamJTIiwiaW5pdGlhbHMiOiJEVSJ9']);
    
    console.log('✅ Successfully created development user');

    // Verify the user exists
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    console.log('👤 User created:', user.rows[0]);

  } catch (error) {
    console.error('❌ Error creating user:', error.message);
  } finally {
    await pool.end();
  }
}

createDevUser();
// Debug test script for interview creation
const { createInterview } = require('./dist/features/interviews/actions.js');
const { canCreateInterview } = require('./dist/features/interviews/permissions.js');

async function runDebugTest() {
  console.log('=== Debug Test: Interview Creation ===');
  
  try {
    // Test environment variables
    console.log('Environment check:');
    console.log('- NEXT_PUBLIC_HUME_CONFIG_ID:', process.env.NEXT_PUBLIC_HUME_CONFIG_ID ? 'SET' : 'NOT SET');
    console.log('- HUME_API_KEY:', process.env.HUME_API_KEY ? 'SET' : 'NOT SET');
    console.log('- CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY ? 'SET' : 'NOT SET');
    
    // Test permissions
    console.log('\nTesting permissions...');
    const canCreate = await canCreateInterview();
    console.log('- canCreateInterview():', canCreate);
    
    // Test interview creation with a dummy job ID
    console.log('\nTesting interview creation...');
    const result = await createInterview({ jobInfoId: 'test-job-id' });
    console.log('- createInterview result:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Debug test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

runDebugTest().catch(console.error);
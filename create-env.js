/**
 * This script automatically creates a properly formatted .env file
 * from your Firebase service account JSON file
 */

const fs = require('fs');
const path = require('path');

// Path to your Firebase JSON file
const firebaseJsonPath = './attached_assets/word-counter-plus-app-firebase-adminsdk-fbsvc-6258760568.json';

// Check if the Firebase JSON file exists
if (!fs.existsSync(firebaseJsonPath)) {
  console.error('❌ Error: Firebase JSON file not found at:', firebaseJsonPath);
  console.log('\n📝 Please make sure the Firebase JSON file is in the attached_assets folder');
  process.exit(1);
}

try {
  // Read the Firebase JSON file
  const firebaseConfig = JSON.parse(fs.readFileSync(firebaseJsonPath, 'utf8'));
  
  // Validate required fields
  if (!firebaseConfig.project_id || !firebaseConfig.client_email || !firebaseConfig.private_key) {
    console.error('❌ Error: Firebase JSON file is missing required fields');
    process.exit(1);
  }

  // Create .env content with proper formatting
  const envContent = `# Firebase Configuration for Local Development
# Auto-generated from Firebase service account JSON
# DO NOT commit this file to Git

FIREBASE_PROJECT_ID=${firebaseConfig.project_id}
FIREBASE_CLIENT_EMAIL=${firebaseConfig.client_email}
FIREBASE_PRIVATE_KEY="${firebaseConfig.private_key}"
`;

  // Write .env file
  fs.writeFileSync('.env', envContent);
  
  console.log('✅ Success! .env file created successfully!');
  console.log('\n📋 Your .env file contains:');
  console.log('   - FIREBASE_PROJECT_ID');
  console.log('   - FIREBASE_CLIENT_EMAIL');
  console.log('   - FIREBASE_PRIVATE_KEY');
  console.log('\n🚀 You can now run: npm run dev');
  console.log('\n⚠️  Remember: Never commit the .env file to Git!');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  process.exit(1);
}

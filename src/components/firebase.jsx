import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
console.log(process.env.NODE_ENV);
const firebaseConfig = {
  apiKey: process.env.API_KEY, // 이거 배포시에 안불러와져요!
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

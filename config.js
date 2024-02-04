import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} = process.env;

assert(500, 'Port is required');
assert('localhost', 'Host is required');

export default {
  port: 3000,
  host: 'localhost',
  hostUrl: "https://52bf-41-85-163-194.ngrok-free.app/",
  firebaseConfig: {
    apiKey: "AIzaSyBT8TYVZ_NdDOcFFTD4ZBbxjbMsGyGEYAs",
  authDomain: "lokibyappweb.firebaseapp.com",
  projectId: "lokibyappweb",
  storageBucket: "lokibyappweb.appspot.com",
  messagingSenderId: "695856635665",
  appId: "1:695856635665:web:6c8b3ca28b71e2cf4736b0",
  },
};
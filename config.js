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
    apiKey: "AIzaSyBnjBkGazWspX5MoectIwYUrkTTnJi8ei8",
    authDomain: "lokiby-bb465.firebaseapp.com",
    projectId: "lokiby-bb465",
    storageBucket: "lokiby-bb465.appspot.com",
    messagingSenderId: "320617838551",
    appId: "1:320617838551:web:8a8800b3c1d7c70c03bd92",
  },
};
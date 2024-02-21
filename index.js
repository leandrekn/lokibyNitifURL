import express from 'express';
import cors from 'cors';
import firebase from './firebase.js';
import config from './config.js';
import  bodyParser from 'body-parser';
// import productRoute from './routes/productRoute.js';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,arrayUnion, 
  } from 'firebase/firestore';
const app = express();
const db = getFirestore(firebase);
// const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


//routes
//app.use('/api', productRoute);
// app.post("/create",async (req,res)=>{
//     const data=req.body;
//     await addDoc(collection(db, 'Reservation'), data);
//     console.log("msg:",data);
//     res.status(200).send('product created successfully');
//     res.send({msg:"Cool"});
// })

// get method
 app.get('/create',async(req,res)=>{
  
  const data = req.query;
  const uId=req.query.returnContext;
 const tab=uId.split(",")
 const artId=tab[0] ;
 const clientId =tab[1];
 const recentReserv =tab[2]
 const periodReser =tab[4]

 // await addDoc(collection(db,'Article').doc(artId).update,data)
const update = doc(db,"Article",artId);
//await updateDoc(update,data);
  

  
  // Utilisation de arrayUnion pour ajouter des éléments à la liste sans doublons
  await updateDoc(update, {
    reservation: arrayUnion(data),
    recentReservation: parseInt(recentReserv),
    iDclient:arrayUnion(clientId),
    reserver:true,
    periodReservation:arrayUnion(periodReser),
    // Ajoutez vos données à la liste "reservation"
  });
 

  res.status(200).send(`
  <!DOCTYPE html>
  <html>
      <head>
          <title>Réservation enregistrée avec succès</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
              }
              header {
                  background: linear-gradient(to right, #8A2BE2, #00BFFF); /* Dégradé de violet à bleu */
                  padding: 20px;
                  color: white;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
              }
              header img {
                  height: 50px; /* Ajustez la hauteur selon vos besoins */
                  margin-left: 20px; /* Espace à gauche du logo */
              }
              .content {
                  padding: 20px;
              }
          </style>
      </head>
      <body>
          <header>
              <img src="lokiby.jpeg" alt="Logo"> <!-- Remplacez chemin/vers/votre/logo.png par le chemin de votre logo -->
              <h1>Votre réservation a été enregistrée avec succès!</h1>
          </header>
          <div class="content">
              <p>Merci pour votre réservation.</p>
              <a href="https://www.lokiby.com" target="_blank"><button>Aller vers Lokiby</button></a>
          </div>
      </body>
  </html>
`);
 })
app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);



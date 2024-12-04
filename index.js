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
app.get('/create', async (req, res) => {
    const data = req.query;
    const responsecode = parseInt(data.responsecode, 10); // Assurez-vous que responsecode est un entier
    const uId = req.query.returnContext;
    const tab = uId.split(",");
    const artId = tab[0];
    const clientId = tab[1];
    const recentReserv = tab[2];
    const periodReser = tab[4];

    const update = doc(db, "Article", artId);

    if (responsecode !== 0) {
        // Réponse HTML pour réservation échouée
        return res.status(400).send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Échec de la réservation</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            background-color: #f8d7da;
                            color: #721c24;
                        }
                        .content {
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="content">
                        <h1>La réservation a échoué</h1>
                        <p>Une erreur est survenue lors de la réservation. Veuillez réessayer.</p>
                    </div>
                </body>
            </html>
        `);
    }

    try {
        // Mise à jour du document avec arrayUnion
        await updateDoc(update, {
            reservation: arrayUnion(data),
            recentReservation: parseInt(recentReserv, 10), // Assurez-vous que c'est un entier
            iDclient: arrayUnion(clientId),
            reserver: true,
            periodReservation: arrayUnion(periodReser),
        });

        // Réponse HTML pour succès
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
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }
                        header {
                            background: linear-gradient(to right, #00BFFF, #8A2BE2);
                            padding: 20px;
                            color: white;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 100%;
                            position: fixed;
                            top: 0;
                        }
                        header img {
                            height: 50px;
                            margin-left: 20px;
                        }
                        .content {
                            text-align: center;
                        }
                        button {
                            font-size: 20px;
                            padding: 10px 20px;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <img src="lokibylogo.png" alt="Logo">
                    </header>
                    <div class="content">
                        <h1>Votre réservation a été enregistrée avec succès!</h1>
                        <p>Connectez-vous à votre espace pour voir les détails de votre réservation.</p>
                        <a href="https://lokiby.com" target="_blank"><button>Aller vers Lokiby</button></a>
                    </div>
                </body>
            </html>
        `);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la réservation: ", error);
        res.status(500).json({
            error: `Erreur interne lors de la réservation: ${error.message}`,
        });
    }
});
app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);



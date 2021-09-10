import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

functions.region('europe-west1');

export.notifyFriends = functions.firestore
    .document('Posts/{post-id}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data();


        const uid = data.uid; // o UID da pessoa que postou 


        const db = admin.firestore();

        // 1º Buscar a lista dos amigos da pessoa que postou 
        const profileRef = db.collection('Profile').where('uid', '==', uid);
        const profile = await profileRef.get();

        let myFriends;

        profile.forEach((res) => {
             res.data().friends;
            myFriends = res.data().friends;
        })

        // 2º Preciso de ir buscar os pushTokens de cada um dos amigos
        

        // 3º Com os tokens, consigo mandar notificação a cada dispositivo 

        // Criar a mensagem da notificacao (falta)

        
        const payload = {}
        
        const tokens:any[] = []
        
        return admin.messaging().sendToDevice(tokens, payload);

})

exports.postCreated = functions.firestore
  .document('friends/{friendid}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();//snapshot tem os dados do documento
    
    const payload = {
      notification: {
        title: 'TESTE DE NOTIFICACAO',
        body: ` ${data.username}, isto é um teste`,
      },
    };

    const db = admin.firestore();
    const userDetails = db
      .collection('userDetails')
      .where('uid', '==', 'JmSunvmAGaTWkLM8pGQL3ZDzNRB2');

    const users = await userDetails.get();

    const tokens: string | any[] = [];

    users.forEach((res) => {
      const token = res.data().pushToken;

      tokens.push(token);
    });

    console.log('TOKENS FILLED', tokens);

    return admin.messaging().sendToDevice(tokens, payload);
  });

exports.postDeleted = functions.firestore
  .document('friends/{friendid}')
  .onDelete((snapshot, context) => {
    console.log(snapshot.data(), 'deleted');
    return Promise.resolve();
  });

exports.postUpdated = functions.firestore
  .document('friends/{friendid}')
  .onUpdate((snapshot, context) => {
    console.log('Before', snapshot.before.data());

    console.log('After', snapshot.after.data());
    return Promise.resolve();
  });

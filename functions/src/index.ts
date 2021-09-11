import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.postCreated = functions.firestore
  .document('friends/{friendid}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data(); //snapshot tem os dados do documento

    const payload = {
      notification: {
        title: 'TESTE DE NOTIFICACAO',
        body: ` ${data.username}, isto é um teste`,
      },
    };

    const db = admin.firestore();
    const userDetails = db
      .collection('userDetails')
      .where('uid', '==', 'LFv29pWLvHP4rdnrZwIduXF1zqQ2');

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

exports.alertFriends = functions.firestore
  .document('Posts/{postID}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();

    const uid = data.uid; // o UID da pessoa que postou

    const db = admin.firestore();

    // 1º Buscar a lista dos amigos da pessoa que postou
    const profileRef = db.collection('Profile').where('uid', '==', uid);
    const profile = await profileRef.get();

    let myFriends;

    profile.forEach((res) => {
      myFriends = res.data().friends;
    });
    console.log('Friends ', myFriends);
    // 2º Preciso de ir buscar os pushTokens de cada um dos amigos
    const tokens: any[] = [];

    const userDetailsRef = db
      .collection('userDetails')
      .where('uid', 'in', myFriends);

    const userDetails = await userDetailsRef.get();

    userDetails.forEach((res) => {
      tokens.push(res.data().pushToken);
    });

    console.log('TOKENS ', tokens);

    // 3º Criar o payload
    const payload = {
      notification: {
        title: `${data.username} has a new Post`,
        body: data.description,
        imageUrl: data.photo,
      },
    };

    return admin.messaging().sendToDevice(tokens, payload);
  });

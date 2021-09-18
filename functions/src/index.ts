import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.notifyFriends = functions
  .region('europe-west1')
  .firestore.document('Posts/{postID}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data(); //snapshot tem os dados do documento

    console.log('DATA: ', JSON.stringify(data));

    console.log('CONTEXT:', JSON.stringify(context.params));

    const uid = data.uid;

    // CRIAR PAYLOAD

    const notification: admin.messaging.NotificationMessagePayload = {
      title: `${data.username} has a new post!`,
      body: ` ${data.description}`,
    };
    const dataPayload: admin.messaging.DataMessagePayload = {
      postID: context.params.postID,
    };
    const payload: admin.messaging.MessagingPayload = {
      notification,
      data: dataPayload,
    };

    const db = admin.firestore();
    const profileRef = db.collection('Profile');
    const friendsRef = profileRef.where('friends', 'array-contains', uid); // vai buscar todos users que me seguem

    try {
      const friends = await friendsRef.get();
      const tokens: any[] = [];

      friends.forEach((res) => tokens.push(res.data()['pushToken']));

      console.log('TOKENS', tokens);

      return admin.messaging().sendToDevice(tokens, payload);
    } catch (e) {
      console.log('error ', e);
      return;
    }
  });

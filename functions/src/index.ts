import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.notifyFriends = functions
  .region('europe-west1')
  .firestore.document('Posts/{postID}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data(); //snapshot tem os dados do documento

    console.log('DATA: ', JSON.stringify(data));

    const uid = data.uid;

    // CRIAR PAYLOAD

    const notification: admin.messaging.NotificationMessagePayload = {
      title: `${data.username} has a new post!`,
      body: ` ${data.description}`,
    };
    const dataPayload: admin.messaging.DataMessagePayload = {
      uid,
    };
    const payload: admin.messaging.MessagingPayload = {
      notification,
      data: dataPayload,
    };

    const db = admin.firestore();
    const profileRef = db.collection('Profile').doc(uid);
    const user = await profileRef.get();

    const friends = user.get('friends') as string[];

    console.log('MY FRIENDS', friends);
    if (friends.length === 0) {
      return;
    }
    const friendsPushTokensRef = db
      .collection('Profile')
      .where('uid', 'in', friends);

    const friendsPushTokens = await friendsPushTokensRef.get();

    const tokens: any[] = [];

    friendsPushTokens.forEach((res) => tokens.push(res.data()['pushToken']));

    console.log('TOKENS', tokens);

    return admin.messaging().sendToDevice(tokens, payload);
  });

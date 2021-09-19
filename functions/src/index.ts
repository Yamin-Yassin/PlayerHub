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

exports.aggregateScore = functions
  .region('europe-west1')
  .firestore.document('Games/{gameID}')
  .onUpdate(async (snapshot, context) => {
    console.log('SNAPSHOT: ', JSON.stringify(snapshot.after.data()));
    console.log('CONTEXT: ', JSON.stringify(context.params));

    const gameID = context.params.gameID;
    const numReviews: string[] = snapshot.after.data().reviews;
    const db = admin.firestore();

    const gameRef = db.collection('Games').doc(gameID);

    const reviews = await db
      .collection('Reviews')
      .where('game-id', '==', gameID)
      .get();

    let score = 0;

    reviews.forEach((res) => (score += res.data().score));

    db.runTransaction(async (transaction) => {
      score = score / numReviews.length;
      transaction.update(gameRef, {
        score,
      });
    });
  });

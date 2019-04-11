import * as firebase from 'firebase'

import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
} from 'react-native-dotenv'

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
}

firebase.initializeApp(config)

console.log(firebase.app().options)

export default firebase

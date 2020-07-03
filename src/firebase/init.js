import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwhdqNdl8YHoKdqLW1uo-mCtdO7aJTvhg",
  authDomain: "smoothies-73b0d.firebaseapp.com",
  databaseURL: "https://smoothies-73b0d.firebaseio.com",
  projectId: "smoothies-73b0d",
  storageBucket: "smoothies-73b0d.appspot.com",
  messagingSenderId: "539097502063",
  appId: "1:539097502063:web:0700258b9218a746b5989a"
};

// exporting firestore database
export default (!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app());

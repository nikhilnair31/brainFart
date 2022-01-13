import firebase from 'firebase/app';
import { dbref } from "./firebase";

export default {
    randomIdea: async function () {
        try {
            var tags = [ "games", "apps", "startup"]
            var randomIndex = Math.floor(Math.random() * tags.length);
            var randomTag = tags[randomIndex];
            const data = await dbref.collection("posts").where("tag", "==", randomTag).orderBy(firebase.firestore.FieldPath.documentId()).limit(5).get();
            let posts = [];

            data.forEach((doc) => {
                posts.push({ id: doc.id, post: doc.data() });
            });

            return { posts, randomIndex };
        } 
        catch (e) {
          //console.log(e);
        }
    },

    postsFirstBatch: async function () {
        try {
            const data = await dbref.collection("posts").orderBy("utc", "desc").limit(10).get();
            let posts = [];
            let lastKey = "";

            data.forEach((doc) => {
                posts.push({ id: doc.id, post: doc.data() });
                lastKey = doc.data().utc;
            });

            return { posts, lastKey };
        } 
        catch (e) {
          //console.log(e);
        }
    },

    postsNextBatch: async (key) => {
        try {
            const data = await dbref.collection("posts").orderBy("utc", "desc").startAfter(key).limit(10).get();
            let posts = [];
            let lastKey = "";

            data.forEach((doc) => {
                posts.push({ id: doc.id, post: doc.data() });
                lastKey = doc.data().utc;
            });

            return { posts, lastKey };
        } 
        catch (e) {
          //console.log(e);
        }
    }
};
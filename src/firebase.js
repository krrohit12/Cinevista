
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC2wyWgB5uK8p2SRWNqZvDRh3zUqbkt_LA",
  authDomain: "netflix-clone-be6f9.firebaseapp.com",
  projectId: "netflix-clone-be6f9",
  storageBucket: "netflix-clone-be6f9.appspot.com",
  messagingSenderId: "393170698689",
  appId: "1:393170698689:web:9333d4973c11ef627caf40"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const signup=async(name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
    }
    catch(error){
        console.log(error);
        alert(error);
    }
}
const login=async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }
    catch(error){
        console.log(error);
        alert(error);
    }
}
const logout=()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout}
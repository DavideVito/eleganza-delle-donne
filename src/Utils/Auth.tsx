import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../Firebase/Firebase";



export const accedi = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
}
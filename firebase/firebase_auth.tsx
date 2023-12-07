import firebase from './firebase';
import {
    getAuth,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    NextOrObserver,
    User,
    UserCredential,
    AuthError
} from "firebase/auth";

interface AuthResponse {
  user?: User;
  error?: string;
}

const registrerWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
    const auth = getAuth();
    try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user };
    } catch (error) {
        const authError = error as AuthError;
        return {
            error: authError.code + ': ' + authError.message
        };
    }
};

const signWithEmail = async (signInEmail: string, signInPassword: string): Promise<AuthResponse> => {
    const auth = getAuth();
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
        return { user: userCredential.user };
    } catch (error) {
        const authError = error as AuthError;
        console.log('Error: ', authError.code + ': ' + authError.message);
        return {
            error: authError.code + ': ' + authError.message
        };
    }
};

const signOutUser = async (): Promise<{ success?: boolean; error?: string }> => {
    const auth = getAuth();
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        const authError = error as AuthError;
        return {
            error: authError.message
        };
    }
};

const authState = (userFnc: NextOrObserver<User>): void => {
    const auth = getAuth();
    onAuthStateChanged(auth, userFnc);
};

const getCurrentUser = (): User | null => {
    const auth = getAuth();
    return auth.currentUser;
};

export default {
    registrerWithEmail,
    signWithEmail,
    signOutUser,
    getCurrentUser,
    authState
};

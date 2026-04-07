import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../config/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define administrators manually since Firestore might be flaky during testing
  const checkAdmin = (u, p) => {
    const adminEmails = ['amanr_p0puhwg@gmail.com', 'admin1234@gmail.com', 'admin123@gmail.com'];
    return p?.role === 'admin' || adminEmails.includes(u?.email);
  };

  const fetchProfile = async (firebaseUser) => {
    try {
      if (!firebaseUser) return null;
      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (err) {
      console.warn('Firestore profile could not be loaded. Continuing without it.', err);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userProfile = await fetchProfile(currentUser);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    try {
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        id: userCredential.user.uid,
        email,
        full_name: fullName,
        role: 'user',
        created_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Could not save to Firestore:", e);
    }
    return userCredential.user;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    
    // Attempt to save profile if doesn't exist
    try {
      const docRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          full_name: userCredential.user.displayName,
          role: 'user',
          created_at: new Date().toISOString()
        });
      }
    } catch (e) {
      console.warn("Google Login Firestore save skipped:", e);
    }
    
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      login,
      logout,
      signup,
      loginWithGoogle,
      isAdmin: checkAdmin(user, profile)
    }}>
      {/* We always render children so the UI doesn't blank out on auth error */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

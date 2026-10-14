import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setCurrentUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || 'User',
                })
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const signup = async (email, password, username) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        await updateProfile(userCredential.user, { displayName: username })
        return userCredential.user
    }

    const login = async (email, password) => {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        return credential.user
    }

    const logout = async () => {
        await signOut(auth)
    }

    return (
        <AuthContext.Provider
            value={{ currentUser, loading, signup, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}
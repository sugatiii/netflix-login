import React from 'react'
import { 
    createUserWithEmailAndPassword ,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth'

import { useState } from 'react'
import {auth} from '../firebase'
import {useRouter} from 'next/router'
import { async } from '@firebase/util'

interface IAuth{
    user: User | null
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading : boolean
}

const AuthContext = React.createContext<IAuth>({
    user: null,
    signIn: async()=>{},
    signUp: async()=>{},
    logout: async()=>{},
    error: null,
    loading: false
})

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({children}:AuthProviderProps)=> {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    React.useEffect(()=>{
        onAuthStateChanged(auth ,(user)=>{
            if(user){
                setUser(user)
                setLoading(false)
            }else{
                setUser(null)
                setLoading(false)
                router.push('/login')
            }

            setInitialLoading(false)
        }
        )
    },[auth])


    const signUp = async (email: string, password: string) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth,email, password)
        .then((userCredentsial) => {
            setUser(userCredentsial.user)
            router.push('/')
            setLoading(false)
        }).catch((error) => {
            alert(error)
        })
        .finally(()=>{
            setLoading(false)
        })

        
    }
    const signIn = async (email: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth,email, password)
        .then((userCredentsial) => {
            setUser(userCredentsial.user)
            router.push('/')
            setLoading(false)
        }).catch((error) => {
            alert(error)
        })
        .finally(()=>{
            setLoading(false)
        })

        
    }

    const logout = async () => {
        setLoading(true)
        await signOut(auth).then(()=>{
            setUser(null)
            router.push('/login')
            setLoading(false)
        }).finally(()=>{
            setLoading(false)
        })
    }

    const memoValue = React.useMemo(()=>({
        user,
        signIn,
        signUp,
        logout,
        loading,
        error
    }),[user,loading])

  return <AuthContext.Provider value={memoValue}>
    {!initialLoading && children}
  </AuthContext.Provider>
}

export default function useAuth() {
    return React.useContext(AuthContext);
}

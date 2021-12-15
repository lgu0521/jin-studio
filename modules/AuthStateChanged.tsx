import firebase from '../service/FirebaseConfig';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { useAuth } from './AuthProvider';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'

interface LayoutProps {
    children: React.ReactNode;
}

const AuthStateChanged = ({ children }: LayoutProps) => {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const firebaseAuth = getAuth(firebase);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            {children}
        </>
        );
};

export default AuthStateChanged;
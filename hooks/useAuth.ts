import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';


const useAuth = () => {
    const [userId, setUserId] = useState("");
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (token && user._id) {

            setUserId(user._id);
            setIsSuperAdmin(!!user.superAdmin);
            setLoading(false);
        } else {
            setLoading(false);
            router.push('/login');

        }

    }, [router]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return { userId, loading, isSuperAdmin, logout };
}

export default useAuth

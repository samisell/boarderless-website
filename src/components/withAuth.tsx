'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthComponent = (props: P) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            // console.log('withAuth: useEffect running');
            const token = Cookies.get('accessToken');
            // console.log('withAuth: token:', token);
            if (!token) {
                // console.log('withAuth: no token, redirecting to /login');
                router.push('/login');
            } else {
                // console.log('withAuth: token found, setting isAuthenticated to true');
                setIsAuthenticated(true);
            }
        }, [router]);

        if (!isAuthenticated) {
            // console.log('withAuth: not authenticated, showing loading');
            return <div>Loading...</div>; // Or a proper loader
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;
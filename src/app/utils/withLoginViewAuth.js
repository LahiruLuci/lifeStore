/* eslint-disable react/display-name */
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

const withLoginViewAuth = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const userRole = localStorage.getItem('userRole');

            if (!userRole == 1 || allowedRoles.includes(null)) {
                router.replace('/');
            }else{
                router.replace('/logOutView');
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

        return <WrappedComponent {...props} />;
    };
};

export default withLoginViewAuth;
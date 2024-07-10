/* eslint-disable react/display-name */
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

const withAuth = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const userRole = localStorage.getItem('userRole');
            const userId = localStorage.getItem('user_id');

            if (!userRole || !userId || !allowedRoles.includes(parseInt(userRole))) {
                localStorage.setItem('customer_id', "");
                localStorage.setItem('admin_id', "");
                localStorage.setItem('super_admin_id', "");
                localStorage.setItem('user_id', "");
                router.replace('/');
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
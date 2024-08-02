/** @type {import('next').NextConfig} */
const nextConfig = {

    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'kaspersky_db',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': 'Varnitha12345#',
        'MYSQL_PRO_PASSWORD': 'k000oH)YW~OG,1%(y(eZ',
        'NEXT_PUBLIC_URL': 'http://localhost:3000',
        'NEXT_PUBLIC_URL2': 'http://127.0.0.1:3000',
        'X_SECRET': 'Za5awxYpg4Clx6uDsjWEg',

        'NEXT_PUBLIC_URL3': 'http://localhost:3000/routes/userSearch?SLTBBID=',
        'NEXT_PUBLIC_URL4': 'http://localhost:3000/routes/userSearch?EMAIL=',
        'NEXT_PUBLIC_URL5': 'http://localhost:3000/routes/systemUsers?SLTBBID=',
        'NEXT_PUBLIC_URL6': 'http://localhost:3000/routes/systemUsers?EMAIL=',
        'NEXT_PUBLIC_URL7': 'http://localhost:3000/routes/admins',
        'NEXT_PUBLIC_URL8': 'http://localhost:3000/routes/homeProducts',
        'NEXT_PUBLIC_URL9': 'http://localhost:3000/routes/userSubscription',
        'NEXT_PUBLIC_URL10': 'http://localhost:3000/routes/userSubscriptionCount',
        'NEXT_PUBLIC_URL11': 'http://localhost:3000/routes/adminProducts',
        'NEXT_PUBLIC_URL12': 'http://localhost:3000/routes/userSubscription?USER=',
        'NEXT_PUBLIC_URL13': 'http://localhost:3000/routes/userSubscription',
        'NEXT_PUBLIC_URL14': 'http://localhost:3000/routes/allUsers',
        'NEXT_PUBLIC_URL15': 'http://localhost:3000/routes/subscribedUsers',
        'NEXT_PUBLIC_URL16': 'http://localhost:3000/routes/unsubscribedUsers',
        'NEXT_PUBLIC_URL17': 'http://localhost:3000/routes/customerDetails?SLTBBID=',
        'NEXT_PUBLIC_URL18': 'http://localhost:3000/routes/customerDetails',
        'NEXT_PUBLIC_URL19': 'http://localhost:3000/routes/items',
        'NEXT_PUBLIC_URL20': 'http://localhost:3000/routes/products', 
        'NEXT_PUBLIC_URL21': 'http://localhost:3000/routes/customerProducts', 

        'NEXT_PRIVATE_URL1': 'http://124.43.179.40:3000/api/auth/jwt-val?jwt=',
        'NEXT_PRIVATE_URL2': 'http://124.43.179.40:3000/api/auth/jwt-rq',
        'NEXT_PRIVATE_URL3': 'http://124.43.179.40:3000/api/auth/jwt-admin-rq',
        'NEXT_PRIVATE_URL4': 'http://124.43.179.40:3000/api/auth/jwt-val?jwt=',

        'EXPIRY_TIME1': '3600000',
        'EXPIRY_TIME2': '10000',
    },
    images:{
        remotePatterns:[
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '3000',
                pathname: '/img/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '3000',
                pathname: '/productImages/**',
            }
        ],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;

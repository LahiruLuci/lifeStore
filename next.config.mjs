/** @type {import('next').NextConfig} */

const nextConfig = {

    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'lifestore_db',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': '', //k000oH)YW~OG,1%(y(eZ
        'NEXT_PUBLIC_URL': 'http://localhost:3000',
        'NEXT_PUBLIC_URL2': 'http://127.0.0.1:3000',
        'X_SECRET': 'Za5awxYpg4Clx6uDsjWEg',
        'SECRET_CODE': 'dawyydgbi123129%^&98SEvseE',
        'SECRET_CODE2': 'iq8q156286y&*(8lI6%7657GBk',
        'SECRET_CODE3': 'aT4x92@#Lm&(76vYp$53qNkW',
        'SECRET_CODE4' : 'Bf9#Xq8@Lm&(27yVp$61zNkR',
        'SECRET_CODE5' : 'Qw7@Tp9#Lm&(35xYv$82zNkR',

        'PAYHERE_MERCHANT_ID':'1231260',
        'PAYHERE_SECRET':'Mzc5Nzc4NjczNDkxMTgxMTQwNTA5MDIwODkwMjQ1MTkyMDg0NQ==',


        'NEXT_PUBLIC_URL3': '/routes/userSearch?SLTBBID=',
        'NEXT_PUBLIC_URL4': '/routes/userSearch?EMAIL=', 
        'NEXT_PUBLIC_URL5': '/routes/systemUsers?SLTBBID=',
        'NEXT_PUBLIC_URL6': '/routes/systemUsers?EMAIL=',
        'NEXT_PUBLIC_URL7': '/routes/admins',
        'NEXT_PUBLIC_URL8': '/routes/homeProducts',
        'NEXT_PUBLIC_URL9': '/routes/userSubscription',
        'NEXT_PUBLIC_URL10': '/routes/userSubscriptionCount',
        'NEXT_PUBLIC_URL11': '/routes/adminProducts',
        'NEXT_PUBLIC_URL12': '/routes/userSubscription?USER=',
        'NEXT_PUBLIC_URL13': '/routes/userSuspend',
        'NEXT_PUBLIC_URL14': '/routes/allUsers',
        'NEXT_PUBLIC_URL15': '/routes/subscribedUsers',
        'NEXT_PUBLIC_URL16': '/routes/unsubscribedUsers',
        'NEXT_PUBLIC_URL17': '/routes/customerDetails?SLTBBID=',
        'NEXT_PUBLIC_URL18': '/routes/customerDetails',
        'NEXT_PUBLIC_URL19': '/routes/items',
        'NEXT_PUBLIC_URL20': '/routes/products', 
        'NEXT_PUBLIC_URL21': '/routes/customerProducts', 
        'NEXT_PUBLIC_URL22': '/routes/usersDetails?USERID=', 
        'NEXT_PUBLIC_URL23': '/routes/usersDetails', 
        'NEXT_PUBLIC_URL24': '/routes/systemUsers?SLTBBID=',
        'NEXT_PUBLIC_URL25': '&EMAIL=',
        'NEXT_PUBLIC_URL26': '/routes/packageProduct?PRODUCTCODE=',
        'NEXT_PUBLIC_URL27': '/routes/adminsWithoutUnsub',

        'NEXT_PRIVATE_URL1': 'https://api.kaspersky-dp.slt.lk/api/auth/jwt-val?jwt=',
        'NEXT_PRIVATE_URL2': 'https://api.kaspersky-dp.slt.lk/api/auth/jwt-rq',
        'NEXT_PRIVATE_URL3': 'https://api.kaspersky-dp.slt.lk/api/auth/jwt-admin-rq',
        'NEXT_PRIVATE_URL4': 'https://api.kaspersky-dp.slt.lk/api/v1/kss/activate',
        'NEXT_PRIVATE_URL5': 'https://api.kaspersky-dp.slt.lk/api/v1/kss/deactivate',
        'NEXT_PRIVATE_URL6': 'https://api.kaspersky-dp.slt.lk/api/v1/mail/resend-key',
        'NEXT_PRIVATE_URL7': 'https://api.kaspersky-dp.slt.lk/api/v1/kss/suspend',
        'NEXT_PRIVATE_URL8': 'https://api.kaspersky-dp.slt.lk/api/v1/kss/reactivate',
        'NEXT_PRIVATE_URL9': 'https://api.kaspersky-dp.slt.lk/api/v1/kss-lifestore/lifeStore_activate',

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

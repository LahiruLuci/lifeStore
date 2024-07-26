/** @type {import('next').NextConfig} */
const nextConfig = {

    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'kaspersky_db',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': 'Varnitha12345#',
        'NEXT_PUBLIC_URL': 'http://localhost:3000',
        'NEXT_PUBLIC_URL2': 'http://127.0.0.1:3000',
        'NEXT_PUBLIC_URL3': 'http://localhost:3000/routes/userSearch?SLTBBID=',
        'NEXT_PUBLIC_URL4': 'http://localhost:3000/routes/userSearch?EMAIL=',
        'NEXT_PUBLIC_URL5': 'http://localhost:3000/routes/systemUsers?SLTBBID=',
        'NEXT_PUBLIC_URL6': 'http://localhost:3000/routes/systemUsers?EMAIL=',
        'NEXT_PRIVATE_URL1': 'http://124.43.179.40:3000/api/auth/jwt-val?jwt=',
        'NEXT_PRIVATE_URL2': 'http://124.43.179.40:3000/api/auth/jwt-rq',
        'NEXT_PRIVATE_URL3': 'http://124.43.179.40:3000/api/auth/jwt-admin-rq',
        'NEXT_PRIVATE_URL4': 'http://124.43.179.40:3000/api/auth/jwt-val?jwt=',
        'EXPIRY_TIME1': '3,600,000',
        'EXPIRY_TIME2': '10,000',
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
    }

};

export default nextConfig;

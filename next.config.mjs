/** @type {import('next').NextConfig} */
const nextConfig = {

    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'kaspersky_db',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': '',
        'NEXT_PUBLIC_URL': 'http://localhost:3000',
        'NEXT_PUBLIC_URL2': 'http://127.0.0.1:3000',
        'ACCESS_SECRET_CODE': '6f121c75d39661a072a2fba9088056672e3f15dc996c0b3ec8a7a3f7a52544dcba60d2eb58f0e51d8fb5eb88f91a53719213b8cc4d4b122f127f0d50f8968ba95a82c0cbb6464f2d875d21f110b1',
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

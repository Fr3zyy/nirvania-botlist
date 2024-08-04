const getApiUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3001';
    }
    return 'https://botlistapi.nirvania.xyz';
};

const config = {
    api: getApiUrl()
};

export default config;

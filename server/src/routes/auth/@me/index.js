const checkAuthentication = require('@/src/utils/middlewares/checkAuthenication.js');

module.exports = {
    get: [
        checkAuthentication,
        async (request, response) => {
            let user = request.user;
            return response.json(user);
        }
    ]
};
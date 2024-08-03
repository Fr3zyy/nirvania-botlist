const checkAuthentication = require('@/src/utils/middlewares/checkAuthenication');

module.exports = {
  get: [
    checkAuthentication,
    async (request, response) => {
      request.logout(error => {      
        if (error) return response.sendError(error, 500);
        return response.json({ success: true });
      });
    }
  ]
};
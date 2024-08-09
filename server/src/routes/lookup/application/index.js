const passport = require('passport');
const { query, validationResult } = require('express-validator');
const axios = require('axios');

const constructAvatarUrl = (applicationId, iconHash) => {
  if (!iconHash) return null;
  const format = iconHash.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/app-icons/${applicationId}/${iconHash}.${format}?size=1024`;
};

module.exports = {
  get: [
    query('applicationId').isString().notEmpty().withMessage('Application ID is required'),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { applicationId } = req.query;

      try {
        const response = await axios.get(`https://discord.com/api/v10/applications/${applicationId}/rpc`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const rpcData = response.data;

        console.log('Raw RPC Data:', JSON.stringify(rpcData, null, 2));

        const avatarUrl = constructAvatarUrl(applicationId, rpcData.icon);

        const processedData = {
          ...rpcData,
          avatar_url: avatarUrl
        };

        res.json({
          success: true,
          data: processedData
        });
      } catch (error) {
        logger.error('Error fetching Discord RPC data:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({
          success: false,
          error: 'An error occurred while fetching Discord RPC data',
          details: error.response ? error.response.data : error.message,
        });
      }
    }
  ]
};
const { body, validationResult } = require('express-validator');
const checkAuthentication = require('@/src/utils/middlewares/checkAuthenication');
const Bots = require('@/src/models/Bots');

module.exports = {
    post: [
        checkAuthentication,
        body('id').isString().isLength({ min: 17, max: 19 }).withMessage('Invalid bot ID'),
        body('bot.id').isString().isLength({ min: 17, max: 19 }).withMessage('Invalid application ID'),
        body('bot.coOwners').optional().isArray(),
        body('bot.coOwners.*').isString().isLength({ min: 17, max: 19 }).withMessage('Invalid co-owner ID'),
        body('profile.username').isString().trim().isLength({ min: 2, max: 32 }).withMessage('Invalid username'),
        body('profile.avatar').optional().isURL().withMessage('Invalid avatar URL'),
        body('profile.shortDescription').isString().trim().isLength({ max: 200 }).withMessage('Short description too long'),
        body('profile.longDescription').optional().isString().trim().isLength({ max: 2000 }).withMessage('Long description too long'),
        body('profile.prefix').isString().trim().isLength({ max: 10 }).withMessage('Prefix too long'),
        body('profile.tags').isArray().withMessage('Tags must be an array'),
        body('profile.tags.*').isString().trim().isLength({ min: 1, max: 20 }).withMessage('Invalid tag'),
        body('links.invite').isURL().withMessage('Invalid invite URL'),
        body('links.github').optional().isURL().withMessage('Invalid GitHub URL'),
        body('links.website').optional().isURL().withMessage('Invalid website URL'),
        body('links.support').optional().isURL().withMessage('Invalid support server URL'),

        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            try {
                const existingBot = await Bots.findOne({ id: req.body.id });
                if (existingBot) {
                    return res.status(409).json({ error: 'Bot already exists' });
                }

                const newBot = new Bots({
                    ...req.body,
                    bot: {
                        ...req.body.bot,
                        ownerId: req.user.id 
                    },
                    stats: {
                        status: 'unverified',
                        votes: 0,
                        promoted: false
                    }
                });

                await newBot.save();

                logger.info(`New bot added: ${newBot.id} by user ${req.user.id}`);

                res.status(201).json({
                    message: 'Bot successfully added',
                    bot: await newBot.toJSON()
                });

            } catch (error) {
                logger.error('Error adding new bot:', error);
                res.status(500).json({ error: 'An error occurred while adding the bot' });
            }
        }
    ]
};
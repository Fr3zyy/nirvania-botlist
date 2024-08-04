const passport = require('passport');
const { query, validationResult } = require('express-validator');
const Bots = require('@/src/models/Bots');

module.exports = {
  get: [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('sort').optional().isIn(['createdAt', 'stats.votes']),
    query('order').optional().isIn(['asc', 'desc']),
    query('tag').optional().isString(),
    query('search').optional().isString(),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.sendError('Invalid query parameters', 400);
      }

      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        const tag = req.query.tag;
        const search = req.query.search;

        let query = { 'stats.status': 'verified' };
        if (tag) {
          query['profile.tags'] = tag;
        }
        if (search) {
          query.$or = [
            { 'profile.username': { $regex: search, $options: 'i' } },
            { 'profile.shortDescription': { $regex: search, $options: 'i' } }
          ];
        }

        const total = await Bots.countDocuments(query);

        const bots = await Bots.find(query)
          .sort({ [sort]: order })
          .skip((page - 1) * limit)
          .limit(limit)
          .select('-__v -bot.coOwners -links.webhook')
          .lean();

        const response = {
          bots: bots.map(bot => ({
            id: bot.bot.id,
            profile: {
              username: bot.profile.username,
              avatar: bot.profile.avatar,
              shortDescription: bot.profile.shortDescription,
              tags: bot.profile.tags 
            },
            links: {
              invite: bot.links.invite,
              github: bot.links.github,
              website: bot.links.website,
              support: bot.links.support
            },
            stats: {
              votes: bot.stats.votes,
              promoted: bot.stats.promoted
            },
            averageRating: bot.averageRating,
            createdAt: bot.createdAt,
            lastModified: bot.lastModified
          })),
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
          }
        };

        res.json(response);
      } catch (error) {
        logger.error('Error fetching bots:', error);
        res.sendError('An error occurred while fetching bots', 500);
      }
    }
  ]
};
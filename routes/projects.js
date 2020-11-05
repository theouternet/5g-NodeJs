const express = require('express');
const router = express.Router();
const database = require('../lib/database');
const {
  decode
} = require('../lib/jwt');
const SORT_QUERIES = {
  'RECENT_PROJECTS': 'ORDER BY ilance_projects.date_added DESC',
  'CATEGORY_NAME_ASC': 'ORDER BY ilance_categories.category_name ASC',
  'CATEGORY_NAME_DESC': 'ORDER BY ilance_categories.category_name DESC',
  'USERNAME_ASC': 'ORDER BY ilance_users.username ASC',
  'PROJECT_TITLE_ASC': 'ORDER BY ilance_projects.project_title ASC',
};

const PROJECTS_QUERY = 'SELECT * FROM ilance_projects INNER JOIN ilance_users ON ilance_projects.user_id = ilance_users.user_id INNER JOIN ilance_categories ON ilance_projects.cid = ilance_categories.cid';


router.get('/', (req, res, next) => {
    try {
      const token = req.headers.authorization || '';
      const tokenDecoded = decode(token);
      const offset = req.query.offset || 0;
      const limit = req.query.limit || 10;
  
      
  
      const sortQuery = SORT_QUERIES[req.query.sortOption || ''] || '';
  
      database.query('SELECT * FROM ilance_users WHERE user_id = ? LIMIT 1',
        [tokenDecoded.userId],
        (error, results) => {
          if (!error && results && results.length) {
            const user = results[0];
  
            database.query(`${PROJECTS_QUERY} WHERE ilance_projects.user_id = ?`,
            [user.user_id],
            (error, results) => {
              if (!error) {
                let total = results.length;
                let data = [];
  
                if (results.length) {
                  database.query(`${PROJECTS_QUERY} WHERE ilance_projects.user_id = ? ${sortQuery} LIMIT ${limit} OFFSET ${offset}`,
                  [user.user_id],
                  (error, results) => {
                    if (!error) {
                      data = results;
                      res.json({
                        total,
                        data
                      });
                    } else {
                      res.status(500).end();
                    }
                  });
                }
              } else {
                res.status(500).end();
              }
            });
          } else {
            res.status(401).end();
          }
        }
      )
    } catch (error) {
      res.status(401).end();
    }
  });
  
  module.exports = router;
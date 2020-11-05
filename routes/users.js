const md5 = require('md5');
const express = require('express');
const router = express.Router();
const database = require('../lib/database');
const { encode, decode } = require('../lib/jwt');

router.post('/login', (req, res, next) => {
  const username = req.body.username || '';
  const password = req.body.password || '';

  const passwordHash = md5(password);

  database.query('SELECT * FROM ilance_users WHERE username = ? AND password = ? LIMIT 1',
    [username, passwordHash],
    (error, results) => {
      if(!error && results.length) {
        const token = encode({userId: results[0].user_id})
        
        res.json({token});
      } else {
        res.status(404).end();
      }
  });
});

router.get('/user', (req, res, next) => {
    try {
      const token = req.headers.authorization || '';
      const tokenDecoded = decode(token);
  
      database.query('SELECT * FROM ilance_users WHERE user_id = ? LIMIT 1',
        [tokenDecoded.userId],
        (error, results) => {
          if(!error && results && results.length) {
            const user = results[0];
            
            res.json({user});
          } else {
            res.status(401).end();
          }
      });
    } catch(error) {
      res.status(401).end();
    }
  });
  
  module.exports = router;
  
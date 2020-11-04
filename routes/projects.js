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

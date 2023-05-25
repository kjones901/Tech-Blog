const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

//need to add routes here
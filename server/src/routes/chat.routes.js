const express = require('express');
const { sendChatMessage } = require('../controllers/chat.controller');
const { chatRateLimiter } = require('../middleware/rateLimiter.middleware');

const router = express.Router();

router.post('/', chatRateLimiter, sendChatMessage);

module.exports = router;

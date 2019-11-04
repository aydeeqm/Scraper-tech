const express = require('express');

const router = express.Router();

const getResults = require('../scraper');

router.get("/", async function(req, res, next) {
  const result = await getResults();
  res.render("index", result);;
});

module.exports = router;

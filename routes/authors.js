const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * GET authors listing.
 */
router.get('/', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find(filters,);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/1', async (req, res) => {
  try {
    let filters = {};
    filters = {publicados:{$gt:20}, pais:"Colombia"};
    const authors = await Author.find(filters,{_id:0,publicados:0,pais:0,__v:0});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/2', async (req, res) => {
  try {
    let filters = {};
    filters = {apellido:{$exists:true}};
    const authors = await Author.find(filters,{_id:0,apellido:0,publicados:0,pais:0,__v:0});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/3', async (req, res) => {
  try {
    let filters = {};
    filters = { $or:[{publicados:{$gt:20}}, {pais:"Argentina"}]};
    const authors = await Author.find(filters,{_id:0,nombre:0,publicados:0,pais:0,__v:0});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Create a new Author
 */
router.post('/', async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

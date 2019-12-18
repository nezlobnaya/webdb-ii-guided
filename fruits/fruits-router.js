const express = require('express');
const knex = require('knex');

const db = require('../data/dbConfig')

// const db = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: './data/produce.db3'
//   },
//   useNullAsDefault: true
// });

const router = express.Router();

router.get('/', (req, res) => {
  db('fruits')
  .then(fruits => {
    res.json(fruits); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve fruits' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('fruits').where({ id }).first()
  .then(fruit => {
    res.json(fruit);
  }) 
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve fruit' });
  });
});

router.post('/', (req, res) => {
  const fruitData = req.body;
  db('fruits').insert(fruitData)
  .then(ids => {
    db('fruits').where({ id: ids[0] })
    .then(newFruitEntry => {
      res.status(201).json(newFruitEntry);
    });
  })
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

// router.post("/", async (req, res, next) => {
//   try {
//       const payload = {
//           title: req.body.title,
//           contents: req.body.contents,
//       }
//   const [id] = await db('posts').insert(payload)
//   res.json(await db('posts').where('id', id).first())
//   } catch (err) {
//       next(err)
//   }
// })


module.exports = router;
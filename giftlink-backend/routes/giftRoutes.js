const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
        // Task 2: use the collection() method to retrieve the gift collection
        // {{insert code here}}
        // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        // const gifts = {{insert code here}}
        // Task 4: return the gifts using the res.json method
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
       const db = await connectToDatabase();
        const collection = db.collection('gifts');
         const { id } = req.params;
        const gift = await collection.findOne({ id: id });
        if (!gift) return res.status(200).json({ error: 'Gift not found' });

        // Task 2: use the collection() method to retrieve the gift collection
        // {{insert code here}}

        // Task 3: Find a specific gift by ID using the collection.fineOne method and store in constant called gift
        // {{insert code here}}

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});



// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send("No gift data provided");
        }

        const result = await collection.insertOne(req.body);

        const newGift = await collection.findOne({ _id: result.insertedId });

        res.status(201).json(newGift);
    } catch (e) {
        next(e);
    }
});


module.exports = router;

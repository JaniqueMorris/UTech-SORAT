const express = require('express');
const router = express.Router();


// add question route (get)
router.get('/add', (req, res) => {
    const title = 'Add Question';
    res.render('questions/add-question', {
        type: req.body.type,
        title: title  
    }); 
});

// add question route (post)
router.post('/add', (req, res) => {
    res.send('question added');
})

module.exports = router;
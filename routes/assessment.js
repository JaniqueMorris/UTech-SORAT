const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../helpers/auth');

// models
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Result = require('../models/Result');

// individual attributes route (get)
router.get('/individual-attributes', (req, res, next) => {
    Question.find({ section: 'Individual Attributes' })
        .then(question => {
            res.render('assessment/individual-attributes', {
                title: 'Individual Attributes',
                questions: question
            });
        });
});

// // individual attributes route (post)
// router.post('/individual-attributes', (req, res, next) => {
//     Question.find({ section: 'Individual Attributes' })
//         .then(question => {
//             for (let i = 0; i < question.length; i++) {
//                 let questionName = question[i]._id;
//                 const newAnswer = new Answer({
//                     question: question[i]._id,
//                     value: req.body[questionName],
//                     user: req.user._id
//                 });
//                 newAnswer.save()
//                     .catch(err => {
//                         console.log(err);
//                         return;
//                     });
//             }
//         })
//         .then(answer => {
//             res.redirect('/assessment/life-factors');
//         });
// });

// individual attributes route (post)
router.post('/individual-attributes', (req, res, next) => {
    let timeMgmtCount = 0;
    let selfMotiveCount = 0;
    let persistCount = 0;
    let timeMgmtScore = 0;
    let selfMotiveScore = 0;
    let persistScore = 0;
    let highestValue = 5;

    Question.find({ section: 'Individual Attributes' })
        .then(question => {
            for (let i = 0; i < question.length; i++) {
                if(question[i].factor == 'Time Management'){
                    timeMgmtCount = highestValue + timeMgmtCount;
                }
                if(question[i].factor == 'Self-Motivation'){
                    selfMotiveCount = highestValue + selfMotiveCount;
                }
                if(question[i].factor == 'Persistence'){
                    persistCount = highestValue + persistCount;
                }
            }
            console.log(timeMgmtCount);
            console.log(selfMotiveCount);
            console.log(persistCount);

            for (let i = 0; i < question.length; i++) {
                let questionName = question[i]._id;
                if (question[i].factor == 'Time Management') {
                    timeMgmtScore = timeMgmtScore + Number(req.body[questionName]);
                }
                if (question[i].factor == 'Self-Motivation') {
                    selfMotiveScore = selfMotiveScore + Number(req.body[questionName]);
                }
                if (question[i].factor == 'Persistence') {
                    persistScore = persistScore + Number(req.body[questionName]);
                }
            }
            console.log("tm: " + timeMgmtScore);
            console.log("sm: " + selfMotiveScore);
            console.log("p: " + persistScore)

            const tmv = timeMgmtScore / timeMgmtCount * 100;
            console.log(tmv);
            const dmv = selfMotiveScore / selfMotiveCount * 100;
            console.log(dmv);
            const pv = persistScore / persistCount * 100;
            console.log(pv);

            const timeMgmtResult = new Result({
                section: 'Individual Attributes',
                factor: 'Time Management',
                value: tmv,
                user: req.user._id
            });

            const selfMotiveResult = new Result({
                section: 'Individual Attributes',
                factor: 'Self Motivation',
                value: dmv,
                user: req.user._id
            });

            const persistResult = new Result({
                section: 'Individual Attributes',
                factor: 'Persistence',
                value: pv,
                user: req.user._id
            });

            persistResult.save()
                .catch(err => {
                    console.log(err);
                    return;
                });

            selfMotiveResult.save()
                .catch(err => {
                    console.log(err);
                    return;
                });

            timeMgmtResult.save()
                .catch(err => {
                    console.log(err);
                    return;
                });
        })
    .then(() => {
        res.redirect('/assessment/results');
    });
});

// results
router.get('/results', (req, res) => {
    Result.find({ user: req.user._id })
        .then(results => {
            var resultString = JSON.stringify(results);
            var resultJSON = JSON.parse(resultString);
            res.render('assessment/results', {
                title: 'Results',
                results: resultJSON,
                resultString: resultString
            });
        });
});

// personal infomation route 
router.get('/', ensureAuthenticated, (req, res, next) => {
    res.render('assessment/assessment', {
        title: 'Assessment'
    });
});

// personal infomation route
router.get('/personal-information', ensureAuthenticated, (req, res, next) => {
    res.render('assessment/personal-information', {
        title: 'Personal Information'
    });
});

// life factors route
router.get('/life-factors', ensureAuthenticated, (req, res, next) => {
    res.render('assessment/life-factors', {
        title: 'Life Factors'
    });
});


// reading route
router.get('/reading', ensureAuthenticated, (req, res, next) => {
    res.render('assessment/reading', {
        title: 'Reading'
    });
});

// technical competency route
router.get('/technical-competency', ensureAuthenticated, (req, res, next) => {
    res.render('assessment/technical-competency', {
        title: 'Technical Competency'
    });
});

// technical knowledge route
router.get('/technical-knowledge', ensureAuthenticated, (req, res, next) => {
    res.render('assessment/technical-knowledge', {
        title: 'Technical Knowledge'
    });
});

// typing route
router.get('/typing', ensureAuthenticated, (req, res, next) => {
    res.render('assessment/typing', {
        title: 'Typing'
    });
});

// typing route
router.get('/complete', ensureAuthenticated, (req, res, next) => {
    res.render('assessment/complete', {
        title: 'Complete'
    });
});

module.exports = router;
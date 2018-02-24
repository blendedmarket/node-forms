
//standard routes file for stuff
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const uuid = require('uuid/v4') //n8 uuid added

var sessionID;
// const ua = require('universal-analytics');
// const visitor = ua('UA-114500412-1');
router.get('/', (req, res) => {
  res.render('index', {
  })

  // visitor.pageview("/", "http://e-sql.com", "Home Page").send();
});

router.get('/mypage', (req, res) => {
  if (!sessionID){
    sessionID = uuid();
  }
  res.render('mypage', {
    formIDCustom: '100',
    tomisID: sessionID
  })

  // visitor.pageview("/", "http://e-sql.com", "Home Page").send();
});

router.get('/thanks', (req, res) => {
  res.render('thanks', {
    formIDCustom: "thanks",
    sessionID: sessionID

  })
  // visitor.pageview("/", "http://e-sql.com", "Home Page").send();
});

router.get('/contact', (req, res) => {
  sessionID = uuid();
  // visitor.pageview("/contact", "http://e-sql.com/contact", "Contact Form").send();
  res.render('contact', {
    data: {},
    errors: {},
    csrfToken: req.csrfToken(),
    uuid: req.uuid, //n8 uuid added
    formIDCustom: "contact",
    sessionID: sessionID
  })
})

router.post('/contact', [
  check('message')
    .isLength({ min: 1 })
    .withMessage('Please type something in the message box...')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Are you sure that is an email...?')
    .trim()
    .normalizeEmail()
  ], (req, res) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
      // console.log("Errors is empty : ", errors.isEmpty())
      // visitor.event("Event Category", "Event Action").send()
    }
    if (!errors.isEmpty()) {
      return res.render('contact', {
        data: req.body,
        errors: errors.mapped(),
        csrfToken: req.csrfToken(),
        uuid: req.uuid, //n8 uuid added
        formIDCustom: "contact_fail",
        sessionID: sessionID
      })
    }

    const data = matchedData(req)
    console.log('Cleaned up data: ', data)
    // console.log('req: ', req)

    req.flash('success', 'Submit is many successes! :)')
    res.redirect('/thanks')
  })

module.exports = router

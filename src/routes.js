
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const uuid = require('uuid/v4') //n8 uuid added

var sessionID;
// const ua = require('universal-analytics');
// const visitor = ua('UA-114500412-1');
router.get('/', (req, res) => {
  sessionID = uuid();
  res.render('index', {
  })

  // visitor.pageview("/", "http://e-sql.com", "Home Page").send();
});

router.get('/thanks', (req, res) => {
  res.render('thanks', {
    formID: sessionID,
  })
  // visitor.pageview("/", "http://e-sql.com", "Home Page").send();
});

router.get('/contact', (req, res) => {
  // visitor.pageview("/contact", "http://e-sql.com/contact", "Contact Form").send();
  res.render('contact', {
    data: {},
    errors: {},
    csrfToken: req.csrfToken(),
    uuid: sessionID, //n8 uuid added
    formID: "contact"
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
        formID: "contact1"
      })
    }

    const data = matchedData(req)
    console.log('Cleaned up data: ', data)
    // console.log('req: ', req)

    req.flash('success', 'Submit is many successes! :)')
    res.redirect('/thanks')
  })

module.exports = router

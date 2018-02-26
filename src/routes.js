
//standard routes file for stuff
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const uuid = require('uuid/v4') //n8 uuid added

var sessionID = 'none';
const ua = require('universal-analytics');
const visitor = ua('UA-114500412-1');
router.get('/', (req, res) => {
  res.render('index', {
    formIDCustom: 'index',
    sessionID: sessionID
  })

  // visitor.pageview("/", "http://e-sql.com", "Home Page").send();
});

router.get('/mypage', (req, res) => {
  if (!sessionID){
    sessionID = uuid();
  }
  res.render('mypage', {
    formIDCustom: '100',
    sessionID: sessionID
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
    formIDCustom: '100',
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
    }
    if (!errors.isEmpty()) {
      visitor.event("Event Category", "validationFailEvent").send()
      return res.render('contact', {
        data: req.body,
        errors: errors.mapped(),
        csrfToken: req.csrfToken(),
        uuid: req.uuid, //n8 uuid added
        formIDCustom: '100',
        sessionID: sessionID
      })
    }

    const data = matchedData(req)
    console.log('Cleaned up data: ', data)
    // console.log('req: ', req)

    req.flash('success', 'Submit is many successes! :)')
    res.redirect('/thanks')
  })


      router.get('/form1', (req, res) => {
        sessionID = uuid();
        // visitor.pageview("/contact", "http://e-sql.com/contact", "Contact Form").send();
        res.render('form1', {
          data: {},
          errors: {},
          csrfToken: req.csrfToken(),
          uuid: req.uuid, //n8 uuid added
          formIDCustom: '100',
          sessionID: sessionID
        })
      })

      router.post('/form1', [
        check('name')
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
          }
          if (!errors.isEmpty()) {
            visitor.event("Event Category", "validationFailEvent").send()
            return res.render('form1', {
              data: req.body,
              errors: errors.mapped(),
              csrfToken: req.csrfToken(),
              uuid: req.uuid, //n8 uuid added
              formIDCustom: '100',
              sessionID: sessionID
            })
          }

          const data = matchedData(req)
          console.log('Cleaned up data for form 1: ', data)
          // console.log('req: ', req)

          req.flash('success', 'Submit is many successes from form 1! :)')
          res.redirect('/thanks')
        })


              router.get('/form2', (req, res) => {
                sessionID = uuid();
                // visitor.pageview("/contact", "http://e-sql.com/contact", "Contact Form").send();
                res.render('form2', {
                  data: {},
                  errors: {},
                  csrfToken: req.csrfToken(),
                  uuid: req.uuid, //n8 uuid added
                  formIDCustom: '200',
                  sessionID: sessionID
                })
              })

              router.post('/form2', [
                check('name')
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
                  }
                  if (!errors.isEmpty()) {
                    visitor.event("Event Category", "validationFailEvent").send()
                    return res.render('form2', {
                      data: req.body,
                      errors: errors.mapped(),
                      csrfToken: req.csrfToken(),
                      uuid: req.uuid, //n8 uuid added
                      formIDCustom: '200',
                      sessionID: sessionID
                    })
                  }

                  const data = matchedData(req)
                  console.log('Cleaned up data form 2: ', data)
                  // console.log('req: ', req)

                  req.flash('success', 'Submit is many successes with form 2! :)')
                  res.redirect('/thanks')
                })

module.exports = router

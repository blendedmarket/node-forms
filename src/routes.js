
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const uuid = require('uuid/v4') //n8 uuid added

router.get('/', (req, res) => {
  res.render('index')
})

// router.get('/contact', (req, res) => {
//   res.render('contact')
// })

router.get('/contact', (req, res) => {
  res.render('contact', {
    data: {},
    errors: {},
    csrfToken: req.csrfToken(),
    uuid: uuid() //n8 uuid added
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
    if (!errors.isEmpty()) {
      return res.render('contact', {
        data: req.body,
        errors: errors.mapped(),
        csrfToken: req.csrfToken(),
        uuid: req.uuid //n8 uuid added
      })
    }

    const data = matchedData(req)
    console.log('Sanitized: ', data)
    // console.log('res: ', res) //n8 uuid added
    console.log('req: ', req)

    req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
    res.redirect('/')
  })

module.exports = router


'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./v2-react-oauth2.cjs.production.min.js')
} else {
  module.exports = require('./v2-react-oauth2.cjs.development.js')
}

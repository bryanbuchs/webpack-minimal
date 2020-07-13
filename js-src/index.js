import key from 'keymaster'

import settings from './more_code/'

key('shift+/', function () {
  window.alert(settings.alertText)
})

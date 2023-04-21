import key from 'keymaster'

console.log('first bundle')

key('esc', () => {
  console.log('key:ESC')
})

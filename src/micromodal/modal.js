import './modal.less'
import MicroModal from 'micromodal'
import { hideOthers } from 'aria-hidden'
import * as focusTrap from 'focus-trap' // ESM

const modals = Array.from(document.querySelectorAll('.modal-dialog'))

modals.forEach(dialog => {
  let undo = null
  // let trap = focusTrap.createFocusTrap(dialog, {
  //   onActivate: () => console.log('onActivate'),
  //   onDeactivate: () => console.log('onDeactivate'),
  //   escapeDeactivates: false,
  //   allowOutsideClick: false,
  //   returnFocusOnDeactivate: false
  // })

  const options = {
    // awaitOpenAnimation: true,
    // awaitCloseAnimation: true,
    onShow: modal => {
      undo = hideOthers(dialog)
      // trap.activate()
    },
    onClose: modal => {
      undo()
      // trap.deactivate()
    }
  }

  MicroModal.init(options)
})

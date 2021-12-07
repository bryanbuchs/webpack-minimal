import './modal.less'
import MicroModal from 'micromodal'
import { hideOthers } from 'aria-hidden'

let restore = null

const options = {
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
  disableFocus: true, // manually managed
  onShow: modal => {
    restore = hideOthers(modal)
    modal.querySelector('div[role="dialog"]').focus()
  },
  onClose: modal => {
    restore()
    document
      .querySelector(`button[data-micromodal-trigger="${modal.id}"]`)
      .focus()
  }
}

MicroModal.init(options)

/**
 * Paragraph/Cards
 * A group of cards
 */

import { gsap } from 'gsap'

Drupal.behaviors.ParagraphCards = {
  attach: function (context) {
    const elements = once('ParagraphCards', '.paragraph-cards', context)
    elements.forEach((paragraph) => {
      gsap.set(paragraph, { height: 0, autoAlpha: 0 })
    })
  }
}

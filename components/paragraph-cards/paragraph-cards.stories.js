/**
 * Paragraph/Cards
 * A group of cards
 */

import DrupalAttribute from 'drupal-attribute'

import Template from './paragraph-cards.twig'
import './paragraph-cards.library.js'

export default {
  title: 'Paragraph/Cards'
}

export const ParagraphCards = {
  name: 'Cards',
  render: Template,
  args: {
    heading: 'HEADING',
    rows: 'ROWS',
    attributes: new DrupalAttribute()
  }
}

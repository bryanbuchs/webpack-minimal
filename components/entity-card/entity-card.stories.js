/**
 * Entity/Card
 * A basic card
 */

import DrupalAttribute from 'drupal-attribute'

import Template from './entity-card.twig'
import './entity-card.library.js'

export default {
  title: 'Entity/Card'
}

export const EntityCard = {
  name: 'Card',
  render: Template,
  args: {
    image: 'IMAGE',
    heading: 'HEADING',
    link: 'LINK',
    text: 'TEXT',
    attributes: new DrupalAttribute()
  }
}

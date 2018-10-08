import React, { Component } from 'react'

import BaseModal from '~base/components/base-modal'
import MechanismForm from './form'

class CreateMechanism extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <BaseModal
        title='Crear mecanismo'
        className={this.props.className}
        hideModal={() => this.props.hideModal()}
      >
        <MechanismForm
          baseUrl='/admin/mechanisms'
          url={this.props.url}
          finishUp={(data) => this.props.finishUp(data)}
          label='Crear'
        />
      </BaseModal>
    )
  }
}

export default CreateMechanism

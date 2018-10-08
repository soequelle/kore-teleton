import React, { Component } from 'react'

import api from '~base/api'
import BaseModal from '~base/components/base-modal'
import HistoricForm from './form'

class CreateHistoric extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      mechanismsCat: ''
    }
  }

  componentWillMount () {
    this.load()
  }

  async load () {
    try {
      const body = await api.get('/admin/mechanisms', {})

      this.setState({
        loading: false,
        mechanismsCat: body.data.map(item => {
          return { label: item.name, value: item.uuid }
        })

      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const {loading, mechanismsCat} = this.state
    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <BaseModal
        title='Create Historic'
        className={this.props.className}
        hideModal={() => this.props.hideModal()}
      >
        <HistoricForm
          baseUrl='/admin/historics'
          url={this.props.url}
          finishUp={(data) => this.props.finishUp(data)}
          label='Create'
          mechanismsCat={mechanismsCat}
        />
      </BaseModal>
    )
  }
}

export default CreateHistoric

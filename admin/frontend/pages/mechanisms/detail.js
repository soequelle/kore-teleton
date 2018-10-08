import React from 'react'
import api from '~base/api'

import PageComponent from '~base/page-component'
import {loggedIn} from '~base/middlewares/'
import MechanismForm from './form'
import ConfirmButton from '~base/components/confirm-button'

class MechanismDetail extends PageComponent {
  constructor (props) {
    super(props)

    this.state = {
      ...this.baseState,
      mechanism: {}
    }
  }

  async onPageEnter () {
    const mechanism = await this.load()

    return {
      mechanism
    }
  }

  async load () {
    var url = '/admin/mechanisms/' + this.props.match.params.uuid
    const body = await api.get(url)

    return body.data
  }

  async deleteOnClick () {
    var url = '/admin/mechanisms/' + this.props.match.params.uuid
    const res = await api.del(url)

    return res.data
  }

  deleteSuccessHandler () {
    this.props.history.push('/admin/mechanisms')
  }

  render () {
    const basicStates = super.getBasicStates()
    if (basicStates) { return basicStates }

    const { mechanism } = this.state

    return (<div className='columns c-flex-1 is-marginless'>
      <div className='column is-paddingless'>
        <div className='section'>
          <div className='columns'>
            {this.getBreadcrumbs()}
            <div className='column has-text-right'>
              <div className='field is-grouped is-grouped-right'>
                <div className='control'>
                  <ConfirmButton
                    title='Delete Mechanism'
                    className='button is-danger'
                    classNameButton='button is-danger'
                    onConfirm={() => this.deleteOnClick()}
                    onSuccess={() => this.deleteSuccessHandler()}
                  >
                    Delete
                  </ConfirmButton>
                </div>
              </div>
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              <div className='card'>
                <header className='card-header'>
                  <p className='card-header-title'>
                    Mechanism
                  </p>
                </header>
                <div className='card-content'>
                  <div className='columns'>
                    <div className='column'>
                      <MechanismForm
                        url={'/admin/mechanisms/' + this.props.match.params.uuid}
                        formData={mechanism}
                        load={() => this.reload()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

MechanismDetail.config({
  name: 'mechanism-details',
  path: '/mechanisms/:uuid',
  title: '<%= mechanism.name %> | Mechanism details',
  breadcrumbs: [
    {label: 'Dashboard', path: '/'},
    {label: 'Mechanisms', path: '/mechanisms'},
    {label: '<%= mechanism.name %>'}
  ],
  exact: true,
  validate: loggedIn
})

export default MechanismDetail

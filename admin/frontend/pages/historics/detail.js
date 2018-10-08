import React from 'react'
import api from '~base/api'

import PageComponent from '~base/page-component'
import {loggedIn} from '~base/middlewares/'
import HistoricForm from './form'
import ConfirmButton from '~base/components/confirm-button'

class HistoricDetail extends PageComponent {
  constructor (props) {
    super(props)

    this.state = {
      ...this.baseState,
      historic: {}
    }
  }

  async onPageEnter () {
    const historic = await this.load()

    return {
      historic
    }
  }

  async load () {
    var url = '/admin/historics/' + this.props.match.params.uuid
    const body = await api.get(url)

    return body.data
  }

  async deleteOnClick () {
    var url = '/admin/historics/' + this.props.match.params.uuid
    const res = await api.del(url)

    return res.data
  }

  deleteSuccessHandler () {
    this.props.history.push('/admin/historics')
  }

  render () {
    const basicStates = super.getBasicStates()
    if (basicStates) { return basicStates }

    const { historic } = this.state

    return (<div className='columns c-flex-1 is-marginless'>
      <div className='column is-paddingless'>
        <div className='section'>
          <div className='columns'>
            {this.getBreadcrumbs()}
            <div className='column has-text-right'>
              <div className='field is-grouped is-grouped-right'>
                <div className='control'>
                  <ConfirmButton
                    title='Delete Historic'
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
                    Historic
                  </p>
                </header>
                <div className='card-content'>
                  <div className='columns'>
                    <div className='column'>
                      <HistoricForm
                        url={'/admin/historics/' + this.props.match.params.uuid}
                        formData={historic}
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

HistoricDetail.config({
  name: 'historic-details',
  path: '/historics/:uuid',
  title: '<%= historic.name %> | Historic details',
  breadcrumbs: [
    {label: 'Dashboard', path: '/'},
    {label: 'Historics', path: '/historics'},
    {label: '<%= historic.name %>'}
  ],
  exact: true,
  validate: loggedIn
})

export default HistoricDetail

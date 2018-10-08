import React, {Component} from 'react'

import env from '~base/env-variables'
import api from '~base/api'
import ListPageComponent from '~base/list-page-component'
import {loggedIn} from '~base/middlewares/'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: false,
      currentCustomersHappiness: ''
    }
  }

  async restoreMultiple () {
    const { selectedRows } = this.props

    for (const row of selectedRows) {
      const url = `/admin/historics/${row.uuid}/restore`
      await api.post(url)
    }

    this.props.reload()
  }

  render () {
    const { selectedRows } = this.props

    return <header className='card-header'>
      <p className='card-header-title'>
        Restore historics
      </p>
      <div className='card-header-select'>
        <button
          className='button is-primary'
          onClick={() => this.restoreMultiple()}
          disabled={selectedRows.length === 0}
        >
          Restore multiple historics
        </button>
      </div>
    </header>
  }
}

class HistoricsDeletedList extends ListPageComponent {
  async restoreOnClick (uuid) {
    const url = `/admin/historics/${uuid}/restore`
    await api.post(url)
    this.props.history.push(env.PREFIX + '/historics/' + uuid)
  }

  getFilters () {
    const data = {
      schema: {
        type: 'object',
        required: [],
        properties: {
          name: {type: 'text', title: 'Name'},
          mechanism: {type: 'text', title: 'Mechanism'},
          registers: {type: 'text', title: 'Registers'}
        }
      },
      uiSchema: {
        name: {'ui:widget': 'SearchFilter'},
        mechanism: {'ui:widget': 'SearchFilter'},
        registers: {'ui:widget': 'SearchFilter'}
      }
    }

    return data
  }

  getColumns () {
    return [
      {
        title: 'Name',
        property: 'name',
        default: 'N/A'
      },
      {
        title: 'Mechanism',
        property: 'mechanism',
        default: 'N/A'
      },
      {
        title: 'Registers',
        property: 'registers',
        default: 'N/A'
      },
      {
        'title': 'Actions',
        formatter: (row) => {
          return (
            <button className='button' onClick={e => { this.restoreOnClick(row.uuid) }}>
              Restore
            </button>
          )
        }
      }
    ]
  }
}

HistoricsDeletedList.config({
  // Basic values
  name: 'historic-deleted-list',
  path: '/historics/deleted',
  title: 'Deactivated historics',
  icon: 'clipboard',
  exact: true,
  validate: loggedIn,

  // Selectable and custom header
  selectable: true,
  headerLayout: 'custom',
  headerComponent: Header,

  // default filters
  defaultFilters: {
    isDeleted: true
  },

  // Api url to fetch from
  apiUrl: '/admin/historics'
})

export default HistoricsDeletedList

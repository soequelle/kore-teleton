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
      const url = `/admin/mechanisms/${row.uuid}/restore`
      await api.post(url)
    }

    this.props.reload()
  }

  render () {
    const { selectedRows } = this.props

    return <header className='card-header'>
      <p className='card-header-title'>
        Restore mechanisms
      </p>
      <div className='card-header-select'>
        <button
          className='button is-primary'
          onClick={() => this.restoreMultiple()}
          disabled={selectedRows.length === 0}
        >
          Restore multiple mechanisms
        </button>
      </div>
    </header>
  }
}

class MechanismsDeletedList extends ListPageComponent {
  async restoreOnClick (uuid) {
    const url = `/admin/mechanisms/${uuid}/restore`
    await api.post(url)
    this.props.history.push(env.PREFIX + '/mechanisms/' + uuid)
  }

  getFilters () {
    const data = {
      schema: {
        type: 'object',
        required: [],
        properties: {
          name: {type: 'text', title: 'Name'},
          description: {type: 'text', title: 'Description'},
          createdat: {type: 'text', title: 'Createdat'}
        }
      },
      uiSchema: {
        name: {'ui:widget': 'SearchFilter'},
        description: {'ui:widget': 'SearchFilter'},
        createdat: {'ui:widget': 'SearchFilter'}
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
        title: 'Description',
        property: 'description',
        default: 'N/A'
      },
      {
        title: 'Createdat',
        property: 'createdat',
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

MechanismsDeletedList.config({
  // Basic values
  name: 'mechanism-deleted-list',
  path: '/mechanisms/deleted',
  title: 'Deactivated mechanisms',
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
  apiUrl: '/admin/mechanisms'
})

export default MechanismsDeletedList

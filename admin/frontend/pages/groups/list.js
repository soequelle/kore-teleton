import React from 'react'
import Link from '~base/router/link'
import moment from 'moment'

import env from '~base/env-variables'
import ListPageComponent from '~base/list-page-component'
import {loggedIn} from '~base/middlewares/'
import CreateGroup from './create'

class GroupsList extends ListPageComponent {
  finishUp (data) {
    this.props.history.push(env.PREFIX + '/manage/groups/' + data.uuid)
  }

  getColumns () {
    return [
      {
        'title': 'Nombre',
        'property': 'name',
        'default': 'N/A',
        'sortable': true,
        formatter: (row) => {
          return (
            <Link to={'/manage/groups/' + row.uuid}>
              {row.name}
            </Link>
          )
        }
      },
      {
        'title': 'Creación',
        'property': 'dateCreated',
        'default': 'N/A',
        'sortable': true,
        formatter: (row) => {
          return (
            moment.utc(row.dateCreated).local().format('DD/MM/YYYY hh:mm a')
          )
        }
      },
      {
        'title': 'Acciones',
        'sortable': false,
        formatter: (row) => {
          return <Link className='button' to={'/manage/groups/' + row.uuid}>
            Detalle
          </Link>
        }
      }
    ]
  }

  getFilters () {
    const data = {
      schema: {
        type: 'object',
        required: [],
        properties: {
          name: {type: 'text', title: 'Por nombre'}
        }
      },
      uiSchema: {
        name: {'ui:widget': 'SearchFilter'}
      }
    }

    return data
  }

  exportFormatter (row) {
    return {name: row.name}
  }
}

GroupsList.config({
  name: 'groups-list',
  path: '/manage/groups',
  title: 'Grupos',
  icon: 'users',
  exact: true,
  validate: loggedIn,

  headerLayout: 'create',
  createComponent: CreateGroup,
  createComponentLabel: 'Nuevo Group',

  apiUrl: '/admin/groups'
})

export default GroupsList

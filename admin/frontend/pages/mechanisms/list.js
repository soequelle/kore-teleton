import React from 'react'
import Link from '~base/router/link'
import moment from 'moment'

import env from '~base/env-variables'
import ListPageComponent from '~base/list-page-component'
import {loggedIn} from '~base/middlewares/'
import CreateMechanism from './create'

class MechanismList extends ListPageComponent {
  finishUp (data) {
    this.setState({
      className: ''
    })

    this.props.history.push(env.PREFIX + '/mechanisms/' + data.uuid)
  }

  getColumns () {
    return [
      {
        title: 'Nombre',
        property: 'name',
        default: 'N/A'
      },
      {
        'title': 'Fecha de creación',
        'property': 'createdAt',
        'default': 'N/A',
        'sortable': true,
        formatter: (row) => {
          return (
            moment.utc(row.createdAt).local().format('DD/MM/YYYY hh:mm a')
          )
        }
      },
      {
        'title': 'Acciones',
        'sortable': false,
        formatter: (row) => {
          return <Link className='button' to={'/mechanisms/' + row.uuid}>
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

  exportFormatter (row) {
    return {name: row.name,
      description: row.description,
      createdat: row.createdat
    }
  }
}

MechanismList.config({
  name: 'mechanisms-list',
  path: '/mechanisms',
  title: 'Mechanismos de donación',
  icon: 'clipboard',
  exact: true,
  validate: loggedIn,

  headerLayout: 'create',
  createComponent: CreateMechanism,
  createComponentLabel: 'Nuevo',

  apiUrl: '/admin/mechanisms'
})

export default MechanismList

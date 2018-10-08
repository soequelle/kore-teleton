import React from 'react'
import Link from '~base/router/link'
import moment from 'moment'

import env from '~base/env-variables'
import ListPageComponent from '~base/list-page-component'
import {loggedIn} from '~base/middlewares/'
import CreateHistoric from './create'
import numeral from 'numeral'

class HistoricList extends ListPageComponent {
  finishUp (data) {
    this.setState({
      className: ''
    })

    this.props.history.push(env.PREFIX + '/historics/' + data.uuid)
  }

  getColumns () {
    return [
      {
        title: 'Nombre archivo',
        property: 'name',
        default: 'N/A'
      },
      {
        title: 'Mecanismo de donación',
        property: 'mechanism',
        default: 'N/A',
        formatter: (row) => {
          return row.mechanism.name
        }
      },
      {
        title: 'Registros en archivo',
        property: 'registers',
        default: 'N/A'
      },
      {
        title: 'Total Donadores',
        property: 'donors',
        default: 'N/A',
        formatter: (row) => {
          return numeral(row.donors).format('0,0')
        }
      },
      {
        title: 'Monto recaudado',
        property: 'totalAMount',
        default: 'N/A',
        formatter: (row) => {
          return numeral(row.totalAmount).format('$0,0.00')
        }
      },
      {
        'title': 'Fecha creación',
        'property': 'createdAt',
        'default': 'N/A',
        'sortable': true,
        formatter: (row) => {
          return (
            moment.utc(row.createdAt).local().format('DD/MM/YYYY hh:mm a')
          )
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

  exportFormatter (row) {
    return {name: row.name,
      mechanism: row.mechanism,
      registers: row.registers
    }
  }
}

HistoricList.config({
  name: 'historics-list',
  path: '/historics',
  title: 'Archivos',
  icon: 'clipboard',
  exact: true,
  validate: loggedIn,

  headerLayout: 'create',
  createComponent: CreateHistoric,
  createComponentLabel: 'Importar archivo',

  apiUrl: '/admin/historics'
})

export default HistoricList

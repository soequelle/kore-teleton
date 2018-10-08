import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import ErrorPage from '~base/components/error-page'
import AdminLayout from '~components/admin-layout'

import LogIn from './pages/log-in'
import Dashboard from './pages/dashboard'
import ResetPassword from './pages/reset-password'
import EmailResetLanding from './pages/emails/reset'
import Users from './pages/users/list'
import UserDetail from './pages/users/detail'
import DeletedUsers from './pages/users/list-deleted'
import UsersImport from './pages/users/import'
import Profile from './pages/profile'
import Organizations from './pages/organizations/list'
import OrganizationDetail from './pages/organizations/detail'
import Roles from './pages/roles/list'
import RoleDetail from './pages/roles/detail'
import Groups from './pages/groups/list'
import GroupDetail from './pages/groups/detail'
import RequestLogs from './pages/developer-tools/request-logs'
import AppConfig from './pages/developer-tools/app-config'
import Buttons from './pages/ui-components/buttons'
import FormBuilder from './pages/developer-tools/form-builder'
import Mechanisms from './pages/mechanisms/list'
import DeletedMechanisms from './pages/mechanisms/deleted-list'
import MechanismDetail from './pages/mechanisms/detail'
import Historics from './pages/historics/list'
import DeletedHistorics from './pages/historics/deleted-list'
import HistoricDetail from './pages/historics/detail'
// #Import

class NotFoundPage extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return <ErrorPage message='Not found' />
  }
}

const AppRouter = () => {
  return (<Router>
    <AdminLayout>
      <div className='c-flex-1 is-flex is-flex-column is-relative'>
        <Switch>
          {LogIn.asRouterItem()}
          {ResetPassword.asRouterItem()}
          {EmailResetLanding.asRouterItem()}
          {Dashboard.asRouterItem()}
          {Profile.asRouterItem()}

          {Users.asRouterItem()}
          {DeletedUsers.asRouterItem()}
          {UserDetail.asRouterItem()}
          {UsersImport.asRouterItem()}

          {Organizations.asRouterItem()}
          {OrganizationDetail.asRouterItem()}

          {Roles.asRouterItem()}
          {RoleDetail.asRouterItem()}

          {Groups.asRouterItem()}
          {GroupDetail.asRouterItem()}

          {RequestLogs.asRouterItem()}
          {AppConfig.asRouterItem()}
          {Buttons.asRouterItem()}
          {FormBuilder.asRouterItem()}

          {Mechanisms.asRouterItem()}
          {DeletedMechanisms.asRouterItem()}
          {MechanismDetail.asRouterItem()}
          {Historics.asRouterItem()}
          {DeletedHistorics.asRouterItem()}
          {HistoricDetail.asRouterItem()}
          {/* Add routes here */}

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </AdminLayout>
  </Router>)
}

export default AppRouter

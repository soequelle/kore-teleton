import React from 'react'
import PageComponent from '~base/page-component'
import api from '~base/api'
import numeral from 'numeral'

class Home extends PageComponent {
  constructor (props) {
    super(props)
    this.state = {
      // ...this.baseState,
      loading: true,
      mechanisms: ''
    }
  }

  componentWillMount () {
    this.load()
    setInterval(() => { this.load() }, 5000)
  }

  async load () {
    try {
      const body = await api.get('/app/home', {})

      this.setState({
        loading: false,
        mechanisms: body.mechanisms
      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const {mechanisms, loading} = this.state
    if (loading) {
      return (<div>Loading...</div>)
    }

    return (

      <div className='wrapper'>
        <div className='headertop'>
          <div className='columns'>
            <div className='column has-text-centered'>
              <img src='/app/public/img/TOP-TELETON.png' style={{height: 'auto'}} />
            </div>
          </div>
        </div>
        <div className='columns'>
          {mechanisms.map(item => {
            let logo = item.slug + '.png'
            return (
              <div className='column  has-text-centered'>
                <img src={'/app/public/img/' + logo} style={{height: '150px'}} />
              </div>
            )
          }
          )}
        </div>

        <div className='cenefa has-text-centered'>
          <br />
          <p className='title is-4 is-uppercase has-text-weight-bold'>CUANDO PREFIERES UNA MARCA QUE APOYA A TELETÓN, TUS DONATIVOS SUMAN</p>
        </div>
        <br />
        <div className='columns'>
          {mechanisms.map(item => {
            let averageByChild = 39869
            let childs = item.totalAmount / averageByChild
            let totalDoll = Math.round(childs / 50)
            let dolls = []
            let heart = item.slug + 'Heart.png'
            for (let i = 0; i <= totalDoll; i++) {
              dolls.push(<img className='' src={'/app/public/img/NIN2.png'} style={{height: '32px'}} />)
            }
            return (
              <div className='column datos'>
                <br />
                <br />
                <div className='has-text-centered'>
                  <img src={'/app/public/img/' + heart} style={{height: '150px'}} />
                </div>
                <br />
                <p className='subtitle is-4 has-text-weight-bold'><span style={{color: '#FFFFFF'}}>¿Cuántas personas</span><br /><span style={{color: '#FFFFFF'}}>han </span><span style={{color: '#E92F6E'}}>donado</span><span style={{color: '#FFFFFF'}}>?</span></p>
                <br />
                <br />
                <div>
                  <img className='' src={'/app/public/img/me.png'} style={{height: '128px'}} />
                  <p className='title is-4 has-text-white is-pulled-right'>{numeral(item.donors).format('0,0')}</p>
                </div>
                <br />
                <br />
                <div className='columns'>
                  <div className='column has-text-centered'>
                    <br />
                    <p className='title is-4 is-uppercase has-text-weight-bold'><span style={{color: '#FFFFFF'}}>Monto</span> <span style={{color: '#38BCBF'}}>Recaudado</span></p>
                  </div>
                </div>
                <br />
                <br />
                <div>
                  <img className='' src={'/app/public/img/monto.png'} style={{height: '96px'}} />
                  <p className='title is-5 has-text-white is-pulled-right'>{numeral(item.totalAmount).format('$0,0.00')}</p>
                </div>
                <br />
                <br />
                <div className='columns'>
                  <div className='column has-text-centered'>
                    <br />
                    <p className='title is-4 is-lowercase has-text-weight-bold'> <span style={{color: '#38BCBF'}}>#de</span><span style={{color: '#E92F6E'}}>niños</span> <span style={{color: '#FFFFFF'}}>benficiados</span> </p>
                  </div>
                </div>
                <br />
                <br />
                <div className='columns'>
                  <div className='column has-text-centered'>
                    <br />
                    <p className='title is-1 has-text-weight-bold'> <span style={{color: '#FFFFFF'}}>{numeral(childs).format('0,0')}</span> </p>
                  </div>
                </div>
                <div className='columns'>
                  <div className='column has-text-centered'>

                    {totalDoll > 0 && dolls.map(item => {
                      return item
                    }
                      )}
                  </div>
                </div>
              </div>
            )
          }
          )}

        </div>
        <br />
        <br />
        <div className='headerhome'>
          <div className='columns'>
            <div className='column is-one-fifth'>
              <img src='/app/public/img/Logo-Teleton.png' style={{height: '150px'}} />
            </div>
            <div className='column is-two-fifth'>
              <img src='/app/public/img/atendidos.png' style={{height: '150px'}} />
            </div>
            <div className='column is-two-fifth'>
              <img src='/app/public/img/Teleton-realtime.png' style={{height: '150px'}} />
            </div>
          </div>
        </div>
        <div className='headertop'>

          <img src='/app/public/img/banner.png' style={{height: 'auto'}} />
        </div>

      </div>
    )
  }
}

Home.config({
  path: '/',
  title: 'Home',
  exact: true
})

export default Home

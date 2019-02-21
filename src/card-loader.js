import { getActivities } from './service.js'
import React from 'react'

const Card = React.lazy(() => import('./card.js'))

export default class extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = { throw: false, error: null }
    
    this.card = React.createRef()
  }
  
  render() {
    if (this.state.throw) {
      throw this.state.error
    }
    const cachedActivities = sessionStorage.getItem('activities')
    if (!cachedActivities) {
      throw getActivities(this.props.token, this.props.before, this.props.after)
        .then(({ activities }) => 
          sessionStorage.setItem('activities', JSON.stringify(activities))
        )
        .catch(error => 
          this.setState({ throw: true, error: error })
        )
    }
    return <Card activities={JSON.parse(cachedActivities)} ref={this.card} />
  }
    
  exportImage(width, height, callback) {
    this.card.current.exportImage(width, height, callback)
  }
}
  
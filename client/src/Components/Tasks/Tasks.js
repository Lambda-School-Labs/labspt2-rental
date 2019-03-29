import React, { Component } from 'react'
import TaskList from './TaskList'
import TaskPageTop from './TaskPageTop'

class Tasks extends Component {
  constructor(props) {
    super(props);
      this.state = {
        tasks: [],
        loading: false,
        error: null
      };
    }
    
    componentDidMount() {
      this.props.getTasks();
    }

  render () {
    return (
      <div>
        <TaskPageTop />
        <TaskList 
          style={{ margin: "20px" }}
        />
      </div>
    )
  }
}

export default Tasks;
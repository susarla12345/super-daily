import React from 'react';

class AddCard extends React.Component {
  constructor() {
    super()

    this.state = {
      title: null,
      description: null
    }
  }

  changeName(event) {
    this.setState({
      ...this.state,
      title: event.target.value
    })
  }

  changeDesc(event) {
    this.setState({
      ...this.state,
      description: event.target.value
    })
  }

  submit() {
    if(this.state.title.length && this.state.description.length) {
      this.props.submitCard(this.state);
    } else {
      alert('All the fields are mandatory');
    }
  }

  render() {
    return(
      <div className="add-card-wrapper">
        <input type="text" placeholder="Add title" className="card-name" onChange={(event) => this.changeName(event)}/>
        <input type="text" placeholder="Add description" className="card-desc" onChange={(event) => this.changeDesc(event)}/>

        <button className="create-card" onClick={() => this.submit()}>Submit</button>
      </div>
    )
  }
}

export default AddCard;
import React from 'react';

class AddCard extends React.Component {
  constructor() {
    super()

    this.state = {
      title: null,
    }
  }

  changeName(event) {
    this.setState({
      ...this.state,
      title: event.target.value
    })
  }


  submit() {
    debugger;
    if(this.state.title) {
      this.props.submitList(this.state);
    } else {
      alert('All the fields are mandatory');
    }
  }

  render() {
    return(
      <div className="add-card-wrapper">
        <input type="text" placeholder="Add list name" className="list-name" onChange={(event) => this.changeName(event)}/>

        <button className="create-list" onClick={() => this.submit()}>Submit</button>
      </div>
    )
  }
}

export default AddCard;
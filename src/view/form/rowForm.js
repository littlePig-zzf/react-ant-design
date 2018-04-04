import React, { Component } from 'react';


class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit(event) {
    alert('a name was submit' + this.state.username);
    event.preventDefault();
  }

  render() {
    return (
      <div className="formBox container">
      	<form onSubmit={this.handleSubmit}>
          <label>
            name:
            <input type="text" value={this.state.username} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


export default RegistrationForm;

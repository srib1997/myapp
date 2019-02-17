import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Analytics, Storage } from 'aws-amplify';
import { withAuthenticator, S3Album } from 'aws-amplify-react';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);
Storage.configure({ level: 'private' });

class App extends Component {

  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    })
  }

  componentDidMount() {
    Analytics.record('Amplify_CLI');
  }

  render() {
    return (
      <div className="App">
        <p> Pick a file</p>
        <input type="file" onChange={this.uploadFile} />
        <S3Album level="public" path='' />
      </div>
    );
  }
}

export default withAuthenticator(App, true);
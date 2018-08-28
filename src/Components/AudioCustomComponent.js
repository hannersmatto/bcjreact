import React, { Component } from "react";
import { ReactMic } from 'react-mic';

export class AudioCustomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      save: false
    }

  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  saveRecording = () => {
    this.setState({
      save: true
    });
  }

  onSave(recordedBlob) {
    this.setState({
      save: false,
      recordedBlob: recordedBlob
    });
  }

  onStop() {
    //console.log('recordedBlob is: ', recordedBlob);
  }

  render() {
    const { record, save } = this.state
    return (
      <div>
        <ReactMic
          record={record}
          save={save}
          className="sound-wave"
          onSave={this.onSave}
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onTouchTap={this.startRecording} type="button">Start</button>
        <button onTouchTap={this.stopRecording} type="button">Stop</button>
        <button onTouchTap={this.saveRecording} type="button">Save</button>
      </div>
    );
  }
}

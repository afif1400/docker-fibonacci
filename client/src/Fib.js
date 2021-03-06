import React, { Component } from 'react';
import axios from 'axios';
import Card from './UI/Card'
import Button from './UI/Button';
import classes from './Fib.module.css'
class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const indexs = await axios.get('/api/values/all');
    this.setState({ seenIndexes: indexs.data });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/values', { index: this.state.index });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  render() {
    return (
      <Card className={classes.input}>
 <form onSubmit={this.handleSubmit} >
          <label>Enter your Index:</label>
          <input
            value={this.state.index}
            onChange={(e) => this.setState({ index: e.target.value })}
          />
          <Button type="submit">Submit</Button>
        </form>
        <h3>Indexes I have seen</h3>
        {this.renderSeenIndexes()}
        <h3>Calculated values</h3>
        {this.renderValues()}
      </Card>
      
    );
  }
}

export default Fib;

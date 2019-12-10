import React, { Component } from 'react';


class App extends Component {
  state = {
    name: null,
    profiles: []
  };

  componentDidMount() {
    console.log('MOUNT');
    this.getProfilesFromDb();
  }

  getProfilesFromDb() {
    const url = new URL('http://localhost:3200/q');
    const {name} = this.state;

    console.log('Search profiles', name);
    
    if (name) {
      url.searchParams.set('name', name);
    }

    fetch(url)
      .then(data => data.json())
      .then(res => this.setState({ profiles: res.data }));
  }

  render() {
    const { profiles } = this.state;
    return (
      <div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            placeholder="Search profile by name"
            style={{ width: '200px' }}
          />
        <button onClick={() => this.getProfilesFromDb()}> Search </button>
        </div>
        <ul>
          {profiles.map(p => (
            <li style={{ padding: '10px' }} key={p.id}>
              <span style={{ color: 'gray' }}> id: </span> {p.id}
              <span style={{ color: 'gray' }}> data: </span> {p.first_name} {p.last_name} {p.email}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

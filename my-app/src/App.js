import React,{Component} from 'react';
import logo from './logo.svg';
import CacheBuster from './CacheBuster';
import './App.scss';

class App extends Component  {
  render(){
  return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          // You can decide how and when you want to force reload
          refreshCacheAndReload();
        }
        return(
            <div className="App" data-test= "App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
        );
      }}
    </CacheBuster>
    
  );
  }
}

export default App;

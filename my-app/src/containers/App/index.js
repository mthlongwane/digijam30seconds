import React,{Component} from 'react';

//import logo from './logo.svg';
import CacheBuster from '../../CacheBuster';
import Login from '../Login'
import './App.scss';

class App extends Component  {
  render(){
  return (
    <CacheBuster data-test= "CacheBusterApp">
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          // You can decide how and when you want to force reload
          refreshCacheAndReload();
        }
        return(
            <div className="App" >
              <Login />
            </div>
        );
      }}
    </CacheBuster>
    
  );
  }
}

export default App;


// <header className="App-header">
// {//Must be atleast one header - PWA Accessibility Testing
// }
//   <h1>React PWA</h1>
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   {//Must be atleast one skip link - PWA Accessibility Testing
//   }
//   <a
//     className="App-link skip-link"
//     href="#maincontent"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Skip to Main
//   </a>
// </header>
// {//Skip link skips to here - PWA Accessibility Testing
// }
// <main id="maincontent"> 
//     <p>main</p>
// </main>
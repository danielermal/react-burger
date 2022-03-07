import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'    
import './App.css'
import Header from '../header/header.js'


class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Header/>
      </div>
    )
  }
}

export default App;


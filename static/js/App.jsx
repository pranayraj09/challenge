import React from 'react';
import './../css/site.css'
import Wrapper from './components/wrapper'

export default class App extends React.Component{

    render(){
        return(
            <div className="container-fluid">
                <Wrapper/>
            </div>
        )
    }
}
import React from 'react';

import Question from "./Question";

class Wrapper extends React.Component{

    render(){
        return(
            <div className="wrapper">
                <Question/>
            </div>
        )
    }
}

export default Wrapper
import React from 'react';

class Head extends React.Component {
    active(n){
        if(n === this.props.number){
            return "current";
        } else{
            return "";
        }
    }
    render(){
        console.log(this.props)
        return(
            <div className="head">
                <ul className="dots dots-fillup">
                    <li className={this.active(1)}><a>Question 1</a></li>
                    <li className={this.active(2)}><a>Question 2</a></li>
                    <li className={this.active(3)}><a>Question 3</a></li>
                </ul>
            </div>
        )
    }
}

export default Head;
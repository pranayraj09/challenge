import React from 'react';
import Head from './Head';
let qNo = 1;
class Question extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questionId : [],
            questions: [],
            answers: [],
            selectedAnswer:"",
            questionNum: 0,
            question:"",
            button:false,
            countShow:false,
            questionCount: [],
            nextButton:true,
            nButton:false,
            error:false
        }
        this.question = "";
    }

    componentWillMount(){
        fetch('/questions').then((res) => res.json()).then((data) => {
            this.setState({questions:data });
            this.handleClick();
        });
    }

    selectAnswer(){
        let obj = this.state.selectedAnswer;
        if(obj){
            fetch('/answers/'+obj.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify({count:obj.count+1})
            }).then((response)=> {
                return response.json();
            }).then((data) => {
                this.setState({button:true,nButton:true,selectedAnswer:"",error:false,questionNum:obj.count+1,countShow:true});
            });
        } else{
            this.setState({error:true})
        }

    }

    handleClick(){
        if (this.state.questionNum === 3){
            this.state.questionNum = 0;
        }
        this.setState({
            questionNum : this.state.questionNum + 1
        })
        let q = this.state.questions;
        let questions =  q;

        //let newArr = randomQuestion.splice(randomQuestion,1);
        this.question = questions[Math.floor(Math.random()*questions.length)]
        questions.splice(questions.findIndex( obj => obj.id===this.question.id ),1);

        if( questions && questions.length > 0) {
            this.setState({question: this.question, nButton:false, questions: questions, button: false, countShow: false})
        } else{
            this.setState({question: this.question, nButton:false, questions: questions, button: false, nextButton:false,countShow: false})
        }
    }

    reInitArr(){ qNo=1;
        fetch('/questions').then((res) => res.json()).then((data) => {
            this.setState({questions:data, qNo:1, nButton:false, button: false, countShow: false, nextButton:true})
            this.handleClick();
        });
    }

    render(){
        return(
            <div>
                <Head number={qNo}/>
            <div className="main-content">
                <div className="question">
                    <p className="grey-text">Question:</p>
                    <p className="question-text"> {this.state.question ? this.state.question.question : ""} </p>
                </div>
                <hr className="line"/>
                <div className="options">
                    <p className="grey-text">Options:</p>
                    <div className="answers">
                    {this.state.question ?
                            this.state.question.answers.map((obj,index)=>{
                            return <input type="button" className="answer-options" key={index} value={obj.answer} onClick={()=>this.setState({selectedAnswer:obj,error:false})}/>;
                        }) : ""}
                    </div>
                </div>
                <div className="submit-button">
                    {!this.state.button &&
                    <input className="button" type="button" value="Submit" onClick={()=>this.selectAnswer()}/>
                    }
                    {this.state.error &&
                    <p className="errorText">Select Answer first!</p>
                    }
                    <p> {this.state.countShow ? `This option was Selected : ${this.state.questionNum} times`:""} </p>
                </div>
                <div className="next-button">
                    { this.state.nButton ? this.state.nextButton ?
                        <input className="button" type="button" onClick={() => { qNo++; this.handleClick()}} value='Next'/>
                        :
                        < input className="button" type="button" onClick={()=>this.reInitArr()} value='Continue'/>
                    : ""
                    }
                    </div>
            </div>
            </div>
        )
    }
}

export default Question;
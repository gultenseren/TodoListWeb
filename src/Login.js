import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Register from "./Register";









export class Login extends React.Component {

    constructor(){
        super();


        this.state ={
            loggedIn : false,
            redirect : false,
            callRegister : false,
            user : [],
            isLoaded : false,
            username : "",
            userid : "",

        }



    }

    componentDidMount() {


    }


    callRegister = () => {

        this.setState({callRegister:true})

    }


    loginHandle = () => {


        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;

       // axios.get('http://localhost:9999/WebApplication3/todolist/todolistservice/user/'+userName)
        axios.get('http://localhost:2222/todolistservice/user/'+userName)
            .then(response => {
                this.setState({user : response.data})

               if(response.data.user_id==0){

                   alert("Böyle bir kullanıcı yok");
               }

               if(response.data.user_name ===userName && response.data.user_password === password){

                   this.setState({redirect: true, username: userName ,userid : response.data.user_id});
                   this.login = 1;

               }else{
                   alert("kullanıcı adı veya şifre yanlış");
               }
            });




    }

    //---------------------------------------------------------------------------------------------------------------------------------
    render(){



    if (this.state.redirect===true) {


        return (<Redirect to={{
            pathname: '/list',
            state: { userid : this.state.userid , user: this.state.username , isloggin : this.state.redirect }
        }} />)

    }


    if (this.state.callRegister===true) {
        return <Redirect to='/register'/>;
    }



        return(



            <div>




                <Router>



                    <div>



                        <Route path="/register" component={Register}/>
                        <Route path="/user/:username"  exact strict render={({match}) => (
                            this.state.loggedIn ? (<user username={match.params.username}/>) : ( <Redirect to='/'/>)
                        )}/>



                        <div className="container">
                            <div className="wrapper">



                                <div className="login1">

                                    <form className="loginform">

                                        <input type="username" name="username" id="username" placeholder="Enter UserName" autoComplete="off"/>
                                        <input type="password" name="password" id="password" placeholder="Enter Password" autoComplete="off"/>

                                    </form>




                                    <button type="button" id="login" onClick={this.loginHandle.bind(this)}> LOGIN</button>

                                    <a  cursor="default" onClick={this.callRegister.bind(this)} > Register</a>




                                </div>


                            </div>

                        </div>



                    </div>




                </Router>

            </div>


        )
    }


}

export default Login;
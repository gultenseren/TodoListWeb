import React from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

/*

const  user = ({params}) =>{

    return(<h1>Welcome User {params.username}</h1>);


};

*/

export class Register extends React.Component{

    constructor(){

        super();
    }



    state ={
        register : false
    }


    doRegister = () => {



        let email = document.getElementById("email").value;
        let username = document.getElementById("username").value;
        let password1 = document.getElementById("password1").value;
        let password2 = document.getElementById("password2").value;

        if(email =="" || username == "" || password1 == "" || password2 == ""){
            alert("do not leave free space");
        }

        else if(password1 !== password2){

            alert("passwords do not match");
        }

        else{


            let user = {

                user_name : username,
                user_password : password1,
                user_email : email
            }

            axios({
                method: 'post',
               // url: 'http://localhost:9999/WebApplication3/todolist/todolistservice/createuser/',
                url: 'http://localhost:2222/todolistservice/createuser/',
                data: user,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("success");
                    }
                })
                .catch(function (response) {
                    console.log("fail Success");
                });

            this.setState({register:true})

        }

    }



    render(){


       if (this.state.register===true) {
            return <Redirect to='/login'/>;
        }


        return(


            <div>


                <div className="container">
                    <div className="wrapper">

                        <div className="register1">

                            <form className="registerform">

                                <input type="email" name="email" id="email" placeholder="Enter E-mail" autocomplete="off"/>
                                <input type="username" name="username" id="username" placeholder="Enter UserName" autocomplete="off"/>
                                <input type="password" name="password" id="password1" placeholder="Enter Password" autocomplete="off"/>
                                <input type="password" name="password" id="password2" placeholder="Enter Password" autocomplete="off"/>

                            </form>


                            <button type="submit" id="register"  onClick={this.doRegister.bind(this)}> REGISTER</button>
                        </div>


                    </div>

                </div>


            </div>
        )


    }
}

export default Register;
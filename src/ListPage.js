import React, { Component } from 'react';
import {TodoList} from './todoList';
import {Header} from "./inc/header";
import {Footer} from "./inc/footer";
import {Redirect} from "react-router-dom";

import axios from "axios";


class ListPage extends Component {

    constructor(props) {
        super(props);

        this.state = { logoff:false,
            isUpdated : false,
            userName : this.props.location.state.user,
            userid : this.props.location.state.userid,
            isloggin : false,
            tasks : [],
            usertasks : [],

        }
        const selectedList ="";


    }




//---------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------

    callLogout = () => {

        this.setState({logoff:true})

    }

    //---------------------------------------------------------------------------------------------------------------------------


    //---------------------------------------------------------------------------------------------------------------------------

    render() {




        if (this.state.logoff===true) {
            return <Redirect to='/login'/>;
        }




        return (


            <div className="wrapper">




                <div className="userinfo">


                    <img onClick={this.callLogout.bind(this)}></img>

                    <a> {this.state.userName} </a>


                </div>


                <div className="content">

                    <Header/>


                    <TodoList userid = {this.state.userid}
                              username = {this.state.userName}

                    />

                    <Footer/>
                </div>



            </div>
        );
    }
}

export default ListPage;
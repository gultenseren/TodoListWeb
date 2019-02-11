import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

export class TodoList extends React.Component{





    constructor(props) {
        super(props);

        this.state = {
            userid: this.props.userid,
            username: this.props.username,
            usertasks: this.props.usertasks,
            listnames : [],
            tasks : [],
            uname : [],
            udescription : [],
            udeadline : [],
            selectedList : "",
            todoFilter: 'All',
            tName: "",
            tDesc: "",
            tDate: "",
            newid : "",

        }

        const okey =0;


    }

        componentWillMount() {


           // axios.get('http://localhost:9999/WebApplication3/todolist/todolistservice/listofuser/'+this.state.userid)
            axios.get('http://localhost:2222/todolistservice/listofuser/'+this.state.userid)
                .then(response => {

                    this.setState({listnames: response.data});

                    console.log(response.data);


                });


        }

//----------------------------------------------


    changeSelect() {


        var selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        console.log(selectedValue);

        this.setState({selectedList : selectedValue})

       // axios.get('http://localhost:9999/WebApplication3/todolist/todolistservice/taskoflist/'+selectedValue)
        axios.get('http://localhost:2222/todolistservice/taskoflist/'+selectedValue)
            .then(response => {

                this.setState({tasks: response.data});
            });

    }

    //--------------------------------------------------------

    doneTask(task_id) {

        let updatedList = this.state.tasks;
        let status ="";

        updatedList.map((data, i) => {

            if(updatedList[i].task_id==task_id){

                this.status = updatedList[i].task_status;

                if(this.status==="active"){
                    this.status="passive";
                    updatedList[i].task_status =this.status;
                }else{ this.status="active"}
                updatedList[i].task_status =this.status;

                let taskid = data.task_id;
                let listid = data.list_id;
                let taskname = updatedList[i].task_name;
                let taskdescription = data.task_description;
                let taskdeadline = data.task_deadline;
                let taskstatus = this.status; /*******/

                this.setState({tasks : updatedList})


                const utask={
                    task_id : taskid,
                    list_id : listid,
                    task_name : taskname,
                    task_description : taskdescription,
                    task_deadline : taskdeadline,
                    task_status : taskstatus}



                axios({
                    method: 'put',
                  //  url: 'http://localhost:9999/WebApplication3/todolist/todolistservice/updatetask/',
                    url: 'http://localhost:2222/todolistservice/updatetask/',
                    data: utask,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log("Update Success")

                        }
                    })
                    .catch(function (response) {
                        console.log("fail Success");
                    });

            }

        })

    }

    //------------------------------------------------------------------------------------------------------------------------------------

    updateTaskName(id,task_id){

        let updatedList = this.state.tasks;
        let newname ="";
        var index=0;
        var text="";
        var self=this;

        document.getElementById(id).contentEditable=true;
        this.newname = document.getElementById(id).innerText;

        document.getElementById(id).addEventListener('keypress', function (e) {


            if (e.keyCode == 13) {
                document.getElementById(id).contentEditable=false;

                updatedList.map((data, i) => {

                    if(updatedList[i].task_id==task_id) {

                        const uname={
                            task_id : task_id,
                            list_id : updatedList[i].list_id,
                            task_name : text,
                            task_description : updatedList[i].task_description,
                            task_deadline : updatedList[i].task_deadline,
                            task_status : updatedList[i].task_status}

                        updatedList[i].task_name = text;
                        self.setState({uname : uname})

                    }
                });

                self.setState({tasks : updatedList})

                axios({
                    method: 'put',
                  //  url: 'http://localhost:9999/WebApplication3/todolist/todolistservice/updatetask/',
                    url: 'http://localhost:2222/todolistservice/updatetask/',
                    data: self.state.uname,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log("Update Success")

                        }
                    })
                    .catch(function (response) {
                        console.log("fail Success");
                    });




            }else{
                text = text + e.key;
            }

        });

        if( this.newname== null){

            document.getElementById(id).contentEditable=true;
        }
    }



//------------------------------------------------------------------------------------------------------------------------------------

    updateTaskDescription(id,task_id){

        let updatedList = this.state.tasks;
        let newname ="";
        var index=0;
        var text="";
        var self=this;

        document.getElementById(id).contentEditable=true;
        this.newname = document.getElementById(id).innerText;

        document.getElementById(id).addEventListener('keypress', function (e) {


            if (e.keyCode == 13) {
                document.getElementById(id).contentEditable=false;

                updatedList.map((data, i) => {

                    if(updatedList[i].task_id==task_id) {

                        const udescription={
                            task_id : task_id,
                            list_id : updatedList[i].list_id,
                            task_name : updatedList[i].task_name,
                            task_description : text,
                            task_deadline : updatedList[i].task_deadline,
                            task_status : updatedList[i].task_status}

                        updatedList[i].task_description = text;
                        self.setState({udescription : udescription})

                    }
                });

                self.setState({tasks : updatedList})

                axios({
                    method: 'put',
                  //  url: 'http://localhost:9999/WebApplication3/todolist/todolistservice/updatetask/',
                    url: 'http://localhost:2222/todolistservice/updatetask/',
                    data: self.state.udescription,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log("Update Success")

                        }
                    })
                    .catch(function (response) {
                        console.log("fail Success");
                    });




            }else{
                text = text + e.key;
            }

        });

        if( this.newname== null){

            document.getElementById(id).contentEditable=true;
        }
    }

    //------------------------------------------------------------------------------------------------------------------------------------

    updateTaskDeadline(id,task_id){

        let updatedList = this.state.tasks;
        let newname ="";
        var index=0;
        var text="";
        var self=this;

        document.getElementById(id).contentEditable=true;
        this.newname = document.getElementById(id).innerText;

        document.getElementById(id).addEventListener('keypress', function (e) {


            if (e.keyCode == 13) {
                document.getElementById(id).contentEditable=false;

                updatedList.map((data, i) => {

                    if(updatedList[i].task_id==task_id) {

                        const udeadline={
                            task_id : task_id,
                            list_id : updatedList[i].list_id,
                            task_name : updatedList[i].task_name,
                            task_description : updatedList[i].task_description,
                            task_deadline : text,
                            task_status : updatedList[i].task_status}

                        updatedList[i].task_deadline = text;
                        self.setState({udeadline : udeadline})

                    }
                });

                self.setState({tasks : updatedList})

                axios({
                    method: 'put',
                   // url: 'http://localhost:9999/WebApplication3/todolist/todolistservice/updatetask/',
                    url: 'http://localhost:2222/todolistservice/updatetask/',
                    data: self.state.udeadline,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log("Update Success")

                        }
                    })
                    .catch(function (response) {
                        console.log("fail Success");
                    });




            }else{
                text = text + e.key;
            }

        });

        if( this.newname== null){

            document.getElementById(id).contentEditable=true;
        }
    }


    removeTask(i,task_id){


        let updatedList = this.state.tasks;

        updatedList.splice(i,1);

        this.setState({tasks : updatedList});

      //  axios.delete('http://localhost:9999/WebApplication3/todolist/todolistservice/removetask/'+task_id)
        axios.delete('http://localhost:2222/todolistservice/removetask/'+task_id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

    }

    addList(){

        document.querySelector('.addListModal').style.display='flex';


//        document.getElementById("newlistname").value="";
    }

    closeAddListModal(){

        document.querySelector('.addListModal').style.display='none';
    }

    addNewList() {

        let newList = document.getElementById("newlistname").value;

        if (newList == "" || newList == null) {
            alert("do not leave free space");
        } else {


            let updatedList3 = this.state.listnames;

            var self = this;
            var id = 0;

            let newData = {
                list_id: "",
                user_id: this.state.userid,
                list_name: newList
            }

            axios({
                method: 'post',
             //   url: 'http://localhost:9999/WebApplication3/todolist/todolistservice/createlist/',
                url: 'http://localhost:2222/todolistservice/createlist/',
                data: newData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then(function (response) {
                    if (response.status === 200) {
                        newData.list_id = response.data;
                    }
                })
                .catch(function (response) {
                    console.log("fail Success");
                });


            updatedList3.push(newData);
            console.log(updatedList3);
            this.setState({listnames: updatedList3})

            document.querySelector('.addListModal').style.display = 'none';

        }
    }

    removeList(){


        var selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        if (selectedValue == "" || isNaN(selectedValue)) {
            alert("choose a list to delete");
        }
        else{

            let removeData ={
                list_id : selectedValue,
                user_id : this.state.userid,
                list_name : "xxx"

            }

            let updatedList = this.state.listnames;

            updatedList.map((data, i) => {

                if(updatedList[i].list_id==selectedValue) {

                    updatedList.splice(i,1);
                }

                });

                this.setState({listnames : updatedList})

            axios({
                method: 'put',
              //  url: 'http://localhost:9999/WebApplication3/todolist/todolistservice/deletelist/',
                url: 'http://localhost:2222/todolistservice/deletelist/',
                data: removeData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response.data);
                    }
                })
                .catch(function (response) {
                    console.log(response.data);
                });





        }

    }




    openAddTaskModal(){


        document.getElementById("modalTitle").value="";
        document.getElementById("modalDesc").value="";
        document.getElementById("modalDate").value="";
        var listid = this.state.selectedList;

        if (listid == "" || isNaN(listid)) {

            alert("Please choose list to add task");
            document.querySelector('.addTaskModal').style.display = 'none';
        }else {
            document.querySelector('.addTaskModal').style.display = 'flex';
        }
    }

    closeAddTaskModal(){
        document.querySelector('.addTaskModal').style.display='none';
    }

    addTask() {

        let title = document.getElementById("modalTitle").value;
        let desc = document.getElementById("modalDesc").value;
        let date = document.getElementById("modalDate").value;
        let status = "passive";
        var listid = this.state.selectedList;

        if (listid == "" || isNaN(listid)) {

            alert("Please choose list to add task");
            document.querySelector('.addTaskModal').style.display = 'none';
        }

        if(title == "" || desc == "" || date ==""){

            alert("do not leave free space");


        } else {

            let newTask = {
                task_id: "",
                list_id: listid,
                task_name: title,
                task_description: desc,
                task_deadline: date,
                task_status: status
            }



            let updatedList = this.state.tasks;

            axios({
                method: 'post',
              //  url: 'http://localhost:9999/WebApplication3/todolist/todolistservice/inserttask/',
                url: 'http://localhost:2222/todolistservice/inserttask/',
                data: newTask,
                config: {headers: {'Accept': 'application/json'}}
            })
                .then(function (response) {
                    if (response.status === 200) {
                        newTask.task_id = response.data;
                        console.log("eklenmiş olmalı " +response.data);
                    }
                })
                .catch(function (response) {
                    console.log(response.data);
                });


            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            };



            updatedList.push(newTask);
            console.log(updatedList);
            this.setState({tasks: updatedList})

            document.querySelector('.addTaskModal').style.display = 'none';


        }
    }

//------------------------------------------------------------------------------------------------------------------------------------


    render(){


        let items_left = 0;
        const item=[];


        const items = this.state.tasks.map((elem, i) => {

            let task_id = 'task_' + i;


            if (elem.task_status == 'passive') {
                items_left++;

            }

            if (this.state.todoFilter === 'All' ||
                this.state.todoFilter === 'Active' && elem.task_status === 'passive' ||
                this.state.todoFilter === 'Completed' && elem.task_status === 'active') {

                if(this.state.isSelect==false){

                    this.items=null;
                }else {


                    return(
                        <li key={i} id={task_id} className={elem.task_status}>
                            <span className="id">{i + 1}</span>
                            <span id={elem.task_id+"a"} className="title" onClick={() => this.updateTaskName(elem.task_id+"a",elem.task_id)}>{elem.task_name}</span>
                            <span id={elem.task_id+"b"} className="description" onClick={() => this.updateTaskDescription(elem.task_id+"b",elem.task_id)}>{elem.task_description}</span>
                            <span id={elem.task_id+"c"} className="deadline" onClick={() => this.updateTaskDeadline(elem.task_id+"c",elem.task_id)}>{elem.task_deadline}</span>
                            <span className="type" onClick={() => this.doneTask(elem.task_id)}></span>
                            <span className="delete" onClick={() => this.removeTask(i, elem.task_id)}/>

                        </li>
                    )



                }
            }

        });






//-----------------------------------------------------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------------------------------------------------




        return(

            <div>

                <div className="addListModal">

                    <div className="modal-content">

                        <form>

                            <input type="text" id="newlistname" placeholder="Enter List Name"/>
                            <a id="addNewList" cursor="default" onClick={() => this.addNewList()}> Add List</a>
                            <a id="closeAddListModal" cursor="default" onClick={() => this.closeAddListModal()}> Close</a>

                        </form>
                    </div>


                </div>




                <div className="addTaskModal">

                    <div className="modal-content">

                        <form>

                            <input type="text" id="modalTitle" placeholder="Enter Task Name" autoComplete="off"/>
                            <input className="descc" id="modalDesc" textarea="desc" placeholder="Enter Task Description" autoComplete="off"/>
                            <input type="date" id="modalDate" autoComplete="off"/>
                            <a onClick={() => this.addTask()}> Add Task</a>
                            <a onClick={() => this.closeAddTaskModal()}> Close </a>


                        </form>
                    </div>


                </div>






                <div className="lists">

                    <a id="username">Tasks :</a>

                    <select onChange={ (e) => {this.changeSelect();}} id="selectBox" ref="itemSelector" >
                        <option  disabled selected >Choose To Do List</option>
                        {this.state.listnames.map(function(i){

                            return <option key={ i.list_id } value={i.list_id}>{i.list_name}</option>;
                        })}
                    </select>

                    <img id="addList" onClick={() => this.addList()}></img>
                    <img id="deleteList" onClick={() => this.removeList()}></img>


                </div>


                <img id="addTask" onClick={() => this.openAddTaskModal()}></img>

                <div className="todo-listtable">

                    <ul>

                        {items}

                    </ul>


                </div>


                <div className="todo-filter">
                    <div className="todofilter-left">
                        <span>{items_left} items left</span>

                    </div>

                    <div className="todofilter-right">
                        <ul>
                            <li className="active" id="filterAllBtn"><span onClick={() => this.todoListFilter('All')}> All </span></li>
                            <li id="filterActiveBtn"><span onClick={() => this.todoListFilter('Active')}> Active </span></li>
                            <li id="filterCompletedBtn"><span onClick={() => this.todoListFilter('Completed')}> Completed </span></li>
                        </ul>

                    </div>


                </div>



            </div>





        )

    }



}
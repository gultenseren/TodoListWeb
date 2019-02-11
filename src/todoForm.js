import React from 'react';

export class TodoForm extends React.Component{

    constructor(){
        super();

        this.addTask = this.addTask.bind(this);
    }




    addTask(e){

        e.preventDefault();

        const inputName=document.getElementById('taskname');
        const taskName = inputName.value;
        inputName.value='';


        const inputDesc=document.getElementById('taskdesc');
        const taskDesc = inputDesc.value;
        inputDesc.value='';


        const inputDeadLine=document.getElementById('taskdeadline');
        const taskDeadLine = inputDeadLine.value;
        inputDeadLine.value='';

        this.props.addTasks(taskName, taskDesc , taskDeadLine);


    }


    render() {


        return(

            <div>

                <div className="type1">

                    <form className="todoform">
                        <input id="taskname" type="text" className="add-todo" placeholder="Enter Task Name" />
                        <input id="taskdesc" type="text" className="add-todo" placeholder="Enter Task Description" />
                        <input id="taskdeadline" type="date" className="add-todo" placeholder="Enter Task DeadLine"
                        autoComplete="off"/>

                    </form>


                    <button type="button" id="addButton" onClick={this.addTask}> ADD </button>

                </div>

            </div>
        )


    }

}
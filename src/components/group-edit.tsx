import * as React from 'react';
import Field from "./field";
import {Link} from "react-router-dom";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './group-edit.css';

interface IGroupEditProps {
    location:any,
}

interface IGroupEditState {
    group: {
        name:string,
        id:string,
        children:any[],
        parent:string
    },
    message?:string
}

class GroupEdit extends React.Component<IGroupEditProps, IGroupEditState>{
    constructor(props:IGroupEditProps){
        super(props);
        this.state = {
            group:{
                name:props.location.state.group.name,
                id:props.location.state.group.id,
                children:props.location.state.group.children,
                parent:props.location.state.group.parent
            }
        }
    }

    // public save = async () => {
    //     const result:{message:string} = await this.props.onEditUserDetails(this.state.user);
    //     this.setState({message:result.message});
    // };

    public updateField = (fieldName: string, value: string) => {
        this.setState(prevState => {
            return {
                group: {
                    ...this.state.group,
                    [fieldName]: value
                }
            }
        })
    };

    render(){
        const data = this.state.group.children;
        const columns = [
            {
                Header: 'ID',
                accessor: 'id',
                Cell:(props:any)=> (<><button className="delete-child-btn"><i className="fa fa-trash"/></button><span>{props.value}</span></>)
            }, {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Type',
                accessor: 'type',
            }];
        return(
            <div>
                <Link to='/groups'><button className="edit-group-back-btn">Back</button></Link>
                <div className="edit-group-wrapper">
                    <h2 className="edit-group-header">Edit group details</h2>
                    <Field name={'name'} type={'text'} group={this.state.group.name} onChange={this.updateField}/>
                    <button className="edit-group-save-btn" type="button">Save</button>
                    <p hidden={!this.state.message}>{this.state.message}</p>
                    <div>
                        <p className="parent-wrapper">
                            <span className="parent">Parent:</span><span className="parent-name">{this.state.group.parent}</span>
                        </p>
                        <div className="children-wrapper">
                            <button>Add user to group</button>
                            <h2 className="children-header">Children</h2>
                            <ReactTable filterable={true} defaultSortDesc={true} defaultPageSize={5} minRows={5} className="children-table" data={data} columns={columns}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default GroupEdit;
import React, {ChangeEvent} from "react";


type ProfileStatusPropsType = {
    status: string
    updateStatus:(status:string)=>void
}


export class ProfileStatus extends React.Component<ProfileStatusPropsType, { editMode: boolean,status:string}> {


    state = {
        editMode: false,
        status: this.props.status

    }



    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }

    componentDidUpdate(prevProps: any,prevState: any) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }

        let a = this.state.status
        let b = this.props.status

        console.log('ComponentDidUpdate',a,b)
    }


    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status && 'No status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode}
                               value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}
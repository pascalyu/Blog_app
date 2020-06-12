import React,{Component} from "react";

class Messager extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { message } = this.props;
        return (
            <div>
                <p>{message}</p>
            </div>

        )
    }

}
export default Messager;
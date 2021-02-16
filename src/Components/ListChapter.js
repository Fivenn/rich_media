import React from "react"
import PropTypes from "prop-types"


export class List extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        fields: PropTypes.arrayOf(String).isRequired,
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props)
        this.state = {
            selected: -1
        }
    }

    handleClick(index, time) {
        this.setState({selected : index});
        this.props.onClick(index);
    }
    render() {
        return (
            <ul>
                {this.props.items.map((item,index) => (
                    <ListChapter
                        title = {item[this.props.fields[1]]}
                        time = {Math.floor(item[this.props.fields[0]]/3600) + " hours " + Math.floor((item[this.props.fields[0]]%3600)/60) + " min " + item[this.props.fields[0]] % 60 + " sec"}
                        key = {index}
                        onClick = {this.handleClick.bind(this, item.pos)}
                        selected = {this.state.selected === index}
                    />
                ))}
            </ul>
        );
    }
}

export class ListChapter extends React.Component {
    static defaultProps = {
        selected: false,
        title: "chapitre inconnu",
        time: "temps inconnu"
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        time: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        selected: PropTypes.bool
    };

    toggle = () =>{
        this.props.onClick(this);
    }

    render() {
        return (
        <div className={`${this.props.selected ? "on" : "off"}`} onClick={this.toggle}>
            <h2>Chapter : {this.props.title}</h2>
            <h3>Timecode : {this.props.time}</h3>
        </div>
        )
    }
}


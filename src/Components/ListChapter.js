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

    handleClick(index) {
        this.setState({selected : index});
        this.props.onClick(index);
    }
    render() {
        return (
            <ul>
                {this.props.items.map((item,index) => (
                    <ListChapter
                        line_1 = {item[this.props.fields[0]]}
                        line_2 = {item[this.props.fields[1]]}
                        key = {index}
                        onClick = {this.handleClick.bind(this, index)}
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
        line_1: "temps inconnu",
        line_2: "chapitre inconnu"
    };

    static propTypes = {
        line_1: PropTypes.string.isRequired,
        line_2: PropTypes.number,
        onClick: PropTypes.func.isRequired,
        selected: PropTypes.string
    };

    toggle = () =>{
        this.props.onClick(this);
    }

    render() {
        return (
        <div className={`${this.props.selected ? "on" : "off"}`} onClick={this.toggle}>
            <h2>{this.props.line_1}</h2>
            <h3>{this.props.line_2}</h3>
        </div>
        )
    }
}


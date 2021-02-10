import React from "react"
import { Player } from "video-react"
import "video-react/dist/video-react.css"
import { List } from "./ListChapter"


export class VideoPlayer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data_loaded: false,
            selected : -1,
            json: [],
            fields: ["pos", "title"]
        }
    }

    handleClick(index) {
        this.setState({ selected : index})
    }

    componentDidMount() {
        fetch("https://imr3-react.herokuapp.com/backend")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data_loaded: true,
                    json: json
                })
            })
    }

    render() {
        const { data_loaded, json, fields } = this.state

        if (data_loaded) {
            return (
                <div >
                    <p id="videoPlayer">
                        <Player
                            playsInline
                            src={json.Film.file_url}
                        />
                    </p>
                    <p>
                        <List
                        items={json.Chapters}
                        fields = {fields}
                        onClick={this.handleClick.bind(this)}/>
                    </p>
                </div>
            )
        } else {
            return (
                <p>Loading data...</p>
            )
        }
    }
}
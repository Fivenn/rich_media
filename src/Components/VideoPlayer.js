import React from "react"
import { Player } from "video-react"
import "video-react/dist/video-react.css"

export class VideoPlayer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data_loaded: false,
            json: []
        }
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
        const { data_loaded, json } = this.state

        if (data_loaded) {
            return (
                <div id="videoPlayer">
                    <Player
                        playsInline
                        src={json.Film.file_url}
                    />
                </div>
            )
        } else {
            return (
                <p>Loading data...</p>
            )
        }
    }
}
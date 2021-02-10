import React from "react"
import { Player } from "video-react"
import "video-react/dist/video-react.css"

export class VideoPlayer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            dataLoaded: false,
            json: []
        }
    }

    componentDidMount() {
        fetch("https://imr3-react.herokuapp.com/backend")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    dataLoaded: true,
                    json: json
                })
            })
    }

    render() {
        const { dataLoaded, json } = this.state

        if (dataLoaded) {
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
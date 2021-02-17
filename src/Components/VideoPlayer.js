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

        //Declare seek function in this context
        this.seek = this.seek.bind(this);
    }

    /* Declaration of function seek
     * seek video by time (seconds)
     */
    seek(seconds) {
        this.player.seek(seconds);
    }

    handleStateChange(state) {
        this.setState({
          player: state
        });
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

    handleClick(index) {
        this.setState({ selected : index})
    }

    render() {
        const { dataLoaded, json, fields } = this.state

        if (dataLoaded) {
            return (
                <div >
                    <div id="videoPlayer">
                        <Player
                            ref={player => {
                                this.player = player;
                            }}
                            playsInline
                            src={json.Film.file_url}
                        />
                    </div>
                    <div id="chapters">
                        <List
                        items={json.Chapters}
                        fields = {fields}
                        //add seek function on the click
                        onClick={this.seek.bind(this)}/>
                    </div>
                </div>
            )
        } else {
            return (
                <p>Loading data...</p>
            )
        }
    }
}
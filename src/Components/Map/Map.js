import React from "react"
import { MapContainer, TileLayer } from 'react-leaflet'
import { MapMarker } from "./MapMarker"
import "leaflet/dist/leaflet.css"

/**
 * Class allowing to generate and display a map from the `Leaflet` library. 
 * This map is essentially composed of markers generated and displayed using a json file. 
 */
export class Map extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            dataLoaded: false,
            json: []
        }
    }

    /**
     * When this component is mounted we fetch a json that will be used after
     * After retrieving the json we change the the state of the component to declare that data are loaded and ready to use
     */
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

        /*
         * If the data has been retrieved from the json file, then the map is displayed.
         *  Otherwise, a text specifying the status of the page is displayed.
         */
        if (dataLoaded) {
            return (
                <div id="map">
                    <MapContainer
                        // Center the map on the first point displayed
                        center={[json.Waypoints[0].lat, json.Waypoints[0].lng]} zoom={13} scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapMarker
                            // We give to the component a json including a list of waypoints to display
                            waypoints={json.Waypoints}
                        />
                    </MapContainer>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Loading data...</p>
                </div>
            )
        }
    }
}
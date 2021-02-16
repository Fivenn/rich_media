import React from "react"
import { MapContainer, TileLayer } from 'react-leaflet'
import { MapMarker } from "./MapMarker"
import "leaflet/dist/leaflet.css"

export class Map extends React.Component {

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
                <div id="map">
                    <MapContainer center={[json.Waypoints[0].lat, json.Waypoints[0].lng]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapMarker
                            waypoints={json.Waypoints}
                        />
                    </MapContainer>
                </div>
            )
        } else {
            return (
                <p>Loading data...</p>
            )
        }
    }
}
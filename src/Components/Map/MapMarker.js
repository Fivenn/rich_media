import React from "react"
import L from "leaflet"
import { Marker, Popup } from 'react-leaflet'
import PropTypes from "prop-types"

import "leaflet/dist/leaflet.css"

// React leaflet for some reason do not include images and you will need to reset default icons images
// https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon

export class MapMarker extends React.Component {

    static defaultProps = {
        waypoints: []
    }

    static propTypes = {
        waypoints: PropTypes.array.isRequired
    }

    render() {
        return (
            this.props.waypoints.map((waypoint) => (
                <Marker position={[waypoint.lat, waypoint.lng]}>
                    <Popup>
                        {waypoint.label}
                    </Popup>
                </Marker>
            ))
        );
    }
}
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { VideoPlayer } from "./Components/VideoPlayer"
import { Map } from "./Components/Map"

ReactDOM.render(
  <div>
    <VideoPlayer/>
    <Map/>
  </div>,
  document.getElementById("root")
)
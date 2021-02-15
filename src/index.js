import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { VideoPlayer } from "./Components/VideoPlayer"
import { Map } from "./Components/Map/Map"

ReactDOM.render(
  <div>
    <aside>
      <VideoPlayer />
    </aside>
    <section>
      <Map />
    </section>
  </div>,
  document.getElementById("root")
)
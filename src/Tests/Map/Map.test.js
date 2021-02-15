import React from "react"
import { render, waitFor } from "@testing-library/react"
import { Map } from "../../Components/Map/Map"

test("backend is called", () => {
    render(<Map/>)
})

test("renders without crashing", () => {
    const section = document.createElement("section")
    render(<Map/>, section)
})
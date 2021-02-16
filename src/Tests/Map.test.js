import { render, waitFor } from "@testing-library/react"
import { Map } from "../Components/Map/Map"

beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() => {
        return Promise.resolve({
            status: 200,
            json: () => {
                return Promise.resolve([
                    {
                        Waypoints: [
                            {
                                lat: "0.0",
                                lng: "0.0",
                                label: "A beautiful label",
                                timestamp: "0"
                            }
                        ]
                    }
                ])
            }
        })
    })
})

afterEach(() => {
    fetch.mockClear()
})

test("backend is called", () => {
    render(<Map/>)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith("https://imr3-react.herokuapp.com/backend")
})

test("renders without crashing", () => {
    const section = document.createElement("section")
    render(<Map />, section)
})

test("does not contains map after initial render", () => {
    const { container } = render(<Map />)
    const map = container.querySelector(`[id="map"]`)
    expect(map).toBeNull()
})

test("does contains map after async fetch", async () => {
    const { container } = render(<Map />)
    const map = await waitFor(() => container.querySelector(`[id="map"]`))
    expect(map).toBeInTheDocument()
})
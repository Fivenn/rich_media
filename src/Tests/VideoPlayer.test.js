import React from "react"
import { render, waitFor } from "@testing-library/react"
import { VideoPlayer } from "../Components/VideoPlayer"

beforeAll(() => {
    jest.spyOn(global, "fetch").mockImplementation(() => {
        return Promise.resolve({
            status: 200,
            json: () => {
                return Promise.resolve([
                    {
                        Film: {
                            file_url: "file_url",
                            title: "title",
                            synopsis_url: "synopsis_url"
                        },
                        Chapters: {
                            pos: "pos",
                            title: "title"
                        },
                        Waypoints: {
                            lat: "lat",
                            lng: "lng",
                            label: "label",
                            timestamp: "timestamp"
                        },
                        Keywords: {
                            pos: "pos",
                            data: [
                                {
                                    title: "title",
                                    url: "url"
                                }
                            ]
                        }
                    }
                ])
            }
        })
    })
})

afterAll(() => {
    fetch.mockClear();
})

test("backend is called", () => {
    render(<VideoPlayer />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://imr3-react.herokuapp.com/backend")
})

test("renders without crashing", () => {
    const div = document.getElementById("div")
    render(<VideoPlayer />, div)
})

test("does not contains video player after initial render", () => {
    const { container } = render(<VideoPlayer />)
    const videoPlayer = container.querySelector("[id=videoPlayer]")
    expect(videoPlayer).toBeNull()
})

test("contains video player after async fetch", async () => {
    const { container } = render(<VideoPlayer />)
    const videoPlayerAfterGet = await waitFor(() => container.querySelector("[id=videoPlayer]"))
    expect(videoPlayerAfterGet).toBeInTheDocument()
})

test("video player is a div tag after async fetch", async () => {
    const { container } = render(<VideoPlayer />)
    const videoPlayerAfterGet = await waitFor(() => container.querySelector("[id=videoPlayer]"))
    expect(videoPlayerAfterGet.nodeName).toBe("DIV")
})
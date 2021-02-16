import React from 'react'
import { render, waitForElement, } from '@testing-library/react';
import { VideoPlayer } from '../Components/VideoPlayer';

test("VideoPlayer renders without crashing", () => {
    const div = document.createElement("div");
    render(<VideoPlayer />, div);
});

test("contains videoPlayer", () => {
    const { container } = render(<VideoPlayer />);
    const videoPlayer = container.querySelector("[id=videoPlayer]")
    expect(videoPlayer).toBeNull()
});


test("does not contains videoPlayer after initial render", () => {
    const { container } = render(<VideoPlayer/>);
    const videoPlayer = container.querySelector("[id=videoPlayer]");
    expect(videoPlayer).toBeNull();
});

test("videoPlayer is a div tag", async () => {
    const {container} = render(<VideoPlayer/>)
    const videoPlayer = await waitForElement(() => container.querySelector("[id=videoPlayer]"))
    expect(videoPlayer.nodeName).toBe("DIV");
});




test("contains chapters", () => {
    const { container } = render(<VideoPlayer />);
    const chapters = container.querySelector("[id=chapters]")
    expect(chapters).toBeNull()
});


test("does not contains chapters after initial render", () => {
    const { container } = render(<VideoPlayer/>);
    const chapters = container.querySelector("[id=chapters]");
    expect(chapters).toBeNull();
});


/*
test("videoPlayer is a div tag", async () => {
    const {container} = render(<VideoPlayer/>)
    const chapters = await waitForElement(() => container.querySelector("[id=chapters]"))
    expect(chapters.nodeName).toBe("DIV");
});
*/

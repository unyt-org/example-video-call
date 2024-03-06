# UIX Video Call Example Project

This is a example project demonstrating how to create a basic video call application with UIX.
Encrypted end-to-end video calls are established via DATEX and transmitted over a WebRTC connection.

## Project structure

This project consists of a single TypeScript module ([`frontend/entrypoint.tsx`](frontend/entrypoint.tsx)) containing the UI and video call logic.
Additionally, CSS styles are defined in [`frontend/entrypoint.css`](frontend/entrypoint.css).

## Streaming video and audio

Establishing a video call happens in four steps:

First, a video stream for the current device is requested using the navigator media API:
```ts
const ownMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(console.error);
```

When the "Call" button is clicked, this media stream is sent to another endpoint by calling `CallManager.call` on the remote endpoint:

```ts
await CallManager.call.to(remoteEndpoint.val)(ownMediaStream);
```

On the remote endpoint, inside the `CallManager.call` function, the passed media stream is displayed in the remote video view:

```ts
remoteVideo.srcObject = mediaStream;
```

The remote endpoint also returns its own media stream from the `CallManager.call` function, which is then again displayed in the local endpoint's remote video view:
```ts
remoteVideo.srcObject = await CallManager.call.to(remoteEndpoint.val)(ownMediaStream);
```

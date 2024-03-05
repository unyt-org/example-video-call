import { Endpoint } from "unyt_core/types/addressing.ts";
import { Runtime } from "unyt_core/datex_all.ts";

const remoteEndpointName = eternal ?? $$(new URLSearchParams(globalThis.location.search).get("remote") ?? "" as "@")

const src = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
const ownVideo = <video autoplay id="ownVideo" src={src} />
const remoteVideo = <video autoplay id="remoteVideo" />


@endpoint class CallManager {
	@property static call(mediaStream: MediaStream) {
		console.warn("call from " + datex.meta.sender, mediaStream);
		remoteVideo.srcObject = mediaStream;
		return src;
	}
}

export default 
	<div>
		<h1>Video Call</h1>
		<div>Own Endpoint: {Runtime.endpoint.toString()}</div>
		<div>Remote Endpoint: <input type="text" placeholder="@example" value={remoteEndpointName}/></div>
		<button onclick={async ()=>{
			const endpoint = Endpoint.get(remoteEndpointName.val);
			const remoteStream = await CallManager.call.to(endpoint)(src);
			console.warn("remote", remoteStream)
			remoteVideo.srcObject = remoteStream
		}}>Call</button>

		<div class="callView">
			{ownVideo}
			{remoteVideo}
		</div>
	</div>
import { Endpoint } from "unyt_core/types/addressing.ts";
import { Runtime } from "unyt_core/datex_all.ts";

const remoteEndpointName = eternal ?? $$(new URLSearchParams(globalThis.location.search).get("remote") ?? "" as "@")

const ownMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
const ownVideo = <video autoplay src={ownMediaStream} />
const remoteVideo = <video autoplay/>


@endpoint class CallManager {
	@property static call(mediaStream: MediaStream) {
		remoteVideo.srcObject = mediaStream;
		return ownMediaStream;
	}
}

export default 
	<div>
		<h1>Video Call</h1>
		<div>Own Endpoint: {Runtime.endpoint.toString()}</div>
		<div>Remote Endpoint: <input value={remoteEndpointName}/></div>
		
		<button onclick={async () => {
			const endpoint = Endpoint.get(remoteEndpointName.val);
			remoteVideo.srcObject = await CallManager.call.to(endpoint)(ownMediaStream);
		}}>Call</button>

		<div class="callView">
			{ownVideo}
			{remoteVideo}
		</div>
	</div>
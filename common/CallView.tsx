import { Endpoint, Target } from "unyt_core/types/addressing.ts";
import { Component } from "uix/components/Component.ts";

@endpoint class CallManager {
	@property static call(mediaStream: MediaStream) {
		console.log("call from " + datex.meta.sender, mediaStream)
	}
}


@template(async function () {

	const src = null//await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
	console.log("src", src);

	return <div>
		<p>Video Call</p>
		<input type="text" placeholder="Remote Endpoint" value={this.$.remoteEndpointName}/>
		<button onclick={()=>{
			const endpoint = Endpoint.get(this.remoteEndpointName);
			CallManager.call.to(endpoint)(src);
		}}>Call</button>

		<div>
			<video id="ownVideo" src={src} />
			<video id="remoteVideo" />
		</div>

	</div>
})
export class CallView extends Component {
	@property remoteEndpointName = ""

}
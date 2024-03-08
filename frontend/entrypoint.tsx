const ownMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(() => null);
const ownVideo = <video autoplay muted src={ownMediaStream} /> as HTMLVideoElement
const remoteVideo = <video autoplay/> as HTMLVideoElement

const remoteEndpoint = eternal ?? $$(""); // store the remote endpoint persistently

@endpoint class CallManager {
	/**
	 * This function is called remotely from one endpoint to initiate a video call
	 * @param mediaStream the media stream of the caller endpoint
	 * @returns the media stream of the called endpoint
	 */
	@timeout(30_000)
	@property static call(mediaStream: MediaStream|null) {
		remoteEndpoint.val = datex.meta.caller.main.toString()
		remoteVideo.srcObject = mediaStream;
		return ownMediaStream;
	}
}

export default
	<main>
		<h1>Video Call</h1>
		<div class="callView">
			<div>
				{ownVideo}
				<div>Your Endpoint: <b>{localEndpoint.main.toString()}</b></div>
			</div>
			<div>
				{remoteVideo}
				<div>
					Remote Endpoint: <input value={remoteEndpoint}/>
					<button onclick={async () => {
						remoteVideo.srcObject = await CallManager.call.to(remoteEndpoint.val)(ownMediaStream);
					}}><i class="fa-solid fa-video"/> Call</button>
				</div>
			</div>
		</div>
	</main>
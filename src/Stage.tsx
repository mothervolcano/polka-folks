import React, { ReactNode } from "react";

import StageManager from "./StageManager";

interface StageProps {
	children: ReactNode;
	setStageManager: any;
	model: any;
	baseParams: any;
	params: any;
	style: object;
}

interface StageState {
	// recordedChunks: any[];
}

// function createCanvas(document: Document, containerElement: HTMLDivElement) {
// 	const canvas = document.createElement("canvas");
// 	containerElement.appendChild(canvas);
// 	return canvas;
// }

export default class Stage extends React.Component<StageProps, StageState> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	stageManager: StageManager | null;
	startTimer: number | null = null;
	stopTimer: number | null = null;

	constructor(props: StageProps) {
		super(props);
		this.canvasRef = React.createRef();
		this.stageManager = null;

		// this.state = {
		// 	recordedChunks: [],
		// };
		// this.handleDataAvailable = this.handleDataAvailable.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount(): void {
		const canvas = this.canvasRef.current;
		if (canvas) {
			this.stageManager = new StageManager(canvas, this.props.model);
			this.stageManager.update(this.props.baseParams, this.props.params);
			this.props.setStageManager(this.stageManager);

			console.log("... STAGE MOUNTED");

			// const stream = canvas.captureStream(24);
			// console.log(">>>> STAGE MOUNTED: ", canvas);

			// console.log(">>>> CANVAS STREAM", stream);
			// const options = { mimeType: "video/webm; codecs=vp9" };
			// const mediaRecorder = new MediaRecorder(stream, options);
			// mediaRecorder.ondataavailable = this.handleDataAvailable;

			// this.startTimer = window.setTimeout(() => {
			// 	console.log(">>> start recording");
			// 	mediaRecorder.start();
			// }, 2000);

			// this.stopTimer = window.setTimeout(() => {
			// 	console.log(">>>> stop recording");
			// 	mediaRecorder.stop();
			// }, 9000);
		}

		window.addEventListener("mousemove", this.handleMouseMove);
		window.addEventListener("resize", this.handleResize);
	}

	componentDidUpdate(
		prevProps: Readonly<StageProps>,
		prevState: Readonly<{}>,
		snapshot?: any,
	): void {
		if (this.stageManager) {
			if (prevProps.model === this.props.model) {
				this.stageManager.update(this.props.baseParams, this.props.params);
			} else  if (this.canvasRef.current) {
				this.stageManager = new StageManager(this.canvasRef.current, this.props.model);
				this.stageManager.update(this.props.baseParams, this.props.params);
				this.props.setStageManager(this.stageManager);
			}
			this.props.setStageManager(this.stageManager);
		}

		console.log("... STAGE UPDATED");

		// if (this.state.recordedChunks.length > 0) {
		// 	console.log(">>>> RECORDED CHUNKS", this.state.recordedChunks);
		// 	this.download(this.state.recordedChunks);
		// }
	}

	componentWillUnmount(): void {
		if (this.startTimer && this.stopTimer) {
			// window.clearInterval(this.startTimer);
			// window.clearInterval(this.stopTimer);
		}

		window.removeEventListener("mousemove", this.handleMouseMove);
		window.removeEventListener("resize", this.handleResize);

		console.log("... STAGE UNMOUNTED");
	}

	/**********************************************/

	// handleDataAvailable(event: { data: { size: number } }) {
	// 	console.log("data-available");
	// 	if (event.data.size > 0) {
	// 		this.setState((prevState) => ({
	// 			recordedChunks: [...prevState.recordedChunks, event.data],
	// 		}));
	// 		console.log(">>>> DATA", event.data);
	// 		// console.log(">>>> RECORDED CHUNKS", this.state.recordedChunks);
	// 		// this.download(event.data);
	// 	} else {
	// 		// …
	// 	}
	// }

	// download = (data:any) => {
	// 	const blob = new Blob(this.state.recordedChunks, {
	// 		type: "video/webm",
	// 	});		
	// 	// const blob = new Blob([data], {
	// 	// 	type: "video/webm",
	// 	// });
	// 	const url = URL.createObjectURL(blob);
	// 	const a = document.createElement("a");
	// 	document.body.appendChild(a);
	// 	a.style.display = "none";
	// 	a.href = url;
	// 	a.download = "test.webm";
	// 	a.click();
	// 	window.URL.revokeObjectURL(url);
	// 	document.body.removeChild(a); // Clean up by removing the element after use
	// };

	handleMouseMove() {}

	handleResize() {
		const canvas = this.canvasRef.current;

		if (canvas && this.stageManager) {
			canvas.style.width = "100%";
			canvas.style.height = "100%";

			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;

			this.stageManager.onResize(canvas.width, canvas.height);
		}
	}

	render() {
		return (
			<div style={this.props.style}>
				<canvas
					ref={this.canvasRef}
					style={{ position: "relative", width: "100%", height: "100%" }}
				></canvas>
				{this.props.children}
			</div>
		);
	}
}

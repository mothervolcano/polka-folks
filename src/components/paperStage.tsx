import { useRef, useEffect } from "react";

import { PaperScope } from "paper";

export const paper = new PaperScope();

const PaperStage = ({ onPaperLoad }: any) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef.current === null) {
			// TODO: handle null case
		} else {
			paper.install(window);
			paper.setup(canvasRef.current);
			onPaperLoad(true);
		}
	}, []);

	return (
		<canvas
			style={{ position: "relative", width: "100%", height: "100%" }}
			ref={canvasRef}
		></canvas>
	);
};

export default PaperStage;





class Plotter {

	
	private static instance = new Plotter();

	private _chart: any;


	constructor() {

		this._chart = new Map();
	};


	public static getInstance() {

		return this.instance;
	};


	public chart( hpts: any, LABEL: string ) {

		this._chart.set( hpts, { label: LABEL } ); 
	};


	public getPlot( LABEL: string ) {

		const plots = [];

		this._chart.forEach( ( plot, hpts ) => {

			if ( plot.label === LABEL ) {

				plots.push( hpts );
			}
		});

		return plots;
	};


	public clear() {

		this._chart.clear();
	}

}


export default Plotter;
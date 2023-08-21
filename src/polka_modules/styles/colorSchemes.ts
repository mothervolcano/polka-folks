export const RED = '#FF2957';
export const BLUE = '#02B7FD';
export const ORANGE = '#FFAE29';
export const YELLOW = '#FFE44F';
export const BLACK = '#000000';
export const DEBUG_GREEN = '#10FF0C';
export const GUIDE = '#06E7EF';



export const CHART = new Map([

   [ RED, { 
          	
        dark: { hex: '#660016', blendMode: 'normal' },
        contrast: { hex: '#02B7FD' }
    }],

    [ BLUE, {

    	dark: { hex: '#015779', blendMode: 'normal' },
    	contrast: { hex: '#FF2957' }
    }],

    [ ORANGE, {

    	dark: { hex: '#8F5800', blendMode: 'normal' },
    	contrast: { hex: '#FFE44F' }

    }],


    [ YELLOW, {

    	dark: { hex: '#A38B00', blendMode: 'normal' },
    	contrast: { hex: '#02B7FD' }

    }],


    [ BLACK, {

    	dark: { hex: '#660016', blendMode: 'normal' },
    	contrast: { hex: '#02B7FD' }

    }]
]);


export const defaultPolka = {

	skin: ORANGE,
	hair: BLACK,
	eyes: BLACK

}

export const baroquePolka = {

	skin: [ ORANGE, YELLOW, BLUE ],
	skinShade: null,
	hair: [ BLACK, ORANGE, YELLOW, BLUE, RED ],
	hairShade: null,
	eyes: BLACK

}

export const punkPolka = {

	skin: [ ORANGE, YELLOW, BLUE ],
	skinShade: null,
	hair: [ BLACK, ORANGE, YELLOW, BLUE, RED ],
	hairShade: null,
	eyes: BLACK

}

// export function getShadeOf( COLOR: string ) {


// }
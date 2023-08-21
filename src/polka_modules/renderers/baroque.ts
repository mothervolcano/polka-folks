import { Path, Group } from 'paper';

import * as colors from '../styles/colorSchemes'

import { applyShade, applyBlush } from '../../lib/topo/tools/shaders';

export const colorScheme = colors.baroquePolka;



export const renderFaceFeature = ( path, colorScheme, gradient ) => {

	console.log(`... RENDERING FACIAL FEATURE` );

	path.strokeColor = null;
	
	if ( gradient && gradient === 'RADIAL' ) {

		const shader = path;
		applyBlush( shader, colors.CHART.get( colorScheme.skin ).dark.hex, colors.CHART.get( colorScheme.skin ).dark.hex, colors.CHART.get( colorScheme.skin ).dark.blendMode, 0.25, 1 );
	}
	
	return path;
};


export const renderFace = ( path, colorScheme ) => {

	path.strokeColor = null;
	path.fillColor = colorScheme.skin;
	
	return path;
};


export const renderNose = ( path, colorScheme ) => {

	path.strokeColor = null;
	const shader = path.clone();

	const gradVector = new Path.Line( shader.segments[0].point, shader.segments[1].point );
	applyShade( shader, 'red', 'yellow', gradVector, 'normal', 0, 1 );

	return new Group( [ path, shader ] );
};


export const renderEar = ( path, colorScheme ) => {

	path.strokeColor = null;
	const shader = path.clone();
	shader.scale(0.66);

	const gradVector = new Path.Line( shader.segments[0].point, shader.segments[2].point );
	applyShade( shader, colors.CHART.get( colorScheme.skin ).dark.hex, colors.CHART.get( colorScheme.skin ).dark.hex, gradVector, colors.CHART.get( colorScheme.skin ).dark.blendMode, 0, 0.75 );

	path.fillColor = colorScheme.skin;

	return new Group( [ path, shader ] );
};


export const renderEye = ( path, colorScheme, gradient ) => {

	path.strokeColor = null;
	path.fillColor = colorScheme.eyes;

	return path;
}


export const renderHair = ( path, colorScheme, gradient ) => {

	path.strokeColor = null;

	if ( gradient ) {

		const shader = path;
		const gradVector = new Path.Line( shader.segments[1].point, shader.segments[3].point );
		
		applyShade( shader, colors.CHART.get( colorScheme.hair ).dark.hex, colors.CHART.get( colorScheme.hair ).dark.hex, gradVector, colors.CHART.get( colorScheme.hair ).dark.blendMode, 0, 0.75 );

	} else {

		path.fillColor = colorScheme.hair;
	}

	return path;
}
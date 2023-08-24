import { Path, Group } from 'paper';

import * as colors from '../styles/colorSchemes'

import { applyShade } from '../../lib/topo/tools/shaders';

export const colorScheme = colors.defaultPolka;

export const renderFace = ( path: any ) => {

	path.strokeColor = null;
	path.fillColor = colorScheme.skin;
	
	return path;
}

export const renderNose = ( path: any ) => {

	path.strokeColor = null;
	const shader = path.clone();

	const gradVector = new Path.Line( shader.segments[0].point, shader.segments[1].point );
	applyShade( shader, 'red', 'yellow', gradVector, 'normal', 0, 1 );

	return new Group( [ path, shader ] );
}

export const renderEar = ( path: any, side: any ) => {

	path.strokeColor = null;
	const shader = path.clone();
	shader.scale(0.66);

	const gradVector = new Path.Line( shader.segments[0].point, shader.segments[2].point );
	applyShade( shader, 'red', 'red', gradVector, 'normal', 0, 0.75 );

	path.fillColor = colorScheme.skin;

	return new Group( [ path, shader ] );
}


export const renderEye = ( path: any, side: any ) => {

	path.strokeColor = null;
	path.fillColor = colorScheme.eyes;

	return path;
}


export const renderHair = ( path: any, gradient: any ) => {

	path.strokeColor = null;

	if ( gradient ) {

		path.fillColor = colors.GUIDE;

	} else {

		path.fillColor = colorScheme.hair;
	}

	return path;
}
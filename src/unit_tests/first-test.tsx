import { Point, Path, Layer } from 'paper';

import HyperPoint from '../lib/topo/core/hyperPoint';
import Orbital from '../polka_modules/attractors/orbital';
import OrbitalField from '../polka_modules/attractors/orbitalField';
import Spine from '../polka_modules/attractors/spine';
import SpinalField from '../polka_modules/attractors/spinalField';

import { merge, measure, mid, curve } from '../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec, normalize } from '../lib/topo/utils/helpers';
import { convertToSegment } from '../lib/topo/utils/converters';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';




export function testSpinalFieldWithSpines( pos: any, params: any ) {


  const { radius=500, count=5, p4=0, p5=0, p6=0, p7=0, p8=0  } = params;


  const position = new HyperPoint(pos);
  const size = radius;
  const spineLength = radius/4;

  const spinalField = new SpinalField(position, size);

  const spines = [];

  for (let i = 0; i < count; i++) {

    spines.push( new Spine( spineLength ) );

  }

  spinalField.addAttractors( spines );

  // ---------------------

  spinalField.revolve( p5 );

  spinalField.expandBy( p6*radius, 'RAY');
  spinalField.expandBy( p7*radius, 'HOR');

  // ---------------------

  spinalField.addAttractor( new Spine( spineLength/2 ), p8 );

  // ---------------------

  const path = new Path({

    strokeColor: DEBUG_GREEN,
    closed: true

  })

  // --------------------

  const pts = spinalField.locate( 1 );

  for ( let i = 0; i<count; i++ ) {

    pts[i].scaleHandles(1/3).steer(p4);

    const pt = convertToSegment( pts[i] );

    path.add( pt );
  }
};


export function testSpinalFieldWithOrbitals( pos: any, params: any ) {


  const { radius=500, count=5, p4=0, p5=0, p6=0, p7=0, p8=0  } = params;

  const position = new HyperPoint(pos);
  const size = radius*2;
  const orbitalRadius = radius/6;

  const spinalField = new SpinalField(position, size);

  const orbitals = [];

  for (let i = 0; i < count; i++) {

    orbitals.push( new Orbital( orbitalRadius ) );

  }

  spinalField.addAttractors( orbitals );

  // ---------------------

  spinalField.revolve( p5 );

  spinalField.expandBy( p6*radius, 'RAY');
  spinalField.expandBy( p7*radius, 'HOR');

  // ---------------------

  spinalField.addAttractor( new Spine( orbitalRadius/2 ), p8 );

  // ---------------------

  const path = new Path({

    strokeColor: DEBUG_GREEN,
    closed: false

  })

  // --------------------

  const pts = spinalField.locate( 1 );

  for ( let i = 0; i<count; i++ ) {

    pts[i].scaleHandles(2/3).steer(p4);

    const pt = convertToSegment( pts[i] );

    path.add( pt );
  }
};


export function testOrbitalFieldWithSpines( pos: any, params: any ) {


  const { radius=100, count=5, p4=0, p5=0, p6=0, p7=0, p8=0  } = params;


  console.log(`@TEST: position: ${ pos }`);

  const position = new HyperPoint(pos);
  console.log(`@TEST: position as hyperPoint: ${ position.point }`);
  const size = radius;
  const spineLength = radius/2;

  const orbitalField = new OrbitalField(position, size);

  const spines = [];

  for (let i = 0; i < count; i++) {

    spines.push( new Spine( spineLength ) );

  }

  orbitalField.addAttractors( spines );

  // ---------------------

  orbitalField.revolve( p5 );

  orbitalField.expandBy( p6*radius, 'RAY');
  orbitalField.expandBy( p7*radius, 'HOR');

  // ---------------------

  orbitalField.addAttractor( new Spine( spineLength/2 ), p8 );

  // ---------------------

  const path = new Path({

    strokeColor: DEBUG_GREEN,
    closed: true

  })

  // --------------------

  const pts = orbitalField.locate( 1 );

  for ( let i = 0; i<count; i++ ) {

    pts[i].steer(p4);

    const pt = convertToSegment( pts[i] );

    path.add( pt );
  }
}

export function testOrbitalFieldWithOrbitals( pos: any, params: any ) {


  const { radius=100, count=5, p4=0, p5=0, p6=0, p7=0, p8=0 } = params;


  const position = new HyperPoint(pos);
  const size = radius;
  const orbitalRadius = radius/2;

  const orbitalField = new OrbitalField(position, size);

  const orbitals = [];

  for (let i = 0; i < count; i++) {

    orbitals.push( new Orbital( orbitalRadius ) );

  }

  orbitalField.addAttractors( orbitals );

  // ---------------------

  orbitalField.revolve( p5 );

  orbitalField.expandBy( p6*radius, 'RAY');
  orbitalField.expandBy( p7*radius, 'HOR');

  // ---------------------


  orbitalField.addAttractor(  new Orbital( orbitalRadius/2 ), p8 );


  // ---------------------

  const path = new Path({

    strokeColor: DEBUG_GREEN,
    closed: true

  })

  // --------------------

  const pts = orbitalField.locate( 1 );

  for ( let i = 0; i<count; i++ ) {

    pts[i].steer(p4);

    const pt = convertToSegment( pts[i] );

    path.add( pt );
  }

}


export function testOrbitalFieldWithOrbitalFields( pos: any, params: any ) {


  const { radius=100, count=5, p4=0, p5=0, p6=0, p7=0, p8=0 } = params;


  const position = new HyperPoint(pos);
  const zeroPos = new HyperPoint( new Point(0,0) );
  const size = radius;
  const orbitalRadius = radius/2.5;
 
  const orbitalField = new OrbitalField( position, size );

  const fields = [];

  for (let i = 0; i < count; i++) {

    const field = new OrbitalField( zeroPos, orbitalRadius );

    field.addAttractor( new Orbital( orbitalRadius/3 ) );
    field.addAttractor( new Orbital( orbitalRadius/3 ) );
    field.addAttractor( new Orbital( orbitalRadius/3 ) );
    field.addAttractor( new Orbital( orbitalRadius/3 ) );
    field.addAttractor( new Orbital( orbitalRadius/3 ) );

    fields.push( field );

  }

  orbitalField.addAttractors( fields );

  // ---------------------

  orbitalField.revolve( p5 );

  orbitalField.expandBy( p6*radius, 'RAY');
  orbitalField.expandBy( p7*radius, 'HOR');

  // // ---------------------


  // orbitalField.addAttractor(  new Orbital( orbitalRadius/2 ), p8 );


  // ---------------------

  const path = new Path({

    strokeColor: DEBUG_GREEN,
    closed: true

  })

  // --------------------

  const pts = orbitalField.locate( 1 );

  // for ( let i = 0; i<count; i++ ) {

  //   pts[i].steer(p4);

  //   const pt = convertToSegment( pts[i] );

  //   path.add( pt );
  // }

}





# The Polka Folks

Polka Folks is the testing ground for an evolving vector drawing framework exploring its aptitude for procedural generation.
They are ever-changing minimalistic characters in a generative playground, pursuing algorithmic life-like variation.

## Topo: A Vector Drawing Framework

### Concept

Topo offers a useful way to think about space when it comes to vector drawing. 

It owes the name to a field I still know very little about: Topology.

A topological space is a set of points operating under rules that define ‘closeness’ or ‘belonging’ without relying on spatial measurements. Understanding 'closeness' without physical distance is a bit mind-bending. So, perhaps, the simplest way to get one’s head around it is to think of all the points that are the same distance from one point. 

Yes, that’s a circle but for topology it doesn’t matter how far away, just the condition that they are all equidistant. 
You get the idea and for our purpose this is all the abstraction that is needed. Or not even that.

Imagine a canvas not as a passive background but as an active space defined by geometric entities like circles, squares, or curves.

These are not shapes in the usual sense, but rather 'magnetic coils' that define the properties of the points near them. Our framework uses these geometric entities to derive and relate points. You can view them as topological abstractions as me or, if you prefer a more pragmatic view, as geometry piggybacking on top of geometry. Couldn’t argue against that.

Now picture a traditional Cartesian space next to this topological-like space. Points in this 'activated' space have more going on than just x and y coordinates. They also carry vector information for tangents and normals, and how far they are along the perimeter from the origin point. Very handy for drawing Bezier curves. That’s also what I thought.

![Framework Concept Diagram](/docs/assets/concept-diagram.png)

I’ve called these ‘magnetic coils’, Attractors.

### Key Components

#### Attractors

Attractors are the 'magnetic coils' used as sources of points in space. They provide methods for locating points along their implicit paths and generate points that retain the original geometric properties at their original locations, such as tangent and normal vectors, for use by other components.

Currently, two types of Attractors are implemented:

* Orbital: Defined by a circumference.
* Spine: Defined by a straight line or curve.

The definition of an Attractor is intentionally left abstract and theoretical, allowing room for potential new Attractor types to be thought in the future.

![Attractor Concept Diagram](/docs/assets/attractor-diagram.png)

#### AttractorFields

An Attractor Field consists of a series of attractors organized around a common underlying attractor.

By default, these attractors are evenly distributed along the path that defines the geometry of the base attractor.

By design, they are intended to be configured, offering a variety of methods to control how attractors are arranged and transformed in relation to the base attractor.

Currently, two types of Attractor Fields are implemented:

* Orbital Field: The base attractor is an Orbital.
* Spinal Field: The base attractor is a Spine.

Both types allow for any combination of Orbitals and Spines to be added.

Additionally, it is possible to add Attractor Fields to other Attractor Fields, although this possibility hasn't been fully explored and tested.

![Attractor Field Concept Diagram](/docs/assets/field-diagram.png)

#### HyperPoints

A Hyperpoint is a point extracted from an Attractor, holding information about its position, tangent, normal, and other properties determined by the Attractor at the point of extraction.

The HyperPoint class also offers methods for manipulating and transforming the point along its tangent or normal vector.

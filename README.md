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

These are not shapes in the usual sense, but rather 'zones of influence' that define the properties of the points within them. Our framework uses these geometric entities to derive and relate points. You can view them as topological abstractions as me or, if you prefer a more pragmatic view, as geometry piggybacking on top of geometry. Couldn’t argue against that.

Now picture a traditional Cartesian space next to this topological-like space. Points in this 'activated' space have more going on than just x and y coordinates. They also carry vector information for tangents and normals, and how far they are along the perimeter from the origin point. Very handy for drawing Bezier curves. That’s also what I thought.

![Framework Concept Diagram](/docs/assets/concept-diagram.png)

I’ve called these ‘zone of influence’, Attractors.

### Key Concepts

#### Attractors

Attractors are fundamental geometric paths, such as circles or lines, that act as sources of points for drawing. Think of them as puppeteer's strings, guiding the creation and transformation of shapes. Each point extracted from an Attractor contains information about its coordinates, tangent, and normal vector, allowing the artist to "pull the strings" and manipulate the shapes in intricate ways. Just as a puppeteer can control a puppet's movements by adjusting the strings, Attractors can be transformed, rotated, resized, and skewed, giving creative control over the resulting shapes.

![Attractor Concept Diagram](/docs/assets/attractor-diagram.png)

#### AttractorFields

An AttractorField is a specialized Attractor that contains child attractors positioned along its path. It shares the same interface as an AttractorObject, enabling the location of points at specified locations across all child attractors. AttractorFields offer methods to control the arrangement of attractors in creative ways, providing a powerful mechanism for generating complex and unique geometric shapes and patterns.

![Attractor Field Concept Diagram](/docs/assets/field-diagram.png)

#### HyperPoints


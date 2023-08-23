# The Polka Folks

## Overview

Polka Folks is an experimental project focused on procedural generation of unique and creative character designs called Polkas. 

## Topo: A Vector Drawing System Framework

### Overview

Topo is built on top of Paper.js, designed to provide a particular and useful way of thinking about creating and manipulating shapes programmatically. It introduces the concept of Attractors and AttractorFields, geometric paths that serve as sources of points for drawing, allowing for complex shape creation and transformation. By abstracting the underlying complexity of point manipulation, Topo offers a flexible and intuitive approach to procedural generation, making it a powerful tool for visual creation.

### Key Concepts

#### Attractors

Attractors are fundamental geometric paths, such as circles or lines, that act as sources of points for drawing. Think of them as puppeteer's strings, guiding the creation and transformation of shapes. Each point extracted from an Attractor contains information about its coordinates, tangent, and normal vector, allowing the artist to "pull the strings" and manipulate the shapes in intricate ways. Just as a puppeteer can control a puppet's movements by adjusting the strings, Attractors can be transformed, rotated, resized, and skewed, giving creative control over the resulting shapes.

#### AttractorFields

An AttractorField is a specialized Attractor that contains child attractors positioned along its path. It shares the same interface as an AttractorObject, enabling the location of points at specified locations across all child attractors. AttractorFields offer methods to control the arrangement of attractors in creative ways, providing a powerful mechanism for generating complex and unique geometric shapes and patterns.

#### HyperPoints


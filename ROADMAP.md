# Roadmap

Currently the library simply adds convenience functions to opentype.js. We would like to see it evolve into a library that facilitates dynamic and responsive web design.

## Ideas

### Maintaining a constant text container width
If I am rendering text using a particular set of axis coordinates and I want to change the width of a string of text by a certain amount, what new set of axis coordinates can I use to accomplish that?
 
For example, suppose I have a font with weight and width axes. I am currently rendering text using weight = 0 (in normalized cords) and width = 1. If I want to change the width by -100 pixels at 30 ppem for a particular string of text, what normalized axis coordinates do I use? You can assume I only want to change the width axis. 

The solution might be a Newton-Raphson like search through the regions in the HVAR table. We have an algorithm for that in Python that would need to be converted to JavaScript. It would also require support for the HVAR table in opentype.js.


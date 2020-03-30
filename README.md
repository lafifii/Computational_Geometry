# [Computational Geometry](https://lafifii.github.io/Computational_Geometry/)

<p align="center">
<a href="https://imgflip.com/gif/3umg1m"><img src="https://i.imgflip.com/3umg1m.gif" title="made at imgflip.com"/></a>
</p>  

## Polygon Triangulation
In computational geometry, polygon triangulation is the decomposition of a polygonal area 
(simple polygon) P into a set of triangles, i.e., finding a set of triangles with 
pairwise non-intersecting interiors whose union is P.

This algorithm is runs in quadratic time and works only with simple polygons, it is based on the two ears theorem, 
as the fact that any simple polygon with at least 4 vertices without holes has at least two 'ears', 
which are triangles with two sides being the edges of the polygon and the third one completely inside it.
The algorithm then consists of finding such an ear, removing it from the polygon (which results in a new polygon that still meets the conditions) 
and repeating until there is only one triangle left. 

These steps gets us to a quadratic solution <img src="https://render.githubusercontent.com/render/math?math=O(n^2)">, n being the number of vertices of the polygon.
This is because we need to iterete over all vertices and check if they are ears, checking if one vertex is an ear also takes linear <img src="https://render.githubusercontent.com/render/math?math=O(n)"> time because we need to see if 
it does not intersect with other segment in the polygon. 



<p align="center">
<a href="https://imgflip.com/gif/3umhl2"><img src="https://i.imgflip.com/3umhl2.gif" title="made at imgflip.com"/></a>
</p>  

## Closest 2D Point with a Sweep Line Algorithm 

The closest pair of points problem or closest pair problem is a problem of computational geometry: given n points in metric space, 
find a pair of points with the smallest distance between them. A naive algorithm of checking every pair of point would take us to a img src="https://render.githubusercontent.com/render/math?math=O(n^2)">
solution, which is very slow for big inputs. 

Sweep Line Algorithms: This kind of algorithms rely on the idea of imagining that a line (often a vertical line) is swept or moved across the plane, stopping at some points. Geometric operations are restricted to geometric objects that either intersect or are in the immediate vicinity of the sweep line whenever it stops, and the complete solution is available once the line has passed over all objects.

Like this if we sort the list of points from left to right in the x axis and then for each point we check only points that are 
at most to the min distance, creating a box in which we can check other candidates. 
This can be done in <img src="https://render.githubusercontent.com/render/math?math=O(logn)"> time 
for every point and iterating over the points is linear. At the end we get a <img src="https://render.githubusercontent.com/render/math?math=O(nlogn)">

<p align="center">
<a href="https://imgflip.com/gif/3umi8m"><img src="https://i.imgflip.com/3umi8m.gif" title="made at imgflip.com"/></a>
</p>  

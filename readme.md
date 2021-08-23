## Hypercube XR - 2018  
#### by [Travis Bennett](https://travisbennett.com)  
___  
\
&nbsp;  
![Image for Hypercube XR](https://github.com/jerknose/hypercube-webXR-experience/blob/master/src/images/hypercube-2.gif?raw=true)  
  
For the 2018 Augmented World Expo, I teamed with Jasper Patterson to create a new immersive theater experience where conference attendees teamed up with our actors to solve an inter-dimensional love mystery.
  
This one of a kind show combined Real Actors, Physical Props and Sets, Full-Color 3d Scans, Mobile AR Puzzles, Live Motion Tracking, and a Virtual Reality Game.  
\
&nbsp;  
___  
[Demo](https://reckless.technology/archive/hypercube-webXR-experience/) • [More Info](https://travisbennett.com/all/hypercube-xr)  
___  
\
&nbsp;  
## Build and run with Docker  
___  
\
&nbsp;  
Build Docker project  
  
`docker build -t jerknose/hypercube-webxr-experience:1.0 .`  
  
Run / deploy instance  
  
`docker run -d -p 8080:8080 --name hypercube-webxr-experience jerknose/hypercube-webxr-experience:1.0`  
\
&nbsp;  
## Local Build Instructions  
___  
\
&nbsp;  
Install Dependancies  
  
`yarn install`  
  
Run Hot Development  
  
`npm run dev`  
  
Build / Run Production  
  
`npm run build`  
`npm run start`  
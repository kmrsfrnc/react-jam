import React from 'react';
import './App.css';
import bgImg from './img/world-1920x1200.jpg';
// particles
// our way
import WorldMap from './components/WorldMap';
// another way 1
import Particles from 'react-particles-js';
// another way 2
import ParticlesCodePen from './ParticlesCodePen'

function App() {
  return (
    <div className="App">

      <WorldMap />


      {/**  it works, but without names   */}
      <Particles
        params={{
          "particles": {
            "number": {
              "value": 50
            },
            "size": {
              "value": 3
            }
          },
          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              }
            }
          }
        }}
        style={{
          width: '100%',
          backgroundImage: `url(${bgImg})`
        }}
      />


      {/**  
      <ParticlesCodePen />
    */}


    </div>
  );
}

export default App;

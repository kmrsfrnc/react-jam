import React from 'react'
import worldMap from '../particles/worldMapParticles'

export default function WorldMap() {
    window.onload = function () {
        console.log("world map")
        worldMap();
    };

    return (
        <div className="world-map-container">
            <canvas id="tp__canvas" className="world-map" width={300} height={300} />
        </div>
    )
}

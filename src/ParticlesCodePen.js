// Inspired by Particles.js
import React from 'react';
import img from './img/world-1920x1200.jpg';

export default class ParticlesCodePen extends React.Component {
    componentDidMount() {
        this.generateParticles();
    }

    generateParticles = () => {
        const canvas = document.getElementById("particles");
        const ctx = canvas.getContext("2d");
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        let num = 50;
        let size = 1;
        let color = "#fff";
        let min_speed = 0.5;
        let max_speed = 1.0;
        let line_distance = 250;
        let particles = [];

        const random_int_between = (min, max) => {
            return Math.floor(Math.random() * max) + min;
        };

        const distance = (pointA, pointB) => {
            let dx = pointB.x - pointA.x;
            let dy = pointB.y - pointA.y;
            return Math.sqrt(dx * dx + dy * dy);
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;

                this.vx = random_int_between(min_speed, max_speed);
                this.vy = random_int_between(min_speed, max_speed);

                this.color = color;
                this.radius = Math.floor(Math.random() * 3) + 0.5;
            }
        }

        for (let i = 0; i < num; i++) {
            particles.push(new Particle());
        }

        const draw = () => {
            ctx.fillStyle = "#000";
            // ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Lets draw particles from the array now
            for (let t = 0; t < particles.length; t++) {
                // This particle
                let p = particles[t];

                for (let q = 0; q < particles.length; q++) {
                    // Check position distance
                    if (distance(particles[q], p) < line_distance) {
                        ctx.beginPath();
                        ctx.lineWidth = 0.2;
                        ctx.strokeStyle = "#fff";
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[q].x, particles[q].y);
                        ctx.stroke();
                    }
                }

                ctx.fillStyle = color;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, Math.PI * 2, false);
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < size) p.vx *= p.vx / -p.vx;
                if (p.y < size) p.vy *= p.vy / -p.vy;
                if (p.x > canvas.width - size) p.vx *= -p.vx / p.vx;
                if (p.y > canvas.height - size) p.vy *= -p.vy / p.vy;
            }

            requestAnimationFrame(draw);
        };

        draw();
    };
    render() {
        return (
            <div className="particles">
                <canvas id="particles"></canvas>
            </div>
        );
    }
}

// ReactDOM.render(<Particles />, document.getElementById('root'));
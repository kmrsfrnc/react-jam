// const worldMap = () => {
module.exports = function worldMap() {
    const canvas = document.getElementById("tp__canvas");
    console.log("canvas:", canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;
    let textParticles = {};
    let options = {};
    let textList = "Marty: Keyboard, Juan: Drums, Thomas: Chello, Ferenc: Bass, Nicholas: Guitar, Mary: Violin";

    class Particle {
        constructor(x, y, moveX, moveY, name, pColor, pSize, tColor, tSize) {
            this.pointX = x;
            this.pointY = y;
            this.moveX = moveX;
            this.moveY = moveY;
            this.name = name;
            this.particleSize = pSize;
            this.particleColor = pColor;
            this.textSize = tSize;
            this.textColor = tColor;
            this.halfTextWidth = 0;
        }

        plot() {
            ctx.beginPath();
            if (this.particleSize > 0) {
                ctx.arc(this.pointX, this.pointY, this.particleSize, 0, Math.PI * 2);
                ctx.fillStyle = this.particleColor;
                ctx.fill();
            }
            ctx.font = `${this.textSize}px Arial`;
            ctx.fillStyle = this.textColor;
            this.halfTextWidth = ctx.measureText(this.name).width / 2;
            ctx.fillText(this.name, this.pointX, this.pointY);

        }

        update() {
            if (this.pointX > canvas.width - this.halfTextWidth || this.pointX < this.halfTextWidth) this.moveX = -this.moveX;
            if (this.pointY > canvas.height || this.pointY < this.textSize) this.moveY = -this.moveY;
            this.pointX += this.moveX;
            this.pointY += this.moveY;
            this.plot();
        }
    }

    function accelerate() {
        // options = "";


        options.maxSpeed = 2; // number: positive speed
        options.minSpeed = -2; // number: negative speed
        options.particleColor = "orange"; //string
        options.particleSize = 1; // number: particle size, default=0 (not shown)
        options.textColor = "#dddddd"; // string

        options.textList = "Marty: Keyboard, Juan: Drums, Thomas: Chello, Ferenc: Bass, Nicholas: Guitar, Mary: Violin";
        // options.textList = (textList || "Marty: Keyboard, Juan: Drums, Thomas: Chello, Ferenc: Bass, Nicholas: Guitar, Mary: Violin").split(', '); // string: list of strings separated with a comma and a space
        // options.textList = ("Marty: Keyboard, Juan: Drums, Thomas: Chello, Ferenc: Bass, Nicholas: Guitar, Mary: Violin").split(', '); // string: list of strings separated with a comma and a space


        // options.textList = textList.split(', ');

        options.textSize = 24; // number: positive
        reset(options);
        window.requestAnimationFrame(animateFrameLoop);
    }

    function reset() {
        particlesArray = [];
        ctx.textAlign = "center";

        let txt = options.textList = "Marty: Keyboard, Juan: Drums, Thomas: Chello, Ferenc: Bass, Nicholas: Guitar, Mary: Violin";

        // let numberOfParticles = textList.length || 0; // was problem, put || 0
        let numberOfParticles = txt;


        let innerMargin = 100;

        let maxSpeed = 100;
        let minSpeed = 10;
        let particleColor = "#000";
        let textColor = "#fff";
        let particleSize = 1 + "rem";
        let textSize = 1 + "rem";

        for (let i = 0; i < numberOfParticles; i++) {
            let x = Math.random() * (canvas.width - innerMargin * 2) + innerMargin;
            let y = Math.random() * (canvas.height - innerMargin * 2) + innerMargin;
            let moveX = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            let moveY = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            particlesArray.push(new Particle(x, y, moveX, moveY, textList[i], particleColor, particleSize, textColor, textSize));
        }
    }

    function animateFrameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let len = particlesArray.length;
        for (let i = 0; i < len; i++) {
            particlesArray[i].update();
        }
        connect();
        window.requestAnimationFrame(animateFrameLoop);
    }

    function connect() {
        let opacity;
        // let rgb = 255;
        let area = canvas.width * canvas.height;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].pointX - particlesArray[b].pointX) * (particlesArray[a].pointX - particlesArray[b].pointX) +
                    (particlesArray[a].pointY - particlesArray[b].pointY) * (particlesArray[a].pointY - particlesArray[b].pointY));
                if (distance < area) {
                    opacity = 1 - distance / 40000;
                    ctx.strokeStyle = `rgba(255,255,255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].pointX, particlesArray[a].pointY);
                    ctx.lineTo(particlesArray[b].pointX, particlesArray[b].pointY);
                    ctx.stroke();
                }
            }
        }
    }

    window.addEventListener('resize',
        () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            reset(options);
        }
    );

    textParticles.accelerate = accelerate;

    let ok = textParticles.accelerate = accelerate;
    console.log(ok)
    // ok.call()
    // ok()

    // end outer function
}
// export default worldMap;

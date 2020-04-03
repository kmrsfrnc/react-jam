// module.exports = (function () {
module.exports = function () {
  const canvas = document.getElementById("tp__canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray;
  let textParticles = {};
  let options = {};

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

  function accelerate(opt) {
    options = opt;
    options.maxSpeed = opt.speed || 2; // number: positive speed
    options.minSpeed = -opt.speed || -2; // number: negative speed
    options.particleColor = opt.particleColor || "orange"; //string

    // options.particleSize = opt.particleSize || 0, // number: particle size, default=0 (not shown)
    options.particleSize = 1;

    options.textColor = opt.textColor || "#dddddd"; // string
    options.textList = (opt.textList || "Marty: Keyboard, Juan: Drums, Thomas: Chello, Natalia: Trombone, Ferenc: Bass, Nicholas: Guitar, Mary: Violin").split(', '); // string: list of strings separated with a comma and a space
    options.textSize = opt.textSize || 24; // number: positive
    reset(options);
    window.requestAnimationFrame(animateFrameLoop);
  }

  function reset(opt) {
    particlesArray = [];
    ctx.textAlign = "center";
    let numberOfParticles = opt.textList.length;
    let innerMargin = 100;
    for (let i = 0; i < numberOfParticles; i++) {
      let x = Math.random() * (canvas.width - innerMargin * 2) + innerMargin;
      let y = Math.random() * (canvas.height - innerMargin * 2) + innerMargin;
      let moveX = Math.random() * (opt.maxSpeed - opt.minSpeed) + opt.minSpeed;
      let moveY = Math.random() * (opt.maxSpeed - opt.minSpeed) + opt.minSpeed;
      particlesArray.push(new Particle(x, y, moveX, moveY, opt.textList[i], opt.particleColor, opt.particleSize, opt.textColor, opt.textSize));
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
    let rgb = 255;
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
}
// })();
// }());
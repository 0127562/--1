const canvas =
document.getElementById(
    "spaceCanvas"
);

const ctx =
canvas.getContext("2d");

let particles = [];

function resizeCanvas(){

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

class Particle{

    constructor(){

        this.x =
        Math.random() *
        canvas.width;

        this.y =
        Math.random() *
        canvas.height;

        this.radius =
        Math.random() * 4 + 1;

        this.speedX =
        (Math.random() - .5) * .3;

        this.speedY =
        (Math.random() - .5) * .3;

        this.color =
        [
            "#4da6ff",
            "#ff4d9d",
            "#8a5cff",
            "#66ffcc",
            "#ffd54d"
        ][
            Math.floor(
                Math.random() * 5
            )
        ];
    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0)
            this.x = canvas.width;

        if(this.x > canvas.width)
            this.x = 0;

        if(this.y < 0)
            this.y = canvas.height;

        if(this.y > canvas.height)
            this.y = 0;
    }

    draw(){

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
        this.color;

        ctx.fill();
    }
}

for(let i=0;i<120;i++){

    particles.push(
        new Particle()
    );
}

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.update();
        p.draw();
    });

    requestAnimationFrame(
        animate
    );
}

animate();
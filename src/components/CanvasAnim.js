import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap"; // GSAP 3 import

// Define getDistance function and Circle constructor before useEffect to avoid initialization issues
const getDistance = (p1, p2) => {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
};

const Circle = function (pos, rad, color, ctx) {
  this.pos = pos || null;
  this.radius = rad || null;
  this.color = color || null;
  this.active = 0;
  this.ctx = ctx; // Store ctx inside the Circle object
  this.draw = function () {
    if (!this.active) return;
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = `rgba(156,217,249,${this.active})`;
    this.ctx.fill();
  };
};

const shiftPoint = (p) => {
  // Using gsap.to() in GSAP 3
  gsap.to(p, {
    duration: 1 + Math.random(),
    x: p.originX - 50 + Math.random() * 100,
    y: p.originY - 50 + Math.random() * 100,
    ease: "circ.inOut", // Ease for animation
    onComplete: () => shiftPoint(p),
  });
};

const CanvasAnim = () => {
  const canvasRef = useRef(null);
  const [animateHeader, setAnimateHeader] = useState(true);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let points = [];
    let target = { x: width / 2, y: height / 2 };

    canvas.width = width;
    canvas.height = height;
    const largeHeader = document.getElementById("large-header");
    largeHeader.style.height = height + "px";

    for (let x = 0; x < width; x += width / 20) {
      for (let y = 0; y < height; y += height / 20) {
        const px = x + (Math.random() * width) / 20;
        const py = y + (Math.random() * height) / 20;
        const p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    points.forEach((p) => {
      p.circle = new Circle(
        p,
        2 + Math.random() * 2,
        "rgba(255,255,255,0.3)",
        ctx
      );
    });

    // Find the 5 closest points
    points.forEach((p1) => {
      const closest = [];
      points.forEach((p2) => {
        if (p1 !== p2) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      });
      p1.closest = closest;
    });

    // Assign circles to each point
    points.forEach((p) => {
      p.circle = new Circle(
        p,
        2 + Math.random() * 2,
        "rgba(255,255,255,0.3)",
        ctx
      );
    });

    const mouseMove = (e) => {
      const posx =
        e.pageX ||
        e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
      const posy =
        e.pageY ||
        e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      target.x = posx;
      target.y = posy;
    };

    const scrollCheck = () => {
      if (document.body.scrollTop > height) setAnimateHeader(false);
      else setAnimateHeader(true);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height + "px";
      canvas.width = width;
      canvas.height = height;
    };

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        points.forEach((point) => {
          if (Math.abs(getDistance(target, point)) < 4000) {
            point.active = 0.3;
            point.circle.active = 0.6;
          } else if (Math.abs(getDistance(target, point)) < 20000) {
            point.active = 0.1;
            point.circle.active = 0.3;
          } else if (Math.abs(getDistance(target, point)) < 40000) {
            point.active = 0.02;
            point.circle.active = 0.1;
          } else {
            point.active = 0;
            point.circle.active = 0;
          }

          drawLines(point);
          point.circle.draw();
        });
      }
      requestAnimationFrame(animate);
    };

    const drawLines = (p) => {
      if (!p.active) return;
      p.closest.forEach((closestPoint) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closestPoint.x, closestPoint.y);
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
        ctx.stroke();
      });
    };

    // Initialize animation and event listeners
    animate();
    points.forEach((point) => shiftPoint(point));
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("scroll", scrollCheck);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("scroll", scrollCheck);
      window.removeEventListener("resize", resize);
    };
  }, [animateHeader]);

  return (
    <div id="large-header" style={{ position: "relative", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        id="demo-canvas"
        style={{ position: "absolute" }}
      />
    </div>
  );
};

export default CanvasAnim;

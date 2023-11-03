import React, { useEffect } from 'react';
import './Background.css';

const Background = () => {
  function createRandomBubbleShape(i) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    const bubble = document.createElementNS(svgNS, "circle");
    bubble.setAttribute("class", "blob");
    bubble.setAttribute("cx", Math.random() * (i%2 ? (8-i) : i) * window.innerWidth); // Random horizontal position (adjust as needed)
    bubble.setAttribute("cy", Math.random() * (i%2 ? (8-i) : i) * window.innerHeight); // Random vertical position (adjust as needed)
    bubble.setAttribute("r", Math.random() * 50 + 200); // Random radius (20-70)
    
    // Reference the linear gradient for the bubble fill
    bubble.setAttribute("fill", "url(#bubbleGradient)");
    
    return bubble;
  }

  useEffect(() => {
    const createBackgroundContainer = () => {
      // Example usage:
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("height", "100%");
      svg.setAttribute("width", "100%");
      
      // Create the linear gradient within the "defs" element
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
      gradient.setAttribute("id", "bubbleGradient");
      gradient.setAttribute("x1", "0%");
      gradient.setAttribute("y1", "0%");
      gradient.setAttribute("x2", "0%");
      gradient.setAttribute("y2", "100%");
      
      // Define the gradient stops to match your wave-like colors
      const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      stop1.setAttribute("offset", "0%");
      stop1.setAttribute("style", `stop-color: #f3b800`);
      stop1.setAttribute("stop-opacity", "0.4");
      gradient.appendChild(stop1);
      
      const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      stop2.setAttribute("offset", "100%");
      stop2.setAttribute("style", `stop-color: #b64201`);
      stop2.setAttribute("stop-opacity", "0.4");
      gradient.appendChild(stop2);
      
      // Append the gradient to the "defs" element
      defs.appendChild(gradient);
      svg.appendChild(defs);
      
      const blobs = document.createElementNS("http://www.w3.org/2000/svg", "g");
      blobs.setAttribute("class", "random-shape");
      
      for (let i = 0; i < 10; i++) { // Generate 10 random bubbles (adjust as needed)
        const bubble = createRandomBubbleShape(i);
        blobs.appendChild(bubble);
      }
      
      svg.appendChild(blobs);
      document.querySelector(".background-container").appendChild(svg);
    };
    
    createBackgroundContainer();
  }, []);
  
  return (
    <div className="background-container"></div>
  );
};

export default Background;

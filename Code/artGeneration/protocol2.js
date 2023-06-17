function generateArt() {
    const degree = parseInt(document.getElementById("degree").value);
    const amplitude = parseInt(document.getElementById("amplitude").value);
    const frequency = parseFloat(document.getElementById("frequency").value);
    const phase = parseInt(document.getElementById("phase").value);
    const shiftX = parseInt(document.getElementById("shiftX").value);
    const shiftY = parseInt(document.getElementById("shiftY").value);
    const ellipseWidth = parseInt(document.getElementById("ellipseWidth").value);
    const ellipseHeight = parseInt(document.getElementById("ellipseHeight").value);
    const ellipseSpacing = parseFloat(document.getElementById("ellipseSpacing").value);
    const ellipseRotation = parseInt(document.getElementById("ellipseRotation").value);
  
    const svgContainer = document.getElementById("svgContainer");
    svgContainer.innerHTML = "";
  
    const width = svgContainer.clientWidth;
    const height = svgContainer.clientHeight;
  
    const points = [];
    for (let x = 0; x <= width; x += ellipseSpacing) {
        const radian = ((x + shiftX) * frequency + phase) * (Math.PI / 180);
        const y =
            height / 2 -
            amplitude * Math.pow(Math.sin(radian), degree / 2) +
            shiftY;
        points.push({ x, y });
    }
  
    for (let i = 0; i < points.length; i++) {
        const { x, y } = points[i];
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", x);
        ellipse.setAttribute("cy", y);
        ellipse.setAttribute("rx", ellipseWidth);
        ellipse.setAttribute("ry", ellipseHeight);
        ellipse.setAttribute("fill", "none");
        ellipse.setAttribute("stroke", "black");
        ellipse.setAttribute("stroke-width", "2");
        ellipse.setAttribute("transform", `rotate(${ellipseRotation}, ${x}, ${y})`);
        svgContainer.appendChild(ellipse);
    }
}

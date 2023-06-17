const canvas = document.getElementById("svgContainer");

document.getElementById("numShapes").addEventListener("input", function() {
    document.getElementById("numShapesValue").innerText = this.value;
    generateArt();
});

document.getElementById("opacity").addEventListener("input", function() {
    document.getElementById("opacityValue").innerText = this.value;
    generateArt();
});

// Add similar blocks for all the other sliders
document.getElementById("size").addEventListener("input", function() {
    document.getElementById("sizeValue").innerText = this.value;
    generateArt();
});

document.getElementById("randomness").addEventListener("input", function() {
    document.getElementById("randomnessValue").innerText = this.value;
    generateArt();
});

document.getElementById("numPoints").addEventListener("input", function() {
    document.getElementById("numPointsValue").innerText = this.value;
    generateArt();
});

document.getElementById("rotation").addEventListener("input", function() {
    document.getElementById("rotationValue").innerText = this.value;
    generateArt();
});

document.getElementById("scale").addEventListener("input", function() {
    document.getElementById("scaleValue").innerText = this.value;
    generateArt();
});

document.getElementById("patternRepetition").addEventListener("input", function() {
    document.getElementById("patternRepetitionValue").innerText = this.value;
    generateArt();
});

function generateArt() {
    // Clear the previous SVG
    const canvas = document.getElementById("svgContainer");
    canvas.innerHTML = '';

    // Create an SVG element
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "1200");
    svg.setAttribute("height", "1200");

    // Center of the canvas
    const centerX = 600;
    const centerY = 600;

    // Read the values from sliders
    const numShapes = document.getElementById("numShapes").value;
    const opacity = document.getElementById("opacity").value;
    const size = document.getElementById("size").value;
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value;
    const randomness = document.getElementById("randomness").value;
    const numPoints = document.getElementById("numPoints").value;
    const rotation = document.getElementById("rotation").value;
    const scale = document.getElementById("scale").value;
    const patternRepetition = document.getElementById("patternRepetition").value;
    const formula = document.getElementById("formula").value;
    const protocol = document.getElementById("protocol").value; // Get the selected protocol

    // Angle between each shape in the pattern (in radians)
    const angleIncrement = (Math.PI * 2) / patternRepetition;

    for (let i = 0; i < patternRepetition; i++) {
        const angle = i * angleIncrement;

        // Layering shapes
        for (let j = 0; j < numShapes; j++) {
            let shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");

            // Positioning for circular symmetry
            const radius = (j / (numShapes - 1)) * (size / 2);
            let x = centerX + radius * Math.cos(angle);
            let y = centerY + radius * Math.sin(angle);

            // Randomness in position
            x += randomness * (Math.random() - 0.5);
            y += randomness * (Math.random() - 0.5);

            // Adjust x and y based on the selected formula
            switch (formula) {
                case 'spiral':
                    const spiralFactor = j / numShapes;
                    x += spiralFactor * radius * Math.cos(j);
                    y += spiralFactor * radius * Math.sin(j);
                    break;
                case 'wave':
                    x += Math.sin(j) * randomness;
                    y += Math.cos(j) * randomness;
                    break;
                case 'flower':
                    const k = 5; // number of petals
                    const r = Math.cos(k * angle) * radius;
                    x = centerX + r * Math.cos(angle);
                    y = centerY + r * Math.sin(angle);
                    break;
            }

            // Adjust x and y based on the selected protocol
            switch (protocol) {
                case 'protocol1':
                    // Apply transformations specific to Protocol 1
                    break;
                case 'protocol2':
                    // Apply transformations specific to Protocol 2
                    break;
            }

            // Interpolate color based on layer
            const ratio = j / (numShapes - 1);
            const fillColor = interpolateColor(color1, color2, ratio);

            shape.setAttribute("cx", x);
            shape.setAttribute("cy", y);
            shape.setAttribute("r", (size / (2 * numShapes)) * (1 + Math.random() * randomness));
            shape.setAttribute("fill", fillColor);
            shape.setAttribute("fill-opacity", opacity / (j + 1)); // Decrease opacity for layers
            shape.setAttribute("transform", `rotate(${rotation * i} ${centerX} ${centerY}) scale(${scale})`);

            svg.appendChild(shape);
        }
    }

    canvas.appendChild(svg);
}





function interpolateColor(color1, color2, factor) {
    const a = parseInt(color1.slice(1, 3), 16);
    const b = parseInt(color1.slice(3, 5), 16);
    const c = parseInt(color1.slice(5, 7), 16);
    const d = parseInt(color2.slice(1, 3), 16);
    const e = parseInt(color2.slice(3, 5), 16);
    const f = parseInt(color2.slice(5, 7), 16);
    const red = Math.round(a + factor * (d - a));
    const green = Math.round(b + factor * (e - b));
    const blue = Math.round(c + factor * (f - c));
    return `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
}

// Call generateArt initially to populate the canvas
generateArt();

function downloadAsSVG() {
    const svgElement = document.querySelector("svg");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const blob = new Blob([source], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "artwork.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function downloadAsPNG() {
    const svgElement = document.querySelector("svg");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    canvas.width = svgElement.width.baseVal.value;
    canvas.height = svgElement.height.baseVal.value;
    const ctx = canvas.getContext("2d");
    
    const img = new Image();
    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngFile;
        downloadLink.download = "artwork.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    img.src = url;
}
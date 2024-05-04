import AWS from "aws-sdk";
import { useState } from "react";
import React from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const apiKey = "YpMNVgBXoa62vaaQzr5Js8cG";

  const uploadFile = async () => {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    alert("File uploaded");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const processImage = (imgSrc) => {
    const canvas
        = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = imgSrc; // Replace with your image path
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const blockSize = 10;
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for (let y = 0; y < image.height; y += blockSize) {
        for (let x = 0; x < image.width; x += blockSize) {
          let count = 0;
          for (let by = 0; by < blockSize; by++) {
            for (let bx = 0; bx < blockSize; bx++) {
              let idx = ((y + by) * image.width + (x + bx)) * 4;
              if (data[idx + 3] === 0) {
                count += 1;
              }
            }
          }
          if (count > 60) {
            let randomLetter = letters[Math.floor(Math.random() * letters.length)];
            ctx.font = "8px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(randomLetter, x + blockSize / 2 - 8, y + blockSize / 2 + 6);
          }
        }
      }
    };
  };

  const callRemoveBG = async () => {
    const formData = new FormData();
    formData.append("image_file", file, "sirivennala-pic");
    const response = fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      body: formData,
      headers: {
        "X-Api-Key": apiKey,
      },
    }).then((response) => {
      if (response.status !== 200) {
        return console.error("Error:", response.status, response.statusText);
      }
      response.blob().then((blob) => {
        var imageUrl = URL.createObjectURL(blob);
        processImage(imageUrl);
      });
    });
  };

  return (
      <div className="App">
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
        <button onClick={callRemoveBG}>Call Remove BG</button>
        <div style={{ position: "relative", zIndex: 1 }}>
          <canvas id="canvas"></canvas>
        </div>
      </div>
  );
}

export default App;

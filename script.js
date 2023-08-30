const imageInput = document.getElementById('imageInput');
const uploadedImage = document.getElementById('uploadedImage');
const measurementTool = document.getElementById('measurementTool');
const imageCanvas = document.getElementById('imageCanvas');
const measureButton = document.getElementById('measureButton');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const measurementLabel = document.getElementById('measurementLabel');
const measurementLabelText = document.getElementById('measurementLabelText');
const cancelButton = document.getElementById('cancelButton');
const closeButton = document.getElementById('closeButton');
const helpButton = document.getElementById('helpButton');

let isMeasuring = false;
let startX = 0;
let endX = 0;
let lineWidth = 0;
let imageScale = 1;

imageInput.addEventListener('change', handleImageUpload);
measureButton.addEventListener('click', startMeasurement);
clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveMeasurement);
cancelButton.addEventListener('click', cancelMeasurement);
closeButton.addEventListener('click', closeMeasurement);
helpButton.addEventListener('click', showHelp);

function handleImageUpload(event) {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    uploadedImage.src = imageUrl;
    measurementTool.style.display = 'block';
  }
  
  function startMeasurement() {
    isMeasuring = true;
    startX = event.clientX - imageCanvas.getBoundingClientRect().left;
  }
  
  function clearCanvas() {
    const canvasContext = imageCanvas.getContext('2d');
    canvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    uploadedImage.style.transform = 'scale(1)';
    measurementLabelText.textContent = '';
  }
  
  function saveMeasurement() {
    if (lineWidth > 0) {
      // Implement your logic to save the measurement (e.g., send to server, store locally)
      measurementLabelText.textContent = `Measured width: ${lineWidth.toFixed(2)} units`;
    }
  }
  
  function cancelMeasurement() {
    isMeasuring = false;
    clearCanvas();
    measurementLabel.style.display = 'none';
  }
  
  function closeMeasurement() {
    clearCanvas();
    measurementLabel.style.display = 'none';
  }
  
  function showHelp() {
    function showHelp() {
        const helpText = "Welcome to the Image Measurement Tool!\n\n" +
          "1. Upload an image using the 'Select an image to measure' button.\n" +
          "2. Click and drag on the image to measure the width of an object.\n" +
          "3. Click the 'Measure' button to complete the measurement.\n" +
          "4. You can clear the canvas using the 'Clear' button.\n" +
          "5. To save the measurement, click the 'Save' button.\n" +
          "6. To cancel a measurement, click the 'Cancel' button.\n" +
          "7. To close the measurement label, click the 'Close' button.\n" +
          "8. For more information, click the 'Help' button again.";
      
        // Display the help information using an alert or a custom modal
        alert(helpText);
      }
  }
  

imageInput.addEventListener('change', handleImageUpload);
measureButton.addEventListener('click', measureWidth);

function handleImageUpload(event) {
  const file = event.target.files[0];
  const imageUrl = URL.createObjectURL(file);
  uploadedImage.src = imageUrl;
  measurementTool.style.display = 'block';
}

function measureWidth() {
  const canvasContext = imageCanvas.getContext('2d');
  imageCanvas.width = uploadedImage.width;
  imageCanvas.height = uploadedImage.height;
  canvasContext.drawImage(uploadedImage, 0, 0);

  let isMeasuring = false;
let startX = 0;
let endX = 0;
let lineWidth = 0;

imageCanvas.addEventListener('mousedown', startMeasurement);
imageCanvas.addEventListener('mousemove', updateMeasurement);
imageCanvas.addEventListener('mouseup', endMeasurement);

// The user starts the measurement by clicking on the canvas
function startMeasurement(event) {
  isMeasuring = true;
  startX = event.clientX - imageCanvas.getBoundingClientRect().left;
}

// While the user moves the mouse, update the measurement line
function updateMeasurement(event) {
  if (isMeasuring) {
    const canvasX = event.clientX - imageCanvas.getBoundingClientRect().left;
    drawMeasurementLine(startX, canvasX);
    endX = canvasX;
  }
}

// The user ends the measurement by releasing the mouse button
function endMeasurement() {
  if (isMeasuring) {
    isMeasuring = false;
    lineWidth = Math.abs(endX - startX);
    // Calculate the real-world width based on the image's scale
    const realWorldWidth = lineWidth / imageScale;
    console.log(`Measured width: ${realWorldWidth} units`);
  }
}

// Draw the measurement line on the canvas
function drawMeasurementLine(x1, x2) {
  const context = imageCanvas.getContext('2d');
  context.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  context.drawImage(uploadedImage, 0, 0);
  
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 2;
  context.moveTo(x1, 0);
  context.lineTo(x2, imageCanvas.height);
  context.stroke();
}

// Update imageScale based on user interaction with a contrast ball (example)
contrastBall.addEventListener('click', () => {
  // Update imageScale based on the measurement of the contrast ball in real-world units
  const contrastBallRealWidth = 20; // Measure the real width of the contrast ball
  imageScale = contrastBallRealWidth / contrastBallReferenceWidth; // Adjust the image scale
  uploadedImage.style.transform = `scale(${imageScale})`; // Apply the new scale
});

function endMeasurement() {
    if (isMeasuring) {
      isMeasuring = false;
      lineWidth = Math.abs(endX - startX);
      // Calculate the real-world width based on the image's scale
      const realWorldWidth = lineWidth / imageScale;
      console.log(`Measured width: ${realWorldWidth} units`);

      
      // Display the measurement in a label
      displayMeasurement(realWorldWidth);
    
    }
  }
  
  function displayMeasurement(widthInUnits) {
    const measurementLabel = document.getElementById('measurementLabel');
    measurementLabel.textContent = `Measured width: ${widthInUnits.toFixed(2)} units`;
    measurementLabel.style.display = 'block';
    measurementLabelText.textContent = `Measured width: ${widthInUnits.toFixed(2)} units`;
  }
  
 
  
  uploadedImage.style.transform = `scale(${imageScale})`;

  function cancelMeasurement() {
    isMeasuring = false;
    clearCanvas();
    measurementLabel.style.display = 'none';
  }
}

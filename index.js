const fileInput = document.querySelector("input");
const dragArea = document.getElementById("dragArea");
const imagePreview = document.getElementById("imagePreview");

dragArea.addEventListener("click", function() {
  fileInput.click();
});

function preventDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}

dragArea.addEventListener("dragenter", preventDefault);
dragArea.addEventListener("dragleave", preventDefault);
dragArea.addEventListener("dragover", preventDefault);
dragArea.addEventListener("drop", preventDefault);

dragArea.addEventListener("drop", (event) => {
  let files = event.dataTransfer.files;
  checkFileType(files);
});

fileInput.addEventListener("change", () => {
  let files = fileInput.files;
  checkFileType(files);
});

function checkFileType(files) {
  let validTypes = ["image/jpeg", "image/png", "image/gif"];
  for (let i = 0; i < files.length; i++) {
    let fileType = files[i].type;

    if (validTypes.includes(fileType)) {
      displayImage(files[i]);
    }
  }
}

function displayImage(image) {
  imagePreview.style.display = "block";

  let figure = document.createElement("figure");
  let img = document.createElement("img");

  figure.append(img);
  imagePreview.append(figure);

  figure.addEventListener("click", removeImage);

  let fileReader = new FileReader();

  fileReader.onload = (event) => {
    img.src = event.target.result;
  };

  fileReader.readAsDataURL(image);
}

function removeImage(event) {
  event.stopPropagation();
  let deletedImage = event.currentTarget;
  deletedImage.classList.add("zoomOut");

  setTimeout(() => {
    imagePreview.removeChild(deletedImage);

    if (imagePreview.children.length == 0) {
      imagePreview.style.display = "none";
    }
  }, 450);
}

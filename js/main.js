import "../css/style.css";

function saveToLocalStorage(editableElements) {
  editableElements.forEach((element, index) => {
    localStorage.setItem(index, element.innerHTML);
  });
}

function loadFromLocalStorage(editableElements) {
  Array.from(editableElements).forEach((element, index) => {
    const savedContent = localStorage.getItem(index);
    if (savedContent) {
      element.innerHTML = savedContent;
    }
  });
}

function mainModeVisibilty(downloadBtn, editBtn, saveBtn, cancelBtn) {
  downloadBtn.style.display = "inline";
  editBtn.style.display = "inline";
  saveBtn.style.display = "none";
  cancelBtn.style.display = "none";
}

function main() {
  const downloadBtn = document.getElementById("downloadBtn");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const editableElements = document.querySelectorAll(".editable");

  document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

  downloadBtn.addEventListener("click", function () {
    const cvContent = document.getElementById("bentoContainer");
    var opt = {
      margin: 1,
      filename: "CV.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(cvContent).save();
  });

  editBtn.addEventListener("click", function () {
    saveToLocalStorage(editableElements);

    editableElements.forEach((elem) => {
      elem.setAttribute("contenteditable", "true");
    });
    downloadBtn.style.display = "none";
    editBtn.style.display = "none";
    saveBtn.style.display = "inline";
    cancelBtn.style.display = "inline";
  });

  saveBtn.addEventListener("click", () => {
    editableElements.forEach((element, index) => {
      localStorage.setItem(index, element.innerHTML);
      element.contentEditable = "false";
    });
    mainModeVisibilty(downloadBtn, editBtn, saveBtn, cancelBtn);
  });

  cancelBtn.addEventListener("click", () => {
    editableElements.forEach((element, index) => {
      const initialContent = localStorage.getItem(index);
      element.innerHTML = initialContent;
      element.contentEditable = "false";
    });
    mainModeVisibilty(downloadBtn, editBtn, saveBtn, cancelBtn);
  });
}
main();

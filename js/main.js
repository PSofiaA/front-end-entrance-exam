import "../css/style.css";

function main() {
  const downloadBtn = document.getElementById("downloadBtn");

  downloadBtn.addEventListener("click", function () {
    console.log("clicked");
    const cvContent = document.getElementById("bentoContainer");
    var opt = {
      margin: 1,
      filename: "CV.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(cvContent).save();
  });
}
main();

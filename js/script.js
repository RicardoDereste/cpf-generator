const cpfEl = document.getElementById("cpf");
const generateCpfBtn = document.getElementById("generate-cpf");
const copyCpfBtn = document.getElementById("copy-cpf");

// Function to generate random CPF
function gerenateCPF() {
  let n = Math.floor(Math.random() * 999999999) + 1;
  let nStr = n.toString().padStart(9, "0");
  let dv1 = calculateDV(nStr, 10);
  let dv2 = calculateDV(nStr + dv1, 11);

  cpfEl.innerText = formatCPF(nStr + dv1 + dv2);
}

function calculateDV(number, weight) {
  let total = 0;
  for (let i = 0; i < number.length; i++) {
    total += parseInt(number.charAt(i)) * weight--;
  }
  let rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function formatCPF(cpf) {
  const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return cpf.replace(cpfRegex, "$1.$2.$3-$4");
}

// Function to copy CPF to clipboard
function copyCPF() {
  const cpf = cpfEl.innerText;
  navigator.clipboard.writeText(cpf).then(
    () => {
      alert(`CPF ${cpf} copied to clipboard!`);
    },
    (err) => {
      console.error("Error copying CPF: ", err);
    }
  );
}

generateCpfBtn.addEventListener("click", gerenateCPF);
copyCpfBtn.addEventListener("click", copyCPF);

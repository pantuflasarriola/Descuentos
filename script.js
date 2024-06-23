document.addEventListener('DOMContentLoaded', function() {
  const codigoForm = document.getElementById('redeem-btn');
  codigoForm.addEventListener('click', function(event) {
    event.preventDefault();
    canjearCodigo();
  });
});

const validCodes = [];
for (let i = 100; i <= 100000; i++) {
  validCodes.push(`PREM${i}`);
}
const usedCodes = new Set();

const prizes = [
  { name: '10% de descuento', prefix: 'AR10', probability: 0.40 },
  { name: '5% de descuento', prefix: 'AR5', probability: 0.30 },
  { name: '25% de descuento', prefix: 'AR25', probability: 0.27 },
  { name: 'Regalo Sorpresa', prefix: 'ARRE', probability: 0.03 }
];

function canjearCodigo() {
  const codigoInput = document.getElementById('code-input');
  const codigo = codigoInput.value.trim().toUpperCase();

  if (!validCodes.includes(codigo)) {
    alert('El código ingresado no es válido. Inténtalo de nuevo.');
    return;
  }

  if (usedCodes.has(codigo)) {
    alert('Este código ya ha sido utilizado.');
    return;
  }

  const premio = obtenerPremio();
  const codigoCanje = generarCodigoCanje(premio);

  mostrarMensaje(`¡FELICIDADES! HAS OBTENIDO ${premio.name} EN TU PRÓXIMA COMPRA.`, codigoCanje);

  usedCodes.add(codigo);
  codigoInput.value = '';
}

function obtenerPremio() {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const prize of prizes) {
    cumulativeProbability += prize.probability;
    if (random < cumulativeProbability) {
      return prize;
    }
  }

  return prizes[prizes.length - 1];
}

function generarCodigoCanje(premio) {
  const randomNum = Math.floor(Math.random() * 1000000) + 100;
  return `${premio.prefix}${randomNum.toString().padStart(5, '0')}`;
}

function mostrarMensaje(mensaje, codigoCanje) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  const couponCodeElement = document.getElementById('coupon-code');
  const validityMessage = document.getElementById('validity-message');

  modalMessage.textContent = mensaje;
  couponCodeElement.textContent = `CANJE: ${codigoCanje}`;
  const fecha = new Date();
  const fechaCanje = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
  validityMessage.textContent = `Promoción válida durante un mes (${fechaCanje})`;

  lanzarConfetti();

  modal.style.display = 'block';

  const closeButton = document.getElementsByClassName('close-button')[0];
  closeButton.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}

function lanzarConfetti() {
  const confettiContainer = document.getElementById('confetti-container');
  const colors = ['#ff00ff', '#9400d3', '#ff69b4', '#ff1493', '#ff6347'];

  for (let i = 0; i < 100; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti-piece');
    confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confettiPiece.style.left = `${Math.random() * 100}vw`;
    confettiPiece.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confettiPiece.style.opacity = Math.random();
    confettiContainer.appendChild(confettiPiece);
  }

  setTimeout(() => {
    confettiContainer.innerHTML = '';
  }, 5000);
}

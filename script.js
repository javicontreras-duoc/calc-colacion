document.getElementById('colacionForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const entrada = document.getElementById('horaEntrada').value;
  const salida = document.getElementById('horaSalida').value;

  if (!entrada || !salida) return;

  const [hEnt, mEnt] = entrada.split(':').map(Number);
  const [hSal, mSal] = salida.split(':').map(Number);

  let minEntrada = hEnt * 60 + mEnt;
  let minSalida = hSal * 60 + mSal;

  // Si el turno termina al día siguiente (ej. 18:00 a 02:00)
  if (minSalida <= minEntrada) {
    minSalida += 24 * 60;
  }

  const duracionTotalHoras = (minSalida - minEntrada) / 60;
  let mensaje = "";

  if (duracionTotalHoras < 5) {
    mensaje = "No corresponde tiempo de colación (menos de 5 horas).";
  } else if (duracionTotalHoras <= 7.5) {
    mensaje = "Corresponde **30 minutos (0:30)** de colación.";
  } else {
    mensaje = "Corresponde **1 hora (1:00)** de colación.";
  }

  const divResultado = document.getElementById('resultado');
  divResultado.innerHTML = `<p>${mensaje}</p><small>Duración total del turno: ${duracionTotalHoras.toFixed(1)} hrs</small>`;
});
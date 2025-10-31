// Registrando o service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg = await navigator.serviceWorker.register('sw.js', { type: 'module' });
      console.log('✅ Service worker registrado:', reg);
    } catch (err) {
      console.log('❌ O Service worker registro falhou:', err);
    }
  });
}

// Configurando as restrições do vídeo stream
var constraints = { video: { facingMode: 'user' }, audio: false };

// Capturando os elementos da câmera
var cameraView = document.querySelector('#camera--view'),
  cameraOutput = document.querySelector('#camera--output'),
  cameraSensor = document.querySelector('#camera--sensor'),
  cameraTrigger = document.querySelector('#camera--trigger');

// Estabelecendo o acesso à câmera e inicializando a visualização
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error('Ocorreu um erro.', error);
    });
}

// Função para tirar foto
cameraTrigger.onclick = function () {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext('2d').drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL('image/webp');
  cameraOutput.classList.add('taken');
};

// Iniciar a câmera quando a janela carregar
window.addEventListener('load', cameraStart, false);

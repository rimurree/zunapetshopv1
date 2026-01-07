import { DotLottie } from 'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.54.1/+esm'

try {
  new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.getElementById('canvas'),
    src: '/loading.json',
  })
} catch (e) {}

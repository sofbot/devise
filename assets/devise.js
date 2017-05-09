document.addEventListener('DOMContentLoaded', () => {
  const googlePlay = document.getElementById('google-play');
  googlePlay.onclick = () => {
    window.alert("Coming soon!");
  };
  const demoButton = document.getElementById('demo-btn');
  const demo = document.getElementById('demo');
  demoButton.onclick = () => window.scrollBy(0, window.innerHeight);
  // demoButton.onclick = () => demo.scrollIntoView({ behavior: 'smooth' });
});

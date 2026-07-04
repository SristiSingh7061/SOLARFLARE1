// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.cssText += 'position:absolute;top:72px;left:0;right:0;flex-direction:column;background:#0B0E14;padding:24px 32px;border-bottom:1px solid rgba(232,236,241,0.08);gap:20px;';
});

// Live UTC clock
function updateClock(){
  const now = new Date();
  document.getElementById('clock').textContent = now.toISOString().substr(11,8) + ' UTC';
}
updateClock();
setInterval(updateClock, 1000);

// Simulated live readout — cycles through mock flare data
const mockData = [
  { cls: 'M1.4', region: 'AR3921', eta: '41 min', conf: '78%' },
  { cls: 'C7.8', region: 'AR3921', eta: '—',      conf: '65%' },
  { cls: 'X1.1', region: 'AR3925', eta: '18 min', conf: '84%' },
  { cls: 'M4.6', region: 'AR3918', eta: '55 min', conf: '71%' },
];
let mi = 0;
function cycleReadout(){
  const d = mockData[mi % mockData.length];
  document.getElementById('flare-class').textContent = d.cls;
  document.getElementById('region').textContent = d.region;
  document.getElementById('eta').textContent = d.eta;
  document.getElementById('conf').textContent = d.conf;
  mi++;
}
setInterval(cycleReadout, 4000);

// Cursor parallax — sun/earth scene shifts and tilts with mouse movement
const heroSection = document.querySelector('.hero');
const scene = document.getElementById('solarScene');
let targetX = 0, targetY = 0, curX = 0, curY = 0;

if (heroSection && scene) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = nx * 26;
    targetY = ny * 18;
  });
  heroSection.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });

  function animateParallax(){
    curX += (targetX - curX) * 0.08;
    curY += (targetY - curY) * 0.08;
    scene.style.transform = `translate(${curX}px, ${curY}px) rotateX(${(-curY * 0.4).toFixed(2)}deg) rotateY(${(curX * 0.4).toFixed(2)}deg)`;
    requestAnimationFrame(animateParallax);
  }
  animateParallax();
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
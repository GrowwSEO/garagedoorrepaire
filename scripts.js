/* ── FAQ ACCORDION ── */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── MOBILE NAV TOGGLE ── */
function toggleNav() {
  const links = document.getElementById('nav-links');
  const toggle = document.querySelector('.nav-toggle');
  if (!links) return;
  links.classList.toggle('nav-open');
  toggle.classList.toggle('nav-toggle-open');
}

document.addEventListener('click', function(e) {
  const links = document.getElementById('nav-links');
  const toggle = document.querySelector('.nav-toggle');
  if (links && links.classList.contains('nav-open')) {
    if (!links.contains(e.target) && toggle && !toggle.contains(e.target)) {
      links.classList.remove('nav-open');
      toggle.classList.remove('nav-toggle-open');
    }
  }
});

/* ── BOOKING FORM ── */
const SERVICES = [
  { id: 'two-springs',     name: 'Two Spring Replacement',         price: '$475',   note: 'Flat rate — no service fee' },
  { id: 'one-spring',      name: 'One Spring Replacement',         price: '$350',   note: 'Flat rate — no service fee' },
  { id: 'cable',           name: 'Cable Replacement',              price: '$275',   note: 'Flat rate — no service fee' },
  { id: 'cable-bracket',   name: 'Cable + Bottom Bracket',         price: '$375',   note: 'Flat rate — no service fee' },
  { id: 'opener-6690',     name: 'Opener Install — Model 6690',    price: '$1,050', note: '+$75 for 8\' rail • accessories included' },
  { id: 'opener-6580',     name: 'Opener Install — Model 6580',    price: '$950',   note: '+$75 for 8\' rail • accessories included' },
  { id: 'opener-2220',     name: 'Opener Install — Model 2220',    price: '$750',   note: '+$75 for 8\' rail • accessories included' },
  { id: 'off-track-minor', name: 'Minor Off-Track Repair',         price: '$275',   note: 'Service fee included' },
  { id: 'off-track-major', name: 'Major Off-Track Repair',         price: '$375',   note: 'Service fee included' },
  { id: 'spring-pad',      name: 'Spring Pad Replacement',         price: '$250',   note: '$125 service fee if only repair' },
  { id: 'framing',         name: 'Framing',                        price: '$450',   note: '$125 service fee if only repair' },
  { id: 'other',           name: 'Other / Not Sure',               price: 'TBD',    note: 'Technician will quote on-site' }
];

let currentStep = 1;
let selectedService = null;

function initBooking() {
  const grid = document.getElementById('service-option-grid');
  if (!grid) return;

  grid.innerHTML = SERVICES.map(s => `
    <div class="service-option" data-id="${s.id}" onclick="selectService('${s.id}')">
      <div class="service-option-left">
        <div class="service-option-name">${s.name}</div>
        <div class="service-option-note">${s.note}</div>
      </div>
      <div class="service-option-price">${s.price}</div>
    </div>
  `).join('');

  goToStep(1);
}

function selectService(id) {
  selectedService = SERVICES.find(s => s.id === id);
  document.querySelectorAll('.service-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === id);
  });
  const bar = document.getElementById('price-summary');
  if (bar && selectedService) {
    bar.querySelector('.price-summary-service').textContent = selectedService.name;
    bar.querySelector('.price-summary-amount').textContent = selectedService.price;
    bar.classList.add('visible');
  }
  document.getElementById('step1-next').disabled = false;
}

function goToStep(n) {
  currentStep = n;
  document.querySelectorAll('.booking-step-content').forEach((el, i) => {
    el.classList.toggle('active', i + 1 === n);
  });
  document.querySelectorAll('.booking-step-tab').forEach((el, i) => {
    el.classList.remove('active', 'done');
    if (i + 1 === n) el.classList.add('active');
    if (i + 1 < n) el.classList.add('done');
  });
  const panel = document.getElementById('booking-panel');
  if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function checkDisclaimers() {
  const d1 = document.getElementById('disc1');
  const d2 = document.getElementById('disc2');
  const btn = document.getElementById('step2-next');
  if (btn) btn.disabled = !(d1 && d1.checked && d2 && d2.checked);
}

function submitBooking(e) {
  e.preventDefault();
  goToStep(4);
}

document.addEventListener('DOMContentLoaded', initBooking);

/* ── ACTIVE NAV STATE ── */
document.addEventListener('DOMContentLoaded', function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links > li > a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (!href) return;

    const isActive =
      href === page ||
      (page === '' && href === 'index.html') ||
      (page.startsWith('service-') && href === 'services.html');

    if (isActive) a.classList.add('active');
  });
});

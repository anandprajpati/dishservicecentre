const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => navMenu.classList.toggle("open"));
document.querySelectorAll("#navMenu a").forEach(link => link.addEventListener("click", () => navMenu.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
if(revealEls.length){
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
  }, {threshold: 0.12});
  revealEls.forEach(el => revealObserver.observe(el));
}

// Counter animation
const counters = document.querySelectorAll(".counter-num");
if(counters.length){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if(current >= target){ current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 16);
      observer.unobserve(el);
    });
  }, {threshold: 0.5});
  counters.forEach(c => observer.observe(c));
}
document.querySelectorAll(".faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const isOpen = btn.classList.contains("open");
    document.querySelectorAll(".faq-q").forEach(b => { b.classList.remove("open"); b.nextElementSibling.classList.remove("open"); });
    if (!isOpen) { btn.classList.add("open"); btn.nextElementSibling.classList.add("open"); }
  });
});

const form = document.getElementById("bookingForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const appliance = document.getElementById("appliance").value;
  const problem = document.getElementById("problem").value.trim();

  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert("Please enter a valid 10-digit Indian mobile number.");
    return;
  }

  // Replace this number with the business's real WhatsApp number.
  const businessWhatsApp = "917021852689";

  const message =
    `Hello Disha Service,%0A%0A` +
    `I want to book an appliance repair.%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Appliance: ${encodeURIComponent(appliance)}%0A` +
    `Problem: ${encodeURIComponent(problem || "Not specified")}`;

  window.open(`https://wa.me/${businessWhatsApp}?text=${message}`, "_blank");
});
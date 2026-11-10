const grades = {
  1: [
    ["COMP 1406 · Intro to Computer Science II", "A+"],
    ["COMP 1405 · Intro to Computer Science I", "A"],
    ["COMP 1805 · Discrete Structures I", "A−"],
    ["MATH 1104 · Linear Algebra", "A+"],
    ["MATH 1007 · Elementary Calculus I", "A−"],
    ["PHYS 1901 · Planetary Astronomy", "A+"],
    ["PHYS 1902 · From our Star to the Cosmos", "A+"],
    ["ERTH 2401 · Dinosaurs", "A+"],
    ["FILM 1101 · Intro to Film Studies", "A"],
    ["RELI 2510 · Hinduism", "A−"]
  ],
  2: [
    ["COMP 2401 · Intro to Systems Programming", "In progress"],
    ["COMP 2402 · Abstract Data Types and Algorithms", "In progress"],
    ["COMP 2804 · Discrete Structures II", "In progress"],
    ["STAT 2507 · Intro to Statistical Modeling I", "In progress"],
    ["BIOL 1010 · Biotechnology and Society", "In progress"],
    ["COOP 1000 · Co-op Preparation", "In progress"],
    ["COMP 2109 · Intro to Security and Privacy", "Winter · registered"],
    ["COMP 2404 · Intro to Software Engineering", "Winter · registered"],
    ["COMP 2406 · Fundamentals of Web Applications", "Winter · registered"],
    ["COMP 3000 · Operating Systems", "Winter · registered"],
    ["CSEC 2108 · Crypto Algorithms and Protocols", "Winter · registered"]
  ]
};

const gradeBody = document.getElementById("grade-body");
const yearButtons = [...document.querySelectorAll(".year-btn")];

function showYear(year) {
  gradeBody.innerHTML = grades[year]
    .map(([course, result]) => `<tr><td>${course}</td><td>${result}</td></tr>`)
    .join("");
  yearButtons.forEach((button) => {
    button.setAttribute("aria-selected", button.dataset.year === String(year) ? "true" : "false");
  });
}

yearButtons.forEach((button) => {
  button.addEventListener("click", () => showYear(button.dataset.year));
});

showYear(1);

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a, .dock a")];

function markCurrent() {
  let current = "";
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 120) current = section.id;
  });
  links.forEach((link) => {
    const on = link.getAttribute("href") === `#${current}`;
    if (on) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  const state = button.querySelector(".copy-state");
  const label = button.dataset.label;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      state.textContent = "Copied";
    } catch {
      state.textContent = button.dataset.copy;
    }
    setTimeout(() => {
      state.textContent = label;
    }, 1600);
  });
});

markCurrent();
window.addEventListener("scroll", markCurrent, { passive: true });

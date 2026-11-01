// Renders legacy/data.js into index.html between marker comments so every project is
// readable without JavaScript (FR-006, FR-007). Build-time only; data is trusted, authored content.
import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';

const CATEGORIES = {
  gov: 'Government',
  quran: 'Quran & hadith',
  edu: 'Education',
  consumer: 'Consumer',
  health: 'Healthcare',
};

const context = { window: {} };
vm.createContext(context);
vm.runInContext(readFileSync('legacy/data.js', 'utf8'), context);
const projects = context.window.PROJECTS;

// Keep only <b> tags from the authored strings; existing HTML entities are preserved.
const clean = (s = '') => String(s).replace(/<(?!\/?b>)[^>]*>/g, '');
const attr = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const arabic = (ar) =>
  ar ? ` <span class="project__title-ar" lang="ar" dir="rtl">${ar}</span>` : '';
const link = (href, label) =>
  href
    ? `<a class="project__link" href="${attr(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`
    : '';

const featured = (p) => `
<article class="project" data-project data-category="${p.c}">
  <h3 class="project__title">${clean(p.t)}${arabic(p.ar)}</h3>
  <p class="project__meta">${clean(p.y)} · ${clean(p.o)} · ${CATEGORIES[p.c]}</p>
  <p class="project__summary">${clean(p.d)}</p>
  ${p.p?.length ? `<ul class="project__points">${p.p.map((x) => `<li>${clean(x)}</li>`).join('')}</ul>` : ''}
  ${p.m?.length ? `<p class="project__highlights">${p.m.map(clean).join(' · ')}</p>` : ''}
  <p class="project__stack">${clean(p.s)}</p>
  <p class="project__links">${link(p.l, 'App Store')} ${link(p.g, 'Google Play')}</p>
</article>`;

const catalogue = (p) => `
<li class="catalogue__item" data-project data-category="${p.c}">
  <span class="catalogue__year">${clean(p.y)}</span>
  ${p.l ? `<a class="catalogue__name" href="${attr(p.l)}" target="_blank" rel="noopener noreferrer">${clean(p.t)}</a>` : `<span class="catalogue__name">${clean(p.t)}</span>`}${p.ar ? ` <span lang="ar" dir="rtl">${p.ar}</span>` : ''}
  <span class="catalogue__desc">${clean(p.d)}</span>
  <span class="catalogue__org">${clean(p.o)}</span>
</li>`;

const top = projects.filter((p) => p.f);
const rest = projects.filter((p) => !p.f);
if (top.length + rest.length !== 33) {
  throw new Error(`Expected 33 projects, found ${top.length + rest.length}`);
}

function replaceBetween(html, name, content) {
  const start = `<!-- ${name}:start -->`;
  const end = `<!-- ${name}:end -->`;
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!pattern.test(html)) throw new Error(`Markers for "${name}" not found in index.html`);
  return html.replace(pattern, `${start}${content}\n${end}`);
}

let html = readFileSync('index.html', 'utf8');
html = replaceBetween(html, 'projects:featured', top.map(featured).join(''));
html = replaceBetween(html, 'projects:catalogue', rest.map(catalogue).join(''));
writeFileSync('index.html', html);
console.log(`Rendered ${top.length} featured + ${rest.length} catalogue projects.`);

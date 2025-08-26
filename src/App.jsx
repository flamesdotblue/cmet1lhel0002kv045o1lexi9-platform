import React, { useEffect, useMemo, useState } from 'react';

export default function App() {
  const NAME = 'Dr. Alex Morgan';
  const TITLE = 'Computational Biology Researcher';
  const TAGLINE = 'Machine learning for genomics, reproducible science, and open-source tools';

  // THEME
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [dark, setDark] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved) return saved === 'dark';
    return prefersDark;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    document.title = `${NAME} — ${TITLE}`;
  }, []);

  // DATA
  const socials = [
    { label: 'Google Scholar', href: 'https://scholar.google.com/', icon: ScholarIcon },
    { label: 'ORCID', href: 'https://orcid.org/0000-0002-1825-0097', icon: OrcidIcon },
    { label: 'GitHub', href: 'https://github.com/', icon: GitHubIcon },
    { label: 'Twitter/X', href: 'https://x.com/', icon: TwitterIcon },
    { label: 'Email', href: 'mailto:alex.morgan@example.edu', icon: MailIcon },
  ];

  const researchAreas = [
    {
      title: 'Genome-scale modeling',
      description:
        'Building predictive models of gene regulation and cell state using deep learning, with a focus on interpretability and uncertainty.',
      keywords: ['Deep learning', 'Regulatory genomics', 'Interpretability', 'Uncertainty'],
    },
    {
      title: 'Single-cell analysis',
      description:
        'Methods for integrating multimodal single-cell data to study development and disease at cellular resolution.',
      keywords: ['scRNA-seq', 'ATAC-seq', 'Multimodal', 'Integration'],
    },
    {
      title: 'Reproducible science',
      description:
        'Open-source pipelines, containers, and benchmarks for robust and transparent bioinformatics research.',
      keywords: ['Reproducibility', 'Open source', 'Pipelines', 'Benchmarking'],
    },
  ];

  const publications = [
    {
      id: 'morgan2024deepgene',
      title: 'DeepGene: Interpretable deep learning for cis-regulatory grammar',
      authors: ['A. Morgan', 'L. Chen', 'R. Patel', 'S. Gupta'],
      venue: 'Nature Methods',
      year: 2024,
      tags: ['Deep Learning', 'Genomics', 'Interpretability'],
      doi: '10.1038/s41592-024-00000-0',
      pdf: '#',
      code: 'https://github.com/',
      abstract:
        'We introduce DeepGene, a convolutional attention architecture that discovers interpretable regulatory motifs and interactions while achieving state-of-the-art performance on enhancer activity prediction.',
    },
    {
      id: 'morgan2023scatlas',
      title: 'A multimodal atlas of human hematopoiesis at single-cell resolution',
      authors: ['A. Morgan', 'D. K. Nguyen', 'Y. Zhao', 'J. Lee'],
      venue: 'Cell',
      year: 2023,
      tags: ['Single-Cell', 'Multi-omics', 'Atlas'],
      doi: '10.1016/j.cell.2023.00.001',
      pdf: '#',
      code: '',
      abstract:
        'We integrate scRNA-seq and ATAC-seq across donors to resolve lineage trajectories and regulatory programs in early hematopoiesis.',
    },
    {
      id: 'morgan2022repro',
      title: 'Containers and continuous integration for reproducible bioinformatics',
      authors: ['A. Morgan', 'S. Ahmed'],
      venue: 'PLOS Computational Biology',
      year: 2022,
      tags: ['Reproducibility', 'Open Source'],
      doi: '',
      pdf: '#',
      code: 'https://github.com/',
      abstract:
        'A practical guide to structuring bioinformatics projects with containers, CI, and environment locking for end-to-end reproducibility.',
    },
    {
      id: 'morgan2021benchmark',
      title: 'Benchmarking peak callers for ATAC-seq across tissues and depths',
      authors: ['A. Morgan', 'E. Silva', 'R. Gomez'],
      venue: 'Genome Research',
      year: 2021,
      tags: ['Benchmark', 'ATAC-seq'],
      doi: '10.1101/gr.000000.000',
      pdf: '#',
      code: 'https://github.com/',
      abstract:
        'Comprehensive evaluation of peak calling algorithms under varying coverage and tissue complexity with recommendations for best practices.',
    },
  ];

  const allYears = Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a);
  const allTags = Array.from(
    new Set(publications.flatMap(p => p.tags))
  ).sort();

  const projects = [
    {
      name: 'DeepGene',
      description: 'Interpretable CNN-transformer hybrid for regulatory genomics with motif attention.',
      link: 'https://github.com/',
      tags: ['Python', 'PyTorch', 'Genomics'],
    },
    {
      name: 'CellWeave',
      description: 'Multi-omic single-cell integration with variational autoencoders and optimal transport.',
      link: 'https://github.com/',
      tags: ['Python', 'scRNA-seq', 'VAE'],
    },
    {
      name: 'BioCI',
      description: 'Templates for reproducible pipelines with containers and GitHub Actions.',
      link: 'https://github.com/',
      tags: ['CI/CD', 'Docker', 'Snakemake'],
    },
  ];

  const teaching = [
    {
      course: 'BIOE 512: Machine Learning in Genomics',
      term: 'Spring 2025',
      role: 'Instructor',
      link: '#',
    },
    {
      course: 'BIOE 310: Computational Biology',
      term: 'Fall 2024',
      role: 'Co-Instructor',
      link: '#',
    },
  ];

  const service = [
    'Reviewer: Nature Methods, Cell Systems, PLoS Computational Biology',
    'Program Committee: RECOMB Regulatory and Systems Genomics',
    'Organizer: Reproducible Biology Workshop (RBW) 2023–2025',
  ];

  // PUBLICATIONS FILTER STATE
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('All');
  const [activeTags, setActiveTags] = useState([]);

  const filteredPubs = useMemo(() => {
    return publications.filter(p => {
      const q = query.trim().toLowerCase();
      const hitQ = !q || [p.title, p.abstract, p.venue, p.authors.join(' ')].some(v => v.toLowerCase().includes(q));
      const hitYear = year === 'All' || p.year === Number(year);
      const hitTags = activeTags.length === 0 || activeTags.every(t => p.tags.includes(t));
      return hitQ && hitYear && hitTags;
    });
  }, [query, year, activeTags]);

  function toggleTag(tag) {
    setActiveTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  }

  function copyBibtex(pub) {
    const entry = toBibtex(pub);
    navigator.clipboard.writeText(entry).then(() => {
      toast('BibTeX copied');
    }).catch(() => toast('Copy failed'));
  }

  function toBibtex(p) {
    const authorStr = p.authors.map(a => a.replace(/\./g, '')).join(' and ');
    const fields = [
      `  author = {${authorStr}}`,
      `  title = {${p.title}}`,
      `  journal = {${p.venue}}`,
      `  year = {${p.year}}`,
      p.doi ? `  doi = {${p.doi}}` : null,
    ].filter(Boolean).join(',\n');
    return `@article{${p.id},\n${fields}\n}`;
  }

  // CV DOWNLOAD (Markdown)
  function downloadCV() {
    const md = `# ${NAME}\n\n${TITLE}\n\n${TAGLINE}\n\n## Education\n- Ph.D., Computational Biology — Institute of Science\n\n## Research Areas\n${researchAreas.map(r => `- ${r.title}: ${r.keywords.join(', ')}`).join('\n')}\n\n## Selected Publications\n${publications.map(p => `- ${p.authors.join(', ')} (${p.year}). ${p.title}. ${p.venue}.`).join('\n')}\n\n## Teaching\n${teaching.map(t => `- ${t.course} (${t.term}) — ${t.role}`).join('\n')}\n\n## Service\n${service.map(s => `- ${s}`).join('\n')}\n`;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alex-Morgan-CV.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function sendEmailForm(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name') || '';
    const email = fd.get('email') || '';
    const message = fd.get('message') || '';
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:alex.morgan@example.edu?subject=${encodeURIComponent('Website contact')}&body=${body}`;
  }

  // Simple toast
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  function toast(msg) {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1500);
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <Header name={NAME} onToggleTheme={() => setDark(d => !d)} dark={dark} socials={socials} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero name={NAME} title={TITLE} tagline={TAGLINE} onDownloadCV={downloadCV} socials={socials} />
        <Section id="research" title="Research Areas">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((r, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white/70 dark:bg-slate-800/60 backdrop-blur">
                <h3 className="font-semibold text-slate-900 dark:text-white">{r.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{r.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.keywords.map((k, j) => (
                    <span key={j} className="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{k}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="publications" title="Publications">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              placeholder="Search title, author, venue..."
              className="w-full md:max-w-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
              >
                <option>All</option>
                {allYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <button
                onClick={() => { setQuery(''); setYear('All'); setActiveTags([]); }}
                className="text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-1 text-xs rounded-full border ${activeTags.includes(tag) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <ul className="mt-6 space-y-6">
            {filteredPubs.length === 0 && (
              <li className="text-slate-600 dark:text-slate-300 text-sm">No publications match your filters.</li>
            )}
            {filteredPubs.map(p => (
              <li key={p.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white/70 dark:bg-slate-800/60">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{p.authors.join(', ')}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{p.venue} · {p.year}</p>
                    {p.abstract && <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{p.abstract}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col gap-2 sm:items-end">
                    <div className="flex flex-wrap gap-2">
                      {p.pdf && p.pdf !== '#' && (
                        <a href={p.pdf} className="btn">PDF</a>
                      )}
                      <button onClick={() => copyBibtex(p)} className="btn">BibTeX</button>
                      {p.doi && (
                        <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer" className="btn">DOI</a>
                      )}
                      {p.code && (
                        <a href={p.code} target="_blank" rel="noreferrer" className="btn">Code</a>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="projects" title="Open-Source Projects">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, i) => (
              <a key={i} href={proj.link} target="_blank" rel="noreferrer" className="group rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white/70 dark:bg-slate-800/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{proj.name}</h3>
                  <span className="text-slate-400 group-hover:text-indigo-400">↗</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{proj.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {proj.tags.map((t, j) => (
                    <span key={j} className="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section id="teaching" title="Teaching">
          <ul className="space-y-4">
            {teaching.map((t, i) => (
              <li key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between bg-white/70 dark:bg-slate-800/60">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">{t.course}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{t.term} · {t.role}</p>
                </div>
                <a href={t.link} className="btn">Syllabus</a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="service" title="Service">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            {service.map((s, i) => (<li key={i}>{s}</li>))}
          </ul>
        </Section>

        <Section id="contact" title="Contact">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-700 dark:text-slate-300">I welcome collaborations and student inquiries. The fastest way to reach me is by email.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="mailto:alex.morgan@example.edu" className="btn">Email me</a>
                <button onClick={downloadCV} className="btn">Download CV</button>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <s.icon className="w-4 h-4" />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <form onSubmit={sendEmailForm} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white/70 dark:bg-slate-800/60">
              <div className="grid gap-3">
                <input name="name" placeholder="Your name" className="input" />
                <input type="email" name="email" placeholder="Your email" className="input" />
                <textarea name="message" rows={5} placeholder="Message" className="input" />
                <button type="submit" className="btn w-full">Send</button>
              </div>
            </form>
          </div>
        </Section>
      </main>

      <Footer />

      {toastVisible && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm shadow-lg">{toastMsg}</div>
      )}

      <style>{`
        .btn { @apply inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors; }
        .input { @apply w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500; }
      `}</style>
    </div>
  );
}

function Header({ name, onToggleTheme, dark, socials }) {
  const nav = [
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
    { id: 'projects', label: 'Projects' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'service', label: 'Service' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/70 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight text-slate-900 dark:text-white">{name}</a>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(n => (
            <a key={n.id} href={`#${n.id}`} className="text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onToggleTheme} className="btn" aria-label="Toggle theme">
            {dark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
          <a href={socials[2].href} target="_blank" rel="noreferrer" className="btn" aria-label="GitHub">
            <GitHubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ name, title, tagline, onDownloadCV, socials }) {
  return (
    <section id="top" className="pt-12 pb-10 sm:pt-16 sm:pb-12">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-950 dark:to-sky-950">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3 text-xs text-indigo-700 dark:text-indigo-300">
            <span className="px-2 py-1 rounded-full bg-white/60 dark:bg-slate-900/50 border border-indigo-200/50 dark:border-indigo-900/50">Open Science</span>
            <span className="px-2 py-1 rounded-full bg-white/60 dark:bg-slate-900/50 border border-indigo-200/50 dark:border-indigo-900/50">Mentorship</span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">{name}</h1>
          <p className="mt-2 text-lg sm:text-xl text-slate-700 dark:text-slate-300">{title}</p>
          <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-300">{tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#publications" className="btn bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500">View publications</a>
            <button onClick={onDownloadCV} className="btn">Download CV</button>
            <a href={socials[0].href} target="_blank" rel="noreferrer" className="btn">Google Scholar</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="py-10 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Alex Morgan</p>
        <p className="text-xs text-slate-400">Built with React + Tailwind. Deployed on Vercel.</p>
      </div>
    </footer>
  );
}

// ICONS
function GitHubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.48 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.12-1.53-1.12-1.53-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.2 9.2 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.58.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
    </svg>
  );
}

function TwitterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.64 7.36c.01.19.01.39.01.58 0 5.94-4.52 12.78-12.78 12.78-2.53 0-4.88-.74-6.86-2.02.35.04.7.06 1.06.06 2.1 0 4.04-.72 5.58-1.93a4.51 4.51 0 0 1-4.21-3.13c.28.05.57.08.87.08.42 0 .83-.06 1.22-.16A4.5 4.5 0 0 1 3 8.84v-.06c.61.34 1.31.54 2.05.56a4.5 4.5 0 0 1-2.01-3.75c0-.83.22-1.6.61-2.27a12.8 12.8 0 0 0 9.29 4.71 4.51 4.51 0 0 1 7.68-4.11 9.03 9.03 0 0 0 2.86-1.09 4.52 4.52 0 0 1-1.98 2.49 9 9 0 0 0 2.58-.71 9.61 9.61 0 0 1-2.44 2.53z"/>
    </svg>
  );
}

function ScholarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2 3 7l9 5 9-5-9-5zm0 7L6 6l6-3 6 3-6 3z"/>
      <path d="M12 13c-3.31 0-6 1.79-6 4v3h12v-3c0-2.21-2.69-4-6-4z"/>
    </svg>
  );
}

function OrcidIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm-1.77 6.02h1.38v10.03h-1.38V8.02zm-2.8 0h1.4v1.4h-1.4v-1.4zM15.5 8a3.98 3.98 0 0 1 3.98 3.98A3.98 3.98 0 0 1 15.5 16h-2.42V8h2.42zm0 1.36h-1.05v5.3h1.05a2.65 2.65 0 1 0 0-5.3z"/>
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/>
    </svg>
  );
}

function SunIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.76 4.84 5.34 3.42 3.92 4.84l1.42 1.42 1.42-1.42zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.84 19.16 3.42 20.58l1.42 1.42 1.42-1.42-1.42-1.42zM20 11v2h3v-2h-3zM17.24 4.84l1.42 1.42L20.08 4.84 18.66 3.42l-1.42 1.42zM12 6a6 6 0 1 0 .001 12.001A6 6 0 0 0 12 6zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm6.34 11.34 1.42 1.42 1.42-1.42-1.42-1.42-1.42 1.42z"/>
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.74 2c.35 0 .7.02 1.04.06A8.5 8.5 0 0 0 12 19.5c4.69 0 8.5-3.81 8.5-8.5 0-3.22-1.79-6.03-4.45-7.47.11.49.17 1 .17 1.52A7.25 7.25 0 1 1 9.01 3.1c.55-.07 1.11-.1 1.68-.1h2.05z"/>
    </svg>
  );
}

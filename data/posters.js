export const posters = [
  {
    id: 'dill-corl2026',
    sortOrder: 1,
    title:
      'DILL: Disentangling Spurious Correlations in Vision-Language-Action Models via Predicting Domain-Invariant Latent Lookahead',
    venue: 'CoRL 2026 · Poster',
    pdf: '/posters/dill-corl2026-poster.pdf',
    preview: '/posters/dill-corl2026-poster.png',
    links: {
      paper: 'https://arxiv.org/abs/2609.37165',
      project: 'https://dill-vla.github.io/'
    }
  },
  {
    id: 'espada-iros2026',
    sortOrder: 2,
    title:
      'ESPADA: Execution Speedup via Semantics Aware Demonstration Data Downsampling for Imitation Learning',
    venue: 'IEEE RA-L · IROS 2026 · Poster',
    pdf: '/posters/espada-iros2026-poster.pdf',
    preview: '/posters/espada-iros2026-poster.png',
    links: {
      paper: 'https://www.arxiv.org/pdf/2512.07371',
      project: 'https://project-espada.github.io/espada/'
    }
  }
]

export const getPosters = () =>
  [...posters].sort((a, b) => a.sortOrder - b.sortOrder)

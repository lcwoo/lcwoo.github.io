export const publications = [
  {
    id: 'espada',
    sortOrder: 1,
    year: 2026,
    month: null,
    title:
      'ESPADA: Execution Speedup via Semantics Aware Demonstration Data Downsampling for Imitation Learning',
    image: '/images/publications/espada-overview.png',
    thumbnailScale: 1,
    thumbnailPosition: 'center',
    authors: [
      'Byungju Kim*',
      'Jinu Pahk*',
      'Chungwoo Lee*',
      'Jaejoon Kim*',
      'Jangha Lee*',
      'Theo Taeyeong Kim',
      'Kyuhwan Shim',
      'Jun Ki Lee',
      'Byoung-Tak Zhang'
    ],
    venues: [
      {
        homeLabel: 'IEEE RA-L 2026',
        archiveLabel: 'IEEE Robotics and Automation Letters (RA-L) 2026',
        primary: true
      },
      {
        homeLabel: 'Presented at IROS 2026',
        archiveLabel: 'Presented at IROS 2026',
        primary: false
      }
    ],
    links: {
      paper: 'https://www.arxiv.org/pdf/2512.07371',
      project: 'https://project-espada.github.io/espada/'
    }
  },
  {
    id: 'latent-lookahead',
    sortOrder: 2,
    year: 2026,
    month: null,
    title:
      'Disentangling Spurious Correlations in Vision-Language-Action Models via Predicting Domain-Invariant Latent Lookahead',
    image: '/images/publications/lookahead-overview.png',
    thumbnailScale: 1,
    thumbnailPosition: 'center',
    authors: [
      'Junghyun Kim*',
      'Ngseo Kim*',
      'ChungWoo Lee',
      'Seoyeon Lee',
      'Woo-Jeong Baek',
      'Adam Zhou',
      'Chip Huyen',
      'Jun-Ki Lee†',
      'Gi-Cheon Kang†',
      'Byoung-Tak Zhang†'
    ],
    venues: [
      {
        homeLabel: 'CoRL 2026',
        archiveLabel: 'CoRL 2026',
        primary: true
      },
      {
        homeLabel: 'RSS SemRob · Spotlight',
        archiveLabel: 'RSS 2026 SemRob Workshop · Spotlight',
        primary: false
      }
    ],
    links: {
      paper: 'https://openreview.net/pdf?id=Y6jslFtt7d'
    }
  },
  {
    id: 'moaq',
    sortOrder: 3,
    year: 2026,
    month: 6,
    title: 'Making Your Action Policies Interpretable: Mixture of Action Queries',
    image: '/images/publications/moaq-overview.png',
    thumbnailScale: 1,
    thumbnailPosition: 'center',
    authors: [
      'Suhyung Choi',
      'Youngseok Joo',
      'Hyundo Lee',
      'Kyuhwan Shim',
      'Kisung Shin',
      'Chungwoo Lee',
      'Minjeong Gu',
      'Jun Ki Lee',
      'Byoung-Tak Zhang'
    ],
    venues: [
      {
        homeLabel: 'CVPR 2026 Workshop',
        archiveLabel: 'CVPR 2026 · Foundation Models Meet Embodied Agents',
        primary: false,
        href: 'https://openreview.net/pdf?id=OdAczSh1lM'
      },
      {
        homeLabel: 'ICML 2026 Workshop',
        archiveLabel: 'ICML 2026 · AI4GOOD',
        primary: false,
        href: 'https://openreview.net/pdf?id=NacjcqQ1kD'
      }
    ],
    links: {
      paper: 'https://openreview.net/pdf?id=OdAczSh1lM'
    }
  }
]

export const getPublications = () =>
  [...publications].sort((a, b) => a.sortOrder - b.sortOrder)

// Dados estruturados (schema.org) gerados no build a partir de src/content.js,
// para o Google entender o consultório, os procedimentos e as perguntas frequentes
// sem depender do JavaScript da página.
import { ADDRESS, CRO, FAQ, INSTAGRAM_URL, PROCEDURES, REGION, SITE_URL } from './src/content.js'

const dentist = {
  '@type': ['Dentist', 'MedicalBusiness'],
  '@id': `${SITE_URL}/#consultorio`,
  name: 'Dra. Thayla Basilio — Harmonização Facial em Lajeado',
  alternateName: 'Dra. Thayla Basilio Gullo',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  description:
    'Harmonização facial (orofacial) no Centro de Lajeado, RS, com planejamento individual: toxina botulínica, preenchimento labial, bioestimuladores de colágeno, skinboosters, microagulhamento e peelings.',
  telephone: '+55 51 99606-4530',
  medicalSpecialty: 'Dentistry',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${ADDRESS.street} – Sala 701`,
    addressLocality: 'Lajeado',
    addressRegion: 'RS',
    addressCountry: 'BR',
  },
  // coordenada da rua (precisão de quarteirão)
  geo: { '@type': 'GeoCoordinates', latitude: -29.4661, longitude: -51.9649 },
  areaServed: REGION.map((name) => ({ '@type': 'City', name: `${name}, RS` })),
  sameAs: [INSTAGRAM_URL],
  employee: {
    '@type': 'Person',
    name: 'Thayla Basilio Gullo',
    honorificPrefix: 'Dra.',
    jobTitle: 'Cirurgiã-dentista — Harmonização Orofacial',
    identifier: CRO,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Procedimentos de harmonização facial',
    itemListElement: PROCEDURES.map((p) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'MedicalProcedure', name: p.name, description: p.text },
    })),
  },
}

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#duvidas`,
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export function structuredData() {
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': [dentist, faqPage] }, null, 2)
  // `<` escapado: nenhum texto do conteúdo consegue fechar a tag script
  return `<script type="application/ld+json">\n${json.replace(/</g, '\\u003c')}\n</script>`
}

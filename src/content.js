// Tudo que é texto/contato do site mora aqui — editar sem mexer nos componentes.

export const WHATS_NUMBER = '5551996064530'
export const WHATS_MESSAGE = 'Olá, Dra. Thayla! Gostaria de agendar uma avaliação.'
export const WHATS_URL = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(WHATS_MESSAGE)}`
export const WHATS_DISPLAY = '(51) 99606-4530'
export const PHONE_TEL = 'tel:+5551996064530'

export const INSTAGRAM_URL = 'https://www.instagram.com/drathaylabasilio/'
export const INSTAGRAM_HANDLE = '@drathaylabasilio'

// obrigatório em toda divulgação odontológica (Res. CFO 196/2019)
export const CRO = 'CRO-RS 32657'

export const ADDRESS = {
  street: 'Rua Coronel Francisco Oscar Karnal, 218',
  room: 'Sala 701 · 7º andar',
  city: 'Centro, Lajeado – RS',
}

export const SITE_URL = 'https://drathaylabasilio.com.br'
// cidades do Vale do Taquari atendidas — aparecem no texto e nos dados para o Google
export const REGION = ['Lajeado', 'Estrela', 'Arroio do Meio', 'Teutônia', 'Cruzeiro do Sul', 'Encantado']
const mapsQuery = encodeURIComponent('Rua Coronel Francisco Oscar Karnal, 218, Lajeado - RS')
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
export const MAPS_EMBED = `https://www.google.com/maps?q=${mapsQuery}&z=16&output=embed`

export const NAV = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'procedimentos', label: 'Procedimentos' },
  { id: 'metodo', label: 'Método' },
  { id: 'espaco', label: 'Espaço' },
  { id: 'duvidas', label: 'Dúvidas' },
  { id: 'contato', label: 'Contato' },
]

export const MANIFESTO =
  'Harmonizar não é transformar. É observar proporções, respeitar a sua história e realçar, com delicadeza, aquilo que já é seu.'

export const FORMACAO = [
  { title: 'Cirurgiã-dentista', place: 'Universidade do Vale do Taquari — Univates' },
  { title: 'Especialização em Harmonização Orofacial', place: 'Faculdade São Leopoldo Mandic · 2026' },
]

// `map` liga cada procedimento às áreas desenhadas no rosto (components/FaceMap.jsx)
export const PROCEDURES = [
  {
    map: 'toxina',
    name: 'Toxina botulínica',
    text: 'Suaviza linhas de expressão relaxando pontualmente a musculatura. Doses e pontos são definidos a partir da sua mímica — o rosto continua se movendo como o seu.',
    tags: ['Testa', 'Glabela', 'Pés de galinha', 'Bruxismo'],
  },
  {
    map: 'labial',
    name: 'Preenchimento labial',
    text: 'Contorno, hidratação e volume pensados na proporção do seu rosto, não em uma tendência. Ácido hialurônico em camadas, com leitura cuidadosa da anatomia.',
    tags: ['Contorno', 'Hidratação', 'Volume'],
  },
  {
    map: 'reestruturacao',
    name: 'Reestruturação facial',
    text: 'Preenchimento em pontos de sustentação — malar, mandíbula, mento — para devolver estrutura e equilíbrio entre os terços da face.',
    tags: ['Malar', 'Mandíbula', 'Mento', 'Olheiras'],
  },
  {
    map: 'bioestimulador',
    name: 'Bioestimuladores de colágeno',
    text: 'Substâncias injetáveis que estimulam a produção do seu próprio colágeno. A evolução é gradual, com foco em firmeza e qualidade de pele.',
    tags: ['Firmeza', 'Flacidez', 'Qualidade de pele'],
  },
  {
    map: 'micro',
    name: 'Microagulhamento',
    text: 'Microperfurações controladas que ativam a renovação natural da pele. Indicado para textura, poros dilatados e marcas.',
    tags: ['Textura', 'Poros', 'Cicatrizes de acne'],
  },
  {
    map: 'peeling',
    name: 'Peelings',
    text: 'Renovação da camada superficial da pele com ácidos selecionados para cada caso — manchas, oleosidade e luminosidade.',
    tags: ['Manchas', 'Oleosidade', 'Luminosidade'],
  },
  {
    map: 'skinbooster',
    name: 'Skinboosters',
    text: 'Hidratação profunda com ácido hialurônico de baixa densidade, distribuído na pele para devolver viço e elasticidade.',
    tags: ['Hidratação', 'Viço', 'Elasticidade'],
  },
]

export const METHOD = [
  {
    title: 'Escuta',
    text: 'Uma primeira consulta sem pressa. Histórico, expectativas e uma análise facial em repouso e em movimento.',
  },
  {
    title: 'Planejamento',
    text: 'Um plano individual, por etapas, com o que faz sentido para você agora — e o que esperar de cada fase.',
  },
  {
    title: 'Procedimento',
    text: 'Técnica, produtos regularizados pela Anvisa e um ambiente pensado para o seu conforto do início ao fim.',
  },
  {
    title: 'Acompanhamento',
    text: 'Retorno programado para avaliar a evolução, ajustar o que for preciso e seguir cuidando de você.',
  },
]

// Perguntas frequentes: aparecem no site e viram dados estruturados (FAQPage) no build.
// Sem promessa de resultado e sem valores — regras de publicidade do CFO.
export const FAQ = [
  {
    q: 'O que é harmonização facial?',
    a: 'É um conjunto de procedimentos que busca equilíbrio entre as proporções do rosto — terços da face, lábios, contorno e qualidade da pele. O objetivo não é mudar quem você é, e sim realçar traços de forma natural, com um plano feito para o seu rosto.',
  },
  {
    q: 'Dentista pode fazer harmonização facial?',
    a: 'Sim. A Harmonização Orofacial é uma especialidade reconhecida pelo Conselho Federal de Odontologia desde 2019. O cirurgião-dentista estuda a fundo a anatomia da face, da musculatura e da região da boca, que é a base desses procedimentos.',
  },
  {
    q: 'A aplicação de toxina botulínica dói?',
    a: 'O desconforto costuma ser leve: são picadas rápidas, com agulha bem fina. Quando necessário, é possível usar anestésico tópico ou gelo antes para deixar tudo mais confortável.',
  },
  {
    q: 'Quanto tempo dura o botox e o preenchimento?',
    a: 'A toxina botulínica costuma durar de 4 a 6 meses. O preenchimento com ácido hialurônico, em geral, de 6 a 18 meses, conforme a área tratada e o produto. A duração varia de pessoa para pessoa, e isso é conversado no planejamento.',
  },
  {
    q: 'O preenchimento labial fica artificial?',
    a: 'Não precisa ficar. A quantidade e os pontos são definidos a partir das proporções do seu rosto, e não de uma tendência. Quando necessário, o tratamento é feito em etapas para chegar a um resultado natural.',
  },
  {
    q: 'Como funciona a primeira consulta?',
    a: 'A primeira consulta é uma avaliação: conversamos sobre o que te incomoda e o que você espera, faço a análise da sua face em repouso e em movimento e montamos juntos um planejamento. O agendamento é feito pelo WhatsApp.',
  },
  {
    q: 'Qual o valor da harmonização facial?',
    a: 'O valor depende do planejamento de cada pessoa — quais procedimentos, quais áreas e quantas etapas. Por isso ele é apresentado depois da avaliação, junto com o plano de tratamento.',
  },
  {
    q: 'Onde fica o consultório? Atende pacientes de outras cidades?',
    a: 'O consultório fica no Centro de Lajeado (RS), na Rua Coronel Francisco Oscar Karnal, 218, sala 701. Atendo pacientes de Lajeado e de toda a região do Vale do Taquari, como Estrela, Arroio do Meio, Teutônia, Cruzeiro do Sul e Encantado.',
  },
]

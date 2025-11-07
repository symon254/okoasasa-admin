const SAFE_TAGS = new Set([
  'p',
  'ul',
  'ol',
  'li',
  'strong',
  'b',
  'em',
  'i',
  'br',
])

const ENTITY_MAP = {
  '&nbsp;': ' ',
  '&#160;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#34;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&copy;': '©',
  '&reg;': '®',
  '&trade;': '™',
}

const ENTITY_REGEX = new RegExp(
  `(${Object.keys(ENTITY_MAP)
    .map((entity) => entity.replace(/&/g, '&(?:amp;)?'))
    .join('|')})`,
  'gi',
)

export function cleanProductDescription(rawHtml) {
  if (typeof rawHtml !== 'string' || rawHtml.trim() === '') {
    return ''
  }

  const decoded = decodeEntities(rawHtml)

  let cleaned = decoded
    .replace(/\r\n/g, '\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(ENTITY_REGEX, (match) => {
      const normalized = match.replace(/^&amp;/i, '&').toLowerCase()
      return ENTITY_MAP[normalized] ?? ENTITY_MAP[match] ?? ' '
    })
    .replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (match, closing, tag) => {
      const normalizedTag = tag.toLowerCase()

      if (!SAFE_TAGS.has(normalizedTag)) {
        return ''
      }

      if (normalizedTag === 'br') {
        return '<br />'
      }

      return closing ? `</${normalizedTag}>` : `<${normalizedTag}>`
    })
    .replace(/(<br\s*\/?>\s*){2,}/gi, '<br />')
    .replace(/\u00A0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')

  cleaned = stripEmptyTags(cleaned)

  cleaned = cleaned
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return cleaned
}

export function extractPlainText(html = '') {
  if (!html) return ''

  const normalized = cleanProductDescription(html)

  return decodeEntities(
    normalized
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|li)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+\n/g, '\n')
      .replace(/\n\s+/g, '\n')
      .replace(/\s{2,}/g, ' ')
      .trim(),
  )
}

export function extractListItems(html = '') {
  if (!html) return []

  const sanitized = cleanProductDescription(html)

  return [...sanitized.matchAll(/<li>([\s\S]*?)<\/li>/gi)]
    .map(([, content]) => extractPlainText(content))
    .filter(Boolean)
}

function decodeEntities(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return ''
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = str
    return textarea.value
  }

  return str.replace(ENTITY_REGEX, (match) => {
    const normalized = match.replace(/^&amp;/i, '&').toLowerCase()
    return ENTITY_MAP[normalized] ?? ENTITY_MAP[match] ?? ' '
  })
}

function stripEmptyTags(html) {
  if (!html) return ''

  let previous = html
  let current = html.replace(/<(\w+)[^>]*>\s*<\/\1>/g, '')

  while (current.length !== previous.length) {
    previous = current
    current = current.replace(/<(\w+)[^>]*>\s*<\/\1>/g, '')
  }

  return current
}

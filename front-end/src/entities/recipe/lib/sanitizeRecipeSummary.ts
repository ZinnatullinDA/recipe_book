export function stripHtml(value: string) {
  if (!value)
    return ''

  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

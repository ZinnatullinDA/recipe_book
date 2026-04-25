export function formatCookingTime(minutes: number) {
  if (minutes < 60)
    return `${minutes} мин`

  const hours = Math.floor(minutes / 60)
  const restMinutes = minutes % 60

  if (!restMinutes)
    return `${hours} ч`

  return `${hours} ч ${restMinutes} мин`
}

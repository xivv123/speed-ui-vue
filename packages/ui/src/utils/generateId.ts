let counter = 0

export function generateId(prefix = 'sp'): string {
  return `${prefix}-${Date.now()}-${counter++}`
}
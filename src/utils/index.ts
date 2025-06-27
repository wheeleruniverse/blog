/**
 * Utility functions for the blog application
 */

/**
 * Formats a date string to a human-readable format
 * Handles YYYY-MM-DD format to avoid timezone issues
 */
export const formatDate = (dateString: string, locale = 'en-US'): string => {
  try {
    // Parse YYYY-MM-DD format directly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day) // month is 0-indexed
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

/**
 * Extracts domain name from a URL
 */
export const getDomainFromUrl = (url: string): string => {
  try {
    const domain = new URL(url).hostname
    return domain.replace('www.', '')
  } catch {
    return 'External Link'
  }
}

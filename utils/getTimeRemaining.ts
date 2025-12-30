/**
 * Calculates the time remaining between a date string and the current time
 * @param {string} dateStr - Date string in format "Tue, Apr 22 5:00 PM", "9:00 PM", or "in X minutes/hours/days"
 * @returns {string} - Formatted time remaining or message if date has passed
 */
export function getTimeRemaining(dateStr: string): string {
  const now: Date = new Date()
  let targetDate: Date

  // Check for "in X minutes/hours/days" format
  const relativeTimeRegex = /^in\s+(\d+)\s+(minute|minutes|min|mins|hour|hours|hr|hrs|day|days)$/i
  const relativeMatch = dateStr.trim().match(relativeTimeRegex)

  // Check for time-only format "9:00 PM"
  const timeOnlyRegex = /^(\d{1,2}):(\d{2})[\u0020\u202F]([AP]M)$/i
  const timeOnlyMatch = dateStr.trim().match(timeOnlyRegex)

  if (relativeMatch) {
    const amount = parseInt(relativeMatch[1], 10)
    const unit = relativeMatch[2].toLowerCase()

    targetDate = new Date(now)

    if (unit.startsWith('minute') || unit.startsWith('min')) {
      targetDate.setMinutes(targetDate.getMinutes() + amount)
    } else if (unit.startsWith('hour') || unit.startsWith('hr')) {
      targetDate.setHours(targetDate.getHours() + amount)
    } else if (unit.startsWith('day')) {
      targetDate.setDate(targetDate.getDate() + amount)
    }
  } else if (timeOnlyMatch) {
    // Handle time-only format (e.g., "9:00 PM")
    const [, hours, minutes, ampm] = timeOnlyMatch
    let hour = parseInt(hours, 10)

    // Convert hours to 24-hour format
    if (ampm.toUpperCase() === 'PM' && hour < 12) {
      hour += 12
    } else if (ampm.toUpperCase() === 'AM' && hour === 12) {
      hour = 0
    }

    targetDate = new Date(now)
    targetDate.setHours(hour, parseInt(minutes, 10), 0, 0)

    // If the time has already passed today, set it for tomorrow
    if (targetDate < now) {
      targetDate.setDate(targetDate.getDate() + 1)
    }
  } else {
    // Parse the traditional date string format
    const months: Record<string, number> = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    }

    // Extract date components from the string
    const regex: RegExp = /(\w+), (\w+) (\d+) (\d+):(\d+)[\u0020\u202F]([AP]M)/
    const match: RegExpMatchArray | null = dateStr.match(regex)

    if (!match) {
      return "Invalid date format. Please use: 'Tue, Apr 22 5:00 PM', '9:00 PM', or 'in X minutes/hours/days'"
    }

    const [, , monthStr, day, hours, minutes, ampm]: string[] = match

    // Get current year
    const currentYear: number = now.getFullYear()

    // Create date object from input
    targetDate = new Date()
    targetDate.setFullYear(currentYear)
    targetDate.setMonth(months[monthStr])
    targetDate.setDate(parseInt(day, 10))

    // Convert hours to 24-hour format
    let hour: number = parseInt(hours, 10)
    if (ampm === 'PM' && hour < 12) {
      hour += 12
    } else if (ampm === 'AM' && hour === 12) {
      hour = 0
    }

    targetDate.setHours(hour, parseInt(minutes, 10), 0, 0)

    // If the date has already passed this year, assume next year
    if (targetDate < now) {
      targetDate.setFullYear(currentYear + 1)
    }
  }

  // Calculate time difference in milliseconds
  const timeDiff: number = targetDate.getTime() - now.getTime()

  if (timeDiff <= 0) {
    return 'This date has already passed'
  }

  // Convert to days, hours, minutes
  const days: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const remainingHours: number = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const remainingMinutes: number = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

  // Format the result
  let result: string = ''
  if (days > 0) {
    result += `${days} day${days !== 1 ? 's' : ''}, `
  }
  if (remainingHours > 0 || days > 0) {
    result += `${remainingHours} hour${remainingHours !== 1 ? 's' : ''}, `
  }
  result += `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`

  return result
}

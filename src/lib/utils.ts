import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)
export const multiFormatDateString = (timestamp: string = ''): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000)
  const date: Date = new Date(timestampNum * 1000)
  const now: Date = new Date()

  const diff: number = now.getTime() - date.getTime()
  const diffInSeconds: number = diff / 1000
  const diffInMinutes: number = diffInSeconds / 60
  const diffInHours: number = diffInMinutes / 60
  const diffInDays: number = diffInHours / 24

  if (Math.floor(diffInDays) >= 30) {
    // More than 30 days ago
    return `${Math.floor(diffInDays / 30)} months ago`
  } else if (Math.floor(diffInDays) >= 1) {
    // More than a day ago
    return `${Math.floor(diffInDays)} days ago`
  } else if (Math.floor(diffInHours) >= 1) {
    // More than an hour ago
    return `${Math.floor(diffInHours)} hours ago`
  } else if (Math.floor(diffInMinutes) >= 1) {
    // More than a minute ago
    return `${Math.floor(diffInMinutes)} minutes ago`
  } else {
    // Less than a minute ago
    return 'Just now'
  }
}

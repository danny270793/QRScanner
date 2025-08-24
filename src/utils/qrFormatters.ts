export type QRType = 'text' | 'website' | 'email' | 'contact' | 'wifi'

export interface TextData {
  text: string
}

export interface WebsiteData {
  url: string
}

export interface EmailData {
  email: string
  subject?: string
  message?: string
}

export interface ContactData {
  name: string
  organization?: string
  phone?: string
  email?: string
}

export interface WiFiData {
  networkName: string
  password?: string
  security: 'WPA' | 'WEP' | 'nopass'
}

export type QRData = TextData | WebsiteData | EmailData | ContactData | WiFiData

export class QRDataFormatter {
  static formatText(data: TextData): string {
    return data.text
  }

  static formatWebsite(data: WebsiteData): string {
    // Ensure URL has protocol
    let url = data.url.trim()
    if (!url.match(/^https?:\/\//)) {
      url = `https://${url}`
    }
    return url
  }

  static formatEmail(data: EmailData): string {
    let mailto = `mailto:${data.email}`

    const params: string[] = []
    if (data.subject?.trim()) {
      params.push(`subject=${encodeURIComponent(data.subject.trim())}`)
    }
    if (data.message?.trim()) {
      params.push(`body=${encodeURIComponent(data.message.trim())}`)
    }

    if (params.length > 0) {
      mailto += `?${params.join('&')}`
    }

    return mailto
  }

  static formatContact(data: ContactData): string {
    const vcard: string[] = ['BEGIN:VCARD', 'VERSION:3.0']

    if (data.name?.trim()) {
      vcard.push(`FN:${data.name.trim()}`)
    }

    if (data.organization?.trim()) {
      vcard.push(`ORG:${data.organization.trim()}`)
    }

    if (data.phone?.trim()) {
      vcard.push(`TEL:${data.phone.trim()}`)
    }

    if (data.email?.trim()) {
      vcard.push(`EMAIL:${data.email.trim()}`)
    }

    vcard.push('END:VCARD')
    return vcard.join('\n')
  }

  static formatWiFi(data: WiFiData): string {
    const security = data.security.toUpperCase()
    const networkName = data.networkName.replace(/[";,:\\]/g, '\\$&')
    const password = data.password
      ? data.password.replace(/[";,:\\]/g, '\\$&')
      : ''

    let wifi = `WIFI:T:${security};S:${networkName};`

    if (password && security !== 'NOPASS') {
      wifi += `P:${password};`
    }

    wifi += 'H:false;;'

    return wifi
  }

  static formatData(type: QRType, data: QRData): string {
    switch (type) {
      case 'text':
        return QRDataFormatter.formatText(data as TextData)
      case 'website':
        return QRDataFormatter.formatWebsite(data as WebsiteData)
      case 'email':
        return QRDataFormatter.formatEmail(data as EmailData)
      case 'contact':
        return QRDataFormatter.formatContact(data as ContactData)
      case 'wifi':
        return QRDataFormatter.formatWiFi(data as WiFiData)
      default:
        throw new Error(`Unsupported QR type: ${type}`)
    }
  }
}

export const validateQRData = (type: QRType, data: any): string | null => {
  switch (type) {
    case 'text':
      if (!data.text?.trim()) {
        return 'Text content is required'
      }
      break
    case 'website':
      if (!data.url?.trim()) {
        return 'Website URL is required'
      }
      break
    case 'email':
      if (!data.email?.trim()) {
        return 'Email address is required'
      }
      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        return 'Please enter a valid email address'
      }
      break
    case 'contact':
      if (!data.name?.trim()) {
        return 'Contact name is required'
      }
      if (
        data.email?.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
      ) {
        return 'Please enter a valid email address'
      }
      break
    case 'wifi':
      if (!data.networkName?.trim()) {
        return 'Network name (SSID) is required'
      }
      if (data.security !== 'nopass' && !data.password?.trim()) {
        return 'Password is required for secured networks'
      }
      break
  }
  return null
}

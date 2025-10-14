// Country codes data for SPInputTel component
// 基于国际电信联盟(ITU)标准的国家代码列表

export interface CountryCode {
  code: string
  name: string
  dialCode: string
  flag?: string
  pattern?: RegExp
  example?: string
}

export const defaultCountryCodes: CountryCode[] = [
  { 
    code: 'CN', 
    name: '中国', 
    dialCode: '+86', 
    flag: '🇨🇳',
    pattern: /^1[3-9]\d{9}$/,
    example: '138 0013 8000'
  },
  { 
    code: 'HK', 
    name: '香港', 
    dialCode: '+852', 
    flag: '🇭🇰',
    pattern: /^[2-9]\d{7}$/,
    example: '2123 4567'
  },
  { 
    code: 'TW', 
    name: '台湾', 
    dialCode: '+886', 
    flag: '🇹🇼',
    pattern: /^9\d{8}$/,
    example: '912 345 678'
  },
  { 
    code: 'US', 
    name: '美国', 
    dialCode: '+1', 
    flag: '🇺🇸',
    pattern: /^\d{10}$/,
    example: '(555) 123-4567'
  },
  { 
    code: 'GB', 
    name: '英国', 
    dialCode: '+44', 
    flag: '🇬🇧',
    pattern: /^[1-9]\d{8,9}$/,
    example: '7911 123456'
  },
  { 
    code: 'JP', 
    name: '日本', 
    dialCode: '+81', 
    flag: '🇯🇵',
    pattern: /^[789]0\d{8}$/,
    example: '90-1234-5678'
  },
  { 
    code: 'KR', 
    name: '韩国', 
    dialCode: '+82', 
    flag: '🇰🇷',
    pattern: /^1[0-9]\d{8}$/,
    example: '10-1234-5678'
  },
  { 
    code: 'SG', 
    name: '新加坡', 
    dialCode: '+65', 
    flag: '🇸🇬',
    pattern: /^[689]\d{7}$/,
    example: '9123 4567'
  },
  { 
    code: 'AU', 
    name: '澳大利亚', 
    dialCode: '+61', 
    flag: '🇦🇺',
    pattern: /^4\d{8}$/,
    example: '0412 345 678'
  },
  { 
    code: 'CA', 
    name: '加拿大', 
    dialCode: '+1', 
    flag: '🇨🇦',
    pattern: /^\d{10}$/,
    example: '(604) 123-4567'
  },
  { 
    code: 'DE', 
    name: '德国', 
    dialCode: '+49', 
    flag: '🇩🇪',
    pattern: /^1[5-7]\d{8}$/,
    example: '151 23456789'
  },
  { 
    code: 'FR', 
    name: '法国', 
    dialCode: '+33', 
    flag: '🇫🇷',
    pattern: /^[67]\d{8}$/,
    example: '06 12 34 56 78'
  },
  { 
    code: 'IT', 
    name: '意大利', 
    dialCode: '+39', 
    flag: '🇮🇹',
    pattern: /^3\d{8,9}$/,
    example: '312 345 6789'
  },
  { 
    code: 'ES', 
    name: '西班牙', 
    dialCode: '+34', 
    flag: '🇪🇸',
    pattern: /^[67]\d{8}$/,
    example: '612 34 56 78'
  },
  { 
    code: 'RU', 
    name: '俄罗斯', 
    dialCode: '+7', 
    flag: '🇷🇺',
    pattern: /^9\d{9}$/,
    example: '912 345-67-89'
  },
  { 
    code: 'IN', 
    name: '印度', 
    dialCode: '+91', 
    flag: '🇮🇳',
    pattern: /^[6-9]\d{9}$/,
    example: '98765 43210'
  },
  { 
    code: 'BR', 
    name: '巴西', 
    dialCode: '+55', 
    flag: '🇧🇷',
    pattern: /^[1-9]\d{8,9}$/,
    example: '11 91234-5678'
  },
  { 
    code: 'MX', 
    name: '墨西哥', 
    dialCode: '+52', 
    flag: '🇲🇽',
    pattern: /^[1-9]\d{9}$/,
    example: '55 1234 5678'
  },
  { 
    code: 'TH', 
    name: '泰国', 
    dialCode: '+66', 
    flag: '🇹🇭',
    pattern: /^[689]\d{8}$/,
    example: '08-1234-5678'
  },
  { 
    code: 'MY', 
    name: '马来西亚', 
    dialCode: '+60', 
    flag: '🇲🇾',
    pattern: /^1[0-9]\d{7,8}$/,
    example: '012-345 6789'
  },
]

// 按地区分组的国家代码
export const countryCodesByRegion = {
  asia: [
    'CN', 'HK', 'TW', 'JP', 'KR', 'SG', 'TH', 'MY', 'IN'
  ],
  northAmerica: [
    'US', 'CA', 'MX'
  ],
  europe: [
    'GB', 'DE', 'FR', 'IT', 'ES', 'RU'
  ],
  oceania: [
    'AU'
  ],
  southAmerica: [
    'BR'
  ]
}

// 获取指定地区的国家代码
export function getCountryCodesByRegion(region: keyof typeof countryCodesByRegion): CountryCode[] {
  const codes = countryCodesByRegion[region]
  return defaultCountryCodes.filter(country => codes.includes(country.code))
}

// 根据国家代码查找国家信息
export function findCountryByCode(code: string): CountryCode | undefined {
  return defaultCountryCodes.find(country => country.code === code)
}

// 根据拨号代码查找国家信息
export function findCountryByDialCode(dialCode: string): CountryCode | undefined {
  return defaultCountryCodes.find(country => country.dialCode === dialCode)
}

// 搜索国家（支持名称和代码搜索）
export function searchCountries(query: string): CountryCode[] {
  const lowerQuery = query.toLowerCase()
  return defaultCountryCodes.filter(country => 
    country.name.toLowerCase().includes(lowerQuery) ||
    country.code.toLowerCase().includes(lowerQuery) ||
    country.dialCode.includes(query)
  )
}
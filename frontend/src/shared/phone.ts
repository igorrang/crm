export const insertMaskInPhone = (phone: string) => {
    const noMask = phone.replace(/\D/g, '') 
    const {length} = noMask

if (length <= 11) {
  return noMask
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2')   
}
return phone
}

export const formatPhoneNumber = (phone: string) => {
    const cleaned = ('' + phone).replace(/\D/g,'')

    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`
    } 

    return phone
}

export const validations = {
  isName: (value: string): boolean => /^[a-zÀ-ÖØ-öø-ÿ'-]+( [a-zÀ-ÖØ-öø-ÿ'-]+)+$/i.test(value),
  isEmail: (value: string): boolean => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value),
  isCpf: (value: string): boolean => {
    const cleanedCpf = value.replace(/[^\d]+/g, '')

    if (cleanedCpf.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleanedCpf)) return false

    const checkDigit = (cpf: string, weight: number, length: number): number => {
      const sum = Array.from({ length }).reduce((acc: number, _, i) => acc + parseInt(cpf.charAt(i)) * (weight - i), 0)
      const digit = (sum * 10) % 11
      return digit === 10 || digit === 11 ? 0 : digit
    }

    const firstDigit = checkDigit(cleanedCpf, 10, 9)
    if (firstDigit !== parseInt(cleanedCpf.charAt(9))) return false

    const secondDigit = checkDigit(cleanedCpf, 11, 10)
    if (secondDigit !== parseInt(cleanedCpf.charAt(10))) return false
    
    return true
  }
}
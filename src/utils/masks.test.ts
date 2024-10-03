import { masks } from './masks'

describe('masks.cpf', () => {
  it('should mask a complete CPF', () => {
    const result = masks.cpf('12345678909')
    expect(result).toBe('123.456.789-09')
  })

  it('should mask a partial CPF', () => {
    const result = masks.cpf('1234567')
    expect(result).toBe('123.456.7')
  })

  it('should ignore non-numeric characters', () => {
    const result = masks.cpf('123.456.789-09')
    expect(result).toBe('123.456.789-09')
  })

  it('should remove letters and special characters', () => {
    const result = masks.cpf('abc123456789!@#')
    expect(result).toBe('123.456.789')
  })

  it('should return an empty string if input is empty', () => {
    const result = masks.cpf('')
    expect(result).toBe('')
  })
})

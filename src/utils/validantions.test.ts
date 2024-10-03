import { validations } from './validations' // Replace with the actual file name

describe('utils/validations', () => {
  it('should return true for valid names', () => {
    expect(validations.isName('TEST NAME')).toBe(true)
    expect(validations.isName('TE\'ST NA-ME')).toBe(true)
    expect(validations.isName('TEST NAME WÎTHÃÇ')).toBe(true)
  })

  it('should return false for invalid names', () => {
    expect(validations.isName('TEST123')).toBe(false)
    expect(validations.isName('')).toBe(false)
    expect(validations.isName('TEST')).toBe(false)
    expect(validations.isName('12345')).toBe(false)
    expect(validations.isName('TEST! NAME')).toBe(false)
  })

  it('should return true for valid email addresses', () => {
    expect(validations.isEmail('test@example.com')).toBe(true)
    expect(validations.isEmail('user.name@domain.co.uk')).toBe(true)
    expect(validations.isEmail('first_last@domain.org')).toBe(true)
    expect(validations.isEmail('test+label@gmail.com')).toBe(true)
  })

  it('should return false for invalid email addresses', () => {
    expect(validations.isEmail('plainaddress')).toBe(false)
    expect(validations.isEmail('@missingusername.com')).toBe(false)
    expect(validations.isEmail('username@.com')).toBe(false)
    expect(validations.isEmail('username@domain.c')).toBe(false)
  })

  it('should return true for valid CPF numbers', () => {
    expect(validations.isCpf('123.456.789-09')).toBe(true)
    expect(validations.isCpf('231.987.654-55')).toBe(true)
    expect(validations.isCpf('501.632.713-05')).toBe(true)
  })

  it('should return false for invalid CPF numbers', () => {
    expect(validations.isCpf('')).toBe(false)
    expect(validations.isCpf('777.777.777-77')).toBe(false)
    expect(validations.isCpf('123.456.789-10')).toBe(false)
    expect(validations.isCpf('501.632.713-02')).toBe(false)
  })
})
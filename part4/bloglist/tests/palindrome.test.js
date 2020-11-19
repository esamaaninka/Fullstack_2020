const palindrome = require('../utils/for_testing').palindrome

describe('palindrome', () => { 
  test('palindrome of a', () => {
    //consoleconst result = palindrome('a')

    expect(palindrome('a')).toBe('a')
  })

  test('palindrome of react', () => {
    const result = palindrome('react')

    expect(result).toBe('tcaer')
  })

  test('palindrome of releveler', () => {
    const result = palindrome('releveler')

    expect(result).toBe('releveler')
  })
})
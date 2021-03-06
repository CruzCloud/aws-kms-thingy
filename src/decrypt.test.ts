// tslint:disable no-expression-statement
import kmsDecrypt, { dictionary } from './decrypt'

const mockDecryptedValue = 'foobar'
const mockEncryptedValue = Buffer.from(mockDecryptedValue).toString('base64')

describe('decrypt()', () => {
  it('should decrypt an encrypted string and store it in cache', async () => {
    const result = await kmsDecrypt(mockEncryptedValue)

    expect(result).toBe(mockDecryptedValue)
    expect(dictionary.get(mockEncryptedValue)).toBe(mockDecryptedValue)
  })

  it('should use cache if item exists in cache', async () => {
    const encryptedValue = Buffer.from('foobar').toString('base64')

    dictionary.clear()
    dictionary.set(encryptedValue, 'cached')

    const result = await kmsDecrypt(encryptedValue)

    expect(result).toBe('cached')
  })

  it('should return value as-is if not a base64 encoded secret', async () => {
    const result = await kmsDecrypt(mockDecryptedValue)

    expect(result).toBe(mockDecryptedValue)
  })

  it('should return original value if error occurred decrypting with SDK', async () => {
    const mockError = Buffer.from('mockError').toString('base64')
    const result = await kmsDecrypt(mockError)

    expect(result).toBe(mockError)
  })

  it('should return value as is if DISABLE_AWS_KMS_THINGY is set', async () => {
    // tslint:disable-next-line no-object-mutation
    process.env.DISABLE_AWS_KMS_THINGY = 'true'

    const result = await kmsDecrypt(mockEncryptedValue)

    expect(result).toBe(mockEncryptedValue)

    // tslint:disable-next-line no-object-mutation no-delete
    delete process.env.DISABLE_AWS_KMS_THINGY
  })
})

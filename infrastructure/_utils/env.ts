export function getEnvVariables(keys: string[]) {
  const values = keys.map(key => {
    const value = process.env[key]
    if (!value) throw new Error(`Missing ENV variable: ${key}`)
    return value
  })

  return values
}

export const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length

export const variance = values => {
  const mu = mean(values)
  return mean(values.map(value => Math.pow(value - mu, 2)))
}

export const standardDeviation = values => Math.sqrt(variance(values))

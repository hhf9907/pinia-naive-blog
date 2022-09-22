import components from 'prismjs/components'

const allLanguages = Object.keys(components.languages).filter(
  (item) => item !== 'meta'
)

export default {
  plugins: [
    [
      'prismjs',
      {
        languages: allLanguages
      }
    ]
  ]
}

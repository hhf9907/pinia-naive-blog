class LocalCache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    try {
      const value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
    } catch (error) {
      return ''
    }
  }

  deleteCache(key: string) {
    localStorage.removeItem(key)
  }

  clearCache() {
    localStorage.clear()
  }
}

export default new LocalCache()

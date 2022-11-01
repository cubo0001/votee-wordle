module.exports = (array, chunkSize) => {
    let arr = []
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize)
      arr = [...arr, chunk]
    }
    return arr
}
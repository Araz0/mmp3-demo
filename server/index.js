// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Client connected')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const intervalId = setInterval(() => {
    // const date = Date().toLocaleString()
    const currentDate = new Date()
    const data = {
      time: currentDate.getTime(),
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    }
    // eslint-disable-next-line no-console
    console.log('sending: ', data)
    res.write(`data: ${JSON.stringify(data)}\n\n`)
    // res.write(JSON.stringify(data))
  }, 1000)

  res.on('close', () => {
    // eslint-disable-next-line no-console
    console.log('Client closed connection')
    clearInterval(intervalId)
    res.end()
  })
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`)
})

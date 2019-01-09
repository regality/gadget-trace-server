let express = require('express')
let router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Gadget Trace'
  })
})

// fake application for screenshots
router.get('/application', function (req, res, next) {
  res.render('application')
})

router.get('/request/:requestId', function (req, res, next) {
  let requests = getRequests(req.params.requestId)
  res.json({ requests: requests })
})

router.post('/request/all', function (req, res, next) {
  const requestIds = req.body.requestIds.split(',')
  const secrets = req.body.secrets ? req.body.secrets.split(',').filter(v => v) : []
  let requests = []
  requestIds.forEach(requestId => {
    requests = requests.concat(getRequests(requestId))
  })
  requests = requests.filter(request => {
    if (!request.secret) return true
    return secrets.includes(request.secret)
  })
  res.json({ requests: requests })
})

router.post('/request/:requestId', function (req, res, next) {
  addRequest(req.params.requestId, req.body)
  res.json({ ok: true })
})

router.delete('/request/:requestId', function (req, res, next) {
  deleteRequest(req.params.requestId)
  res.json({ ok: true })
})

let requests = {}

function addRequest (requestId, requestData) {
  if (!requests[requestId]) requests[requestId] = []
  requestData.requestId = requestId
  requests[requestId].push(requestData)
}

function deleteRequest (requestId) {
  delete requests[requestId]
}

function getRequests (requestId) {
  if (requests[requestId]) {
    let arr = requests[requestId]
    delete requests[requestId]
    return arr
  } else {
    return []
  }
}

module.exports = router

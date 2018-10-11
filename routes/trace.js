let express = require('express')
let router = express.Router()

router.get('/request/:request_id', function (req, res, next) {
  let requests = getRequests(req.params.request_id)
  res.json({ requests: requests })
})

router.post('/request/all', function (req, res, next) {
  const requestIds = req.body.requestIds.split(',')
  let requests = []
  requestIds.forEach(requestId => {
    requests = requests.concat(getRequests(requestId))
  })
  res.json({ requests: requests })
})

router.post('/request/:request_id', function (req, res, next) {
  addRequest(req.params.request_id, req.body)
  res.json({ ok: true })
})

router.delete('/request/:request_id', function (req, res, next) {
  deleteRequest(req.params.request_id)
  res.json({ ok: true })
})

let requests = {}

function addRequest (requestId, requestData) {
  if (!requests[requestId]) requests[requestId] = []
  requestData.request_id = requestId
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

// schema:
//      trace_id
//      trace_uid
//      trace_from_uid
//      url
//      headers
//      received
//      response
//      variables
//      calls
//          url
//          params
//          response

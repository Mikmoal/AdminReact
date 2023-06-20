const { Router } = require('express');
const router = Router();
const { redirectToGoogleAuthServer, handleOAuthCallback, revokeToken } = require('../handlers/apiHandlers');


router.all("/", redirectToGoogleAuthServer);

router.all("/oauth2callback", handleOAuthCallback);

router.get("/revoke", revokeToken);


module.exports = router;
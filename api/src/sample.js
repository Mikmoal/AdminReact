// Parameters for request

// Returns the calendars on the user's calendar list.

@example

// Before running the sample:
// - Enable the API at:
//   https://console.developers.google.com/apis/api/calendar.googleapis.com
// - Login into gcloud by running:
//   `$ gcloud auth application-default login`
// - Install the npm module by running:
//   `$ npm install googleapis`

const {google} = require('googleapis');
const calendar = google.calendar('v3');

async function main() {
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
  });

  // Acquire an auth client, and bind it to all future calls
  const authClient = await auth.getClient();
  google.options({auth: authClient});

  // Do the magic
  const res = await calendar.calendarList.list({
    // Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.
    maxResults: 'placeholder-value',
    // The minimum access role for the user in the returned entries. Optional. The default is no restriction.
    minAccessRole: 'placeholder-value',
    // Token specifying which result page to return. Optional.
    pageToken: 'placeholder-value',
    // Whether to include deleted calendar list entries in the result. Optional. The default is False.
    showDeleted: 'placeholder-value',
    // Whether to show hidden entries. Optional. The default is False.
    showHidden: 'placeholder-value',
    // Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False.
    // To ensure client state consistency minAccessRole query parameter cannot be specified together with nextSyncToken.
    // If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.
    // Learn more about incremental synchronization.
    // Optional. The default is to return all entries.
    syncToken: 'placeholder-value',
  });
  console.log(res.data);

  // Example response
  // {
  //   "etag": "my_etag",
  //   "items": [],
  //   "kind": "my_kind",
  //   "nextPageToken": "my_nextPageToken",
  //   "nextSyncToken": "my_nextSyncToken"
  // }
}

main().catch(e => {
  console.error(e);
  throw e;
});
//@returns — A promise if used with async/await, or void if used with a callback.
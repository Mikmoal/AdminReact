import { Button } from '@mui/material';
import Head from 'next/head';
import Script from 'next/script';
import React, { useRef, useEffect, useState } from 'react';

const CalendarEventsR = () => {
    // TODO(developer): Set to client ID and API key from the Developer Console
    const CLIENT_ID = '363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyBKIc81ZmllrFoT3fEUJkZquDIs5Za5CLw';

    // Discovery doc URL for APIs used by the quickstart
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    let tokenClient;
    let gapiInited = false;
    let gisInited = false;


    const [isVisibleAuth, setIsVisibleAuth] = useState(false);
    const [isVisibleSign, setIsVisibleSign] = useState(false);


    const toggleVisibility = (button) => {
        button === "isVisibleAuth" ? setIsVisibleAuth(!isVisibleAuth) : setIsVisibleSign(!isVisibleSign)
    };

    const authButtonRef = useRef(isVisibleAuth);
    const signOutButtonRef = useRef(isVisibleSign);

    // useEffect(() => {
    //     authButtonRef.current.visibility = 'hidden',
    //         signOutButtonRef.current.visibility = 'hidden'
    // }, []);

    // document.getElementById('authorize_button').style.visibility = 'hidden';
    // document.getElementById('signout_button').style.visibility = 'hidden';

    /**
     * Callback after api.js is loaded.
     */
    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
    }

    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
    }

    /**
     * Callback after Google Identity Services are loaded.
     */
    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
    }

    /**
     * Enables user interaction after all libraries are loaded.
     */
    function maybeEnableButtons() {
        if (gapiInited && gisInited) {
            // document.getElementById('authorize_button').style.visibility = 'visible';
            toggleVisibility("isVisibleAuth")
        }
    }

    const [authButtText, setAuthButtText] = useState('');
    const [content, setContent] = useState('');

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick() {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            // document.getElementById('signout_button').style.visibility = 'visible';
            toggleVisibility("isVisibleSign")
            // document.getElementById('authorize_button').innerText = 'Refresh';
            setAuthButtText('Refresh');
            await listUpcomingEvents();
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({ prompt: '' });
        }
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            // document.getElementById('content').innerText = '';
            setContent('');
            // document.getElementById('authorize_button').innerText = 'Authorize';
            setAuthButtText('Authorize');
            // document.getElementById('signout_button').style.visibility = 'hidden';
            setIsVisibleSign(false);
        }
    }

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    async function listUpcomingEvents() {
        let response;
        try {
            const request = {
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime',
            };
            response = await gapi.client.calendar.events.list(request);
        } catch (err) {
            // document.getElementById('content').innerText = err.message;
            setContent(err.message);
            return;
        }

        const events = response.result.items;
        if (!events || events.length == 0) {
            // document.getElementById('content').innerText = 'No events found.';
            setContent('No events found.');
            return;
        }
        // Flatten to string to display
        const output = events.reduce(
            (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
            'Events:\n');
        // document.getElementById('content').innerText = output;
        setContent(output);
    }
    return (
        <React.Fragment>
            <p>Google Calendar API Quickstart</p>
            <Button id="authorize_button" onClick={handleAuthClick}>Authorize</Button>
            <Button id="signout_button" onClick={handleSignoutClick}>Sign Out</Button>

            <pre id="content" style="white-space: pre-wrap;"></pre>

            <Script async defer src="https://apis.google.com/js/api.js" onload={gapiLoaded}></Script>
            <Script async defer src="https://accounts.google.com/gsi/client" onload={gisLoaded}></Script>
        </React.Fragment>
    )
};

export default CalendarEventsR
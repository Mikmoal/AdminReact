import React, { useEffect, useState } from 'react';
import { CLIENT_ID, API_KEY, CALENDAR_ID, SCOPES } from '../../../config';
import { google } from 'googleapis';

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Autenticación
        const auth = await google.auth.getClient({
          clientId: CLIENT_ID,
          apiKey: API_KEY,
          scope: SCOPES
        });

        // Crear instancia de la API de Google Calendar
        const calendar = google.calendar({ version: 'v3', auth });

        // Obtener eventos del calendario
        const response = await calendar.events.list({
          calendarId: CALENDAR_ID,
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime'
        });

        setEvents(response.data.items);
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    };

    loadEvents();
  }, []);

  return (
    <div>
      <h2>Eventos del calendario:</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarEvents;

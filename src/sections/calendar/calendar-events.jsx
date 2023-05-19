import React, { useEffect, useState } from 'react';
import { google } from 'googleapis';

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const auth = new google.auth.GoogleAuth({
        // Coloca aquí tu clave de API de Google
        keyFile: '../../../credentials/google-calendar-credentials.json',
        scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
      });

      const calendar = google.calendar({ version: 'v3', auth });

      try {
        const response = await calendar.events.list({
          calendarId: 'miguel.morales@racingcargo.com', // Puedes reemplazarlo con el ID de tu calendario si no es el principal
          timeMin: new Date().toISOString(),
          maxResults: 10, // Número máximo de eventos a obtener
          singleEvents: true,
          orderBy: 'startTime',
        });

        const events = response.data.items;
        setEvents(events);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    };

    getEvents();
  }, []);

  return (
    <div>
      <h1>Eventos del calendario</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.summary}</strong> - {event.start.dateTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarEvents;

import { google } from "googleapis";

export async function createCalendarEvent(params: {
  title: string;
  description: string;
  startTime: string;
  durationMinutes: number;
  attendeeEmail: string;
  organizerToken: string;
}) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: params.organizerToken });

  const calendar = google.calendar({ version: "v3", auth });
  const start = new Date(params.startTime);
  const end = new Date(start.getTime() + params.durationMinutes * 60_000);

  return calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: params.title,
      description: params.description,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees: [{ email: params.attendeeEmail }],
      conferenceData: {
        createRequest: {
          requestId: `fr-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });
}

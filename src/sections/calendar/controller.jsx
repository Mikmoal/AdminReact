import 'whatwg-fetch';
import React from 'react';
import axios from 'axios';

function getData(_, requestOptions) {
  
  const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
    CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');

  return axios(dataUrl, requestOptions).then(
    (response) => response.json(),
  ).then((data) => data.items);
}

const dataSource = new CustomStore({
  load: (options) => getData(options, { showDeleted: false }),
});

const currentDate = new Date(2017, 4, 25);
const views = ['day', 'workWeek', 'month'];

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="long-title">
          <h3>Tasks for Employees (USA Office)</h3>
        </div>
        <Scheduler
          dataSource={dataSource}
          views={views}
          defaultCurrentView="workWeek"
          defaultCurrentDate={currentDate}
          height={500}
          startDayHour={7}
          editing={false}
          showAllDayPanel={false}
          startDateExpr="start.dateTime"
          endDateExpr="end.dateTime"
          textExpr="summary"
          timeZone="America/Los_Angeles" />
      </React.Fragment>

    );
  }
}

export default App;
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class SchedulePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      schedules: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/schedules`).then((res) => {
      const schedules = res.data;
      this.setState({
        schedules: schedules,
      });
    });
  }

  render(): React.ReactNode {
    const { schedules } = this.state;
    return (
      <React.Fragment>
        <div className="button-group mb-2">
          <button type="button" className="btn btn-sm btn-custom">
            <i className="fa fa-calendar-o"></i> Add
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary">
            <i className="fa fa-eraser"></i> Clear filter
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <i className="fa fa-text-width"></i> Title
              </th>
              <th scope="col">
                <i className="fa fa-user"></i> Creator
              </th>
              <th scope="col">
                <i className="fa fa-paragraph"></i> Description
              </th>
              <th scope="col">
                <i className="fa fa-map-marker"></i> Location
              </th>
              <th scope="col">
                <i className="fa fa-calendar-o"></i> Time Start
              </th>
              <th scope="col">
                <i className="fa fa-calendar-o"></i> Time End
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule: any) => (
              <tr key={schedule.id}>
                <td>{schedule.title}</td>
                <td>{schedule.creator}</td>
                <td>{schedule.description}</td>
                <td>{schedule.location}</td>
                <td>
                  {schedule.date}, {schedule.startTime.hour}:
                  {schedule.startTime.minute}
                </td>
                <td>
                  {schedule.date}, {schedule.endTime.hour}:
                  {schedule.endTime.minute}
                </td>
                <td>
                  <Link
                    to={`/schedules/${schedule.id}/detail`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="fa fa-info-circle"></i> Details
                  </Link>
                  <Link
                    to={`/schedules/${schedule.id}/edit`}
                    className="btn btn-sm btn-primary"
                  >
                    <i className="fa fa-pencil"></i> Edit
                  </Link>
                  <button type="button" className="btn btn-sm btn-danger">
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default SchedulePage;

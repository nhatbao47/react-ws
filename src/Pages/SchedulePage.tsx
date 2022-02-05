import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../Components/ConfirmationDialog";
import configData from '../config.json';
import { Schedule } from "../Models/Schedule";

interface SchedulePageState {
  schedules: Schedule[],
  showDialog: boolean,
  selectedSchedule: Schedule
}

class SchedulePage extends React.Component<any, SchedulePageState> {
  private url = configData.JSON_API_URL + 'schedules';
  constructor(props: any) {
    super(props);
    this.state = {
      schedules: [],
      showDialog: false,
      selectedSchedule: {} as Schedule
    };
  }

  componentDidMount() {
    axios.get(this.url).then((res) => {
      const schedules = res.data;
      this.setState({
        schedules: schedules,
      });
    });
  }

  handleDelete(schedule: any) {
    let newState = { ...this.state };
    newState.selectedSchedule = schedule;
    newState.showDialog = true;
    this.setState(newState);
  }

  handleDialogShow = (show: boolean) => {
    this.setState({
      showDialog: show
    });
  }

  handleAccept = () => {
    const { selectedSchedule, schedules } = this.state;
    const scheduleId = selectedSchedule.id;
    this.handleDialogShow(false);
    axios.delete(this.url + '/' + scheduleId)
      .then(() => {
        const updatedSchedules = schedules.filter((schedule) => schedule.id !== scheduleId);
        this.setState({
          schedules: updatedSchedules
        });
      })
      .catch((error) => console.log(error));
  }

  getShortDate(date: any): string {
    const newDate = new Date(date);
    return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
  } 

  formatDate = (date: any) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

  render(): React.ReactNode {
    const { schedules, showDialog, selectedSchedule } = this.state;
    return (
      <React.Fragment>
        <div className="button-group mb-2">
          <Link to="/schedules/0/edit" className="btn btn-sm btn-custom">
            <i className="fa fa-calendar-o"></i> Add
          </Link>
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
                <i className="fa fa-calendar-o"></i> Date
              </th>
              <th scope="col">
                <i className="fa fa-clock-o"></i> Time
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
                <td>{this.formatDate(schedule.date)}</td>
                <td>{schedule.startTime} ~ {schedule.endTime}</td>
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
                  <button type="button" className="btn btn-sm btn-danger" onClick={() => this.handleDelete(schedule)}>
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ConfirmationDialog
          show={showDialog}
          message={`Are you sure to delete '${selectedSchedule?.title}'?`}
          callback={() => this.handleAccept()}
          close={() => this.handleDialogShow(false)}/>
      </React.Fragment>
    );
  }
}

export default SchedulePage;

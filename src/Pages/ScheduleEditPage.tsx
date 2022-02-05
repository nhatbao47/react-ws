import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configData from '../config.json';
import { Schedule } from "../Models/Schedule";
import { User } from "../Models/User";
import './ScheduleEditPage.css';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";

const ScheduleEditPage = () => {
  const url = configData.JSON_API_URL + 'schedules';
  const [addNew, setAddNew] = useState(false);
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule);
  const [users, setUsers] = useState<User[]>([] as any);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (parseInt(id ?? "") === 0) {
      setAddNew(true);
    } else {
      axios.get(`${url}/${id}`).then((res) => {
        let data = res.data as Schedule;
        data.date = new Date(res.data.date);
        setSchedule(res.data);
      });
    }

    axios.get(configData.JSON_API_URL + 'users').then((res) => {
      setUsers(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToSchedules = () => {
    navigate('/schedules');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    schedule.creator = getUsername(schedule.userId);
    
    if (addNew) {
      axios.post(url, schedule)
        .then(() => goToSchedules())
        .catch((error) => console.log(error));
    } else {
      axios.put(`${url}/${schedule.id}`, schedule)
        .then(() => goToSchedules())
        .catch((error) => console.log(error));
    }
  };

  const getUsername = (userId: any) => {
    const id = parseInt(userId);
    const user = users.find(user => user.id === id);
    return user?.name ?? '';
  }

  const handleInputChanged = (e: any, name = "") => {
    let data = { ...schedule };
    if (name === "") {
      name = e.target.name;
    }
    let value;
    switch (name) {
      case 'date':
      case 'startTime':
      case 'endTime':
        value = e;
        break;
      default:
        value = e.target.value;
        break;
    }
    (data as any)[name] = value;
    setSchedule(data);
  };

  return (
    <div className="card bg-light">
      <div className="card-header fw-bold">Schedule Composer</div>
      <div className="card-body">
        <form onSubmit={(e: any) => handleSubmit(e)}>
          <div className="form-group row required">
            <label className="col-md-2 col-form-label">Title</label>
            <div className="col-md-4">
              <input type="text" className="form-control" name="title" value={schedule.title} maxLength={200} onChange={(e) => handleInputChanged(e)} required />
            </div>
          </div>
          <div className="form-group row required">
            <label className="col-md-2 col-form-label">Creator</label>
            <div className="col-md-4">
              <select className="form-select" name="userId" value={schedule.userId} onChange={(e) => handleInputChanged(e, 'userId')} required>
                {users.map((user: User) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row required">
            <label className="col-md-2 col-form-label">Description</label>
            <div className="col-md-10">
              <textarea className="form-control" name="description" value={schedule.description} rows={3} onChange={(e) => handleInputChanged(e)} required></textarea>
            </div>
          </div>
          <div className="form-group row required">
            <label className="col-md-2 col-form-label">Location</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" name="location" value={schedule.location} maxLength={100} onChange={(e) => handleInputChanged(e)} required />
            </div>
          </div>
          <div className="form-group row required">
            <label className="col-md-2 col-form-label">Date</label>
            <div className="col-md-2">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                className="form-control"
                selected={schedule.date} onChange={(date: any) => handleInputChanged(date, 'date')}
                required
              />
            </div>
          </div>
          <div className="form-group row required">
            <label className="col-md-2 col-form-label">Time</label>
            <div className="col-md-3">
              <div className="input-group">
                <TimePicker
                  value={schedule.startTime}
                  onChange={(time: any) => handleInputChanged(time, 'startTime')}
                  maxTime={schedule.endTime}
                  format="HH:mm"
                  disableClock
                  required
                />
                <span className="mx-2 mt-2">~</span>
                <TimePicker
                  value={schedule.endTime}
                  onChange={(time: any) => handleInputChanged(time, 'endTime')}
                  minTime={schedule.startTime}
                  format="HH:mm"
                  disableClock
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <button type="submit" className="btn btn-sm btn-primary">
                <i className="fa fa-save"></i> Save</button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => goToSchedules()}>
                <i className="fa fa-ban"></i> Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

};

export default ScheduleEditPage;
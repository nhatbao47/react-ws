import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import configData from "../config.json";

const ScheduleDetailPage = () => {
  const url = configData.JSON_API_URL + 'schedules';
  const [schedule, setSchedule] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${url}/${id}`).then((res) => {
      setSchedule(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!schedule) return <div>Sorry, but the schedule was not found</div>;

  return (
    <div className="card bg-light">
      <div className="card-header fw-bold">Schedule Details</div>
      <div className="card-body">
        <div className="row">
          <label className="col-md-2">Title:</label>
          <div className="col-md-10">{schedule.title}</div>
        </div>
        <div className="row">
          <label className="col-md-2">Creator:</label>
          <div className="col-md-10">{schedule.creator}</div>
        </div>
        <div className="row">
          <label className="col-md-2">Description:</label>
          <div className="col-md-10">{schedule.description}</div>
        </div>
        <div className="row">
          <label className="col-md-2">Location:</label>
          <div className="col-md-10">{schedule.location}</div>
        </div>
        <div className="row">
          <label className="col-md-2">Date time:</label>
          <div className="col-md-10">
            {schedule.date} {schedule.startTime.hour}:
            {schedule.startTime.minute} ~ {schedule.endTime.hour}:
            {schedule.endTime.minute}
          </div>
        </div>
        <div className="row">
          <label className="col-md-2"></label>
          <div className="col-md-10">
            <Link to="/schedules" className="btn btn-sm btn-outline-primary">
              <i className="fa fa-arrow-circle-o-left"></i> Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetailPage;

import React, { Component } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import DataTable from "./DataTable";

class DropdownComponent extends Component {
  constructor() {
    super();
    this.state = {
      jobName: [],
      selectedJob: "",
      initialData: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5500/json/jobs.json")
      .then(response => {
        this.setState({
          jobName: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5500/json/Bein_CPI_JOB/jobTable.json")
      .then(response => {
        this.setState({
          initialData: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClickJob = value => {
    this.setState({
      selectedJob: value,
      initialData: []
    });

    axios
      .get(`http://localhost:5500/json/${value}/jobTable.json`)
      .then(response => {
        this.setState({
          initialData: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    let jobs = this.state.jobName;
    return (
      <div
        // className="row"
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "100px"
        }}
      >
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-sm-1"></div>
          <div className="col-sm-1">SELECT JOB NAME:</div>
          <div className="col-sm-4" style={{ padding: 20 }}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Jobs
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {jobs.map((job, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => this.handleClickJob(job.job_name)}
                    >
                      {job.job_name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          <div
            className="col-sm-10"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <DataTable tableData={this.state.initialData} />
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    );
  }
}

export default DropdownComponent;

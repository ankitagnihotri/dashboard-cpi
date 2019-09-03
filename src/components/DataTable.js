import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Record from "./Record";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordCount: [],
      status_id: 1
    };
  }

  render() {
    console.log(this.state.recordCount);
    const columns = [
      {
        Header: "Job ID",
        accessor: "job_id",
        maxWidth: 70
      },
      {
        Header: "Status ID",
        accessor: "status_id",
        maxWidth: 90
      },
      {
        // Required because our accessor is not a string
        Header: "Job Name",
        accessor: "job_name",
        maxWidth: 170
      },
      {
        // Required because our accessor is not a string
        Header: "Log File Name",
        accessor: "log_filename"
      },
      {
        Header: "Job Status",
        accessor: "job_status",
        maxWidth: 110
      },
      {
        Header: "Job Start Time",
        accessor: "start_time"
      },
      {
        Header: "Job End Time",
        accessor: "end_time"
      }
    ];
    const data = this.props.tableData;
    return (
      <ReactTable
        className="data-table"
        data={data}
        pageSizeOptions={[5, 10, 15, 20, 25, 50]}
        defaultPageSize={15}
        columns={columns}
        style={{ textAlign: "center" }}
        SubComponent={row => {
          return (
            <div>
              <em>
                <Record statusId={data[row.index].status_id} />
              </em>
            </div>
          );
        }}
      />
    );
  }
}

export default DataTable;

import React, { PureComponent } from "react";
import Axios from "axios";
import { Card } from "react-bootstrap";

class Record extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recordData: []
    };
  }
  componentDidMount() {
    Axios.get(`http://localhost:5500/json/${this.props.statusId}/count.json`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            recordData: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.recordData.length !== 0) {
      return (
        <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
          {this.state.recordData.map(record => (
            <Card border="success" style={{ width: "18rem" }}>
              <Card.Header as="h5">{record.table_name}</Card.Header>
              <Card.Body>
                <Card.Text>
                  <div style={{ marginBottom: "10px" }}>
                    Insert Count : {record.insert_count}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    Update Count : {record.update_count}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    Delete Count : {record.delete_count}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    Total Affected : {record.total_count}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    } else return <div style={{ color: "red" }}>Record not found</div>;
  }
}

export default Record;

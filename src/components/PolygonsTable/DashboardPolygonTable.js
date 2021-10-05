import React, { useState, useEffect } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

const DashboardPolygonTable = (props) => {
  const [data, setdata] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [polygonId, setPolygonId] = useState();

  const API_KEY = "b22d00c2f91807b86822083ead929d76";
  useEffect(() => {
    fetchPolygons();
  }, []);

  const fetchPolygons = () => {
    fetch(`http://api.agromonitoring.com/agro/1.0/polygons?appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        data.map((item, i) => {
          const unixTimestamp = data[i].created_at;
          var date = new Date(unixTimestamp * 1000);
          const standard_date =
            date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear();
          data[i].created_at = standard_date;
        });
        setdata(data);
      })
      .catch((err) => console.log(err));
  };

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 10);
  };

  const ModalClick = (id) => {
    setOpen(true);
    setPolygonId(id);
  };

  const EditPolygon = () => {
    fetch(
      `http://api.agromonitoring.com/agro/1.0/polygons/${polygonId}?appid=${API_KEY}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
        }),
      },
    );
    setOpen(false);
    setEditName("");
    setTimeout(() => {
      fetchPolygons();
    }, 500);
  };

  const DeletePolygon = (id) => {
    fetch(
      `http://api.agromonitoring.com/agro/1.0/polygons/${id}?appid=${API_KEY}`,
      {
        method: "DELETE",
      },
    );
    console.log("Delete polygon id: ", id);
    setTimeout(() => {
      fetchPolygons();
    }, 500);
  };

  const EditPolygonsCell = ({
    rowData,
    onChange,
    checkedKeys,
    dataKey,
    ...props
  }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: "46px" }}>
        <Button>
          <EditIcon onClick={() => ModalClick(rowData.id)} />
        </Button>
        |
        <Button onClick={() => DeletePolygon(rowData.id)}>
          <DeleteIcon />
        </Button>
      </div>
    </Cell>
  );

  const handleEditNameChange = (e) => {
    setEditName(e.target.value);
  };

  return (
    <div>
      <Table
        height={420}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        autoHeight={true}
      >
        <Column width={250} fixed sortable>
          <HeaderCell>Polygon Name </HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={250} sortable>
          <HeaderCell>Created at</HeaderCell>
          <Cell dataKey="created_at" />
        </Column>

        <Column width={250} sortable>
          <HeaderCell>Area</HeaderCell>
          <Cell dataKey="area" />
        </Column>

        <Column width={150}>
          <HeaderCell>
            <Button onClick={() => fetchPolygons()}>
              <RefreshIcon />
            </Button>
          </HeaderCell>
          <EditPolygonsCell />
        </Column>
      </Table>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "white",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter polygon name"
            variant="outlined"
            value={editName}
            onChange={handleEditNameChange}
          />
          <Button onClick={EditPolygon} variant="contained" color="primary">
            Update Polygon
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPolygonTable;

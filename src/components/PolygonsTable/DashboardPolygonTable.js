import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import {
  Dialog,
  Button,
  TextField,
  Modal,
  DialogActions,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme) => ({}));

const DashboardPolygonTable = forwardRef((props, ref) => {
  const classes = useStyles();

  const [data, setdata] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [polygonId, setPolygonId] = useState();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [polygonToDelete, setPolygonToDelete] = useState();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    fetchPolygons();
  }, []);

  const fetchPolygons = () => {
    fetch(
      `${process.env.REACT_APP_AGROMONITORING_API_URL}polygons?appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
    )
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

  useImperativeHandle(ref, () => ({
    updateTable() {
      fetchPolygons();
    },
  }));

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
    }, 5);
  };

  const ModalClick = (id) => {
    setOpen(true);
    setPolygonId(id);
  };

  const EditPolygon = () => {
    fetch(
      `${process.env.REACT_APP_AGROMONITORING_API_URL}polygons/${polygonId}?appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
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
      `${process.env.REACT_APP_AGROMONITORING_API_URL}polygons/${id}?appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
      {
        method: "DELETE",
      },
    );
    console.log("Delete polygon id: ", id);
    setTimeout(() => {
      fetchPolygons();
      setDialogOpen(false);
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
        <Button
          onClick={() => {
            setDialogOpen(true);
            setPolygonToDelete(rowData.id);
          }}
        >
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
        style={{
          width: "100%",
        }}
      >
        <Column width={isMobile ? 150 : 250} sortable align="center">
          <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
            Field Name
          </HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={isMobile ? 150 : 250} sortable align="center">
          <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
            Created at
          </HeaderCell>
          <Cell dataKey="created_at" />
        </Column>

        <Column width={isMobile ? 150 : 250} sortable align="center">
          <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
            Area
          </HeaderCell>
          <Cell dataKey="area" />
        </Column>

        <Column width={isMobile ? 150 : 150} align="center">
          <HeaderCell
            style={{
              backgroundColor: "#3f4257",
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => fetchPolygons()}>
              <RefreshIcon style={{ color: "white" }} />
            </Button>
          </HeaderCell>
          <EditPolygonsCell />
        </Column>
      </Table>

      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.5)" } }}
      >
        <DialogTitle id="alert-dialog-title">Edit field name</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              id="outlined-basic"
              label="Enter field name"
              variant="outlined"
              defaultValue={editName}
              value={editName}
              fullWidth
              onChange={handleEditNameChange}
              required
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={EditPolygon}
            color="primary"
            disabled={editName === "" ? true : false}
          >
            Update Polygon
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.5)" } }}
      >
        <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this field?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => DeletePolygon(polygonToDelete)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DashboardPolygonTable;

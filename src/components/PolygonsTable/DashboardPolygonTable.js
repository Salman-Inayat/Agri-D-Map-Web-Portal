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
  IconButton,
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
        if (data.length > 0) {
          setdata(data);
        } else {
          setdata([]);
        }
      })
      .catch((err) => console.log(err));
  };

  useImperativeHandle(ref, () => ({
    updateTable() {
      console.log("update table");
      fetchPolygons();
    },
  }));

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

  const DeletePolygon = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_AGROMONITORING_API_URL}polygons/${id}?appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
      {
        method: "DELETE",
      },
    );

    // remove the polygon from the table
    setdata(data.filter((item) => item.id !== id));

    // const newData = data.filter((item) => item.id !== id);

    // setdata(newData);

    // fetchPolygons();
    setDialogOpen(false);
  };

  const EditPolygonsCell = ({
    rowData,
    onChange,
    checkedKeys,
    dataKey,
    ...props
  }) => (
    <Cell {...props}>
      <div>
        <IconButton size="small" onClick={() => ModalClick(rowData.id)}>
          <EditIcon style={{ color: "#fff" }} />
        </IconButton>
        |
        <IconButton
          size="small"
          onClick={() => {
            setDialogOpen(true);
            setPolygonToDelete(rowData.id);
          }}
        >
          <DeleteIcon style={{ color: "#fff" }} />
        </IconButton>
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
        data={data}
        sortColumn={sortColumn}
        loading={loading}
        autoHeight={true}
        cellBordered={false}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          borderRadius: "1rem",
          border: "1px solid #fff",
        }}
      >
        <Column
          align="center"
          flexGrow={2}
          style={{ backgroundColor: " #3f4257", color: "white" }}
        >
          <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
            Field Name
          </HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column
          align="center"
          flexGrow={1}
          style={{ backgroundColor: " #3f4257", color: "white" }}
        >
          <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
            Created at
          </HeaderCell>
          <Cell dataKey="created_at" />
        </Column>

        <Column
          align="center"
          flexGrow={1}
          style={{ backgroundColor: " #3f4257", color: "white" }}
        >
          <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
            Area
          </HeaderCell>
          <Cell dataKey="area" />
        </Column>

        <Column
          align="center"
          flexGrow={1}
          style={{ backgroundColor: " #3f4257", color: "white" }}
        >
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
            Update
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

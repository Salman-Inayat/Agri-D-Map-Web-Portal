import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import Radio from "@material-ui/core/Radio";

const PolygonTable = (props) => {
  const [data, setdata] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("a");

  useEffect(() => {
    fetch("http://localhost:5005/polygons")
      .then((res) => res.json())
      .then((data) => setdata(data))
      .catch((err) => console.log(err));
  }, []);

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

  const handleChange = (event) => {
    props.onChange(event.target.value);
    setValue(event.target.value);
  };

  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: "46px" }}>
        <Radio
          checked={value === rowData.polygon_id}
          onChange={handleChange}
          value={rowData.polygon_id}
          name="radio-button"
          inputProps={{ "aria-label": "A" }}
        />
      </div>
    </Cell>
  );

  return (
    <Table
      height={420}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      autoHeight={true}
    >
      <Column width={200} align="center" fixed>
        <HeaderCell>Select a polygon</HeaderCell>
        <CheckCell dataKey="id" />
      </Column>

      <Column width={200} fixed sortable>
        <HeaderCell>Polygon Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={200} sortable>
        <HeaderCell>Created at</HeaderCell>
        <Cell dataKey="created_at" />
      </Column>

      <Column width={200} sortable>
        <HeaderCell>Area</HeaderCell>
        <Cell dataKey="area" />
      </Column>
    </Table>
  );
};

export default PolygonTable;
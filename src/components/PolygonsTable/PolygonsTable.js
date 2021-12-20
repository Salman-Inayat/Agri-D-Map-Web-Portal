import React, { useState, useEffect } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import Radio from "@material-ui/core/Radio";

const API_KEY = "b22d00c2f91807b86822083ead929d76";

const PolygonTable = (props) => {
  const [data, setdata] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://api.agromonitoring.com/agro/1.0/polygons?appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setValue(data[0].id);
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
          data[i].area.toFixed(1);
        });
        setdata(data);
        setLoading(false);
      })
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
    <Cell {...props} sstyle={{ padding: "auto 0px" }}>
      <div>
        <Radio
          checked={value === rowData.id}
          onChange={handleChange}
          value={rowData.id}
          name="radio-button"
          inputProps={{ "aria-label": "A" }}
        />
      </div>
    </Cell>
  );

  return loading ? (
    <div style={{ height: "200px" }}>
      <img
        src="/horizontal-loader.gif"
        alt="loader"
        style={{ display: "block", margin: "auto" }}
      ></img>
    </div>
  ) : (
    <Table
      height={420}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      autoHeight={true}
      hover={false}
      rowHeight={60}
      headerHeight={50}
      // cellBordered={false}
      // bordered={false}
      style={{
        width: "100%",
      }}
    >
      <Column width={100} align="center" fixed>
        <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
          Select
        </HeaderCell>
        <CheckCell dataKey="id" />
      </Column>

      <Column width={150} fixed sortable>
        <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
          Polygon Name
        </HeaderCell>
        <Cell dataKey="name" style={{ padding: "20px" }} />
      </Column>

      <Column width={150} sortable>
        <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
          Created at
        </HeaderCell>
        <Cell dataKey="created_at" style={{ padding: "20px" }} />
      </Column>

      <Column width={110} sortable>
        <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
          Area
        </HeaderCell>
        <Cell dataKey="area" style={{ padding: "20px" }} />
      </Column>
    </Table>
  );
};

export default PolygonTable;

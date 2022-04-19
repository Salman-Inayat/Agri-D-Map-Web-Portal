import React, { useState, useEffect } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import Radio from "@material-ui/core/Radio";
import { useMediaQuery } from "react-responsive";

const PolygonTable = (props) => {
  const [data, setdata] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_AGROMONITORING_API_URL}polygons?appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
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
        } else {
          setdata([]);
        }
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
    <Cell {...props}>
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

  return (
    // loading ? (
    //   <div style={{ height: "200px" }}>
    //     <img
    //       src="/horizontal-loader.gif"
    //       alt="loader"
    //       style={{ display: "block", margin: "auto" }}
    //     ></img>
    //   </div>
    // ) : (
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
      headerHeight={40}
      cellBordered={false}
      bordered={false}
      style={{
        width: "100%",
        backgroundColor: "transparent",
        borderRadius: "1rem",
        border: "1px solid #fff",
      }}
    >
      <Column
        width={isMobile ? 60 : 100}
        align="center"
        style={{ backgroundColor: " #3f4257", color: "white" }}
      >
        <HeaderCell
          style={{ backgroundColor: "#3f4257", color: "white", height: "3rem" }}
        >
          Select
        </HeaderCell>
        <CheckCell dataKey="id" />
      </Column>

      <Column
        flexGrow={1}
        sortable
        align="center"
        style={{ backgroundColor: " #3f4257", color: "white" }}
      >
        <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
          Polygon Name
        </HeaderCell>
        <Cell dataKey="name" style={{ padding: "20px", border: "none" }} />
      </Column>

      <Column
        flexGrow={1}
        sortable
        align="center"
        style={{ backgroundColor: " #3f4257", color: "white" }}
      >
        <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
          Created at
        </HeaderCell>
        <Cell dataKey="created_at" style={{ padding: "20px" }} />
      </Column>

      <Column
        flexGrow={1}
        sortable
        align="center"
        style={{ backgroundColor: " #3f4257", color: "white" }}
      >
        <HeaderCell style={{ backgroundColor: "#3f4257", color: "white" }}>
          Area
        </HeaderCell>
        <Cell dataKey="area" style={{ padding: "20px" }} />
      </Column>
    </Table>
  );
};

export default PolygonTable;

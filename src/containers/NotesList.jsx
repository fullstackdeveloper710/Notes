import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";

const NotesList = () => {
  const [data, setData] = useState([]);
  const [tableData,setTableData]= useState([])

  const navigate = useNavigate();

  const fetchNotesList = () => {
    axios({
      method: "get",
      url: "http://localhost:3004/notes",
    })
      .then(function (response) {
        const sotred = response.data.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        });
        setData(response.data);
        setTableData(response.data)
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  const onDeleteHandler = (id) => {
    const confirm = window.confirm("Do you want delete this item ?");
    if (confirm) {
      axios({
        method: "delete",
        url: `http://localhost:3004/notes/${id}`,
      })
        .then(function (response) {
          console.log(response, "response===>>");
          fetchNotesList();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const onEditHandler = (data) => {
    navigate("/", { state: { ...data } });
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "CreatedAt",
      selector: (row) => moment(row.createdAt).format("lll"),
      sortable: true,
    },
    {
      name: "modifiedAt",
      selector: (row) =>
        row.modiFiedAt ? moment(row.modiFiedAt).format("lll") : "Not modified",
      sortable: true,
    },
    {
      name: "Body",
      selector: (row) => <div>{row.notes}</div>,
      sortable: true,
      sortFunction: (a, b) => {
        if (a.notes > b.notes) {
          return 1;
        }
        if (b.notes > a.notes) {
          return -1;
        }
        return 0;
      },
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button className="edit_btn" onClick={() => onEditHandler(row)}>
            Edit
          </button>
          <button
            className="delete_btn"
            onClick={() => onDeleteHandler(row.id)}
          >
            Delete
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  useEffect(() => {
    fetchNotesList();
  }, []);

  const onSearch = (e) => {
    if (e.target.value !== "") {
      const filtredArray = tableData.filter((obj) =>
        obj.title.includes(e.target.value)||obj.notes.includes(e.target.value)
      );
      setData(filtredArray);
    } else {
      setData(tableData)
    }
  };

  return (
    <div className="notes_list">
      <Heading className="heading" title="All Notes" />
      <Input
        type="search"
        className="input_field"
        placeholder="Search"
        id="notesTitle"
        name="search"
        onChange={onSearch}
      />
      <DataTable
        className="notes_list"
        columns={columns}
        data={data}
        fixedHeader
        striped
        onRowClicked={(rowData) => {
          navigate(`/node-detail/:${rowData.id}`, { state: { ...rowData } });
        }}
      />
    </div>
  );
};

export default NotesList;

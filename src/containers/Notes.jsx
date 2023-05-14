import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "../components/Heading";

const Notes = () => {
  const [formData, setFormDAta] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setFormDAta({ title: state.title, body: state.notes });
    } else {
      setFormDAta({ title: "", body: "" });
    }
  }, [state]);

  const { title, body } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (state) {
      axios({
        method: "patch",
        url: `http://localhost:3004/notes/${state.id}`,
        data: {
          title: title,
          notes: body,
          modiFiedAt: new Date(),
        },
      })
        .then(function (response) {
          navigate("/notes-list")
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      axios({
        method: "post",
        url: "http://localhost:3004/notes",
        data: {
          id: Math.floor(Math.random() * (500 - 1 + 1) + 1),
          title: title,
          notes: body,
          createdAt: new Date(),
        },
      })
        .then(function (response) {
          setFormDAta({
            title: "",
            body: "",
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormDAta((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
   <div className="form_group">
    <Heading className="heading" title={state?"Update note":"Add note"}/>
     <form  onSubmit={onSubmit}>
      <Input
        type="text"
        className="input_field"
        label="Title"
        placeholder="Enter Title"
        id="notesTitle"
        name="title"
        value={title}
        onChange={onChangeHandler}
      />
      <TextArea
        className="text_area"
        label="Note"
        id="notesTextAreas"
        placeholder="Enter text Here...."
        rows="10"
        cols="20"
        name="body"
        value={body}
        onChange={onChangeHandler}
      />
      {state ? (
        <Button
          type="submit"
          className="btn"
          label="Update"
          disabled={title === "" || body === "" ? true : false}
        />
      ) : (
        <Button
          type="submit"
          className="btn"
          label="Add Note"
          disabled={title === "" || body === "" ? true : false}
        />
      )}
    </form>
   </div>
  );
};

export default Notes;

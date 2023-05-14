import React, { useEffect } from "react";
import Heading from "../components/Heading";
import { useLocation } from "react-router-dom";
import moment from "moment";

const NoteDetail = () => {
  const { state } = useLocation();
  useEffect(() => {
    console.log(state, "state in detail");
  }, [state]);

  const { createdAt, modifiedAt, title, notes } = state;
  return (
    <div className="note_detail">
      <Heading className="heading" title="details" />
      <div className="note_content">
        <div className="note_content_first_section">
          <p>
            createdAt: <span>{moment(createdAt).format("lll")}</span>
          </p>
          <p>
            modifiedAt:
            <span>
              {modifiedAt ? moment(modifiedAt).format("lll") : "Not modified"}
            </span>
          </p>
        </div>
        <div className="note_content_second_section">
          <p>Title: <span>{title}</span></p>
          <div className="notes"><span>Notes:</span> <p className="notes_paragaraph">{notes}</p></div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;

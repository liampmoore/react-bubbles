import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ColorForm from "./ColorForm";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState({...initialColor});

  const [creating, setCreating] = useState(false);
  const [newColor, setNewColor] = useState({...initialColor})

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => updateColors(colors.map((item) => {
        if (item.id === res.data.id) {
          return res.data
        }
        else return item
      })))
      .catch(err => console.error(err))
  };



  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(item => item.id !== color.id))
      })
      .catch(err => console.error(err))
  };

  const addColor = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .post(`/api/colors`, newColor)
      .then(res => {
        updateColors(res.data)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (

        <ColorForm handleSubmit={saveEdit} handleChange={setColorToEdit} formValue={colorToEdit} handleCancel={setEditing} title='edit color' />
        
      )}
      { (!creating && !editing)&& <div className="button-row">
            <button onClick={() => setCreating(true)}>add new color</button>
          </div>}
      { creating && <ColorForm handleSubmit={addColor} handleChange={setNewColor} formValue={newColor} handleCancel={setCreating} title='new color' />}
    </div>
  );
};

export default ColorList;

import React, { useState } from "react";

import "./styles.scss";

import { Input, Button } from "../ui-components";

const InputForm = ({ submit, clearData }) => {
  const initialInfectedCell = { x: "2", y: "2" };
  const initialInfectedPerson = { x: "1", y: "1", p: "E", movement: "FLFF" };
  const initialGridLayout = { length: "5", breadth: "5" };

  const [gridLayout, setGridLayout] = useState(initialGridLayout);

  const [infectedCells, setInfectedCells] = useState([initialInfectedCell]);
  const [infectedPeople, setInfectedPeople] = useState([initialInfectedPerson]);

  const addNewField = (type) => {
    if (type === "cell") {
      setInfectedCells((prevState) => {
        return [...prevState, { ...initialInfectedCell }];
      });
    } else if (type === "person") {
      setInfectedPeople((prevState) => {
        return [...prevState, { ...initialInfectedPerson }];
      });
    }
  };

  const handleFieldValueChange = (field, event, index) => {
    const value = event?.target?.value;

    switch (field) {
      case "length":
        setGridLayout((prevState) => {
          return { ...prevState, length: value };
        });
        break;
      case "breadth":
        setGridLayout((prevState) => {
          return { ...prevState, breadth: value };
        });
        break;
      case "cellX":
        const updatedXValue = editAndReturnNewArray(infectedCells, "x", value, index);
        setInfectedCells(updatedXValue);
        break;
      case "cellY":
        const updatedYValue = editAndReturnNewArray(infectedCells, "y", value, index);
        setInfectedCells(updatedYValue);
        break;
      case "personX":
        const updatedPXValue = editAndReturnNewArray(infectedPeople, "x", value, index);
        setInfectedPeople(updatedPXValue);
        break;
      case "personY":
        const updatedPYValue = editAndReturnNewArray(infectedPeople, "y", value, index);
        setInfectedPeople(updatedPYValue);
        break;
      case "personP":
        const updatedPPValue = editAndReturnNewArray(infectedPeople, "p", value, index);
        setInfectedPeople(updatedPPValue);
        break;
      case "personM":
        const updatedPMValue = editAndReturnNewArray(infectedPeople, "movement", value, index);
        setInfectedPeople(updatedPMValue);
        break;
    }
  };

  const editAndReturnNewArray = (array, key, value, index) => {
    const arr = [...array];
    const obj = arr[index];
    obj[key] = value;
    arr[index] = obj;
    return arr;
  };

  const handleSubmit = () => {
    const payload = {
      grid: gridLayout,
      infectedCells: infectedCells,
      persons: infectedPeople,
    };

    submit(payload);
  };

  const handleClear = () => {
    setInfectedCells([initialInfectedCell]);
    setInfectedPeople([initialInfectedPerson]);
    setGridLayout(initialGridLayout);

    clearData();
  };

  return (
    <div className="input">
      <div className="grid">
        <h4>The Grid layout</h4>

        <div className="input-layout">
          <span>
            Length
            <Input value={gridLayout?.length} onChange={(e) => handleFieldValueChange("length", e)} type="number" />
          </span>
          <span>
            Breadth
            <Input value={gridLayout?.breadth} onChange={(e) => handleFieldValueChange("breadth", e)} type="number" />
          </span>
        </div>
      </div>

      <div>
        <h4>Infected cells</h4>

        {infectedCells?.map((cell, index) => {
          return (
            <div key={index} className="input-layout">
              <span>
                X <Input value={cell?.x} onChange={(e) => handleFieldValueChange("cellX", e, index)} type="number" />
              </span>
              <span>
                Y<Input value={cell?.y} onChange={(e) => handleFieldValueChange("cellY", e, index)} type="number" />
              </span>
            </div>
          );
        })}

        <Button onClick={() => addNewField("cell")} label="Add new cell" />
      </div>

      <div>
        <h4>Person's position and movement</h4>

        {infectedPeople.map((person, index) => {
          return (
            <div key={index} className="input-layout">
              <span>
                X
                <Input value={person?.x} onChange={(e) => handleFieldValueChange("personX", e, index)} type="number" />
              </span>
              <span>
                Y
                <Input value={person?.y} onChange={(e) => handleFieldValueChange("personY", e, index)} type="number" />
              </span>
              <span>
                Facing
                <Input value={person?.p} onChange={(e) => handleFieldValueChange("personP", e, index)} type="Text" />
              </span>
              <span>
                Movement
                <Input
                  value={person?.movement}
                  onChange={(e) => handleFieldValueChange("personM", e, index)}
                  type="Text"
                />
              </span>
            </div>
          );
        })}

        <Button onClick={() => addNewField("person")} label="Add another person" />
      </div>

      <Button onClick={handleSubmit} label="Submit" />
      <Button onClick={handleClear} label="Clear" />
    </div>
  );
};

export default InputForm;
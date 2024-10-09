import { Select } from "@chakra-ui/react";
import React from "react";

const SelectTag = ({ name, fun }) => {
  const MonthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <Select placeholder={name} width="150px" cursor="pointer" onChange={fun}>
      {MonthArray.map((items, i) => {
        return (
          <option value={items} key={i}>
            {items}
          </option>
        );
      })}
    </Select>
  );
};

export default SelectTag;

import React, { useContext, useState } from "react";
import { ResidentContext } from "../context/residentcontext";
import { STUDENTS } from "../studentsList";

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split("-");
  const [yyyy, mm, dd] = validityDate.split("-");
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}

const now = new Date();
const initialDate = `${now.getFullYear()}-${(now.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

function Search() {
  const { addResidents, setErrorMessage, setIsError } =
    useContext(ResidentContext);
  const [studentName, setStudentName] = useState("");

  const [joiningDate, setJoiningDate] = useState(initialDate);

  const handleJoiningDateChange = (e) => {
    const date = new Date(e.target.value);
    const stringDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    setJoiningDate(stringDate);
  };

  const handleStudentNameChange = (e) => {
    setStudentName(e.target.value);
  };

  const handleAddStudent = () => {
    setIsError(false);
    setErrorMessage("");

    const studentExistsIndex = STUDENTS.findIndex(
      (student) =>
        student.name.toLowerCase() === studentName.trim().toLowerCase()
    );

    if (studentExistsIndex === -1) {
      setIsError(true);
      setErrorMessage(`Sorry, ${studentName} is not a verified student!`);
      return;
    }
    const student = STUDENTS[studentExistsIndex];
    const { validityDate, name } = student;
    const isValidDate = checkValidity(joiningDate, validityDate);

    if (!isValidDate) {
      setIsError(true);
      setErrorMessage(`Sorry, ${studentName}'s validity has Expired!`);
      return;
    }

    const newStudent = {
      name,
      joiningDate: joiningDate,
      id: Date.now(),
    };

    addResidents(newStudent);
    setStudentName("");
    setJoiningDate("");
  };
  return (
    <div className="my-50 layout-row align-items-end justify-content-end">
      <label htmlFor="studentName">
        Student Name:
        <div>
          <input
            id="studentName"
            data-testid="studentName"
            type="text"
            className="mr-30 mt-10"
            value={studentName}
            onChange={handleStudentNameChange}
          />
        </div>
      </label>
      <label htmlFor="joiningDate">
        Joining Date:
        <div>
          <input
            id="joiningDate"
            data-testid="joiningDate"
            type="date"
            className="mr-30 mt-10"
            onChange={handleJoiningDateChange}
            // value={joiningDate}
          />
        </div>
      </label>
      <button
        type="button"
        data-testid="addBtn"
        className="small mb-0"
        onClick={handleAddStudent}
      >
        Add
      </button>
    </div>
  );
}

export default Search;

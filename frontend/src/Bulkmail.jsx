import React from "react";
import { useRef } from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const Bulkmail = () => {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [info, setInfo] = useState([]);
  const [status, setStatus] = useState(false);
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [inError, setInError] = useState("false");
  const [send, setSend] = useState(false);
  const writemail = useRef();
  const inp = useRef();

const timeDate = ()=>{
 const date1 = new Date()
 const day = date1.getDate()
 const month = date1.getMonth()+1
 const year = date1.getFullYear()
 const hour = date1.getHours()
 const minites = date1.getMinutes()
 const hour1 = hour>12?hour-12:hour
 const time = `${hour1}:${minites}`
 const date = `${day}/${month}/${year}`
 return {time,date}

}

  const handleRead = (e) => realData(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.files[0];
    realData(data);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const realData = (data) => {
    try {
      if (!data) throw new Error("Select the File");

      if (data.name.split(".")[1] == "xlsx") {
        setError("");
        setFileName(data.name);

        const reader = new FileReader();

        reader.onload = (e) => {
          const binary = e.target.result;
          const readData = XLSX.read(binary, { type: "binary" });
          const sheetName = readData.SheetNames[0];
          const middleData = readData.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(middleData, {
            header: "A",
          });
          const finalData = jsonData.map((val) => val.A);
          setInfo(finalData);
        };
        setStatus(true);

        reader.readAsBinaryString(data);
      } else {
        throw new Error("Invalid file formate, only Excel file allowed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpload = () => {
    inp.current.click();
  };

  const handleSubmit = () => {
  const {date,time} =   timeDate()
    
    try {
      let arr = [];
      arr.push(info);

      let holeMail = writemail.current.value;

      let mialarr =
        holeMail.length >= 1
          ? holeMail.split(",").map((val) => val.trim())
          : [];
      arr.push(mialarr);

      let finalArr = arr.flat(Infinity);

      if (finalArr.length <= 0) {
        setSend(false);
        throw new Error(true);
      } else {
        setSend(true);
        axios
          .post("http://localhost:3000/mail", { finalArr, text, subject,date,time })
          .then((val) => {
            setSend(val.data[0]);
            if (val.data[1]) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Mails send Successfully",
                showConfirmButton: true,
                timer: 15000,
              });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something wrong in the mails",
                showConfirmButton: true,
                timer: 15000,
              });
            }
          });

        throw new Error(false);
      }
    } catch (error) {
      setInError(error.message);
    }
  };

  return (
    <div className=" w-full py-10 ">
      <div
        accept=".xls,.xlsx"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={` ${
          inError == "true" ? "border-red-500" : "border-black"
        } flex flex-col items-center gap-2 justify-center border-2 rounded-xl border-dashed p-2 text-center  w-[80%] mx-auto h-[200px] `}
      >
        <h2 className="font-bold text-xl mb-5">
          Upload or Drop a Excel file here
        </h2>
        <input
          accept=".xls,.xlsx"
          className="hidden"
          ref={inp}
          onChange={handleRead}
          type="file"
        />

        <button
          onClick={handleUpload}
          accept=".xls,.xlsx"
          className="btn btn-info"
        >
          <RiFileExcel2Fill /> Upload file
        </button>
        {fileName && !error && <p className="text-[10px]  ">{fileName}</p>}
        {error && <p className="text-[9px] text-red-500">{error}</p>}
      </div>
      <p className="mx-auto w-fit my-2">or</p>

      <div
        className="w-[80%] left-[50%] relative flex flex-col gap-1.5 my-3 "
        style={{ transform: "translate(-50%)" }}
      >
        <label className="font-medium text-l " htmlFor="Reciplent">
          Reciplent Emails :
        </label>
        <input
          id="Reciplent"
          className={`${
            inError == "true" ? "border-red-500" : "border-black"
          } border  rounded p-1.5 `}
          type="text"
          placeholder="Reciplent Emails (comma separated)"
          ref={writemail}
        />
      </div>

      <hr className="mt-4 border-dashed border-gray-400 " />
      <div
        className="w-[80%] left-[50%] relative flex flex-col gap-1.5 my-3  "
        style={{ transform: "translate(-50%)" }}
      >
        <label className="font-medium text-l " htmlFor="subject">
          Subject :
        </label>
        <input
          id="subject"
          className="border  rounded p-1.5 "
          type="text"
          placeholder="Enter the Email Subject"
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div
        className="w-[80%] relative  mt-3 left-[50%] flex flex-col gap-1 "
        style={{ transform: "translate(-50%)" }}
      >
        <label className="font-medium text-l " htmlFor="text">
          Text :
        </label>
        <textarea
          id="text"
          placeholder="Enter the Email text..."
          className=" p-1 resize-none h-30 border rounded "
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className=" btn btn-info relative left-[50%] text-white mt-5 disabled:bg-gray-500 disabled:text-black disabled:cursor-copy "
        style={{ transform: "translate(-50%)" }}
        disabled={send}
      >
        {send ? <span className="loading loading-spinner"></span>: <FaUpload />}
        {send ? "Sending..." : "Submit"}
      </button>

      {/* popup */}
      {info.length >= 1 && status && (
        <div className="w-full flex justify-center items-center min-h-screen bg-gray-900/50  top-0 left-0 backdrop-blur-[2px] fixed  ">
          <div className="w-[80%] h-[350px] border bg-white rounded-xl  p-1.5  ">
            <h2 className="font-bold text-xl mb-3">Check the Emails</h2>
            <div className="ml-4  h-[200px] overflow-y-auto p-2 ">
              {info.map((val, ind) => (
                <p key={ind}>
                  {" "}
                  {ind + 1}-{val}
                </p>
              ))}
            </div>
            <p
              className="relative left-[50%]  w-fit text-[12px] my-3 "
              style={{ transform: "translate(-50%)" }}
            >
              any mistakes in the mail, change to the excel file
            </p>
            <button
              className="relative left-[50%] border rounded px-2 bg-blue-500 text-white cursor-pointer"
              onClick={() => setStatus(false)}
              style={{ transform: "translate(-50%)" }}
            >
              ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bulkmail;

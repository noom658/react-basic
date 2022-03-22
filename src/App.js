import "./App.css";
import Transactions from "./components/Transactions";
import FormComponents from "./components/FormComponents";
import React, { useState, useEffect } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import {BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";

function App() {
  const [items, setItems] = useState([]);
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);
  const onAddNewItems = (newItems) => {
    setItems((prevItems) => {
      return [newItems, ...prevItems];
    });
  };
  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0)
    const expense =
      amounts
        .filter((element) => element < 0)
        .reduce((total, element) => (total += element), 0) * -1;
    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [items, reportIncome, reportExpense]);
  return (
    <DataContext.Provider value={{income: reportIncome,expense: reportExpense,}}>
      <div className="container">
        <h1 style={{ color: "red", textAlign: "center", fontSize: "1.5rem" }}>โปรแกรมบัญชีรายรับ - รายจ่าย</h1>
        <Router>
        <div>
          <ul className="horizontal-menu">
          <li>
            <Link to="/">ข้อมูลบัญชี</Link>
          </li>
          <li>
          <Link to="/insert">บันทึกข้อมูล</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" exact element={<ReportComponent />}></Route>
          <Route path="/insert" exact element={<><FormComponents onAddItems={onAddNewItems}/><Transactions items={items}/></>}>  
          </Route>
        </Routes>
        </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}
export default App;

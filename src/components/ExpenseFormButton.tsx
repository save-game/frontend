import { useState } from "react";
import ExpensesForm from "./ExpensesForm";

const ExpenseFormButton = () => {
  const [expensesForm, setExpensesForm] = useState(false);
  return (
    <>
      <button
        onClick={() => setExpensesForm(true)}
        className="btn btn-accent w-full text-base-100"
      >
        지출등록
      </button>
      <ExpensesForm formStatus={expensesForm} formEditor={setExpensesForm} />
    </>
  );
};

export default ExpenseFormButton;

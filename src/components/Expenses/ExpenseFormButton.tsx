import { useState } from "react";
import ExpensesForm from "./ExpensesForm";

interface ButtonProps {
  size: "normal" | "small";
}

const ExpenseFormButton = ({ size }: ButtonProps) => {
  const [expensesForm, setExpensesForm] = useState(false);
  const buttonSize = size === "small" ? "btn-sm" : "";
  return (
    <>
      <button
        onClick={() => setExpensesForm(true)}
        className={`btn btn-accent w-full text-base-100 ${buttonSize}`}
      >
        지출등록
      </button>
      {expensesForm ? <ExpensesForm formEditor={setExpensesForm} /> : null}
    </>
  );
};

export default ExpenseFormButton;

import React, { useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";

function Input() {
  const { value, setValue, addTask, editTask,handleEdit } = useContext(TaskContext);

  useEffect(() => {
    if (editTask) {
      setValue(editTask.value);
    }
  }, [editTask, setValue]);

  return (
    <div className="flex flex-col items-start w-[900px] container">
      <div className=" text-black font-medium flex gap-9 justify-center items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add tasks..."
          className="py-2 px-3 w-[700px] rounded-xl border-3 bg-blue-50 border-blue-500 text-black focus:border-black focus:outline-none"
        />
        <button
          className="py-2 px-3 border-3 bg-orange-400 rounded-xl text-white border-black font-extrabold"
          onClick={() => (editTask ? handleEdit(editTask.id) : addTask())}
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
}

export default Input;

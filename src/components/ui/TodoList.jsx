import React, { useContext, useEffect } from "react";
import TodoCard from "./TodoCard";
import { TaskContext } from "../../contexts/TaskContext";

function TodoList({ filterKey = "pending", buttonConfig }) {
  const { tasks } = useContext(TaskContext);

  const filteredTasks = filterKey
    ? tasks.filter((task) => task.status === filterKey)
    : tasks;

  return (
    <div className="container max-w-max flex flex-col gap-5">
      {filteredTasks?.length > 0 ? (
        filteredTasks.map((task, index) => (
          <TodoCard
            key={task.id}
            number={index + 1}
            task={task}
            buttonConfig={buttonConfig}
          />
        ))
      ) : (
        <div className="text-gray-500 text-xl font-medium mt-5 ml-2">
          {filterKey === "pending" && "Start adding your tasks..."}
          {filterKey === "completed" && "Completed tasks are shown here"}
          {filterKey === "deleted" && "Deleted tasks are shown here"}
        </div>
      )}
    </div>
  );
}

export default TodoList;

import React, { useState } from "react";

const styleInput = {
	marginTop: 0,
	fontSize: "0.5em",
	width: "50%",
};

const styleFoil = {
	marginTop: "0.3em",

	background: "white",
};
const styleTask = {
	textAlign: "left",
	borderBottom: "1px solid blue",

};

const Home = () => {
	const [list, setList] = useState([]);
	const [taskInput, setTaskInput] = useState("");
	const [visibleIcon, setVisibleIcon] = useState(false);

	function mouseOver(index) {
		setVisibleIcon(index);
	};
	function mouseExit() {
		setVisibleIcon(null);
	};

	function deleteTask(taskId) {
		/*
		let copyList = [...list];
		copyList.splice(index, 1);
		setList(copyList);
		*/
		fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				//if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(data => {
				getTasks();
				console.log(data);
			})
			.catch(error => console.error(error));
		getTasks();
	};

	function newTask(taskInput) {

		let nuevaTarea =
		{
			label: taskInput,
			is_done: false
		};

		fetch("https://playground.4geeks.com/todo/todos/DanielCP", {
			method: "POST",
			body: JSON.stringify(nuevaTarea),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				//if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				console.log("Tarea agregada", data);
				setList([...list, data]);
				//setList = "";
			})
			.catch((err) => {
				console.log(err);
			})

		/*
		
		*/
	}

	function getTasks() {
		fetch("https://playground.4geeks.com/todo/users/DanielCP")
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				setList(data.todos)
				//console.log(data.todos);
			})
			.catch((err) => { err })
	}

	return (
		<>
			<div className="container opacity-50">
				<h4 className="text-center mt-2 mb-0">My ToDo List</h4>
				<input
					className="form-control mx-auto" style={styleInput} type="text" placeholder="New Task" value={taskInput}
					onChange={(e) => setTaskInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && e.target.value !== "") {
							newTask(taskInput);
							setTaskInput("");
						}
					}} />
			</div>
			<div className="container" style={styleFoil} >
				{list.map((task, index) => {
					return (
						<div className="row" key={index} onMouseEnter={() => mouseOver(index)} onMouseLeave={mouseExit}>
							<div className="col-1" style={{ ...styleTask, borderRight: "1px solid red" }}></div>
							<div className="col-10" style={styleTask}>{task.label}</div>
							<div className="col-1 text-end" style={styleTask}>
								<i className="fa-solid fa-eraser" onClick={() => { deleteTask(task.id) }}
									style={{ opacity: visibleIcon === index ? 1 : 0 }}></i>
							</div>
						</div>
					)
				}
				)}
			</div>
			<div className="container bg-white text-black-50 d-flex justify-content-between" >
				<p>{list.length === 0 ? "No tasks, add tasks" : `You have ${list.length} tasks.`}</p>
				<button className="btn btn-dark p-0" onClick={getTasks}
					style={{ opacity: "50%", fontSize: "0.7em", margin: 3 }}>
					Get Tasks
				</button>
			</div>

		</>
	);
};

export default Home;

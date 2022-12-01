/** @format */

import React from "react";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import Icon from "react-crud-icons";
import "../styles/Leftside.css";
import { date } from "joi";

const LeftsideBar = ({ sendmainstate }) => {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [listItemsup, setListItemsup] = useState([]);
  const [templistup, settemplistup] = useState([]);

  const [isUpdating, setIsUpdating] = useState("");
  const [isUpdatingup, setIsUpdatingup] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [updateItemText, setUpdateItemText] = useState("");
  const [updateItemTextup, setUpdateItemTextup] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [visitContent, setVisitContent] = useState(false);
  const [updateDate, setupdateDate] = useState("");
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const user = localStorage.getItem("email");

  const addItem = async (e) => {
    e.preventDefault();
    try {
      //console.log(itemText)
      if (itemText.length == 0) {
        alert("Please enter value for you task");
      } else if (startDate == null) {
        alert("Please enter date assigned to the task");
      } else {
        let formattedDate = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
        //this.setState({ date: formattedDate });
        console.log(formattedDate);
        const res = await axios.post("http://localhost:3001/todos", { item: itemText, date: formattedDate, email: user });
        const current = new Date();
        if (current.getTime() < startDate.getTime()) {
          setListItemsup((prev) => [...prev, res.data]);
        } else {
          setListItems((prev) => [...prev, res.data]);
        }
        setItemText("");
        setVisitContent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getItemsList = async () => {
      fetch(
        "http://localhost:3001/todostomorrow?" +
          new URLSearchParams({
            email: user,
          })
      )
        .then((res) => res.json())
        .then((data) => setListItemsup(data))
        .catch((err) => console.error("Error: ", err));
      settemplistup(listItemsup);
    };

    getItemsList();
  }, []);
  useEffect(() => {
    const GetTodos = async () => {
      fetch(
        "http://localhost:3001/todos?" +
          new URLSearchParams({
            email: user,
          })
      )
        .then((res) => res.json())
        .then((data) => setListItems(data))
        .catch((err) => console.error("Error: ", err));
    };
    GetTodos();
  }, []);
  // Delete item when click on delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/todos/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteItemup = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/todos/${id}`);
      const newListItems = listItemsup.filter((item) => item._id !== id);
      setListItemsup(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  //Update item
  const updateItem = async (open) => {
    try {
      if (updateItemText.length != 0) {
        const res = await axios.put(`http://localhost:3001/todos`, { item: updateItemText, id: isUpdating });
        console.log(res.data);
        const updatedItemIndex = listItems.findIndex((item) => item._id === isUpdating);
        const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
        setUpdateItemText("");
        setIsUpdating("");
      } else {
        alert("Please enter a valid date");

        setOpen(!open);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateItemup = async (open) => {
    //e.preventDefault();
    try {
      const dateup = updateDate.toString();
      if (updateItemTextup.length != 0 && dateup.length != 0) {
        let formattedDate = `${updateDate.getMonth() + 1}/${updateDate.getDate()}/${updateDate.getFullYear()}`;
        console.log(formattedDate);
        const res = await axios.put(`http://localhost:3001/todos`, {
          item: updateItemTextup,
          id: isUpdatingup,
          date: formattedDate,
        });
        console.log(res.data);
        const updatedItemIndex = listItemsup.findIndex((item) => item._id === isUpdatingup);
        const updatedItem = (listItemsup[updatedItemIndex].item = updateItemTextup);
        setUpdateItemTextup("");
        setIsUpdatingup("");
      } else if (dateup.length == 0) {
        alert("Please enter valid date for update");
        setOpen(!open);
      } else if (updateItemTextup.length != 0) {
        alert("Please enter some value in the todo if you want to edit");
        setOpen(!open);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const completeTodo = async (id) => {
    const data = await fetch("http://localhost:3001/todo/complete/" + id).then((res) => res.json());

    setListItems((listItems) =>
      listItems.map((item) => {
        if (item._id === data._id) {
          item.complete = data.complete;
        }

        return item;
      })
    );
  };
  const completeTodoup = async (id) => {
    const data = await fetch("http://localhost:3001/todo/complete/" + id).then((res) => res.json());

    setListItemsup((listItemsup) =>
      listItemsup.map((item) => {
        if (item._id === data._id) {
          item.complete = data.complete;
        }

        return item;
      })
    );
  };
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItem(open);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />

      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );
  const renderUpdateFormup = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItemup(!open);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemTextup(e.target.value);
        }}
        value={updateItemTextup}
      />
      <DatePicker
        format="MM-dd-y"
        selected={updateDate}
        onChange={(date) => setupdateDate(date)}
        isClearable
        popperClassName="some-custom-class"
        popperPlacement="top-end"
        minDate={new Date()}
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [5, 10],
            },
          },
          {
            name: "preventOverflow",
            options: {
              rootBoundary: "viewport",
              tether: false,
              altAxis: true,
            },
          },
        ]}
      />
      <div className="buttons-todo">
        <button className="update-new-btn" type="submit">
          Update
        </button>
      </div>
    </form>
  );

  return (
    <div className="leftside">
      <h2 className="TodoHeading">Todo List</h2>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add Todo Item"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <DatePicker
          format="MM-dd-y"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          isClearable
          popperClassName="some-custom-class"
          minDate={new Date()}
          popperPlacement="top-end"
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [5, 10],
              },
            },
            {
              name: "preventOverflow",
              options: {
                rootBoundary: "viewport",
                tether: false,
                altAxis: true,
              },
            },
          ]}
        />

        <button type="submit">Add</button>
      </form>

      <div className="header">Today's Task</div>
      <div className="content-body">
        <div className="todo-listItems">
          {Array.isArray(listItems) ? (
            listItems.map((item, index) => (
              <div className={index % 2 == 0 ? "bck-blue" : "bck-white"}>
                <div
                  className={"todo" + (item.complete ? " is-complete" : "")}
                  key={item._id}
                  onClick={() => completeTodo(item._id)}
                >
                  <div className="todo-item">
                    {isUpdating === item._id ? (
                      renderUpdateForm()
                    ) : (
                      <>
                        <div className="todocheckbox"></div>
                        <div className="text">
                          <p className="item-content">{item.item}</p>
                        </div>
                        <Icon
                          className="todo-icon"
                          name="edit"
                          tooltip="Edit"
                          theme="light"
                          size="medium"
                          onClick={() => {
                            setIsUpdating(item._id);
                          }}
                        />
                        <Icon
                          className="todo-icon-del"
                          name="check"
                          tooltip="Check"
                          theme="light"
                          size="medium"
                          onClick={() => {
                            deleteItem(item._id);
                          }}
                        />

                        <hr className="hr-style" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>You currently have no tasks</p>
          )}
        </div>
      </div>

      <div className="buttons-todo">
        <button class="button" onClick={() => setOpen((o) => !o)}>
          Upcoming tasks
        </button>
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} modal nested>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>

          <div className="content">
            <div className="todo-listItems">
              {Array.isArray(listItemsup)
                ? listItemsup.map((item, index) => (
                    <div className={index % 2 == 0 ? "bck-blue" : "bck-white"}>
                      <div
                        className={"todo" + (item.complete ? " is-complete" : "")}
                        key={item._id}
                        onClick={() => completeTodoup(item._id)}
                      >
                        <div className="todo-item">
                          {isUpdatingup === item._id ? (
                            renderUpdateFormup()
                          ) : (
                            <>
                              <div className="todocheckbox"></div>
                              <div className="text">
                                <p className="item-content">{item.item}</p>
                              </div>
                              <div className="tododate">{item.date}</div>
                              <Icon
                                className="todo-icon"
                                name="edit"
                                tooltip="Edit"
                                theme="light"
                                size="medium"
                                onClick={() => {
                                  setIsUpdatingup(item._id);
                                }}
                              />
                              <Icon
                                className="todo-icon-del"
                                name="check"
                                tooltip="check"
                                theme="light"
                                size="medium"
                                onClick={() => {
                                  deleteItemup(item._id);
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default LeftsideBar;

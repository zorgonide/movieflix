import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getBackend, postBackend } from "../../Utilities/apiCalls";

function ManageUsers() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalItems, setTotalItems] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchUsers();
  }, []);
  const deleteUser = (id) => {
    Swal.fire({
      confirmButtonColor: "#e31c5f",
      title: "Confirm Deletion",
      text: `Do you delete user #${id}`,
      icon: "question",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        postBackend({
          url: `userprofile/userprofileDel`,
          data: {
            User_ID: id,
          },
        }).then(() => {
          Swal.fire({
            confirmButtonColor: "#e31c5f",
            title: "User deleted",
            icon: "success",
            confirmButtonText: "Dismiss",
          });
          fetchUsers();
        });
      }
    });
  };
  const fetchUsers = () => {
    getBackend({
      url: `userprofile/register`,
      data: {},
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setTotalItems(
            result.sort(function (a, b) {
              return a.User_ID < b.User_ID;
            })
          );
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const Headers = () => {
    return (
      <div className="row list-card pt-3" key={0}>
        <div className="col text-center">
          <p>ID</p>
        </div>
        <div className="col-3 text-center">
          <p className="">First Name</p>
        </div>
        <div className="col text-center">
          <p className="">Last Name</p>
        </div>
        <div className="col text-center">
          <p className="">Email</p>
        </div>
        <div className="col text-center">
          <p className="">User Type</p>
        </div>
        <div className="col text-center">
          <p className="">Remove</p>
        </div>
      </div>
    );
  };
  const RenderList = () => {
    return (
      <>
        {filteredUsers.map((element, index) => {
          return (
            <div
              className="row list-card1 pt-3"
              key={element.id}
              //   onClick={() => navigate(`/action/${element.id}`)}
            >
              <div className="col text-center">
                <p>
                  <i className="fa fa-hashtag"></i> {element.User_ID}
                </p>
              </div>
              <div className="col-3 text-center">
                <p className="name">{element.First_Name}</p>
              </div>
              <div className="col text-center">
                <p className="">{element.Last_Name}</p>
              </div>
              <div className="col text-center">
                <p className="">{element.Email}</p>
              </div>
              <div className="col text-center">
                <p className="">
                  {element.Is_Staff ? "Admin User" : "Normal User"}
                </p>
              </div>
              <div
                className="col text-center "
                onClick={() => deleteUser(element.User_ID)}
              >
                <p className="deleteButton">
                  <i className="fa fa-trash"></i>
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  let filteredUsers = totalItems
    ? totalItems.filter((user) => {
        let fullName = user.First_Name + user.Last_Name;
        return fullName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      })
    : [];
  return (
    <div className="container centered1">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12">
          <div className="card my-2">
            <div className="card-body text-left">
              <p className="card-title display-6 gray text-center ">
                Manage Users
              </p>
              <hr />
              <div className="row mx-auto">
                <div className="col-12 col-sm-3 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Search"
                    placeholder="Search name"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mx-auto">
                <div className="col px-4">
                  {filteredUsers.length === 0 ? (
                    <div className="row list-card pt-3 text-uppercase text-center">
                      <p className="name">No user found</p>
                    </div>
                  ) : (
                    <>
                      <Headers />
                      <RenderList />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;

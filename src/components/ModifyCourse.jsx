import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "@mui/material";
import Course from "./ListAllCourses";
import CreateCourse from "./CreateCourse";

function ModifyCourse() {
  let { courseId } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses/" + courseId, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((data) => {
        setCourse(data.course);
      });
    });
  }, []);

  // The id of course passed in url does not exist
  if (!course) {
    return (
      <div>
        <Typography variant="h1" style={{ justifyContent: "center" }}>
          Course does not exist
        </Typography>
      </div>
    );
  }

  return (
    <div >
      {/* NOTE: We can also send setCourses as a prop to another component */}
      <ShowCourse course={course} />
      <UpdateCourse course={course} setCourse={setCourse} />
    </div>
  );
}

function ShowCourse(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: 500,
          padding: 10,
          minHeight: 100,
          maxWidth: 400,
          textAlign: "center",
          margin: 10,
        }}
      >
        <img src={props.course.imageLink} style={{ maxWidth: 400, maxHeight: 200 }}></img> <br />{" "}
        <br />
        <b>ID: </b> {props.course._id} <br />
        <b>Title: </b> {props.course.title} <br />
        <b>Description: </b> {props.course.description} <br />
        <b>Price: </b> {props.course.price} <br />
        <b>IsPublished: </b> {props.course.published ? "true" : "false"}
      </Card>
    </div>
  );
}

function UpdateCourse(props) {
  let courseId = props.course._id;
  const [title, setTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  return (
    <div>
      <div
        style={{
         
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        
        <br /> <br />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 20 }}>
        <Typography variant="h4" style={{ display: "flex", justifyContent: "center" }} >Update Course</Typography>
          <div>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              fullWidth={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br /> <br />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              fullWidth
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            <br /> <br />
            <TextField
              id="image"
              label="Image Link"
              variant="outlined"
              fullWidth
              onChange={(e) => setImageLink(e.target.value)}
            />{" "}
            <br /> <br />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                fetch("http://localhost:3000/admin/courses/" + courseId, {
                  method: "PUT",
                  body: JSON.stringify({
                    title: title,
                    description: courseDescription,
                    price: 4999,
                    imageLink: imageLink,
                    published: true,
                  }),
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }).then((response) => {
                  response.json().then((data) => {
                    // Update existing Card here
                    props.setCourse(data.course);
                    console.log("-->", data);
                  });
                });
              }}
            >
              Update
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ModifyCourse;

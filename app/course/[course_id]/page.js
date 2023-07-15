"use client";
import React, { useState, useEffect } from "react";
import Title from "@/components/Title/Title";
import PostItem from "@/components/PostItem/PostItem";
import { useAuthContext } from "@/Context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "@/components/Sidebar/Sidebar";

const CoursePage = ({ params }) => {
  const [courseData, setCourseData] = useState(null);
  const [posts, setPosts] = useState([]);

  const getCourseInfo = async () => {
    try {
      const response = await fetch("https://www.khourychat.com/api/courses");
      const courses = await response.json();
      //console.log(courses);
      const foundCourse = courses.find(
        (course) =>
          course.course_id.toLowerCase() === params.course_id.toLowerCase()
      );
      if (foundCourse) {
        setCourseData(foundCourse);
        setPosts(foundCourse.posts);
        console.log(foundCourse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getCourseInfo();

  const [value, setValue] = useState("");

  const user = useAuthContext();
  const isLoggedIn = user !== null;

  const addPost = (e) => {
    e.preventDefault();
    console.log("addPost called");
    if (isLoggedIn || !isLoggedIn) {
      const newPost = {
        //post_id: "aa11",
        uid: user["user"]["uid"],
        course_id: courseData.course_id,
        content: value.slice(3, value.length - 4),
        post_title: "",
        likes: 0,
        dislikes: 0,
        views: 1,
        replies: [],
        timestamp: "" + Math.floor(Date.now() / 1000),
      };

      const postUrl = `https://www.khourychat.com/api/courses/${courseData.course_id}`;
      fetch(postUrl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setPosts([...posts, newPost]);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


      //setPosts([...posts, newPost]);
    } else {
    }
  };
  console.log("coursedata:",courseData);

  return (
    <div className="bg-white ">
      <div className="bg-black text-white shadow-xl">
        <Title
          text={courseData ? courseData["course_id"] : "Course Not Found"}
          courseName={courseData ? courseData["course_title"] : ""}
        />
      </div>
      <div className="flex flex-row items-center justify-between ">
        <Sidebar professors={courseData ? courseData["professor"] : []} />

        <div>
          {courseData && (
            <div
              id="create-post"
              className="p-10 flex flex-col gap-5 items-end"
            >
              <ReactQuill
                className="bg-white"
                theme="snow"
                value={value}
                onChange={setValue}
              />
              <button
                onClick={addPost}
                className="py-1 px-5 rounded-full bg-red-500 font-bold text-lg text-white"
              >
                Post
              </button>
            </div>
          )}
          {courseData && (
            <div>
              {posts.map((post) => (
                <PostItem
                  key={post.post_id}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  views={post.views}
                />
              ))}
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CoursePage;

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { assets } from "../../assets/assets";
import uniqid from "uniqid";
const AddCourse = () => {
  const editorRef = useRef(null); // This is the editor box
  const quillRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [Image, setImage] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [showpopup, setShowpopup] = useState(false);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: "",
  });
  const handleChapter = (type) => {
    if (type == "add") {
      const chapterTitle = prompt("Enter Chapter title");
      if (chapterTitle) {
        const newChapter = {
          chapterTitle,
          chapterId: uniqid(),
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
          collapsed: false,
          chapterContent: [],
        };
        setChapters([...chapters, newChapter]);
      }
    }
  };

  const handlecollapsed = (chapterId) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.chapterId === chapterId
          ? { ...chapter, collapsed: !chapter.collapsed }
          : chapter
      )
    );
  };
  const handleRemoveChapter = (chapterId) => {
    setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
  };
  useEffect(() => {
    // Create Quill editor only once
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Type something...",
      });
    }
  }, []);

  const handleAddLecture = (chapterId) => {
    const chapter = chapters.find((chapter) => chapterId === chapter.chapterId);
    const newLecture = {
      ...lectureDetails,
      lectureId: uniqid(),
      lectureOrder:
        chapter.chapterContent.length > 0
          ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
          : 1,
    };
    setShowpopup(false);
    setLectureDetails({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: "",
  })
    setChapters(
      chapters.map((ch) =>
        ch.chapterId == chapterId
          ? { ...ch, chapterContent: [...ch.chapterContent, newLecture] }
          : ch
      )
    );
  };
  const handleRemoveLecture=(lectureId,chapterId)=>{
    console.log("hello")
    setChapters(
      chapters.map((ch) =>
        ch.chapterId == chapterId
          ? { ...ch, chapterContent:ch.chapterContent.filter((lec)=>lec.lectureId!==lectureId) }
          : ch
      )
    );
  }
  const handleSubmit=(e)=>{
    
    e.preventDefault()
    alert("form submit")
  }
  return (
    <div className="h-screen overflow-scroll flex flex-col  items-start justify-between md:p-8 md:pb-3 p-4 pt-8 pb-0  ">
      <form className="flex flex-col gap-4 max-w-md w-full text-gray-500 " onSubmit={(e)=>handleSubmit(e)}   >
        <div className="flex flex-col gap-1  ">
          <p className="">Course Title </p>

          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Type here"
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500 "
          />
        </div>

        <div className="flex flex-col gap-1  ">
          <p className="">Course Description </p>
          <div ref={editorRef}></div>
        </div>
        <div className="flex items-center justify-between flex-wrap ">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              type="number"
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              className="outline-none md:py-2.5 py-2 px-3 rounded border w-28 border-gray-500 "
            />
          </div>
          <div className="flex md:flex-row flex-col items-center gap-3 ">
            <p>Course Thumbnail</p>
            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 "
            >
              <img
                src={assets.file_upload_icon}
                className="p-3 bg-blue-500 rounded "
              />
              <input
                type="file"
                id="thumbnailImage"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                hidden
              />
              <img
                className="max-h-10"
                src={Image ? URL.createObjectURL(Image) : ""}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1  ">
          <p className="">Discount % </p>

          <input
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0"
            required
            className="outline-none md:py-2.5 w-28 py-2 px-3 rounded border border-gray-500 "
          />
        </div>
        <div className={chapters.length > 0 && "mt-4"}>
          {chapters.map((chapter, chapterIndex) => {
            return (
              <>
                <div
                  className="border bg-gray-100 border-gray-500  w-full mb-4 "
                  key={chapterIndex}
                >
                  <div className="px-3 py-2">
                    <div className="flex items-center justify-between  ">
                      <div className="flex items-center gap-1 w-35">
                        <img
                          src={assets.dropdown_icon}
                          className={`w-4 ${
                            chapter.collapsed && "-rotate-180"
                          } `}
                          onClick={() => {
                            handlecollapsed(chapter.chapterId);
                          }}
                        />
                        <span className="font-semibold truncate ">
                          {chapter.chapterOrder} {chapter.chapterTitle}{" "}
                        </span>
                      </div>
                      <div></div>
                      <p>{chapter.chapterContent.length} Lectures</p>
                      <div
                        className=" w-8 h-8 rounded-full top-4 cursor-pointer  right-4 flex justify-center hover:bg-gray-200 items-center"
                        onClick={() => handleRemoveChapter(chapter.chapterId)}
                      >
                        <img src={assets.cross_icon} />
                      </div>
                    </div>
                  </div>
                  {chapter.collapsed && (
                    <div className="border-t border-gray-500  py-5 px-3 ">
                      {chapter.chapterContent.map((lecture, lectureIndex) => {
                        return (
                          <div
                            key={lectureIndex}
                            className="flex justify-between items-center mb-2 "
                          >
                            <span>
                              {lectureIndex + 1} - {lecture.lectureDuration}{" "}
                              mins - <a href={lecture.lectureUrl} target="_blank" className="text-blue-500">Link</a> - {lecture.isPreviewFree?"Free Preview":"Paid"}
                              
                            </span>
                            <img src={assets.cross_icon} className="pr-2.5" onClick={()=>handleRemoveLecture(lecture.lectureId,chapter.chapterId)}/>
                          </div>
                        );
                      })}
                      <button
                        className="px-3 py-2 bg-gray-200 "
                        onClick={() => setShowpopup(true)}
                      >
                        +Add Lecture
                      </button>
                    </div>
                  )}
                </div>
                {showpopup && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 ">
                    <div className="bg-gray-100 max-w-80 rounded w-full p-4 relative text-gray-700 ">
                      <h className="font-semibold text-lg  ">Add Lecture </h>
                      <div className="absolute w-8 h-8 rounded-full top-4 cursor-pointer  right-4 flex justify-center hover:bg-gray-200 items-center" onClick={()=>setShowpopup(false)}>
                        <img src={assets.cross_icon} className="w-4 h-4 "  />
                      </div>
                      <div className="mb-2 mt-4">
                        <p>Lecture Title</p>
                        <input
                          type="text"
                          value={lectureDetails.lectureTitle}
                          onChange={(e) => {
                            setLectureDetails({
                              ...lectureDetails,
                              lectureTitle: e.target.value,
                            });
                          }}
                          className=" mt-1 w-full block border outline-none py-1 px-2 rounded  "
                        />
                      </div>
                      <div className="mb-2 ">
                        <p>Duration (mintues)</p>
                        <input
                          type="number"
                          value={lectureDetails.lectureDuration}
                          onChange={(e) => {
                            setLectureDetails({
                              ...lectureDetails,
                              lectureDuration: e.target.value,
                            });
                          }}
                          className=" mt-1 w-full block border outline-none py-1 px-2 rounded  "
                        />
                      </div>
                      <div className="mb-2 ">
                        <p>Lecture URL</p>
                        <input
                          type="text"
                          value={lectureDetails.lectureUrl}
                          onChange={(e) => {
                            setLectureDetails({
                              ...lectureDetails,
                              lectureUrl: e.target.value,
                            });
                          }}
                          className=" mt-1 w-full block border outline-none py-1 px-2 rounded  "
                        />
                      </div>
                      <div className="flex gap-1 mt-2 mb-4">
                        <p>isPreviewFree?</p>
                        <input
                          type="checkbox"
                          checked={lectureDetails.isPreviewFree}
                          value={lectureDetails.isPreviewFree}
                          onChange={() => {
                            setLectureDetails({
                              ...lectureDetails,
                              isPreviewFree: !lectureDetails.isPreviewFree,
                            });
                          }}
                        />
                      </div>
                      <button
                        className="w-full py-2  bg-blue-500 text-white rounded "
                        onClick={() => handleAddLecture(chapter.chapterId)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <button
          className="bg-blue-100 text-gray-800 py-2 cursor-pointer rounded "
          onClick={() => handleChapter("add")}
        >
          +Add Chapter
        </button>
        <button type="submit" className="bg-black text-white py-2 cursor-pointer w-30 rounded mt-3 " >Add</button>
      </form>
    </div>
  );
};

export default AddCourse;

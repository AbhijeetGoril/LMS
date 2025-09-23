import mongoose from "mongoose";

// Lecture schema
const lectureSchema = new mongoose.Schema({
  lectureId:{type:String,required:true},
  lectureTitle: { type: String, required: true },
  lectureDuration: { type: Number, required: true }, // in minutes
  lectureUrl: { type: String, required: true },
  isPreviewFree: { type: Boolean, default: false },
  lectureOrder: { type: Number, required: true },
}, { _id: false }); // MongoDB will generate _id automatically

// Chapter schema
const chapterSchema = new mongoose.Schema({
  chapterId:{type:String,required:true},
  chapterTitle: { type: String, required: true },
  chapterOrder: { type: Number, required: true },
  chapterContent: [lectureSchema], // nested lectures
}, { _id: false }); // MongoDB generates _id for each chapter

// Course schema
const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseDescription: { type: String, required: true }, // Quill HTML
  courseThumbnail: { type: String },
  coursePrice: { type: Number, required: true },
  discount: { type: Number, required: true, min: 0, max: 100 },
  isPublished: { type: Boolean, default: true },
  chapters: [chapterSchema], // array of chapters
  educator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  courseRatings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
}, { timestamps: true, minimize: true });

export default mongoose.model("Course", courseSchema);

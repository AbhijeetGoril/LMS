import multer from "multer";

// Store file in memory, not in disk
const storage = multer.diskStorage({});

const upload = multer({ storage });

export default upload;

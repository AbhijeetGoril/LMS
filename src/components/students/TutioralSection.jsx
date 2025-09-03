import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import { AppContext } from "../../contexts/Context";

function TutioralSection({ chapter, setPlayerData, isPlayerCompo,index }) {
  const [openSection, setOpenSection] = useState(false);
  const { calcutateChapterTime } = useContext(AppContext);
  return (
    <div className="border border-gray-300 bg-white mb-2 rounded ">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-gray-100 "
        onClick={() => {
          setOpenSection((prevValue) => !prevValue);
        }}
      >
        <div className="flex gap-2 items-center ">
          <img
            src={assets.down_arrow_icon}
            alt="arrow icon"
            className={`${
              openSection ? "rotate-180" : "rotate-0"
            } transition-transform duration-300`}
          />
          <p className="font-medium md:text-base text-sm ">
            {chapter.chapterTitle}{" "}
          </p>
        </div>
        <p className="text-sm md:text-[15px] md:leading-[21px] ">
          {" "}
          {chapter.chapterContent.length}lecture -
          {calcutateChapterTime(chapter)}{" "}
        </p>
      </div>

      {openSection && (
        <div className=" transition-all duration-30000 max-h-96 overflow-hidden ">
          <ul className="list-disc md:pl-10 pl-4 pr-4  py-2 text-gray-600 border-t border-gray-300">
            {chapter.chapterContent.map((lecture, i) => (
              <li key={i} className="flex items-start gap-2 py-1 ">
                <img
                  src={false ? assets.blue_tick_icon : assets.play_icon}
                  alt="play icon"
                  className="w-4 h-4 "
                />

                <div className="flex items-start md:font-normal  justify-between w-full text-gray-800 text-xs md:text-[14px]  ">
                  <p>{lecture.lectureTitle} </p>
                  <div className="flex items-start gap-2">
                    {isPlayerCompo
                      ? lecture.lectureUrl && (
                          <p
                            className="text-blue-500 cursor-pointer  "
                            onClick={() => {
                              setPlayerData({
                                ...lecture,chapter:index+1,lecture:i+1
                              });
                            }}
                          >
                           Watch
                          </p>
                        )
                      : lecture.isPreviewFree && (
                          <p
                            className="text-blue-500 cursor-pointer  "
                            onClick={() => {
                              setPlayerData({
                                videoId: lecture.lectureUrl.split("/").pop(),
                              });
                            }}
                          >
                            Preview{" "}
                          </p>
                        )}
                    <p>
                      {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                        units: ["h", "m"],
                      })}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TutioralSection;

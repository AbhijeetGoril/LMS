import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialSextion = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Hear from our learners as they shear their journays of transformation,
        success, and how our
        <br />
        platform has made a difference lives.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14 place-items-center sm:place-items-start">
        {dummyTestimonial.map((testimonial, index) => {
          return (
            <div
              key={index}
              className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg w-[275px] bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden "
            >
              <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
                <img
                  src={testimonial.image}
                  alt="pic"
                  className="w-12 h-12 rounded-full"
                />
                <div >
                  <h3 className="text-lg font-medium text-gray-800 ">{testimonial.name}</h3>
                  <p className="text-[10px]">{testimonial.role}</p>
                </div>
              </div>
              <div className="p-5 pb-7">
                <div className="flex space-x-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank
                      }
                      alt="star"
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <p className="text-[12px] text-gray-600 mt-3 ">{testimonial.feedback}</p>
                
              </div>
              <a href="#" className="text-blue-500 underline px-5">Read more</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestimonialSextion;

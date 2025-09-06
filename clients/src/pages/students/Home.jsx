import React from 'react'
import { AppContext } from '../../contexts/Context'
import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CoursesSection from '../../components/students/CoursesSection'
import TestimonialSextion from '../../components/students/TestimonialSextion'
import CallToAction from '../../components/students/CallToAction'
import Footer from '../../components/students/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
       <Hero/>
       <Companies/>
       <CoursesSection/>
       <TestimonialSextion/>
       <CallToAction/>
       <Footer/>
    </div>
  )
}

export default Home
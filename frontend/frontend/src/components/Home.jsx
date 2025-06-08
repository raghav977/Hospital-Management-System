import React from 'react'
import Header from './Header'
import Herosection from './Herosection'
import OurDoctors from './OurDoctors'
import Ninedoctors from './Ninedoctors'
import Browse from './Browse'
import Footer from './Footer'
import WhyUs from './Whyus'
import Services from './Services'
import Howitworks from './Howitworks'
const Home = () => {
  return (
    <div>
        <Header/>
        <Herosection/>
        <Services/>
        <Ninedoctors/>
        <Browse/>
        <WhyUs/>
        <Howitworks/>

        <Footer/>
    </div>
  )
}

export default Home
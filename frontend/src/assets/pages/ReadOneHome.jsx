import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faBars, faUser, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';
import logo from '../images/logo.png';
import car01 from '../images/girl.jpg';
import { FcFeedback } from "react-icons/fc";
import PriceCard from '../components/PriceCard'

const ReadOneHome = () => {
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const { cusID } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const [promotions, setPromotions] = useState([]);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:8077/Promotion');
        setPromotions(response.data);
      } catch (error) {
        setError('Failed to fetch promotions.');
        console.error('Error fetching promotions', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 4, promotions.length)); // Increase by 4, but don't exceed total promotions
  };

  console.log("Visible Count:", visibleCount); // Debugging line

  const navigate = useNavigate(); // Initialize useNavigate


  useEffect(() => {
    if (cusID) {
      fetchData();
    }
  }, [cusID]);

  const handleAddFeedback = () => {
    navigate(`/feedback/create/${cusID}`); // Navigate to Add Feedback page
  };



  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8077/Customer/${cusID}`);
      console.log(response.data); // Check if cusID is available
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 20) {
          navbar.classList.add('sticky');
        } else {
          navbar.classList.remove('sticky');
        }
      }

      const scrollUpBtn = document.querySelector('.scroll-up-btn');
      if (scrollUpBtn) {
        if (window.scrollY > 500) {
          scrollUpBtn.classList.add('show');
        } else {
          scrollUpBtn.classList.remove('show');
        }
      }
    };

    const scrollToTop = () => {
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const smoothScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    const toggleMenu = () => {
      const menu = document.querySelector('.navbar .menu');
      const menuBtnIcon = document.querySelector('.menu-btn i');
      if (menu && menuBtnIcon) {
        menu.classList.toggle('active');
        menuBtnIcon.classList.toggle('active');
      }
    };

    window.addEventListener('scroll', handleScroll);

    const scrollUpBtn = document.querySelector('.scroll-up-btn');
    if (scrollUpBtn) {
      scrollUpBtn.addEventListener('click', scrollToTop);
    }

    document.querySelectorAll('.navbar .menu li a').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });

    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', toggleMenu);
    }

    if (cusID) {
      fetchData();
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (scrollUpBtn) {
        scrollUpBtn.removeEventListener('click', scrollToTop);
      }

      document.querySelectorAll('.navbar .menu li a').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });

      if (menuBtn) {
        menuBtn.removeEventListener('click', toggleMenu);
      }
    };
  }, [cusID]);

  useEffect(() => {

    axios
      .get('http://localhost:8077/feedback')
      .then((response) => {

        setFilteredFeedbacks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching feedbacks:', error);
        setError('Error fetching feedbacks.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="scroll-up-btn">
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
      <nav className="navbar">
        <div className="max-width">
          <div className="logo">
            <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }} />
          </div>
          <ul className="menu">
            <li>
              {userData.cusID ? (
                <Link className="nav-link" to={`/applicant/create/${userData.cusID}`}>Apply For A Job Vacancy</Link>
              ) : (
                'Loading...'
              )}

            </li>
            <li><Link className="nav-link" to={`/Booking/create/${userData.cusID}`}>Booking</Link></li>
            <li>
              {userData.cusID ? (
                <Link className="nav-link" to={`/Inquire/create/${userData.cusID}`}>Create Inquire</Link>
              ) : (
                'Loading...'
              )}
            </li>
            <li><a href="#skills" className="menu-btn">Talents</a></li>
            <li><a href="#teams" className="menu-btn">Team</a></li>
            <li><a href="#contact" className="menu-btn">Contact</a></li>
          </ul>
          <div className="menu-btn">
            <FontAwesomeIcon icon={faBars} />
          </div>
          {/* Login Section */}
          <div className="login-section" style={{ display: 'flex', alignItems: 'center' }}>
            <Link className="nav-link" to={`/customer/${userData.cusID}`}>
              <img
                src={userData.image}
                alt="Profile"
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
              />
            </Link>
            <p className="mb-0" style={{ color: 'red' }}>Welcome </p><span>&nbsp;</span><span>&nbsp;</span><p className="mb-0" style={{ color: 'yellow' }}> {userData.firstName}!</p>
            {/* <a href="#login" className="login-btn" style={{ textDecoration: 'none', color: '#fff' }}>Login</a> */}
          </div>
        </div>
      </nav>


      <section className="home" id="home">
        <div className="max-width">
          <div className="home-content">
            <div className="text-1">Wel come to</div>
            <div className="text-2">
              <span className="letter" style={{ fontSize: "90px" }}>W</span>
              <span className="letter" style={{ fontSize: "60px" }}>A</span>
              <span className="letter" style={{ fontSize: "60px" }}>S</span>
              <span className="letter" style={{ fontSize: "60px" }}>A</span>
              <span className="letter" style={{ fontSize: "60px" }}>N</span>
              <span className="letter" style={{ fontSize: "60px" }}>A</span>
            </div>


            <div className="text-3">Service Center <span className="typing"></span></div>
            <a href="#about">About US</a>
          </div>
        </div>
      </section>


      <section className="about" id="about" >
        <div className="max-width">
          <h2 className="title" style={{ color: 'white' }}>About US</h2>
          <div className="about-content">
            <div className="column left">
              <a>
                <img src={car01} alt="car" />
              </a>
            </div>
            <div className="column right">
              <div className="text blink" style={{ color: 'white' }}>
                Welcome to Wasana Service, where excellence in automotive care meets unparalleled customer satisfaction.
                <span className="typing-2"></span>
              </div>


              <p style={{ color: 'white' }}>
                With 20 years of experience in the industry, we pride ourselves on providing top-notch service for all your vehicle maintenance and repair needs.
              </p>
              <br />
              <p style={{ fontStyle: 'italic', color: 'white' }}>
                At Wasana Service, we are dedicated to maintaining the highest standards of service and professionalism. We understand that your vehicle is a significant investment, and we treat every car with the care and respect it deserves.
              </p>
              <a href="#services" style={{ color: 'white' }}>Our Skills</a>
            </div>

          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="max-width">
          <h2 className="title">Our Skills</h2>
          <div className="serv-content">
            <div className="card">
              <div className="box">
                <FontAwesomeIcon icon={['fas', 'paint-brush']} />
                <div className="text">Diagnostic Skills:</div>
                <p> Ability to identify and troubleshoot issues with a vehicle’s systems, such as the engine, transmission, brakes, and electrical components. This often involves using diagnostic tools and understanding error codes.</p>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <FontAwesomeIcon icon={['fas', 'chart-line']} />
                <div className="text">Mechanical Repair </div>
                <p>Proficiency in performing routine maintenance tasks (like oil changes, brake replacements, and tire rotations) as well as more complex repairs.</p>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <FontAwesomeIcon icon={['fas', 'code']} />
                <div className="text">Customer Communication</div>
                <p>Effective communication skills to explain issues, repair needs, and costs to customers in a clear and understandable manner, ensuring they make informed decisions about their vehicle’s service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


   
      
      <section className="tablee">
      <div className="pricing flex flex-wrap justify-center w-full mx-auto mb-12">
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <PriceCard promotions={promotions.slice(0, visibleCount)} />
        )}
      </div>
     
    </section>





      <section className="teams" id="teams">
        <div className="max-width">
          <h2 className="title">FeedBacks</h2>

          {/* Add Feedback Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
            <button
              onClick={handleAddFeedback}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
            >
              Add Feedback
            </button>
          </div>


          <Slider {...settings}>
            {filteredFeedbacks.map((feedback) => (
              <div className="card" key={feedback.id}> {/* Add a key prop */}
                <div className="box">
                  <FcFeedback />
                  <div className="text-xl">{feedback.name}</div>
                  <p>{feedback.message}</p>
                  <p>{feedback.star_rating} Stars</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>


      <section className="contact" id="contact">
        <div class="container flex justify-around items-center h-screen w-screen max-h-[800px] max-w-[1280px] min-h-[600px] min-w-[1000px] mx-auto">
          <div class="card card0 flex justify-center items-center h-[379px] w-[300px] bg-black rounded-lg shadow-[0_70px_63px_-60px_rgba(0,0,0,1)] overflow-hidden relative transition-all duration-800 bg-[url('https://img.freepik.com/free-photo/workman-wearing-hard-hat-working-with-metal-constructions-factory_1303-26647.jpg?t=st=1725648007~exp=1725651607~hmac=ea8e3ec74a78621303c7f5a08712dcfed647e7c4c10d9c3c45dae05ef8ab597d&w=360')] hover:bg-left hover:bg-no-repeat hover:bg-cover hover:bg-[size:600px]">
            <div class="border h-[369px] w-[290px] bg-transparent rounded-lg border-white border-opacity-0 hover:border-opacity-100 transition-all duration-1000 relative">
              <h2 class="text-white text-lg m-5 opacity-0 transition-opacity duration-1000">Al Pacino</h2>
              <div class="icons absolute fill-white h-[130px] top-[226px] w-[50px] flex flex-col items-center justify-around">

              </div>
            </div>
          </div>
          <div class="card card1 flex justify-center items-center h-[379px] w-[300px] bg-black rounded-lg shadow-[0_70px_63px_-60px_rgba(0,0,0,1)] overflow-hidden relative transition-all duration-800 bg-[url('https://img.freepik.com/premium-photo/inspecting-uneven-tire-wear-diagnosing-alignment-issues_1314467-106533.jpg?w=740')] hover:bg-left hover:bg-no-repeat hover:bg-cover hover:bg-[size:600px]">
            <div class="border h-[369px] w-[290px] bg-transparent rounded-lg border-white border-opacity-0 hover:border-opacity-100 transition-all duration-1000 relative">
              <h2 class="text-white text-lg m-5 opacity-0 transition-opacity duration-1000">Ben Stiller</h2>
              <div class="icons absolute fill-white h-[130px] top-[226px] w-[50px] flex flex-col items-center justify-around">

              </div>
            </div>
          </div>
          <div class="card card2 flex justify-center items-center h-[379px] w-[300px] bg-black rounded-lg shadow-[0_70px_63px_-60px_rgba(0,0,0,1)] overflow-hidden relative transition-all duration-800 bg-[url('https://img.freepik.com/free-photo/monochrome-portrait-retro-man-doing-housework-household-chores_23-2151448065.jpg?t=st=1725647669~exp=1725651269~hmac=a32b091a4ff63a32793280a842574db255c00f62443469616611d8d3a8fbed5f&w=360')] hover:bg-left hover:bg-no-repeat hover:bg-cover hover:bg-[size:600px]">
            <div class="border h-[369px] w-[290px] bg-transparent rounded-lg border-white border-opacity-0 hover:border-opacity-100 transition-all duration-1000 relative">
              <h2 class="text-white text-lg m-5 opacity-0 transition-opacity duration-1000">Patrick Stewart</h2>
              <div class="icons absolute fill-white h-[130px] top-[226px] w-[50px] flex flex-col items-center justify-around">

              </div>
            </div>
          </div>
        </div>

      </section>

      <footer>
        <span>Created By <a href="">Wasana service</a> | <FontAwesomeIcon icon={faCopyright} /> 2024 All rights reserved.</span>
      </footer>
    </div>
  );
};

export default ReadOneHome;

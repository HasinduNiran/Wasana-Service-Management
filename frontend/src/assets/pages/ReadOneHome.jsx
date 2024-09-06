import React, { useEffect,useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
const ReadOneHome = () => {

  const { cusID } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8077/Customer/${cusID}`);
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
      <li><Link className="nav-link" to="/">Home</Link></li>
      <li><a href="#about" className="menu-btn">About</a></li>
      <li><a href="#services" className="menu-btn">Skills</a></li>
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
  <span className="letter"style={{ fontSize: "90px" }}>W</span>
  <span className="letter" style={{ fontSize: "60px" }}>A</span>
  <span className="letter"style={{ fontSize: "60px" }}>S</span>
  <span className="letter"style={{ fontSize: "60px" }}>A</span>
  <span className="letter"style={{ fontSize: "60px" }}>N</span>
  <span className="letter"style={{ fontSize: "60px" }}>A</span>
</div>


      <div className="text-3">Sercive Centre <span className="typing"></span></div>
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

   
      
  <section class="tablee">
    <div class="pricing flex flex-wrap justify-center w-full mx-auto mb-12">
    <div class="pricing-item relative flex flex-col items-stretch text-center flex-shrink-0 flex-grow basis-80 m-4 bg-white rounded-2xl shadow-md hover:shadow-lg z-10">
        <div class="pricing-deco bg-red-700 rounded-t-lg p-20 relative">
          <svg class="pricing-deco-img absolute bottom-0 left-0 w-full h-40" viewBox="0 0 300 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path class="deco-layer deco-layer--1 transition-transform duration-500" fill="#FFFFFF" opacity="0.6" d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729
              c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z" />
            <path class="deco-layer deco-layer--2 transition-transform duration-500" fill="#FFFFFF" opacity="0.6" d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729
              c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z" />
            <path class="deco-layer deco-layer--3 transition-transform duration-500" fill="#FFFFFF" opacity="0.7" d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716
              H42.401L43.415,98.342z" />
            <path class="deco-layer deco-layer--4" fill="#FFFFFF" d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428
              c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z" />
          </svg>
          <div class="pricing-price text-5xl font-bold text-black">
            <span class="pricing-currency text-xs align-top">$</span>12
            <span class="pricing-period text-xs italic">/ mo</span>
          </div>
          <h3 class="pricing-title text-xs uppercase tracking-widest text-black">Business</h3>
        </div>
        <ul class="pricing-feature-list text-left px-4 py-6">
          <li class="pricing-feature py-4">2 GB of space</li>
          <li class="pricing-feature py-4">Support at $5/hour</li>
          <li class="pricing-feature py-4">Full cloud access</li>
        </ul>
        <button class="pricing-action font-bold mx-12 mb-8 py-4 px-8 text-white rounded-full bg-red-700 hover:bg-red-900 transition-colors">Choose plan</button>
      </div>


      <div class="pricing-item relative flex flex-col items-stretch text-center flex-shrink-0 flex-grow basis-80 m-4 bg-white rounded-2xl shadow-md hover:shadow-lg z-10">
        <div class="pricing-deco bg-red-700 rounded-t-lg p-20 relative">
          <svg class="pricing-deco-img absolute bottom-0 left-0 w-full h-40" viewBox="0 0 300 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path class="deco-layer deco-layer--1 transition-transform duration-500" fill="#FFFFFF" opacity="0.6" d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729
              c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z" />
            <path class="deco-layer deco-layer--2 transition-transform duration-500" fill="#FFFFFF" opacity="0.6" d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729
              c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z" />
            <path class="deco-layer deco-layer--3 transition-transform duration-500" fill="#FFFFFF" opacity="0.7" d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716
              H42.401L43.415,98.342z" />
            <path class="deco-layer deco-layer--4" fill="#FFFFFF" d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428
              c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z" />
          </svg>
          <div class="pricing-price text-5xl font-bold text-black">
            <span class="pricing-currency text-xs align-top">$</span>66
            <span class="pricing-period text-xs italic">/ mo</span>
          </div>
          <h3 class="pricing-title text-xs uppercase tracking-widest text-black">Business</h3>
        </div>
        <ul class="pricing-feature-list text-left px-4 py-6">
          <li class="pricing-feature py-4">5 GB of space</li>
          <li class="pricing-feature py-4">Support at $5/hour</li>
          <li class="pricing-feature py-4">Full cloud access</li>
        </ul>
        <button class="pricing-action font-bold mx-12 mb-8 py-4 px-8 text-white rounded-full bg-red-700 hover:bg-red-900 transition-colors">Choose plan</button>
      </div>

      <div class="pricing-item relative flex flex-col items-stretch text-center flex-shrink-0 flex-grow basis-80 m-4 bg-white rounded-2xl shadow-md hover:shadow-lg z-10">
        <div class="pricing-deco bg-red-700 rounded-t-lg p-20 relative">
          <svg class="pricing-deco-img absolute bottom-0 left-0 w-full h-40" viewBox="0 0 300 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path class="deco-layer deco-layer--1 transition-transform duration-500" fill="#FFFFFF" opacity="0.6" d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729
              c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z" />
            <path class="deco-layer deco-layer--2 transition-transform duration-500" fill="#FFFFFF" opacity="0.6" d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729
              c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z" />
            <path class="deco-layer deco-layer--3 transition-transform duration-500" fill="#FFFFFF" opacity="0.7" d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716
              H42.401L43.415,98.342z" />
            <path class="deco-layer deco-layer--4" fill="#FFFFFF" d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428
              c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z" />
          </svg>
          <div class="pricing-price text-5xl font-bold text-black">
            <span class="pricing-currency text-xs align-top">$</span>150
            <span class="pricing-period text-xs italic">/ mo</span>
          </div>
          <h3 class="pricing-title text-xs uppercase tracking-widest text-black">Business</h3>
        </div>
        <ul class="pricing-feature-list text-left px-4 py-6">
          <li class="pricing-feature py-4">20 GB of space</li>
          <li class="pricing-feature py-4">Support at $5/hour</li>
          <li class="pricing-feature py-4">Full cloud access</li>
        </ul>
        <button class="pricing-action font-bold mx-12 mb-8 py-4 px-8 text-white rounded-full bg-red-700 hover:bg-red-900 transition-colors">Choose plan</button>
      </div>
    </div>
  </section>




      <section className="teams" id="teams">
        <div className="max-width">
          <h2 className="title">FeedBacks</h2>
          <Slider {...settings}>
            <div className="card">
              <div className="box">
                <a href="https://replit.com/@HarryWaters3">
                  <img src="harrylogo.gif" alt="" />
                </a>
                <div className="text">HarryWater3</div>
                <p>😎 CEO of destiny studios 😎 Member of blu3 team 🔵 Think outside the box 📦:/</p>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <a href="https://replit.com/@NotDartfrog">
                  <img src="dartfroglogo.png" alt="" />
                </a>
                <div className="text">Me</div>
                <p>I'm a member of the Blu3 Team 🔵 and Destiny Studios ⭐...</p>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <a href="https://replit.com/@JudeWon">
                  <img src="judelogo.gif" alt="" />
                </a>
                <div className="text">JudeWon</div>
                <p> I pygame 🧑‍💻...</p>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <a href="https://replit.com/@MaddoxJeremiah">
                  <img src="maddoxlogo.gif" alt="" />
                </a>
                <div className="text">Maddox Jeremiah</div>
                <p>Python coder and admin of Divine Apple :/</p>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <a href="https://replit.com/@ProximaAtlas">
                  <img src="proximalogo.gif" alt="" />
                </a>
                <div className="text">Vismai Nair</div>
                <p>A SCSS/CSS and BOM developer...</p>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      <section className="contact" id="contact">
      <div class="container flex justify-around items-center h-screen w-screen max-h-[800px] max-w-[1280px] min-h-[600px] min-w-[1000px] mx-auto">
  <div class="card card0 flex justify-center items-center h-[379px] w-[300px] bg-black rounded-lg shadow-[0_70px_63px_-60px_rgba(0,0,0,1)] overflow-hidden relative transition-all duration-800 bg-[url('https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg')] hover:bg-left hover:bg-no-repeat hover:bg-cover hover:bg-[size:600px]">
    <div class="border h-[369px] w-[290px] bg-transparent rounded-lg border-white border-opacity-0 hover:border-opacity-100 transition-all duration-1000 relative">
      <h2 class="text-white text-lg m-5 opacity-0 transition-opacity duration-1000">Al Pacino</h2>
      <div class="icons absolute fill-white h-[130px] top-[226px] w-[50px] flex flex-col items-center justify-around">
       
      </div>
    </div>
  </div>
  <div class="card card1 flex justify-center items-center h-[379px] w-[300px] bg-black rounded-lg shadow-[0_70px_63px_-60px_rgba(0,0,0,1)] overflow-hidden relative transition-all duration-800 bg-[url('https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg')] hover:bg-left hover:bg-no-repeat hover:bg-cover hover:bg-[size:600px]">
    <div class="border h-[369px] w-[290px] bg-transparent rounded-lg border-white border-opacity-0 hover:border-opacity-100 transition-all duration-1000 relative">
      <h2 class="text-white text-lg m-5 opacity-0 transition-opacity duration-1000">Ben Stiller</h2>
      <div class="icons absolute fill-white h-[130px] top-[226px] w-[50px] flex flex-col items-center justify-around">
      
      </div>
    </div>
  </div>
  <div class="card card2 flex justify-center items-center h-[379px] w-[300px] bg-black rounded-lg shadow-[0_70px_63px_-60px_rgba(0,0,0,1)] overflow-hidden relative transition-all duration-800 bg-[url('https://i.pinimg.com/originals/ee/85/08/ee850842e68cfcf6e3943c048f45c6d1.jpg')] hover:bg-left hover:bg-no-repeat hover:bg-cover hover:bg-[size:600px]">
    <div class="border h-[369px] w-[290px] bg-transparent rounded-lg border-white border-opacity-0 hover:border-opacity-100 transition-all duration-1000 relative">
      <h2 class="text-white text-lg m-5 opacity-0 transition-opacity duration-1000">Patrick Stewart</h2>
      <div class="icons absolute fill-white h-[130px] top-[226px] w-[50px] flex flex-col items-center justify-around">
  
      </div>
    </div>
  </div>
</div>

      </section>

      <footer>
        <span>Created By <a href="https://codepen.io/Slozz">Kitsuké Kizuki</a> | <FontAwesomeIcon icon={faCopyright} /> 2024 Kitsuké Kizuki All rights reserved.</span>
      </footer>
    </div>
  );
};

export default ReadOneHome;

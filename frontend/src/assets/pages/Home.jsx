import React, { useEffect } from 'react';
import $ from 'jquery';
import 'owl.carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import Typed from 'typed.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faBars, faUser, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  useEffect(() => {
    $(document).ready(function () {
      $(window).scroll(function () {
        if (this.scrollY > 20) {
          $('.navbar').addClass('sticky');
        } else {
          $('.navbar').removeClass('sticky');
        }

        if (this.scrollY > 500) {
          $('.scroll-up-btn').addClass('show');
        } else {
          $('.scroll-up-btn').removeClass('show');
        }
      });

      $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        $('html').css('scrollBehavior', 'auto');
      });

      $('.navbar .menu li a').click(function () {
        $('html').css('scrollBehavior', 'smooth');
      });

      $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
      });

      new Typed('.typing', {
        strings: ['Game Developer', 'Web Developer', 'Designer', 'Talented Coder'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
      });

      new Typed('.typing-2', {
        strings: ['Game Developers', 'Website Makers', 'Designers', 'Talented Coders'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
      });

      $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          600: {
            items: 2,
            nav: false
          },
          1000: {
            items: 3,
            nav: false
          }
        }
      });
    });
  }, []);

  return (
    <div>
      <div className="scroll-up-btn">
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
      <nav className="navbar">
        <div className="max-width">
          <div className="logo">
            <a href="#">Wel<span>come.</span></a>
          </div>
          <ul className="menu">
            <li><a href="#home" className="menu-btn">Home</a></li>
            <li><a href="#about" className="menu-btn">About</a></li>
            <li><a href="#services" className="menu-btn">Skills</a></li>
            <li><a href="#skills" className="menu-btn">Talents</a></li>
            <li><a href="#teams" className="menu-btn">Team</a></li>
            <li><a href="#contact" className="menu-btn">Contact</a></li>
          </ul>
          <div className="menu-btn">
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </nav>

      <section className="home" id="home">
        <div className="max-width">
          <div className="home-content">
            <div className="text-1">Hello, I am</div>
            <div className="text-2">Kitsuké Kizuki</div>
            <div className="text-3">And I am a <span className="typing"></span></div>
            <a href="#about">About Me</a>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="max-width">
          <h2 className="title">About Me</h2>
          <div className="about-content">
            <div className="column left">
              <a href="https://replit.com/team/destint-studios">
                <img src="DESTINY STUDIOS.gif" alt="" />
              </a>
            </div>
            <div className="column right">
              <div className="text">I'm Kitsuké Kizuki and I am a <span className="typing-2"></span></div>
              <p>
                Hi there! I'm a 16 yr old developer with over 7 years of experience. I like making fun and satisfying games and doing pixel art. I also like playing chess.
              </p>
              <br />
              <p style={{ fontStyle: 'italic' }}>
                Fun Fact: I was the runner up for the Pixilart Thanksgiving competition and my team won the Charlton Chess v Dartford Chess Tournament.
              </p>
              <a href="#services">My Skills</a>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="max-width">
          <h2 className="title">My Skills</h2>
          <div className="serv-content">
            <div className="card">
              <div className="box">
                <FontAwesomeIcon icon={['fas', 'paint-brush']} />
                <div className="text">Web Design</div>
                <p>HTML, CSS, SCSS, and JavaScript</p>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <FontAwesomeIcon icon={['fas', 'chart-line']} />
                <div className="text">Software Developing</div>
                <p>Python, C++, C#, React, and Node.JS</p>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <FontAwesomeIcon icon={['fas', 'code']} />
                <div className="text">Game Developing</div>
                <p>Python, React, Web-Based Games</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="max-width">
          <h2 className="title">My Skills</h2>
          <div className="skills-content">
            <div className="column left">
              <div className="text">My creative skills & experiences.</div>
              <p>What I know</p>
              <a href="#teams">My Team</a>
            </div>
            <div className="column right">
              <div className="bars">
                <div className="info">
                  <span>HTML</span>
                  <span>90%</span>
                </div>
                <div className="line html"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>CSS</span>
                  <span>60%</span>
                </div>
                <div className="line css"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>JavaScript</span>
                  <span>50%</span>
                </div>
                <div className="line js"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>React</span>
                  <span>70%</span>
                </div>
                <div className="line react"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>Python</span>
                  <span>80%</span>
                </div>
                <div className="line python"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="teams" id="teams">
        <div className="max-width">
          <h2 className="title">My Team</h2>
          <div className="carousel owl-carousel">
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
                <p>I'm a member of the Blu3 Team 🔵 and Destiny Studios ⭐. The CEO of Box Studios 📦 and the Realmz.io Idea Team 🫥. I love chess ♟️, football ⚽, gaming 🎮, running 🏃, doing art 🎨 and coding 🖥️. The runner up for the PixilArt Thanksgiving Art Competition 🥈. Currently collabing with @MarroneLF_Official, @JudeWon and @blu3appl3. 17 years old - 30/12/2006 🥳</p>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <a href="https://replit.com/@JudeWon">
                  <img src="judelogo.gif" alt="" />
                </a>
                <div className="text">JudeWon</div>
                <p> I Code python & pygame 🧑‍💻. Currently collabing with @NotDartFrog 🐸 & @PianoMan0 🤔. I Love coding 🖥, geology 🪨, chess ♟, soccer ⚽, math 🟰, and gaming 💻. I'm a member of the Blu3 Team 🟦, CEO of Divine Apple 🍏, and Admin of Destiny Studios 🌠. 13 years old - 2/11/2010 🥳</p>
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
                <p>A SCSS/CSS and BOM developer that has absolutely no idea what he is doing but does it anyway in hopes that it will work out (it usually does, or at least he hopes so); Newest member of the Destiny Studios team and definitely the most insane and inexperienced; Temporary CSS Consultant (Intern) at CarbonBright.co</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="max-width">
          <h2 className="title">Contact Me</h2>
          <div className="contact-content">
            <div className="column left">
              <div className="text">Get in Touch</div>
              <p>Get in touch with me!</p>
              <div className="icons">
                <div className="row">
                  <FontAwesomeIcon icon={faUser} />
                  <div className="info">
                    <div className="head">Name</div>
                    <div className="sub-title">Kitsuké Kizuki</div>
                  </div>
                </div>
                <div className="row">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <div className="info">
                    <div className="head">Located</div>
                    <div className="sub-title">London</div>
                  </div>
                </div>
                <div className="row">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <div className="info">
                    <div className="head">Email</div>
                    <div className="sub-title">
                      <a href="mailto:skopi.kmoach@gmail.com">skopi.kmoach@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>Created By <a href="https://codepen.io/Slozz">Kitsuké Kizuki</a> | <FontAwesomeIcon icon={['far', 'copyright']} /> 2024 Kitsuké Kizuki All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Home;

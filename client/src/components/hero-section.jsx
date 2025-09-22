import { useLocation } from "wouter";
import CountdownTimer from "./countdown-timer.jsx";
import aiIcon from "../media/icons/ai-technology-spark--lightbulb-idea-bright-lighting-artificial-intelligence-ai.png";
import SolarBroken from "../media/icons/Accessibility--Streamline-Solar-Broken.png";
import Vector from "../media/icons/Vector.png";
import tv from "../media/icons/tv.png";
import laptop from "../media/icons/tv.png";
import tab from "../media/icons/tab.png";
import mobile from "../media/icons/mobile.png";
import envoilogo from "../media/envoi-logo.png";
import phone from "../media/icons/phone-icon.png";
import Group from "../media/Group-5103.png";


export default function HeroSection() {
  const [, setLocation] = useLocation();

  return (
    <>
     <section class="hero-section">
        <div class="container">
            <div class="row justify-content-center text-center">
                <div class="col-lg-9">
                    <div class="hero-logo mb-5">
                        <img src={envoilogo} alt="11 Eleven Logo" class="img-fluid"/>
                    </div>


                  
                    {/* <div class="countdown-timer mb-5">
                        <div class="row justify-content-center">
                            <div class="col-auto">
                                <div class="countdown-item">
                                    <div class="countdown-number">01</div>
                                    <div class="countdown-label">Days</div>
                                </div>
                            </div>
                            <div class="col-auto countdown-separator">:</div>
                            <div class="col-auto">
                                <div class="countdown-item">
                                    <div class="countdown-number">35</div>
                                    <div class="countdown-label">Hours</div>
                                </div>
                            </div>
                            <div class="col-auto countdown-separator">:</div>
                            <div class="col-auto">
                                <div class="countdown-item">
                                    <div class="countdown-number">56</div>
                                    <div class="countdown-label">Mins</div>
                                </div>
                            </div>
                            <div class="col-auto countdown-separator">:</div>
                            <div class="col-auto">
                                <div class="countdown-item">
                                    <div class="countdown-number">56</div>
                                    <div class="countdown-label">Secs</div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <CountdownTimer/>
                    <div>
                        <p class="hero-description mb-0">
                            Early Access to sign up to receive early access,
                        </p>
                        <p class="hero-description">
                            Beta coming with a, sign up beta with a countdown, production launch
                        </p>
                    </div>

                 
                    <div class="hero-buttons">
                        <button class="btn btn-primary me-3">Sign Up</button>
                        <button class="btn  btn-outline-primary">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
<section class="streamline-section py-5">
        <div class="container">
            <div class="row justify-content-center text-center mb-5">
                <div class="col-lg-12">
                    <h2 class="section-title">
                        Streamline Your Media Need with <br/>
                        <span class="text-primary">Professional Services</span>
                    </h2>

                    
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="devices-showcase">
                                <img src={Group} alt="Multiple Devices" class="img-fluid"/>
                            </div>
                        </div>
                    </div>
                    <p class="section-description">
                        Our services ensure your media is optimized for any platform or <br/> device,
                        saving you time and resources.
                    </p>
                    <button class="btn btn-primary mt-3">Explore</button>
                </div>
            </div>

        </div>
    </section>

   
    <section class="core-features-section">
        <div class="container">
            <div class="row justify-content-center text-center mb-3">
                <div class="col-lg-8">
                    <h2 class="section-title">Core Features</h2>
                    <p class="section-description text-primary">Enhancing Your Media Experience</p>
                </div>
            </div>

            <div class="row gap-3 justify-content-center">
                <div class="col-lg-3 mb-4">
                    <div class="feature-card text-center">
                        <div class="feature-icon  core-icon-1 mb-3">
                            <img src={aiIcon}
                                alt=""/>
                        </div>
                        <h4 class="feature-title">Efficiency</h4>
                        <p class="feature-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 mb-4">
                    <div class="feature-card text-center">
                        <div class="feature-icon  core-icon-2 mb-3">
                            <img src={SolarBroken} alt=""/>
                        </div>
                        <h4 class="feature-title">Accessibility</h4>
                        <p class="feature-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 mb-4">
                    <div class="feature-card text-center">
                        <div class="feature-icon  core-icon-3 mb-3">
                            <img src={Vector} alt=""/>
                        </div>
                        <h4 class="feature-title">Engagement</h4>
                        <p class="feature-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

   
    <section class="pricing-section py-5">
        <div class="container">
            <div class="row justify-content-center text-center mb-5">
                <div class="col-lg-8">
                    <h2 class="section-title">Our Pricing</h2>
                    <p class="section-description text-primary">Please that taxes are not included</p>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-4 mb-4">
                    <div class="pricing-card">
                        <div class="pricing-header text-start">
                            <h3 class="pricing-plan text-primary">Monthly</h3>
                            <div class="pricing-type">1 month pass</div>
                            <div class="pricing-badge">Best Start</div>
                        </div>

                        <div class="pricing-footer text-start">
                            <a href="./pricing"><button class="btn btn-outline-primary">Select</button></a>
                        </div>

                        <div class="pricing-features">
                            <div class="feature-item">
                                <span class="feature-check"><span class="material-symbols-outlined">
                                        check
                                    </span></span>
                                <span>Pay monthly. Cancel anytime.</span>
                            </div>
                            <div class="feature-item">
                                  <span class="feature-check"><span class="material-symbols-outlined">
                                        check
                                    </span></span>
                                <span>Ad-free 11 Eleven PPV experience</span>
                            </div>
                            <div class="feature-item">
                                  <span class="feature-check"><span class="material-symbols-outlined">
                                        check
                                    </span></span>
                                <span>Includes 2 11 Eleven PPV credits each month</span>
                            </div>
                            <div class="feature-item">
                                  <span class="feature-check"><span class="material-symbols-outlined">
                                        check
                                    </span></span>
                                <span>Exclusive 11 Eleven PPV content</span>
                            </div>
                        </div>


                    </div>
                </div>

                <div class="col-lg-4 mb-4">
                    <div class="pricing-card pricing-featured">
                        <div class="pricing-header text-start">
                            <h3 class="pricing-plan text-primary">Yearly</h3>
                            <div class="pricing-type">1 year pass</div>
                            <div class="pricing-badge">Best Start</div>
                        </div>
                        <div class="pricing-footer text-start">
                            <a href="./choose-plan.html"><button class="btn btn-primary">Select</button></a>
                        </div>
                        <div class="pricing-features">
                            <div class="feature-item">
                                  <span class="feature-check featured"><span class="material-symbols-outlined">
                                        check
                                    </span></span>
                                <span>Annual 37% discount</span>
                            </div>
                            <div class="feature-item">
                                 <span class="feature-check featured"><span class="material-symbols-outlined">
                                        check
                                    </span></span>
                                <span>Ad-free 11Eleven PPV experience</span>
                            </div>
                            <div class="feature-item">
                                 <span class="feature-check featured"><span class="material-symbols-outlined">
                                        check
                                    </span></span>
                                <span>Includes 2 11 Eleven PPV credits each month</span>
                            </div>
                            <div class="feature-item">
                                 <span class="feature-check featured"><span class="material-symbols-outlined">
                                        check
                                    </span></span>
                                <span>Exclusive 11 Eleven PPV content</span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </section>

    
    <section class="why-choose-section py-5">
        <div class="container">
            <div class="row justify-content-center text-center mb-5">
                <div class="col-lg-8">
                    <h2 class="section-title">Why Choose Us</h2>
                    <p class="section-description text-primary">Enhancing Your Media Experience</p>
                </div>
            </div>

            <div class="row position-relative">
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="choice-item text-center">
                        <div class="choice-number">01</div>
                        <h5 class="choice-title">Expertise</h5>
                        <p class="choice-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="choice-item text-center">
                        <div class="choice-number">02</div>
                        <h5 class="choice-title">Quality Assurance</h5>
                        <p class="choice-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="choice-item text-center">
                        <div class="choice-number">03</div>
                        <h5 class="choice-title text-primary">Customization</h5>
                        <p class="choice-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="choice-item text-center">
                        <div class="choice-number">04</div>
                        <h5 class="choice-title">Timeliness</h5>
                        <p class="choice-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

   
    <section class="statistics-section py-5">
        <div class="container">
            <div class="row justify-content-center text-center mb-4">
                <div class="col-lg-8">
                    <h2 class="section-title">Let's Check The Numbers !</h2>
                </div>
            </div>

            <div class="row text-center">
                <div class="col-lg-4 mb-4">
                    <div class="stat-item">
                        <div class="stat-number text-primary">78K+</div>
                        <div class="stat-label">Users and counting</div>
                    </div>
                </div>

                <div class="col-lg-4 mb-4">
                    <div class="stat-item">
                        <div class="stat-number text-primary">180</div>
                        <div class="stat-label">Users and counting</div>
                    </div>
                </div>

                <div class="col-lg-4 mb-4">
                    <div class="stat-item">
                        <div class="stat-number text-primary">89.7</div>
                        <div class="stat-label">Users and counting</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

   
    <section class="devices-section py-5">
        <div class="container">
            <div class="row justify-content-center text-center mb-5">
                <div class="col-lg-8">
                    <h2 class="section-title">Available On Your Favourite Devices</h2>
                    <p class="section-description text-primary">Enhancing Your Media Experience</p>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="device-item text-center">
                        <div class="device-icon mb-3">
                            <img src={tv} alt=""/>
                        </div>
                        <h5 class="device-title">TV</h5>
                        <p class="device-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="device-item text-center">
                        <div class="device-icon laptop mb-3">
                            <img src={laptop} alt=""/>
                        </div>
                        <h5 class="device-title">Laptop</h5>
                        <p class="device-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="device-item text-center">
                        <div class="device-icon tablet mb-3">
                            <img src={tab} alt=""/>
                        </div>
                        <h5 class="device-title">Tablet</h5>
                        <p class="device-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="device-item text-center">
                        <div class="device-icon mobile mb-3">
                            <img src={mobile} alt=""/>
                        </div>
                        <h5 class="device-title">Mobile</h5>
                        <p class="device-description">
                            Our transcoding ensures media optimization across all platforms,
                            saving you time and resources
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

     <section class="cta-footer-section">
        
    <section class="cta-section py-5">
        <div class="container cta-inner-container">
            <div class="row align-items-center justify-content-start ms-4">
                <div class="col-lg-7">
                    <h3 class="cta-title mb-3">Ready to elevate your media content?</h3>
                    <p class="cta-description">
                        Get in touch with us today to discuss<br/>
                        How can we enhance your media presence?
                    </p>
                </div>
                <div class="col-lg-4 text-end">
                    <button class="btn btn-outline-primary">Get in touch</button>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer-section py-5">
        <div class="container">
            <div class="row justify-content-center gap-5">
                <div class="col-lg-4 mb-4">
                    <div class="footer-logo mb-3">
                        <img src={envoilogo} alt="Enovi Logo"
                            class="img-fluid" />
                    </div>
                    <p class="footer-description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </p>
                </div>

                <div class="col-lg-3 mb-4">
                    <h6 class="footer-title">Terms & conditions</h6>
                    <ul class="footer-links">
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#" class="text-primary">- Refund and cancellation policy</a></li>
                        <li><a href="#">Terms of service</a></li>
                    </ul>
                </div>

                <div class="col-lg-3 mb-4">
                    <h6 class="footer-title">Contact Us</h6>
                    <ul class="footer-contact">
                        <li class="mb-3"><img src="./assets/media/icons/mail-icon.png" alt=""/> <a href="mailto:Contactus@gmail.com">Contactus@gmail.com</a></li>
                        <li><img src={phone} alt="" /> <a href="tel:+91123456789">+91123456789</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
     </section>
    </>
    
  );
}

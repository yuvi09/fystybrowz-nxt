"use client";

import { useState, useEffect } from 'react';
import reviewsData from '../data/reviews.json';

export default function HomePage() {
    const [currentItem, setCurrentItem] = useState(0);
    const totalItems = 5; // Total number of carousel items
    
    // TODO: Replace with your actual TidyCal URL
    const tidyCalBookingUrl = "https://tidycal.com/fystybrowz";
    
    // State to control the booking modal
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    
    const [currentReview, setCurrentReview] = useState(0);
    const totalReviews = reviewsData.reviews.length;
    
    const prevItem = () => {
        setCurrentItem((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
    };
    
    const nextItem = () => {
        setCurrentItem((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
    };
    
    const prevReview = () => {
        setCurrentReview((prev) => (prev === 0 ? totalReviews - 1 : prev - 1));
    };
    
    const nextReview = () => {
        setCurrentReview((prev) => (prev === totalReviews - 1 ? 0 : prev + 1));
    };
    
    // Function to open the booking modal
    const openBookingModal = () => {
        setIsBookingModalOpen(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };
    
    // Function to close the booking modal
    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    };
    
    useEffect(() => {
        // Apply transform to carousel based on currentItem
        const carouselInner = document.querySelector('.carousel-inner') as HTMLElement;
        if (carouselInner) {
            const offset = -currentItem * 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
        }
        
        // Initialize slider functionality
        const sliderContainer = document.querySelector('.slider-container') as HTMLElement;
        const afterImage = document.querySelector('.slider-image.after') as HTMLElement;
        const sliderHandle = document.querySelector('.slider-handle') as HTMLElement;

        if (sliderContainer && afterImage && sliderHandle) {
            const handleSlide = (e: MouseEvent | TouchEvent) => {
                const rect = sliderContainer.getBoundingClientRect();
                let x: number;
                
                if ('touches' in e) {
                    x = e.touches[0].clientX;
                } else {
                    x = e.clientX;
                }
                
                x = x - rect.left;
                const width = rect.width;
            
                // Calculate the percentage position of the slider
                const percentage = Math.min(Math.max(0, x / width), 1);
            
                // Adjust the clip-path of the after image
                afterImage.style.clipPath = `inset(0 0 0 ${percentage * 100}%)`;
            
                // Position the handle
                sliderHandle.style.left = `${percentage * 100}%`;
            };
            
            // Mouse events
            sliderContainer.addEventListener('mousemove', handleSlide as EventListener);
            sliderContainer.addEventListener('touchmove', handleSlide as EventListener);

            // Prevent default touch behavior
            sliderContainer.addEventListener('touchstart', (e) => e.preventDefault());
            sliderContainer.addEventListener('touchmove', (e) => e.preventDefault());
            
            // Initial setup for slider
            afterImage.style.clipPath = 'inset(0 0 0 50%)';
            sliderHandle.style.left = '50%';
            
            // Cleanup event listeners
            return () => {
                sliderContainer.removeEventListener('mousemove', handleSlide as EventListener);
                sliderContainer.removeEventListener('touchmove', handleSlide as EventListener);
                sliderContainer.removeEventListener('touchstart', (e) => e.preventDefault());
                sliderContainer.removeEventListener('touchmove', (e) => e.preventDefault());
            };
        }
    }, [currentItem]);
    
    return (
      <main>
         
        <header>
            <div className="logo-container">
                <div className="logo-text">FYSTYBROWZ</div>
            </div>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#try-on">Try-On</a></li>
                    <li><a href="#faqs">FAQs</a></li>
                    <li><a href="#booking">Booking</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                {/* Mobile navigation */}
                <ul className="mobile-nav">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#booking">Booking</a></li>
                </ul>
            </nav>
        </header>

        <section className="services">
            <div className="service-item">
                <img src="/images/icons/eyebrow2.png" alt="Permanent Makeup Icon" />
                <div className="service-content">
                    <h3>Permanent Makeup</h3>
                    <p>Enhance facial features with expert cosmetic tattooing techniques.</p>
                </div>
            </div>
            <div className="service-item">
                <img src="/images/icons/eyebrow3.png" alt="Microblading Icon" />
                <div className="service-content">
                    <h3>Non Laser LiFT Tattoo Removal</h3>
                    <p>A gentle, non-laser solution designed to safely remove unwanted pigment from permanent makeup, scalp micropigmentation, and small to medium-sized tattoos.</p>
                </div>
            </div>
            <div className="service-item">
                <img src="/images/icons/tutorial.png" alt="Eyelash Extensions Icon" />
                <div className="service-content">
                    <h3>Training</h3>
                    <p>Unleash your artistic potential with permanent makeup training. Build a career that empowers others while giving you control of your time, income, and success.</p>
                </div>
            </div>
        </section>

        <div className="cta-container">
            <a href={tidyCalBookingUrl} target="_blank" rel="noopener noreferrer">
                <button className="cta-button">Book Now</button>
            </a>
        </div>

        <section className="about-section">
            <div className="about-container">
                <div className="about-image">
                    <img src="/images/sofia_bio.jpeg" alt="Owner Image" />
                </div>
                <div className="about-text">
                    <h2>About Us</h2>
                    <p>
                        <strong>FYSTYBROWZ</strong>, located in Walpole, Massachusetts, is your premier destination for all permanent makeup needs. Our mission is dedicated to enhancing your natural beauty and providing you with the confidence you deserve!
                    </p>
                    <p>
                        I am a bicoastal cosmetic tattoo artist and trainer in Los Angeles and the greater Boston area!
                    </p>
                </div>
            </div>
        </section>

        <section className="carousel-section">
            <h2 className="section-title">Services We Offer</h2>
            <div className="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item">
                        <div className="text">
                            <h2>Microblading Brows</h2>
                            <p>Microblading is a semi-permanent makeup technique that uses a handheld tool with fine needles to create hair-like strokes, mimicking natural eyebrow hairs. This procedure is perfect for those looking to enhance their brows with a fuller, more defined, and natural appearance.</p>
                        </div>
                        <div className="image">
                            <img src="/images/sample_brows2.jpg" alt="Microblading" />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="text">
                            <h2>Combination Brows</h2>
                            <p>Combination Brows offer the best of both worlds by blending microblading and shading techniques for a natural yet defined look. This service enhances the shape and fullness of your eyebrows, providing a polished appearance that lasts.</p>
                        </div>
                        <div className="image">
                            <img src="/images/sample_brows2.jpg" alt="Microblading" />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="text">
                            <h2>Ombré Powder Brows</h2>
                        <p>Ombré powder brows is a semi-permanent shading technique that gives the eyebrows a soft, powdery, makeup-like effect. This method creates a gradient look, with lighter fronts and darker tails, offering a more defined and long-lasting result compared to microblading.</p>
                        </div>
                        <div className="image">
                            <img src="/images/sample_brows2.jpg" alt="Microblading" />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="text">
                            <h2>Lip Blushing</h2>
                            <p>Lip blushing is a semi-permanent cosmetic tattoo that enhances the natural color and shape of the lips by depositing a soft pigment. It helps correct uneven tones, adds definition, and gives the lips a healthier, more youthful look.</p>
                        </div>
                        <div className="image">
                            <img src="/images/sample_brows.avif" alt="Eyelash Extensions" />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="text">
                            <h2>Scalp Micropigmentation</h2>
                            <p>Scalp Micropigmentation (SMP) offers a revolutionary solution for those experiencing hair loss, creating the appearance of a fuller head of hair through precise, natural-looking pigmentation. Each treatment will be customized to match your unique hairline and desired style, ensuring a seamless blend with your existing hair.</p>
                        </div>
                        <div className="image">
                            <img src="/images/sample_perm_makeup.png" alt="Permanent Makeup" />
                        </div>
                    </div>
                </div>
                <div className="carousel-buttons">
                    <button onClick={() => prevItem()}>&#9664;</button>
                    <button onClick={() => nextItem()}>&#9654;</button>
                </div>
            </div>
        </section>


        <section className="services-grid">
            <div className="service-card">
                <h2>Microblading Brows</h2>
                <p>Permanent Makeup - Microblading offers a semi-permanent solution for beautifully defined brows, enhancing your natural features with precision. This technique creates realistic hair-like strokes, ensuring a long-lasting and effortless look that saves you time on your daily beauty routine.</p>
                <button className="book-now-btn" onClick={openBookingModal}>Book Now</button>
            </div>
        
            <div className="service-card">
                <h2>Ombré Powder Brows</h2>
                <p>Ombré Powder Brows provide a soft, gradient effect that enhances the natural shape of your eyebrows while offering long-lasting definition. This semi-permanent technique is perfect for those seeking a defined yet subtle look, ideal for any occasion.</p>
                <button className="book-now-btn" onClick={openBookingModal}>Book Now</button>
            </div>
        
            <div className="service-card">
                <h2>Combination Brows</h2>
                <p>Combination Brows offer the best of both worlds by blending microblading and shading techniques for a natural yet defined look. This service enhances the shape and fullness of your eyebrows, providing a polished appearance that lasts.</p>
                <button className="book-now-btn" onClick={openBookingModal}>Book Now</button>
            </div>
        
            <div className="service-card">
                <h2>Correction Brows (previous Microblading/shading)</h2>
                <p>Correction Brows service specializes in refining and enhancing previous microblading or shading procedures to achieve a more natural and balanced appearance. This service addresses issues such as fading, unevenness, or color discrepancies, ensuring clients leave with beautifully shaped brows.</p>
                <button className="book-now-btn" onClick={openBookingModal}>Book Now</button>
            </div>
        
            <div className="service-card">
                <h2>4-10 weeks Eyebrow Touchup</h2>
                <p>Touchup services for microblading and ombré powder are essential for maintaining the vibrancy and precision of your initial treatment. These services not only extend the life of your brows but also ensure they remain fresh and well-defined.</p>
                <button className="book-now-btn" onClick={openBookingModal}>Book Now</button>
            </div>
        
            <div className="service-card">
                <h2>Annual Eyebrow Touchup</h2>
                <p>This treatment is highly suggested for maintaining the definition and boldness of your eyebrows throughout the year.</p>
                <button className="book-now-btn" onClick={openBookingModal}>Book Now</button>
            </div>
        </section>

        <section className="hero">
            <h1>Experience Flawless Results</h1>
            <p>Discover the art of precision and beauty with our premium services.</p>
            <button onClick={openBookingModal}>Book an Appointment</button>
        </section>

        <section className="before-after-section">
            <h2>Before & After</h2>
            <div className="slider-container">
                <div className="slider-wrapper">
                    <img src="/images/before3.png" alt="Before" className="slider-image before" />
                    <img src="/images/after3.png" alt="After" className="slider-image after" />
                    <div className="slider-handle"></div>
                </div>
            </div>
        </section>

        <section className="photos-section">
            <h2>Our Work</h2>
            <div className="photos-gallery">
                <div className="photo-item">
                    <img src="/images/work_sp5.jpg" alt="Glamour Photo 1" />
                </div>
                <div className="photo-item">
                    <img src="/images/work_sp_2.jpg" alt="Glamour Photo 2" />
                </div>
                <div className="photo-item">
                    <img src="/images/work_sp_1.jpg" alt="Glamour Photo 3" />
                </div>
                <div className="photo-item">
                    <img src="/images/work_sp3.jpg" alt="Glamour Photo 4" />
                </div>
                <div className="photo-item">
                    <img src="/images/work_sp4.jpg" alt="Glamour Photo 5" />
                </div>
                <div className="photo-item">
                    <img src="/images/work_sp6.jpg" alt="Glamour Photo 6" />
                </div>
            </div>
        </section>

        <section className="reviews-section">
            <h2>Client Reviews</h2>
            <div className="reviews-carousel" style={{ overflow: 'hidden', maxWidth: 500, margin: '0 auto' }}>
                <div
                    className="reviews-carousel-inner"
                    style={{
                        display: 'flex',
                        transition: 'transform 0.5s ease',
                        width: `${totalReviews * 100}%`,
                        transform: `translateX(-${currentReview * (100 / totalReviews)}%)`
                    }}
                >
                    {reviewsData.reviews.map((review) => (
                        <div
                            key={review.id}
                            className="review-card"
                            style={{ width: `${100 / totalReviews}%`, flex: `0 0 ${100 / totalReviews}%` }}
                        >
                            <div className="review-header">
                                <div className="review-name">{review.name}</div>
                                <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                            </div>
                            <div className="review-rating">
                                {[...Array(review.rating)].map((_, i) => (
                                    <span key={i} className="star">★</span>
                                ))}
                            </div>
                            <div className="review-comment">{review.comment}</div>
                        </div>
                    ))}
                </div>
                <div className="reviews-buttons">
                    <button onClick={prevReview} aria-label="Previous review">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M13 16L8 10L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button onClick={nextReview} aria-label="Next review">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7 4L12 10L7 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <footer>
            <p>&copy; 2025 FYSTYBROWZ. All rights reserved.</p>
        </footer>

        {/* Booking Modal */}
        {isBookingModalOpen && (
            <div className="booking-modal-overlay" onClick={closeBookingModal}>
                <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close-btn" onClick={closeBookingModal}>×</button>
                    <iframe 
                        src={tidyCalBookingUrl}
                        frameBorder="0"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Book an appointment"
                    ></iframe>
                </div>
            </div>
        )}
      </main>
    );
  }
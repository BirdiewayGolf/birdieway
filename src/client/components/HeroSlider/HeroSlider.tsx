import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

interface SlideData {
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
}

const slides: SlideData[] = [
  {
    title: "Business League",
    description: "Join our competitive business league and network while you play",
    image: "business.jpg",
    link: "/about/business",
    linkText: "Learn More"
  },
  {
    title: "Junior League",
    description: "Develop young talent in our structured junior programs",
    image: "junior.jpg",
    link: "/about/junior",
    linkText: "Join Now"
  },
  {
    title: "Long Day Tournament",
    description: "Test your endurance in our signature long-format tournament",
    image: "longday.jpg",
    link: "/about/longday",
    linkText: "Register"
  },
  {
    title: "Host a League",
    description: "Create and manage your own golf league with our platform",
    image: "host.jpg",
    link: "/host-league",
    linkText: "Get Started"
  },
  {
    title: "Fundraisers",
    description: "Organize charity golf events with our comprehensive support",
    image: "fundraiser.jpg",
    link: "/about/fundraisers",
    linkText: "Learn More"
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url('/assets/${slide.image}')` }}
        >
          <div className="slide-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <Link to={slide.link} className="cta-button">
              {slide.linkText}
            </Link>
          </div>
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
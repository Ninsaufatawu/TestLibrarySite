import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profileImage from "../assets/download.jpg";
import bgImage1 from "../assets/Untitled design (3).png";
import bgImage2 from "../assets/ai-generated-elderly-man-reading-a-book-on-a-white-background-generative-ai-photo.jpeg";
import bgImage3 from "../assets/ce259c7fc8ce7af473e998ed3ebdd8f8.jpg";
import bgImage4 from "../assets/Untitled design (4).png";
import bgImage5 from "../assets/Read Always.png";
import bgImage6 from "../assets/Free  Book, Art, Education.jpg";
import bgImage7 from "../assets/1711671237871.jpg";
import bgImage8 from "../assets/Background Of School Supplies,.jpg";

const images = [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5, bgImage6, bgImage7, bgImage8, profileImage]; // Array of background images

const Banner = () => {
  // Slick slider settings
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 4 seconds per slide
  };

  return (
    <div className="relative text-white h-[350px] md:h-[300px] lg:h-[300px] overflow-hidden rounded-2xl">
      {/* Slider Component */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <div className="absolute inset-0">
              <img
                src={image}
                alt={`slide-${index}`}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent  opacity-60 rounded-2xl"></div> {/* Gradient overlay */}
            </div>
            <div className="relative z-10 flex flex-col justify-center items-start p-4 md:p-6 lg:p-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                TRENDING BOOKS & NEWS <br /> THIS MONTH
              </h1>
              <p className="text-sm md:text-lg lg:text-xl max-w-md mb-4">
                Discover the most popular books and articles this month and immerse yourself in the latest trends.
              </p>
              <div className="flex">
                <Link to="/trending-books">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold text-sm md:text-base lg:text-lg shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out">
                    View More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;

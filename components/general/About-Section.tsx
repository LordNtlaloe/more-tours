import React from 'react';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <>
      <section className="about top py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="aboutCard flex flex-col lg:flex-row items-center gap-8">
            {/* Image section */}
            <div className="relative lg:w-1/2 h-96 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <Image
                src="/assets/img/about.jpg" // Ensure the path is correct
                alt="About Us"
                objectFit="cover"
                quality={100}
                priority
                width={650}
                height={400}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="absolute bottom-[5%] left-[10%] w-[70%] h-[30px] bg-black bg-opacity-70 rounded-md z-[-1]"></div>
            </div>

            {/* Text and button section */}
            <div className="lg:w-1/2">
              <h4 className="text-[#31b675] text-lg mb-3 font-semibold">About Us</h4>
              <h1 className="text-4xl font-thin mb-6 text-gray-800">
                We <span className="font-bold">provide Solution</span> to grow your business
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit amet consectetur piscing elit amet consectetur adipiscing elit sed et eletum nulla eu placerat felis etiam tincidunt orci lacus id varius dolor fermum sit amet.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit amet consectetur piscing elit amet consectetur adipiscing elit sed et eletum nulla eu placerat felis etiam tincidunt orci lacus id varius dolor fermum sit amet.
              </p>
              <a
                href="#"
                className="inline-block text-center bg-[#31b675] text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 transform hover:bg-green-600 hover:scale-105"
              >
                Explore More <FaArrowRight className="inline ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features top py-10 bg-white">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row-reverse items-center gap-8">
          {/* Features Text */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
              Our <span className="text-[#31b675]">Features</span>
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit amet consectetur piscing elit amet consectetur adipiscing elit sed et eletum nulla eu placerat felis etiam tincidunt orci lacus id varius dolor fermum sit amet.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit amet consectetur piscing elit amet consectetur adipiscing elit sed et eletum nulla eu placerat felis etiam tincidunt orci lacus id varius dolor fermum sit amet.
            </p>
            <a
              href="#"
              className="inline-block text-center bg-[#31b675] text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 transform hover:bg-green-600 hover:scale-105"
            >
              Explore More <FaArrowRight className="inline ml-2" />
            </a>
          </div>

          {/* Features Image */}
          <div className="relative lg:w-1/2 h-96 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <Image
              src="/assets/img/feature-img-1.jpg"
              alt="Features"
              objectFit="cover"
              quality={100}
              priority
              width={650}
              height={400}
            />
            <div className="control-btn absolute bottom-4 left-[40%]">
              <button className="bg-[#31b675] text-white p-3 rounded-full">
                <FaPlay />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;

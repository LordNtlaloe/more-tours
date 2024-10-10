import React from 'react';
import { FaGlobe, FaHotel, FaUser } from 'react-icons/fa';

const Services: React.FC = () => {
    return (
        <div className="container mx-auto sm:px-4 max-w-full py-5 mb-5 hero-header">
            <div
                className="relative"
                style={{
                    backgroundImage: 'url("/assets/img/WhatsApp Image 2024-04-26 at 23.33.24.jpeg")', // Replace with your image path
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                }}
            >
                {/* Background overlay for tint */}
                <div
                    className="absolute inset-0 bg-black opacity-70"
                    style={{
                        zIndex: 1,
                    }}
                ></div>

                <div className="container mx-auto sm:px-4 py-5 relative z-10">
                    <div className="flex flex-wrap justify-center py-5">
                        <div className="lg:w-4/5 pr-4 pl-4 lg:pt-12 lg:mt-12 text-center">
                            <h1 className="text-5xl text-white font-bold mb-4 animated slideInDown">Services</h1>
                            {/* Updated Breadcrumb Menu */}
                            <nav aria-label="breadcrumb">
                                <ol className="flex flex-wrap list-reset justify-center py-4 px-4 rounded-md shadow-md">
                                    <li className="inline-block px-3 py-2 text-white">
                                        <a href="#" className="hover:text-blue-600 transition-colors duration-200">Home</a>
                                    </li>
                                    <li className="inline-block px-3 py-2 text-white">
                                        <span className="text-white">/</span>
                                    </li>
                                    <li className="inline-block px-3 py-2 text-white">
                                        <a href="#" className="hover:text-blue-600 transition-colors duration-200">Pages</a>
                                    </li>
                                    <li className="inline-block px-3 py-2 text-white">
                                        <span className="text-white">/</span>
                                    </li>
                                    <li className="inline-block px-3 py-2 text-blue-600 font-semibold" aria-current="page">
                                        Services
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto sm:px-4 py-12">
                {/* Section Heading */}
                <div className="text-center mb-10">
                    <h6 className="section-title bg-white text-blue-600 px-4 inline-block rounded-lg">Services</h6>
                    <h3 className="mt-4 font-bold text-2xl">Our Services Based on Three Key Pillars</h3>
                </div>

                {/* Service Items */}
                <div className="flex flex-wrap -mx-2">
                    {[
                        { icon: FaGlobe, title: "Experience", description: "An excellent reputation for personal services, quality and value through extensive research and a comprehensive database backed up by ten years of experience in the travel industry. Our agents travel to the places they sell on a regular basis." },
                        { icon: FaHotel, title: "Quality", description: "Professional customer oriented consultation providing hassle free travel. Email capabilities for convenience and prompt booking and information. Creative but persistent approach to search for the most appropriate travel arrangements and identifying the best possible value." },
                        { icon: FaUser, title: "Value", description: "With our “Know How”, and as a sales agent for almost all major international airlines, we do not only offer competitive prices to our customer, but we are also able to pass on very competitive prices and a maximum opportunity for choices and flexibility we even offer a stress free luggage arrangement for our clients." },
                    ].map((service, index) => (
                        <div key={index} className="lg:w-4/12 px-2 sm:w-6/12 mb-6 flex">
                            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transition duration-300 ease-in-out hover:shadow-xl h-full">
                                <div>
                                    <div className="text-blue-500 mb-4 text-4xl">
                                        <service.icon />
                                    </div>
                                    <h5 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h5>
                                    <p className="text-gray-600">{service.description}</p>
                                </div>
                                <div className="mt-auto">
                                    <a href="/services" className="text-blue-600 font-semibold hover:underline">Learn More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Highlighted Image & Text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                    <div className="relative h-full overflow-hidden rounded-lg">
                        <img className="w-full h-full object-cover" src="/assets/img/WhatsApp Image 2024-04-26 at 23.33.22 (2).jpeg" alt="Travel Destination" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h4 className="bg-white text-blue-600 px-3 mb-4 inline-block">What Can We Do?</h4>
                        <p className="mb-4 text-gray-600">
                            <span className="text-blue-600 font-bold">
                            Experience:</span> An excellent reputation for personal services, quality and value through extensive research and a comprehensive database backed up by ten years of experience in the travel industry. Our agents travel to the places they sell on a regular basis. They inspect the newest properties along with older properties that have undergone renovation. They continuously draw up or prepare new travel packages that best suits the customer’s needs and update the information on the tourist attraction places as well as the hiking trails or routes. We feel this is an extremely important aspect of being an above average travel consultant. It is what enables us to suggest properties that match our client's needs, and personalities.                        </p>
                        <p className="mb-4 text-gray-600">
                        <span className="text-blue-600 font-bold">Quality Service:</span> Professional customer oriented consultation providing hassle free travel. Email capabilities for convenience and prompt booking and information. Creative but persistent approach to search for the most appropriate travel arrangements and identifying the best possible value. Our travel consultants are friendly, professional, and experienced in accommodating both the seasoned traveller and those new to the world of travel. We pride ourselves in customer satisfaction. A large percentage of our bookings are from repeat clientele while much of our new business is from word of mouth recommendations.</p>
                    </div>
                </div>
                <p className="my-4 text-gray-600">
                <span className="text-blue-600 font-bold">Value:</span> With our “Know How”, and as a sales agent for almost all major international airlines, we do not only offer competitive prices to our customer, but we are also able to pass on very competitive prices and a maximum opportunity for choices and flexibility we even offer a stress free luggage arrangement for our clients. These points are represented in our logo as we aspire to give our clients the experience that always urges them to come back for more and take then to places that give them their peace of mind.
                </p>
                <h2 className="mb-1 text-blue-700 font-extrabold">
                    Our services include EVERYTHING related with tourism, such as
                </h2>
                {/* List of Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                    {[
                        "Custom Tour Packages",
                        "Private Tours",
                        "Pre-Arranged Tours",
                        "Cruise Packages",
                        "International Airline Reservations & Ticketing",
                        "Cultural Tours",
                        "Adventure Tours",
                        "Helicopter Rides",
                        "All Terrain Hiking",
                        "Special Interest Journeys",
                        "Educational Tours",
                        "Worldwide Hotel Reservations"
                    ].map((service, index) => (
                        <div key={index} className="text-gray-600 flex items-start">
                            <span className="text-blue-600 mr-2 text-lg">→</span>{service}
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default Services;

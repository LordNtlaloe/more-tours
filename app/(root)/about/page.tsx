import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function Page() {
    return (
        <div>
            {/* Page Header Start */}
            <div className="container mx-auto px-4 py-5 mb-5">
                <div className="container mx-auto py-5 my-5 text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-3">About Us</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="uppercase mb-0 flex justify-center">
                            <li className="mx-2">
                                <a className="text-blue-500 hover:underline" href="#">Home</a>
                            </li>
                            <li className="mx-2">
                                <a className="text-blue-500 hover:underline" href="#">Pages</a>
                            </li>
                            <li className="mx-2 text-blue-500">About</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}

            {/* About Section Start */}
            <div className="py-5">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Image Section */}
                        <div className="grid grid-rows-2">
                            <img
                                className="rounded w-3/4 justify-self-end"
                                src="/assets/img/WhatsApp Image 2024-04-26 at 23.33.23.jpeg"
                                alt="First image"
                            />
                            <img
                                className="rounded w-1/2 justify-self-start mt-4"
                                src="/assets/img/WhatsApp Image 2024-04-26 at 23.33.26 (1).jpeg"
                                alt="Second image"
                                style={{ marginTop: '-25%' }}
                            />
                        </div>

                        {/* Text Section */}
                        <div>
                            <p className="inline-block border rounded-full py-1 px-4 bg-blue-500 text-white">About Us</p>
                            <h1 className="text-2xl font-bold mb-4">Why You Should Trust Us? Get to Know About Us!</h1>
                            <p className="mb-4">
                                More Tours (Pty) Ltd Trading as More Tours as More Tours and Travel is a private Tour Operating Company. The company is 100% owned by two Basotho who are very patriotic and have massive interest in the Tourism Sector, they are very passionate and more interested in promoting The Kingdom of Lesotho and its Tourist attractions to the rest of the world still playing a major role in seeing to it that domestic tourism also grows as well as selling the Beauty and culture of other African Countries.
                            </p>
                        </div>
                    </div>

                    {/* Other Section */}
                    <div className="mt-1"> {/* Adjusted margin to ensure proper spacing */}
                        <p className="mb-4">
                            More Tours and Travel is Steered by a young Mosotho Woman (Mabohlokoa Pekane) who is the major shareholder in it and has been its Managing Director since its inception in 2014. She basically knows the ins and outs of this business and Tourism Industry in Lesotho and Internationally as she has been the one in the fore front to manage the company financially, administratively, Designing of the Tour packages and costing them, ground handling work, and satisfactorily taking Clients to Most places of Interest in Lesotho, South Africa, Botswana, The Kingdom of Eswatini and many more African Counties as far as Uganda.                        </p>
                        <p className="mb-4">
                            More Tours and Travel is one of the Best and leading Tour Operating Companies in the Kingdom of Lesotho and has the Best Tour guides in Lesotho who are very friendly, professional and Fluent in English. The Company also host French Speaking Tourists who have satisfactorily been guided by the Top Guides in Lesotho by More Tours and Travel.                        
                        </p>

                        {/* Services Section */}
                        <div className="flex flex-col gap-6 items-start justify-start">
                            <p className="mb-4">Our Services are based on 3 major points:</p>
                            <div>
                                <p className="mb-2">
                                    <FaCheckCircle className="inline text-blue-500 mr-2" /> Quality Experience
                                </p>
                                <p className="mb-2">
                                    <FaCheckCircle className="inline text-blue-500 mr-2" /> Quality Services
                                </p>
                                <p className="mb-2">
                                    <FaCheckCircle className="inline text-blue-500 mr-2" /> Value for Money
                                </p>
                                <a
                                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm bg-blue-500 hover:bg-blue-700 text-white mt-3"
                                    href="/services"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About Section End */}
        </div>
    );
}

import React from 'react';

export default function ContactSection() {
    return (
        <div className="py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h6 className="section-title text-blue-600 text-lg font-semibold">Contact Us</h6>
                    <h1 className="text-3xl font-bold mb-4">Contact For Any Query</h1>
                </div>
                <div className="flex flex-wrap -mx-4">
                    <div className="lg:w-1/3 px-4 mb-8">
                        <h5 className="text-xl font-semibold mb-4">Get In Touch</h5>
                        <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.</p>
                        {[
                            { icon: "fa-map-marker-alt", title: "Office", content: "123 Street, New York, USA" },
                            { icon: "fa-phone-alt", title: "Mobile", content: "+012 345 67890" },
                            { icon: "fa-envelope-open", title: "Email", content: "info@example.com" }
                        ].map(({ icon, title, content }, index) => (
                            <div className="flex items-center mb-4" key={index}>
                                <div className="flex items-center justify-center bg-blue-600 text-white rounded-full w-10 h-10">
                                    <i className={`fa ${icon}`}></i>
                                </div>
                                <div className="ml-3">
                                    <h5 className="text-blue-600 font-semibold">{title}</h5>
                                    <p className="mb-0">{content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:w-1/3 h-full px-4">
                        <iframe
                            className="rounded shadow-lg w-full"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=27.487733999999997%2C-29.316022&layer=mapnik&marker=-29.316022%2C27.487733999999997"
                            style={{ minHeight: '300px', border: 0 }}
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="lg:w-1/3 px-4 mb-8">
                        <form className="bg-white p-6 rounded shadow-md">
                            <div className="flex flex-wrap -mx-2 mb-4">
                                <div className="md:w-1/2 px-2 mb-4">
                                    <input
                                        type="text"
                                        className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="md:w-1/2 px-2 mb-4">
                                    <input
                                        type="email"
                                        className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Your Email"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Subject"
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Leave a message here"
                                    rows={4}
                                ></textarea>
                            </div>
                            <button
                                className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                                type="submit"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

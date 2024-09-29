import React from 'react';


export default function Hero() {
    return (
        <div className="bg-cover bg-center bg-no-repeat py-5 h-[85vh]" style={{ backgroundImage: "linear-gradient(rgba(20, 20, 31, .7), rgba(20, 20, 31, .7)), url(assets/img/hero/hero_bg_2_1.jpg)" }}>
            <div className="container mx-auto py-5">
                <div className="flex justify-center py-5">
                    <div className="lg:w-10/12 pt-10 mt-10 text-center">
                        <h1 className="text-5xl text-white mb-3 animate-slideInDown">Enjoy Your Vacation With Us</h1>
                        <p className="text-xl text-white mb-4 animate-slideInDown">Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum lorem sit</p>
                        <div className="relative w-3/4 mx-auto animate-slideInDown">
                            <input className="form-control border-0 rounded-full w-full py-3 pl-4 pr-5" type="text" placeholder="Eg: Thailand" />
                            <button type="button" className="bg-[#14141F] text-white rounded-full py-2 px-4 absolute -top-1 right-0 my-2 mx-1 cursor-pointer">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

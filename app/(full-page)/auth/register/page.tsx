"use client"

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

function Register() {
    const [checked, setChecked] = useState<any>(false);

    return (
        <>
            {/* <div className="flex align-items-center justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                        <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                        <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                        <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />

                        <div className="flex align-items-center justify-content-between mb-6">
                            <div className="flex align-items-center">
                                <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked}  className="mr-2" />
                                <label htmlFor="rememberme">Remember me</label>
                            </div>
                            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                        </div>

                        <Button label="Sign In" icon="pi pi-user" className="w-full" />
                    </div>
                </div>
            </div>
            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                    <section>
                        <span className="block text-6xl font-bold mb-1">Create the screens</span>
                        <div className="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
                        <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                        <Button label="Learn More" type="button" className="mr-3 p-button-raised" />
                        <Button label="Live Demo" type="button" className="p-button-outlined" />
                    </section>
                </div>
                <div className="col-12 md:col-6 overflow-hidden">
                    <img src="/demo/images/blocks/hero/hero-1.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                </div>
            </div> */}
        </>
    )
}

export default Register;
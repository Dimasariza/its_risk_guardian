'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef, useState, Fragment, useEffect } from 'react';
import Link from 'next/link';

import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Divider } from 'primereact/divider';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { NodeRef } from '@/types';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BlockUI } from 'primereact/blockui';

const LandingPage = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const menuRef = useRef<HTMLElement | null>(null);

  const toggleMenuItemClick = () => {
    setIsHidden((prevState) => !prevState);
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const [blocked, setBlocked] = useState(true);

  useEffect(() => {
      if (blocked) {
          setTimeout(() => {
              setBlocked(false);
          }, 2000);
      }
  }, [blocked]);

  return (
    <div className="surface-0 flex justify-content-center">
      <BlockUI blocked={blocked} fullScreen  template={<i className="pi pi-spin pi-cog" style={{ fontSize: '3rem' }}></i>}/>

      <div id="home" className="landing-wrapper overflow-hidden">
        <div className="p-4 lg:px-8 flex w-full align-items-center justify-content-between fixed lg:fixed z-5">
          <Link href="/" className="flex align-items-center">
            <img src={`${process.env.PUBLIC_URL}/layout/images/ITS Risk Guardian - ${layoutConfig.colorScheme === 'light' ? 'light' : 'dark'}.svg`} alt="ITS Risk Guardian Logo" height="80" className="mr-0 lg:mr-2" />
            <span className="text-900 font-medium text-2xl line-height-3 mr-8 text-center">ITS RISK GUARDIAN</span>
          </Link>
          <StyleClass nodeRef={menuRef as NodeRef} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
            <i ref={menuRef} className="pi pi-bars text-4xl cursor-pointer block lg:hidden text-700"></i>
          </StyleClass>
          <div className={classNames('align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2', { hidden: isHidden })} style={{ top: '100%' }}>
            <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
              {[
                { href: 'home', name: 'Home' },
                { href: 'features', name: 'Features' },
                { href: 'highlights', name: 'Highlights' },
                { href: 'team', name: 'Our Team' }
              ].map(({ href, name }: any, key) => (
                <li key={key}>
                  <a href={'#' + href} onClick={toggleMenuItemClick} className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                    <span>{name}</span>
                    <Ripple />
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
              <Link href="/auth/login">
                <Button label="Login" text rounded className="border-none font-light line-height-2 text-blue-500"></Button>
              </Link>
              <Link href="/auth/login">
                <Button label="Register" rounded className="border-none ml-5 font-light line-height-2 bg-blue-500 text-white"></Button>
              </Link>
            </div>
          </div>
        </div>

        <div
          id="hero"
          className="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
          style={{
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%)',
            clipPath: 'ellipse(150% 87% at 93% 13%)'
          }}
        >
          <motion.div
            className="mx-4 md:mx-8 md:mt-8 sm:mt-8 md:pt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            variants={{
              hidden: { x: -20, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1
              }
            }}
          >
            <h1 className="text-6xl font-bold text-gray-900 line-height-2">
              <span className="font-light block">Guiding You Today, </span>Empowering You Tomorrow
            </h1>
            <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700 w-8">
              ITS Risk Guardian is a web-based application designed to assist organizations in conducting risk-based inspections (RBIs). <br></br>
              ITS Risk Guardian can be used by organizations of all sizes and industries to improve their safety and risk management practices.{' '}
            </p>
            <Link href="#features">
              <Button type="button" label="Get Started" className="text-xl border-none mt-3 bg-blue-500 font-normal line-height-3 px-3 text-white"></Button>
            </Link>
          </motion.div>
          <div className="flex justify-content-center md:justify-content-end">
            <motion.img
              src={`${process.env.PUBLIC_URL || ''}/demo/images/dashboard.png`}
              alt="Dashboard Image"
              style={{ height: '23em' }}
              className="h-1 md:w-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1
                }
              }}
            />
          </div>
        </div>

        <div id="features" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">
          <div>
            <motion.div className="grid justify-content-center" variants={container} ref={ref} animate={controls} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.3 }}>
              <div className="col-12 text-center mt-8 mb-4">
                <h2 className="text-900 font-normal mb-2">Fill your curiousity</h2>
                <span className="text-600 text-2xl">Advantages of our RBI program</span>
              </div>

              {[
                { name: 'Easy to Use', desc: 'Posuere morbi leo urna molestie.', icon: <i className="pi pi-fw pi-users text-2xl text-yellow-700"></i>, color: 'bg-yellow-200' },
                { name: 'Fresh Design', desc: 'Semper risus in hendrerit.', icon: <i className="pi pi-fw pi-palette text-2xl text-cyan-700"></i>, color: 'bg-blue-200' },
                { name: 'Responsive Layout', desc: 'Nulla malesuada pellentesque elit.', icon: <i className="pi pi-fw pi-id-card text-2xl text-bluegray-700"></i>, color: 'bg-green-200' },
                { name: 'Dark Mode', desc: 'Convallis tellus id interdum velit laoreet.', icon: <i className="pi pi-fw pi-moon text-2xl text-pink-700"></i>, color: 'bg-cyan-200' },
                { name: 'Ready to Use', desc: 'Mauris sit amet massa vitae.', icon: <i className="pi pi-fw pi-shopping-cart text-2xl text-teal-700"></i>, color: 'bg-pink-200' },
                { name: 'Modern Practices', desc: 'Elementum nibh tellus molestie nunc non.', icon: <i className="pi pi-fw pi-globe text-2xl text-blue-700"></i>, color: 'bg-red-200' }
              ].map(({ name, desc, icon, color }: any, key) => (
                <motion.div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0" key={key} variants={item}>
                  <div
                    style={{
                      height: '160px',
                      padding: '2px',
                      borderRadius: '10px',
                      background: 'linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))'
                    }}
                  >
                    <div className="p-3 surface-card h-full" style={{ borderRadius: '8px' }}>
                      <div
                        className={`${color} flex align-items-center justify-content-center  mb-3`}
                        style={{
                          width: '3.5rem',
                          height: '3.5rem',
                          borderRadius: '10px'
                        }}
                      >
                        {icon}
                      </div>
                      <h5 className="mb-2 text-900">{name}</h5>
                      <span className="text-600">{desc}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div
              id="highlights"
              className="col-12 mt-8 mb-8 p-2 md:p-8"
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EFE1AF 0%, #C3DCFA 100%)'
              }}
            >
              <div className="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                <h3 className="text-gray-900 mb-2">API RBI</h3>
                <span className="text-gray-600 text-2xl">Risk Based Inspection Program</span>
                <p className="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4" style={{ maxWidth: '800px' }}>
                  “Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”
                </p>
                <img src={`${process.env.PUBLIC_URL || ''}/demo/images/dashboard.png`} style={{ height: '23rem' }} className="mt-4" alt="Company logo" />
                <Link href="/rbi-software" className="mt-5">
                  <Button label="Read More" text className="border-none font-light line-height-2 bg-blue-500 text-white"></Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div id="team" className="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">
          <div className="text-center">
            <h2 className="text-900 font-normal mb-2">Our Team</h2>
            <span className="text-600 text-2xl">This application is built by technicians who are experts in their fields so that the quality is very feasible and tested</span>
          </div>

          <div className="grid justify-content-center mt-8 align-content-center">
            {[
              {
                name: 'Ahmad Akbar Rivai',
                title: 'Asset Integrity Engineer',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
                imgSrc: 'AAR.png'
              },
              {
                name: 'Amirta Mega Prastiwi',
                title: 'Digital Marine Operation and Maintenance',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
                imgSrc: 'Amirta Mega.png'
              },
              {
                name: 'Hesti Rahmawati',
                title: 'Marine Engineering Department FTK-ITS',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
                imgSrc: 'Hesti.png'
              }
            ].map(({ name, title, desc, imgSrc }, key) => (
              <motion.div
                className="col-12 justify-content-center flex p-0 mt-4 md:col-6 md:p-3 lg:col-4 lg:pb-5 lg:mt-0"
                key={key}
                animate={controls}
                ref={ref}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1
                  }
                }}
              >
                <Card 
                  title={name} 
                  subTitle={title} 
                  header={() => <img alt="Card" src={`${process.env.PUBLIC_URL || ''}/team/image/${imgSrc}`} />} 
                  className="md:w-20rem lg:w-20rem">
                  <p className="m-0">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* <div className="grid mt-8 pb-2 md:pb-8">
                        <div className="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0" style={{ borderRadius: '8px' }}>
                            <img src="/demo/images/landing/mockup.svg" className="w-11" alt="mockup mobile" />
                        </div>

                        <div className="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
                            <div
                                className="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end"
                                style={{
                                    width: '4.2rem',
                                    height: '4.2rem',
                                    borderRadius: '10px'
                                }}
                            >
                                <i className="pi pi-fw pi-mobile text-5xl text-purple-700"></i>
                            </div>
                            <h2 className="line-height-1 text-900 text-4xl font-normal">Congue Quisque Egestas</h2>
                            <span className="text-700 text-2xl line-height-3 ml-0 md:ml-2" style={{ maxWidth: '650px' }}>
                                Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Eget aliquet nibh praesent tristique magna sit amet purus gravida. Sit amet mattis vulputate enim nulla aliquet.
                            </span>
                        </div>
                    </div>

                    <div className="grid my-8 pt-2 md:pt-8">
                        <div className="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
                            <div
                                className="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start"
                                style={{
                                    width: '4.2rem',
                                    height: '4.2rem',
                                    borderRadius: '10px'
                                }}
                            >
                                <i className="pi pi-fw pi-desktop text-5xl text-yellow-700"></i>
                            </div>
                            <h2 className="line-height-1 text-900 text-4xl font-normal">Celerisque Eu Ultrices</h2>
                            <span className="text-700 text-2xl line-height-3 mr-0 md:mr-2" style={{ maxWidth: '650px' }}>
                                Adipiscing commodo elit at imperdiet dui. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Suspendisse in est ante in. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi.
                            </span>
                        </div>

                        <div className="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0" style={{ borderRadius: '8px' }}>
                            <img src="/demo/images/landing/mockup-desktop.svg" className="w-11" alt="mockup" />
                        </div>
                    </div> */}
        </div>

        {/* <div id="pricing" className="py-4 px-4 lg:px-8 my-2 md:my-4">
                    <div className="text-center">
                        <h2 className="text-900 font-normal mb-2">Matchless Pricing</h2>
                        <span className="text-600 text-2xl">Amet consectetur adipiscing elit...</span>
                    </div>

                    <div className="grid justify-content-between mt-8 md:mt-0">
                        <div className="col-12 lg:col-4 p-0 md:p-3">
                            <div className="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all">
                                <h3 className="text-900 text-center my-5">Free</h3>
                                <img src="/demo/images/landing/free.svg" className="w-10 h-10 mx-auto" alt="free" />
                                <div className="my-5 text-center">
                                    <span className="text-5xl font-bold mr-2 text-900">$0</span>
                                    <span className="text-600">per month</span>
                                    <Button label="Get Started" rounded className="block mx-auto mt-4 border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>
                                </div>
                                <Divider className="w-full bg-surface-200"></Divider>
                                <ul className="my-5 list-none p-0 flex text-900 flex-column">
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">Responsive Layout</span>
                                    </li>
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">Unlimited Push Messages</span>
                                    </li>
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">50 Support Ticket</span>
                                    </li>
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">Free Shipping</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">
                            <div className="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all">
                                <h3 className="text-900 text-center my-5">Startup</h3>
                                <img src="/demo/images/landing/startup.svg" className="w-10 h-10 mx-auto" alt="startup" />
                                <div className="my-5 text-center">
                                    <span className="text-5xl font-bold mr-2 text-900">$1</span>
                                    <span className="text-600">per month</span>
                                    <Button label="Try Free" rounded className="block mx-auto mt-4 border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>
                                </div>
                                <Divider className="w-full bg-surface-200"></Divider>
                                <ul className="my-5 list-none p-0 flex text-900 flex-column">
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">Responsive Layout</span>
                                    </li>
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">Unlimited Push Messages</span>
                                    </li>
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">50 Support Ticket</span>
                                    </li>
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">Free Shipping</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">
                            <div className="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all">
                                <h3 className="text-900 text-center my-5">Enterprise</h3>
                                <img src="/demo/images/landing/enterprise.svg" className="w-10 h-10 mx-auto" alt="enterprise" />
                                <div className="my-5 text-center">
                                    <span className="text-5xl font-bold mr-2 text-900">$999</span>
                                    <span className="text-600">per month</span>
                                    <Button label="Get a Quote" rounded className="block mx-auto mt-4 border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>
                                </div>
                                <Divider className="w-full bg-surface-200"></Divider>
                                <ul className="my-5 list-none p-0 flex text-900 flex-column">
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">Responsive Layout</span>
                                    </li>
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">Unlimited Push Messages</span>
                                    </li>
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">50 Support Ticket</span>
                                    </li>
                                    <li className="py-2">
                                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                        <span className="text-xl line-height-3">Free Shipping</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}

        <div className="py-4 px-4 mx-0 mt-8 lg:mx-8">
          <div className="grid justify-content-between">
            <div className="col-12 md:col-2" style={{ marginTop: '-1.5rem' }}>
              <Link href="/" className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                <span className="font-medium text-2xl text-900">ITS Risk Guardian</span>
              </Link>
            </div>

            <div className="col-12 md:col-10 lg:col-7">
              <div className="grid text-center md:text-left">
                <div className="col-12 md:col-3">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Company</h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">About Us</a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">News</a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Investor Relations</a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Careers</a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">Media Kit</a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Resources</h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Get Started</a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Learn</a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">Case Studies</a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Community</h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Discord</a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Events
                    <img src={`${process.env.PUBLIC_URL || ''}/demo/images/landing/new-badge.svg`} className="ml-2" alt="badge" />
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">FAQ</a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">Blog</a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Legal</h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Brand Policy</a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Privacy Policy</a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
          <span className="font-medium mt-4 w-full flex justify-content-center align-items-center">
            <i className="pi pi-fw pi-envelope text-2xl text-red-700 mr-2"></i>Guardian@ITS.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

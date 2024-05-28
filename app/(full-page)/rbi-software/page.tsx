'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';

import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Divider } from 'primereact/divider';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { NodeRef } from '@/types';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';

const RBISoftware = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const menuRef = useRef<HTMLElement | null>(null);

  const toggleMenuItemClick = () => {
    setIsHidden((prevState) => !prevState);
  };

  return (
    <div className="surface-0  justify-content-center">
      <div id="home" className="landing-wrapper overflow-hidden">
        <div className="p-4 lg:px-8 flex w-full align-items-center justify-content-between fixed lg:fixed z-5">
          <Link href="/" className="flex align-items-center">
            <img src={`${process.env.PUBLIC_URL || ''}/layout/images/ITS Risk Guardian - ${layoutConfig.colorScheme === 'light' ? 'light' : 'dark'}.svg`} alt="ITS Risk Guardian Logo" height="80" className="mr-0 lg:mr-2" />
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

export default RBISoftware;

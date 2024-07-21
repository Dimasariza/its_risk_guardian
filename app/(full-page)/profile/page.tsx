'use client';

import InputFileUpload from '@/app/(main)/uikit/input-file';
import InputTypeText from '@/app/(main)/uikit/input-type-text';
import AppMegaMenu from '@/layout/AppMegaMenu';
import AppTopbar from '@/layout/AppTopbar';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { AppTopbarRef } from '@/types';
import { IAssetComponent } from '@/types/assetComponent';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { inputs } from './input';
import { useSelector } from 'react-redux';
import { Image } from 'primereact/image';

const url = process.env.DB_URL || 'http://localhost:8000';

function Profile() {
  const topbarRef = useRef<AppTopbarRef>(null);
  const toast = useRef<any>(null);

  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});
  const { layoutConfig, layoutState } = useContext(LayoutContext);
  const { data } = useSelector((state: any) => state.AuthReducer);

  useEffect(() => {
    setValue((prev: any) => ({...prev, ...data.user}))
  }, [])

  const containerClass = classNames('layout-wrapper', {
    'layout-overlay': true,
    'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
    'p-input-filled': layoutConfig.inputStyle === 'filled',
    'p-ripple-disabled': !layoutConfig.ripple
  });

  return (
    <>
      <div className={containerClass}>
        <AppTopbar ref={topbarRef} />
        <div className="fixed w-full" style={{ top: '5rem', zIndex: 999 }}>
          <AppMegaMenu />
        </div>
        <div className='layout-main-container'>
          <div className='layout-main'>
            <Card className="shadow-2">
              <Toast ref={toast}></Toast>
              <div className="flex mt-2">
                <div className="flex flex-wrap row-gap-2 w-6">
                  {inputs.map((props, key) => (
                    <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
                  ))}
                </div>
                <div className='flex flex-column'>
                  <span>Profile Picture</span>
                  {
                    data?.user.user_picture
                    ? <Image src={url + "/file/" + data.user.user_picture} alt="Image" width="250" />
                    : <InputFileUpload />
                  }
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { useDispatch } from 'react-redux';
import { AuthAction } from '@/redux/action/action';
import validate from './validate';
import { AuthService } from '@/service/auth/auth-service';
import axios from 'axios';

const LoginPage = () => {
  const emptyValue = {
    user_username: "",
    password: ""
  }

  const { layoutConfig } = useContext(LayoutContext);
  const toast = useRef<any>(null);
  const [value, setValue] = useState<any>(emptyValue);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

  const dispatch = useDispatch();

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(validate(value));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      setLoading(true);
      AuthService.postItem(value)
        .then((res) => {
          dispatch(AuthAction("LOGIN", res.data))
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}` // for all requests
          axios.defaults.headers.common["Content-Type"] = `application/json` // for all requests
          axios.defaults.headers.common["Accept"] = `*/*` // for all requests
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: `Login Success`
          });
          setLoading(false);
        })
        .catch(() => {
          toast.current.show({
            severity: 'danger',
            summary: 'Failed',
            detail: `Login Failed`
          });
          setLoading(false);
        });
      setValue(emptyValue);
      router.push('/assets/asset-register')
    }
  }, [error]);

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />

      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
        >
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              <img src={`${process.env.PUBLIC_URL}/layout/images/ITS Risk Guardian - ${layoutConfig.colorScheme === 'light' ? 'light' : 'dark'}.svg`} alt="ITS Risk Guardian logo" className="mb-5 w-5rem flex-shrink-0" />
              <div className="text-900 text-3xl font-medium mb-3">Welcome to ITS Risk Guardian!</div>
              <span className="text-600 font-medium">Sign in to continue</span>
            </div>

            <div>
              <label htmlFor="username" className="block text-900 text-xl font-medium mb-2">
                Username
              </label>
              <InputText id="username" type="text" placeholder="Username" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} onChange={(e) => setValue((prev : any) => ({...prev, user_username: e.target.value}))}/>

              <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                Password
              </label>
              <Password inputId="password1" value={value.password} onChange={(e) => setValue((prev : any) => ({...prev, password: e.target.value}))} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox inputId="rememberme1" checked={rememberMe} onChange={(e) => setRememberMe(e.checked ?? false)} className="mr-2"></Checkbox>
                  <label htmlFor="rememberme1">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                  Forgot password?
                </a>
              </div>
              <Button loading={loading} label="Sign In" className="w-full p-3 text-xl" onClick={handleLogin}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

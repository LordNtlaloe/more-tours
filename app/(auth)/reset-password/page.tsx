"use client"
import React, { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PasswordResetPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [complete, setComplete] = useState(false)
    const [secondFactor, setSecondFactor] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn();

    if (!isLoaded) {
        return null;
    }

    if (isSignedIn) {
        router.push('/');
    }

    // Send the password reset code to the user's email
    async function create(e: React.FormEvent) {
        e.preventDefault();
        await signIn
            ?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            .then(_ => {
                setSuccessfulCreation(true);
                setError('');
            })
            .catch(err => {
                console.error('error', err.errors[0].longMessage);
                setError(err.errors[0].longMessage);
            });
    }

    // Reset the user's password. 
    // Upon successful reset, the user will be 
    // signed in and redirected to the home page
    async function reset(e: React.FormEvent) {
        e.preventDefault();
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            .then(result => {
                // Check if 2FA is required
                if (result.status === 'needs_second_factor') {
                    setSecondFactor(true);
                    setError('');
                } else if (result.status === 'complete') {
                    // Set the active session to 
                    // the newly created session (user is now signed in)
                    setActive({ session: result.createdSessionId });
                    setComplete(true)
                    setError('');
                } else {
                    console.log(result);
                }
            })
            .catch(err => {
                console.error('error', err.errors[0].longMessage)
                setError(err.errors[0].longMessage);
            });
    }

    return (
        <div className='border p-6 rounded-[5px] shadow-xl ' >
            <h1 className='font-bold text-center my-3 border-b py-3 border-black/10 mb-6'>Forgot Password?</h1>
            <form onSubmit={!successfulCreation ? create : reset} className='flex flex-col'>
                {!successfulCreation && !complete && (
                    <>
                        <label htmlFor='email'>Please provide your <span className=' italic font-bold'>registered</span> email address</label>
                        <input
                            type='email'
                            placeholder='e.g john@doe.com'
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                                setError("")
                            }}
                            className='border my-6 py-1 px-2 rounded-[5px] mt-3'
                        />

                        <div className='grid grid-cols-2 gap-4 items-center'>
                            <button className='bg-black text-white rounded-none py-1 w-full'>Send code</button>
                            <Link href={'/sign-in'} className='w-full'>
                                <button className='bg-red-600 text-white rounded-none py-1 w-full'>Cancel</button>
                            </Link>
                        </div>


                        {error && <div>
                            <p className=' text-red-500 my-2'>{error}</p>
                            <p className='text-end'>{"Don't have an account?"}
                                <Link href={'/sign-up'}> <span className='font-bold'>
                                    Register</span>
                                </Link></p>
                        </div>}
                    </>
                )}

                {successfulCreation && !complete && (
                    <>
                        <label htmlFor='password'>Enter your new password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className='py-1 px-2 border rounded-[5px] outline-none my-1'
                            placeholder='new password...'
                        />

                        <label htmlFor='password'>Enter the password reset code that was sent to your email</label>
                        <input
                            type='text'
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            className='py-1 px-2 border rounded-[5px] outline-none my-1 w-[50%]'
                            placeholder='code...'
                        />
                        <div className='grid grid-cols-2 gap-4'>
                            <button className='bg-black text-white mt-4  px-2 py-1 rounded-[5px] w-full'>Reset Password</button>
                            <Link href={'/sign-up'}>
                                <button className='bg-red-600 text-white mt-4  px-2 py-1 rounded-[5px] w-full'>Cancel</button>
                            </Link>
                        </div>

                        {error && <p>{error}</p>}
                    </>
                )}
                {complete && (
                    <div className='flex flex-col gap-4'>
                        <h1>Success</h1>
                        <p>You have sicessfully changed your password.</p>
                        <p>You were automatically signed in with a new password</p>
                        <div className=''>
                            <Link href={'/dashboard'}>

                                <button className='bg-blue-600 text-white mt-4  px-2 py-1 rounded-[5px] w-full'>Continue to dashboard</button>

                            </Link>
                        </div>

                    </div>
                )}
                {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
            </form>
        </div>
    );
};


export default PasswordResetPage
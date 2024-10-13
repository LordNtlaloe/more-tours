import React, { useState, useEffect } from 'react'
import { saveNewTourRating, getTourById, hasUserBookedTour, getUserRatingCount } from '@/app/_actions/_tourActions'
import { showConfirmationMessage, showToastMessage } from '@/lib/generalFunctions'
import { Rate } from 'antd';
import { useClerk } from '@clerk/nextjs';
import { sendMail } from '@/app/_email/_mail';
import { Save, StarsIcon } from 'lucide-react';

export default function TourRatings({ isReadOnly, isEnabled, tour }: { isReadOnly: boolean, isEnabled: boolean, tour?: any }) {
    const [selectedValue, setSelectedValue] = useState(tour?.overallRating ?? 4);
    const [showRatingComment, setShowRatingComment] = useState(false);
    const [currentTour, setCurrentTour] = useState(tour);
    const [userCanRate, setUserCanRate] = useState(false);
    const { user } = useClerk();
    const userId = user?.id;
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const userName = user?.firstName;

    useEffect(() => {
        if (tour) {
            setSelectedValue(tour?.overallRating ?? 4);
            setCurrentTour(tour);
        }

        const checkUserRatingEligibility = async () => {
            if (userId && tour?._id) {
                const bookings = await hasUserBookedTour(userId, tour.id);
                if (bookings) {
                    const ratingCount = await getUserRatingCount(userId, tour.id);
                    setUserCanRate(bookings > ratingCount);
                }
            }
        };

        checkUserRatingEligibility();
    }, [tour, userId]);

    const saveRating = async (formData: FormData) => {
        const comment = formData.get('comment');
        if (!comment) {
            showConfirmationMessage('error', 'Please provide some rating details...');
            return null;
        }
        formData.append('tourId', currentTour.id);
        formData.append('userId', userId as string);
        formData.append('rating', selectedValue.toString());
        const result = await saveNewTourRating(formData);
        if (result && result.error) {
            showConfirmationMessage('error', result.error);
            return;
        }

        setShowRatingComment(false);
        showToastMessage('success', 'Your rating was successfully submitted.');

        const updatedTour = await getTourById(currentTour.id);
        setCurrentTour(updatedTour);

        await sendMail({
            to: userEmail as string,
            name: userName as string,
            subject: 'Rating Submitted',
            body: `<p>Dear ${userName},</p><p>Your rating for ${currentTour?.title} has been submitted successfully.</p><p>Thank you for your feedback!</p>`,
        });
    };

    return (
        <main className='p-2'>
            <div className='bg-primary/30 py-1 px-2 w-full flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Rate
                        value={selectedValue}
                        onChange={(value) => setSelectedValue(value)}
                        allowHalf={true}
                        allowClear={false}
                        style={{ color: 'orange' }}
                        disabled={isReadOnly}
                    />
                    {isEnabled && (
                        <div>
                            <h1>
                                ({(currentTour?.overallRating ?? 0).toFixed(1)}) | {currentTour?.ratingsCount} <span className='italic'>ratings</span>
                            </h1>
                        </div>
                    )}
                </div>
                {isEnabled && (
                    <div className='mr-2'>
                        {currentTour?.overallRating >= 4.5 ? (
                            <div className='bg-green-800 text-white py-1 px-2 rounded'>Excellent</div>
                        ) : currentTour?.overallRating >= 3.5 && currentTour?.overallRating < 4.5 ? (
                            <div className='bg-green-500 text-white py-1 px-2 rounded'>Very Good</div>
                        ) : currentTour?.overallRating >= 2.5 && currentTour?.overallRating < 3.5 ? (
                            <div className='bg-primary text-black py-1 px-2 rounded'>Fair</div>
                        ) : currentTour?.overallRating < 2.5 ? (
                            <div className='bg-red-600 text-white py-1 px-2 rounded'>Poor</div>
                        ) : (
                            ''
                        )}
                    </div>
                )}
            </div>
            {isEnabled && (
                <div className='flex justify-end pr-2 mt-2'>
                    <button
                        className={`transition-all flex gap-1 items-center px-2 py-1 rounded hover:border border-black/20 ${userCanRate ? 'bg-primary hover:bg-primary/70' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        onClick={() => userCanRate && setShowRatingComment(!showRatingComment)}
                        disabled={!userCanRate}
                    >
                        <StarsIcon />
                        Rate Tour
                    </button>
                </div>
            )}
            {showRatingComment && (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        await saveRating(formData);
                    }}
                    className='flex flex-col'
                >
                    <h1>
                        Rate {currentTour?.tite} <span className='bg-primary/50 px-1 rounded'>: Your Rating: {selectedValue}</span>{' '}
                    </h1>
                    <textarea name='comment' className='border rounded p-2' placeholder='your comment...' />
                    <button className='bg-primary mx-2 my-1 rounded py-1 px-2 hover:bg-primary/70 hover:border border-black/20 transition-all place-self-end mt-2 flex items-center gap-1'>
                        <Save size={16} />
                        <span>Submit Rating</span>
                    </button>
                </form>
            )}
        </main>
    )
}

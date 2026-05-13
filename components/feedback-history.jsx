'use client';

import Sidebar from "./sidbar"
import { Navbar } from "./navbar"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useMediaQuery } from 'react-responsive'
import { Star } from "lucide-react"
import { FeedbackModal } from "./feedback-modal"

const FeedbackHistory = () => {
    const { data: session } = useSession();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        setMounted(true);
        const loadFeedbacks = () => {
            try {
                const stored = localStorage.getItem('hintro_feedbacks');
                if (stored) {
                    setFeedbacks(JSON.parse(stored));
                } else {
                    setFeedbacks([]);
                }
            } catch (e) {
                console.error("Error loading feedbacks", e);
            }
        };

        loadFeedbacks();

        window.addEventListener('feedback_added', loadFeedbacks);
        return () => window.removeEventListener('feedback_added', loadFeedbacks);
    }, []);

    if (!mounted) return null;

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                            star <= rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={`flex min-h-screen bg-gray-50/50 ${isMobile ? 'flex-col' : 'grid grid-cols-[262px_1fr]'}`}>
            {!isMobile ? (
                <div className="sticky top-0 h-screen">
                    <Sidebar />
                </div>
            ) : (
                isSidebarOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
                        <div className="relative w-[262px] h-full z-50">
                            <Sidebar isMobile={isMobile} onClose={() => setIsSidebarOpen(false)} />
                        </div>
                    </div>
                )
            )}
            
            <div className="flex flex-col min-h-screen overflow-hidden flex-1 w-full">
                <Navbar isMobile={isMobile} onMenuClick={() => setIsSidebarOpen(true)} title="Feedback History" />
                <main className={`flex-1 ${isMobile ? 'p-5' : 'p-[30px]'} bg-white`}>
                    <div className={`w-full max-w-[1180px] mx-auto flex flex-col ${isMobile ? 'px-0' : 'px-8'} mt-8`}>
                        {feedbacks.length === 0 ? (
                            <div className="w-full border border-gray-200 rounded-xl bg-white flex flex-col items-center justify-center py-20 shadow-sm">
                                <h3 className="text-[15px] font-medium text-gray-900 mb-4">
                                    No feedbacks yet
                                </h3>
                                <button 
                                    onClick={() => setIsFeedbackModalOpen(true)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Give Feedback
                                </button>
                            </div>
                        ) : (
                            isMobile ? (
                                <div className="flex flex-col gap-3">
                                    {feedbacks.map((item) => (
                                        <div key={item.id} className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-[14px] font-semibold text-gray-900">{item.title}</h4>
                                                {renderStars(item.rating)}
                                            </div>
                                            <p className="text-[12px] text-gray-500 truncate">
                                                {item.description}
                                            </p>
                                            <div className="text-[11px] text-gray-400 mt-1 font-medium">
                                                <span className="text-blue-500">{item.date}</span> . {item.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                                <th className="py-4 px-6 text-[13px] font-medium text-gray-400">Title</th>
                                                <th className="py-4 px-6 text-[13px] font-medium text-gray-400">Rating</th>
                                                <th className="py-4 px-6 text-[13px] font-medium text-gray-400">Description</th>
                                                <th className="py-4 px-6 text-[13px] font-medium text-gray-400">Date</th>
                                                <th className="py-4 px-6 text-[13px] font-medium text-gray-400 text-right">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {feedbacks.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-4 px-6 text-[14px] font-medium text-gray-900">{item.title}</td>
                                                    <td className="py-4 px-6 text-[14px] text-gray-600">{item.rating}/5</td>
                                                    <td className="py-4 px-6 text-[14px] text-gray-600 truncate max-w-[300px]">
                                                        - {item.description.length > 40 ? item.description.substring(0, 40) + '...' : item.description}
                                                    </td>
                                                    <td className="py-4 px-6 text-[14px] text-gray-600">{item.date}</td>
                                                    <td className="py-4 px-6 text-[14px] text-gray-600 text-right">{item.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        )}
                    </div>
                </main>
            </div>
            
            <FeedbackModal 
                isOpen={isFeedbackModalOpen} 
                onClose={() => setIsFeedbackModalOpen(false)} 
            />
        </div>
    )
}
export default FeedbackHistory
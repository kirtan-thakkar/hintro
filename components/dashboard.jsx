'use client';

import Sidebar from "./sidbar"
import { Navbar } from "./navbar"
import { Button } from "./ui/button"
import { StatCard } from "./ui/stat-card"
import { CallItem } from "./ui/call-item"
import { PieChart, Clock, Sparkles, Calendar } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useMediaQuery } from 'react-responsive'

const Dashboard = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [statsData, setStatsData] = useState(null);
    const [callsData, setCallsData] = useState(null);
    const [userName, setUserName] = useState("{{Name}}");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!session?.user) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch profile to get user name
                const profileRes = await fetch('/api/auth/profile', {
                    headers: { 'x-user-id': session.user.id },
                });
                if (profileRes.ok) {
                    const profile = await profileRes.json();
                    setUserName(profile.firstName || "{{Name}}");
                }

                // Fetch stats
                const statsRes = await fetch('/api/call-sessions/stats', {
                    headers: { 'x-user-id': session.user.id },
                });
                if (statsRes.ok) {
                    setStatsData(await statsRes.json());
                }

                // Fetch call history
                const callsRes = await fetch('/api/call-sessions?limit=5', {
                    headers: { 'x-user-id': session.user.id },
                });
                if (callsRes.ok) {
                    setCallsData(await callsRes.json());
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [session?.user?.id]);

    const loadMoreCalls = async () => {
        if (!callsData?.pagination?.hasNextPage || !session?.user?.id) return;
        setIsLoadingMore(true);
        try {
            const nextPage = callsData.pagination.page + 1;
            const callsRes = await fetch(`/api/call-sessions?limit=5&page=${nextPage}`, {
                headers: { 'x-user-id': session.user.id },
            });
            if (callsRes.ok) {
                const data = await callsRes.json();
                setCallsData(prev => ({
                    ...data,
                    callSessions: [...(prev?.callSessions || []), ...(data.callSessions || [])]
                }));
            }
        } catch (error) {
            console.error('Failed to load more calls:', error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const groupCallsByDate = (calls) => {
        if (!calls) return {};
        const grouped = {};
        calls.forEach(call => {
            const dateObj = new Date(call.started_at);
            const day = dateObj.getDate();
            const getOrdinal = (n) => {
                if (n > 3 && n < 21) return 'th';
                switch (n % 10) {
                    case 1:  return "st";
                    case 2:  return "nd";
                    case 3:  return "rd";
                    default: return "th";
                }
            };
            const month = dateObj.toLocaleString('en-US', { month: 'long' });
            const dateStr = `${month} ${day}${getOrdinal(day)}`;

            if (!grouped[dateStr]) {
                grouped[dateStr] = [];
            }
            grouped[dateStr].push(call);
        });
        return grouped;
    };

    const formatDuration = (seconds) => {
        if (!seconds) return "0s";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (mins === 0) return `${secs}s`;
        return `${mins}m ${secs}s`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return "today";
        if (diffDays === 1) return "1 day ago";
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const stats = [
        {
            title: "Total Sessions",
            value: statsData?.totalSessions || "0",
            icon: PieChart,
            iconBgClass: "bg-red-100",
            iconColorClass: "text-red-500"
        },
        {
            title: "Average Duration",
            value: statsData?.averageDuration ? formatDuration(statsData.averageDuration) : "0",
            icon: Clock,
            iconBgClass: "bg-cyan-100",
            iconColorClass: "text-cyan-500"
        },
        {
            title: "AI Used",
            value: statsData?.totalAIInteractions || "0",
            icon: Sparkles,
            iconBgClass: "bg-green-100",
            iconColorClass: "text-green-500"
        },
        {
            title: "Last Session",
            value: statsData?.lastSession?.[0] ? formatDate(statsData.lastSession[0]) : "-",
            icon: Calendar,
            iconBgClass: "bg-purple-100",
            iconColorClass: "text-purple-500"
        }
    ];

    if (!mounted) return null;

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
                <Navbar isMobile={isMobile} onMenuClick={() => setIsSidebarOpen(true)} />
                <main className={`flex-1 ${isMobile ? 'p-5' : 'p-[30px]'} bg-white`}>
                    <div className={`w-full max-w-[1180px] mx-auto flex ${isMobile ? 'flex-col gap-4' : 'items-start justify-between px-8'}`}>
                        <div className="flex flex-col gap-1 ">
                            <h2 className={`${isMobile ? 'text-[18px]' : 'text-[22px]'} font-bold text-gray-900 tracking-tight flex items-center`}>
                                Hi, {userName} 👋 Welcome to Hintro
                            </h2>
                            <p className={`${isMobile ? 'text-[12px]' : 'text-[13px]'} text-gray-600`}>
                                Ready to make your next call smarter ?
                            </p>
                        </div>
                        
                        <Button variant={isMobile ? "default" : "primary"} className={`h-10 rounded-md ${isMobile ? 'w-25 text-xs bg-black text-white hover:bg-gray-800' : 'px-5 text-sm'}`}>
                            Start Call
                        </Button>
                    </div>

                    <div className={`w-full ${isMobile ? 'mt-6' : 'mt-7.5 px-8'}`}>
                        <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
                            {stats.map((stat, index) => (
                                <StatCard 
                                    key={index}
                                    title={stat.title}
                                    value={stat.value}
                                    icon={stat.icon}
                                    iconBgClass={stat.iconBgClass}
                                    iconColorClass={stat.iconColorClass}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={`w-full ${isMobile ? 'mt-8' : 'mt-10 px-8'} flex flex-col items-center`}>
                        <h3 className={`${isMobile ? 'text-[16px] text-center' : 'text-xl text-center'} font-medium text-gray-900 mb-3.5 w-full max-w-[802px]`}>
                            Recent calls
                        </h3>
                        
                        {loading ? (
                            <div className="w-full max-w-[802px] h-[219px] border border-neutral-200 rounded-2xl bg-white flex items-center justify-center">
                                <p className="text-gray-500">Loading...</p>
                            </div>
                        ) : callsData?.callSessions && callsData.callSessions.length > 0 ? (
                            <div className="w-full max-w-[802px] space-y-4 pb-10">
                                {Object.entries(groupCallsByDate(callsData.callSessions)).map(([date, calls]) => (
                                    <div key={date} className="flex flex-col">
                                        <h4 className="text-[13px] font-medium text-gray-400 mb-2 px-2">{date}</h4>
                                        <div className="flex flex-col border border-transparent">
                                            {calls.map((call) => (
                                                <CallItem
                                                    key={call._id}
                                                    initial={call.client?.[0] || "D"}
                                                    title={call.description || call.client}
                                                    time={formatTime(call.started_at)}
                                                    interactions={call.ai_interactions}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {callsData.pagination?.hasNextPage && (
                                    <div className="flex justify-center mt-4 pt-2">
                                        <Button 
                                            variant="outline" 
                                            onClick={loadMoreCalls} 
                                            disabled={isLoadingMore}
                                            className="text-sm px-6 py-2 border-gray-300 text-gray-600 hover:bg-gray-50"
                                        >
                                            {isLoadingMore ? "Loading..." : "Load More"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="w-full max-w-[802px] h-[219px] border border-neutral-200 rounded-2xl bg-white flex flex-col items-center justify-center p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
                                    <Calendar className="w-5 h-5 text-indigo-500" />
                                </div>
                                
                                <h4 className="text-md font-medium text-gray-900 mb-1.5">
                                    No Recent Calls
                                </h4>
                                
                                <p className="text-[12px] text-gray-500 text-center max-w-[380px] leading-relaxed mb-5">
                                    Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
                                </p>
                                
                                <Button variant="outline" className="h-[34px] text-[12px] font-medium px-4">
                                    Start a Call
                                </Button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Dashboard
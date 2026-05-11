import Sidebar from "./sidbar"
import { Navbar } from "./navbar"
import { Button } from "./ui/button"
import { StatCard } from "./ui/stat-card"
import { PieChart, Clock, Sparkles, Calendar } from "lucide-react"

const Dashboard = () => {
    const userName = "{{Name}}";
    const stats = [
        {
            title: "Total Sessions",
            value: "0",
            icon: PieChart,
            iconBgClass: "bg-red-100",
            iconColorClass: "text-red-500"
        },
        {
            title: "Average Duration",
            value: "0",
            icon: Clock,
            iconBgClass: "bg-cyan-100",
            iconColorClass: "text-cyan-500"
        },
        {
            title: "AI Used",
            value: "0",
            icon: Sparkles,
            iconBgClass: "bg-green-100",
            iconColorClass: "text-green-500"
        },
        {
            title: "Last Session",
            value: "-",
            icon: Calendar,
            iconBgClass: "bg-purple-100",
            iconColorClass: "text-purple-500"
        }
    ];

    return (
        <div className="grid grid-cols-[262px_1fr] min-h-screen bg-gray-50/50">
            <div className="sticky top-0 h-screen">
                <Sidebar />
            </div>
            <div className="flex flex-col min-h-screen overflow-hidden">
                <Navbar />
                <main className="flex-1 p-[30px] bg-white">
                    <div className="w-full max-w-[1180px] mx-auto flex items-start justify-between px-8">
                        <div className="flex flex-col gap-1 ">
                            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight flex items-center">
                                Hi, {userName} 👋 Welcome to Hintro
                            </h2>
                            <p className="text-[13px] text-gray-600">
                                Ready to make your next call smarter ?
                            </p>
                        </div>
                        
                        <Button variant="primary" className="h-[40px] px-5 rounded-md text-sm">
                            Start New Call
                        </Button>
                    </div>

                    <div className="w-full mt-[30px] px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                </main>
            </div>
        </div>
    )
}
export default Dashboard
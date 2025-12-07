import React, { useState, useRef, useEffect } from 'react';
import { Download, Share2, Volume2, VolumeX, RotateCcw, Sparkles, TrendingUp, Users, Award, Zap, X } from 'lucide-react';

// --- Data ---
const slides = [
    {
        id: 1,
        theme: "intro",
        title: "2025 Wasn't Just A Year.",
        subtitle: "It was a movement.",
        footer: "Ready to see how we built the future?",
        bgColor: "bg-emerald-950",
        bgImage: "/wrapped-backgrounds/bg1.jpg"
    },
    {
        id: 2,
        theme: "stat",
        label: "Community GDP",
        value: 1179340,
        prefix: "$",
        subtext: "That's not paper gains.",
        highlight: "That's Real Earned Income.",
        growth: "+179% from January",
        bgColor: "bg-emerald-900",
        bgImage: "/wrapped-backgrounds/bg6.jpg",
        chartImage: "/gdp-chart.jpg"
    },
    {
        id: 3,
        theme: "milestone",
        title: "The Million Dollar Moment",
        month: "August",
        achievement: "Crossed $1M GDP",
        desc: "From $422K in January to over $1M in 8 months. Nigeria built different.",
        bgColor: "bg-gradient-to-br from-green-800 to-emerald-900",
        bgImage: "/wrapped-backgrounds/bg7.jpg",
        chartImage: "/milestone-chart.jpg"
    },
    {
        id: 4,
        theme: "stat",
        label: "Money Moves",
        value: 426500,
        prefix: "$",
        subtext: "Grants Distributed",
        solanaLogo: "/solana-foundation.png",
        checklist: [
            "$464,904 in Bounties",
            "$190,465 in Hackathon Prizes"
        ],
        bgColor: "bg-green-900",
        bgImage: "/wrapped-backgrounds/bg8.jpg"
    },
    {
        id: 5,
        theme: "list",
        title: "Top Builders",
        subtitle: "These projects dominated 2025.",
        items: [
            { name: "Ribh Finance", desc: "$12M+ Cross-Border Payments", icon: "👑" },
            { name: "UseAzza", desc: "$4.9M On-Chain Volume", icon: "🥈" },
            { name: "GetCryptonia", desc: "$500K+ Processed", icon: "🥉" }
        ],
        bgColor: "bg-teal-900",
        bgImage: "/wrapped-backgrounds/bg9.jpg",
        topImage: "/medals.png"
    },
    {
        id: 6,
        theme: "hackathon",
        title: "Hackathon Dominance",
        stats: [
            { label: "Redacted Hackathon", value: "45 Wins", desc: "Most wins globally" },
            { label: "Breakout Hackathon", value: "175 Submissions", desc: "Ranked #2 globally" },
            { label: "Cypherpunk", value: "166 Submissions", desc: "Ranked #2 globally" }
        ],
        bgColor: "bg-emerald-950",
        bgImage: "/wrapped-backgrounds/bg2.jpg"
    },
    {
        id: 7,
        theme: "growth",
        title: "Community Growth",
        metrics: [
            { label: "X Followers", start: "27.4K", end: "35.9K", growth: "+31%" },
            { label: "Discord Users", start: "7,000", end: "11,095", growth: "+59%" },
            { label: "Contributors", start: "201", end: "530", growth: "+164%" },
            { label: "Members", start: "0", end: "205", growth: "New!" }
        ],
        bgColor: "bg-green-950",
        bgImage: "/wrapped-backgrounds/bg3.jpg"
    },
    {
        id: 8,
        theme: "events",
        title: "We Didn't Just Talk. We Showed Up.",
        bigStat: "92,700",
        label: "Total Event Attendees",
        breakdown: "16,900 IRL • 75,800 Virtual • 2,800 Events Hosted",
        bgColor: "bg-teal-950",
        bgImage: "/wrapped-backgrounds/bg4.jpg"
    },
    {
        id: 9,
        theme: "epic",
        title: "Epic Moments",
        moments: [
            "🏛️ Met with Minister of Youth Development",
            "🎤 Spoke at National Assembly",
            "🌍 Startup Village - 900+ Builders, 5 Days",
            "🇿🇦 APEX Cape Town - 25 Founders Sponsored"
        ],
        bgColor: "bg-gradient-to-br from-emerald-900 to-teal-900",
        bgImage: "/wrapped-backgrounds/bg5.jpg"
    },
    {
        id: 10,
        theme: "collab",
        title: "Power Move",
        collab1: "SuperteamNG",
        collab2: "Ministry of Youth",
        desc: "17 Startups Funded. ₦17M Total.",
        verdict: "NiYA Startup Pitch 1.0",
        bgColor: "bg-green-800",
        bgImage: "/wrapped-backgrounds/bg6.jpg"
    },
    {
        id: 11,
        theme: "nationwide",
        title: "From Lagos to Maiduguri",
        stat: "29 States",
        desc: "Ecosystem calls, build stops, workshops, and mixers across Nigeria. No state left behind.",
        bgColor: "bg-emerald-800",
        bgImage: "/wrapped-backgrounds/bg7.jpg"
    },
    {
        id: 12,
        theme: "summit",
        title: "Solana Summit Africa",
        location: "Abuja, November 2025",
        highlight: "Minister's Keynote + Policy Makers + 500+ Builders",
        desc: "The biggest Solana gathering on the continent.",
        bgColor: "bg-gradient-to-br from-green-700 to-teal-700",
        bgImage: "/wrapped-backgrounds/bg8.jpg",
        eventImage: "/solana-summit.jpg"
    },
    {
        id: 13,
        theme: "summary",
        title: "SuperteamNG 2025 Wrapped",
        stats: [
            { label: "Total GDP", value: "$1,179,340" },
            { label: "Growth Rate", value: "+179%" },
            { label: "Top Project", value: "Ribh Finance ($12M)" },
            { label: "Global Rank", value: "Top 2% Hackathons" },
            { label: "Event Attendees", value: "92,700" },
            { label: "States Reached", value: "29 of 36" },
            { label: "Vibe Check", value: "UNSTOPPABLE" }
        ],
        footer: "#SuperteamNGWrapped #Built2025",
        bgColor: "bg-gradient-to-br from-green-600 via-emerald-600 to-teal-500",
        bgImage: "/wrapped-backgrounds/bg9.jpg"
    }
];

// --- Components ---

const CountUp = ({ end, duration = 2000, prefix = "", suffix = "" }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(ease * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const Particles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`
                    }}
                />
            ))}
        </div>
    );
};

export default function Wrapped2025({ onClose }: { onClose?: () => void }) {
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);
    
    // Audio Handling
    useEffect(() => {
        const handleFirstClick = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(e => console.log('Audio play failed:', e));
            }
            document.removeEventListener('click', handleFirstClick);
        };
        document.addEventListener('click', handleFirstClick);
        return () => document.removeEventListener('click', handleFirstClick);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Auto-play
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && current < slides.length - 1) {
            interval = setInterval(() => {
                setCurrent(prev => prev + 1);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, current]);

    // 3D Tilt Effect for Desktop
    useEffect(() => {
        const card = slideRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth < 768) return; // Disable on mobile
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
        };

        const handleMouseLeave = () => {
             if (card) card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave); // Actually needs to be on the container, but global is okay for this effect
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);


    const nextSlide = () => {
        if (current < slides.length - 1) setCurrent(current + 1);
    };

    const prevSlide = () => {
        if (current > 0) setCurrent(current - 1);
    };

    const handleRestart = () => {
        setCurrent(0);
        setShowShare(false);
    };

    const toggleAudio = () => setIsPlaying(!isPlaying);
    const handleShare = () => setShowShare(!showShare);

    const shareToSocial = (platform: string) => {
        const text = `SuperteamNG grew from $422K to $1.17M GDP in 2025! 🚀 45 hackathon wins, 92K+ event attendees, 29 states reached. Nigeria is building the future on Solana. #SuperteamNGWrapped #Built2025`;
        const url = window.location.href;
        
        const shareUrls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
        setShowShare(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
        setShowShare(false);
    };

    const AudioBars = () => (
        <div className="flex gap-1 h-6 items-end">
            {[...Array(5)].map((_, i) => (
                <div key={i} 
                     className={`w-1 bg-white rounded-full ${isPlaying ? 'bar-animation' : 'opacity-50'}`}
                     style={{animationDelay: `${i * 0.1}s`, height: isPlaying ? '100%' : '30%'}}>
                </div>
            ))}
        </div>
    );

    const slide = slides[current];

    // Determine animation class based on index
    const getAnimationClass = (index: number) => {
        if (index === 0) return 'slide-enter'; // Default for first slide
        return index % 2 === 0 ? 'card-enter-right' : 'card-enter-left';
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] font-sans text-white overflow-hidden">
            {/* Desktop Background (Colored with Image) */}
            <div className="absolute inset-0 hidden md:block transition-all duration-700">
                <div className={`absolute inset-0 ${slide.bgColor} opacity-80 z-10`} />
                {slide.bgImage && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
                        style={{ backgroundImage: `url(${slide.bgImage})` }}
                    />
                )}
            </div>
            
            {/* Mobile Background (Black) */}
            <div className="absolute inset-0 md:hidden bg-[#121212]" />

            <audio ref={audioRef} loop preload="auto">
                <source src="/ryan-grayscale-mp3_hall-of-fame-the-script-ryangrayscale.mp3" type="audio/mpeg" />
            </audio>

            <style>{`
                /* Animations */
                .slide-enter { animation: slideIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                @keyframes slideIn {
                    from { opacity: 0; transform: scale(0.95) translateY(30px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }

                /* New Card Animations */
                .card-enter-left { animation: flyInLeft 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                @keyframes flyInLeft {
                    from { opacity: 0; transform: translateY(100vh) rotate(-15deg); }
                    to { opacity: 1; transform: translateY(0) rotate(0deg); }
                }

                .card-enter-right { animation: flyInRight 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                @keyframes flyInRight {
                    from { opacity: 0; transform: translateY(100vh) rotate(15deg); }
                    to { opacity: 1; transform: translateY(0) rotate(0deg); }
                }

                .stagger-1 { animation: fadeInUp 0.6s ease-out 0.1s backwards; }
                .stagger-2 { animation: fadeInUp 0.6s ease-out 0.2s backwards; }
                .stagger-3 { animation: fadeInUp 0.6s ease-out 0.3s backwards; }
                .stagger-4 { animation: fadeInUp 0.6s ease-out 0.4s backwards; }
                .stagger-5 { animation: fadeInUp 0.6s ease-out 0.5s backwards; }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .bar-animation { animation: bounce 0.8s infinite ease-in-out; }
                @keyframes bounce {
                    0%, 100% { height: 20%; }
                    50% { height: 100%; }
                }

                .glowing-text { 
                    text-shadow: 0 0 30px rgba(255, 255, 255, 0.4); 
                }
                
                .text-shadow-sm {
                    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                }
                
                .text-shadow-md {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }

                .pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(0.98); }
                }

                .float { animation: float 4s ease-in-out infinite; }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }

                .sparkle { animation: sparkle 2s ease-in-out infinite; }
                @keyframes sparkle {
                    0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
                    50% { opacity: 0.5; transform: scale(1.2) rotate(180deg); }
                }

                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-progress {
                    animation: progress 5s linear forwards;
                }

                .doodle-bg {
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    mask-image: linear-gradient(to bottom, black, transparent);
                    animation: drift 20s linear infinite;
                }
                @keyframes drift {
                    from { background-position: 0 0; }
                    to { background-position: 60px 60px; }
                }

                /* Fanned Card Stack */
                .fanned-card {
                    position: absolute;
                    inset: 0;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 40px;
                    transform-origin: bottom center;
                    transition: all 0.5s ease-out;
                }
                
                /* Radar Animation */
                .radar-scan {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 200%;
                    height: 200%;
                    transform: translate(-50%, -50%);
                    background: conic-gradient(from 0deg, transparent 0deg, rgba(16, 185, 129, 0.1) 60deg, transparent 60deg);
                    animation: radar-spin 4s linear infinite;
                    pointer-events: none;
                    border-radius: 50%;
                }
                @keyframes radar-spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }

                @keyframes float-particle {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    20% { opacity: 0.5; }
                    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
                }
            `}</style>

            {/* Top Controls */}
            <div className="absolute top-0 left-0 w-full p-6 z-50 flex flex-col gap-4">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-[60]"
                    aria-label="Close"
                >
                    <X size={24} className="text-white" />
                </button>

                {/* Progress Bars */}
                <div className="flex gap-2 w-full max-w-lg mx-auto">
                    {slides.map((s, idx) => (
                        <div key={s.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] ${
                                    idx < current ? 'w-full' : 
                                    idx === current && isPlaying ? 'animate-progress' : 
                                    idx === current ? 'w-0' : 'w-0'
                                }`}
                                style={{
                                    animationPlayState: idx === current && isPlaying ? 'running' : 'paused'
                                }}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center w-full max-w-lg mx-auto">
                    <button onClick={handleRestart} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Restart">
                        <RotateCcw size={20} className="text-white/70" />
                    </button>
                    <div className="flex gap-2">
                        <button onClick={toggleAudio} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Toggle audio">
                            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </button>
                        <button onClick={handleShare} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Share">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Click Areas for Navigation */}
            <div className="absolute left-0 top-0 h-full w-1/3 z-40 cursor-w-resize" onClick={prevSlide}></div>
            <div className="absolute right-0 top-0 h-full w-2/3 z-40 cursor-e-resize" onClick={nextSlide}></div>

            {/* Main Card Container */}
            <div key={current} className={`relative z-10 w-full max-w-[420px] md:max-w-md aspect-[9/16] max-h-[85vh] flex flex-col perspective-container ${getAnimationClass(current)}`}>
                
                {/* Intro Slide: Fanned Cards Background */}
                {slide.theme === 'intro' && (
                    <>
                        <div className="fanned-card" style={{ transform: 'rotate(-15deg) translateX(-40px) translateY(10px)', zIndex: -3 }}></div>
                        <div className="fanned-card" style={{ transform: 'rotate(-10deg) translateX(-25px) translateY(5px)', zIndex: -2 }}></div>
                        <div className="fanned-card" style={{ transform: 'rotate(-5deg) translateX(-10px)', zIndex: -1 }}></div>
                    </>
                )}

                <div 
                    ref={slideRef}
                    className={`
                        w-full h-full 
                        rounded-[40px] md:rounded-3xl 
                        p-8 
                        relative overflow-hidden flex flex-col 
                        shadow-[0_20px_50px_rgba(0,0,0,0.5)] 
                        transition-all duration-700
                        bg-transparent md:bg-white/10 md:backdrop-blur-xl md:border md:border-white/20
                        transform-style-3d
                    `}
                >
                    
                    {/* Mobile Card Background (Colored with Image) */}
                    <div className="absolute inset-0 md:hidden transition-all duration-700">
                        <div className={`absolute inset-0 ${slide.bgColor} opacity-90 z-10`} />
                        {slide.bgImage && (
                            <div 
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.bgImage})` }}
                            />
                        )}
                    </div>

                    {/* Doodle Background Overlay */}
                    <div className="absolute inset-0 doodle-bg opacity-20 pointer-events-none mix-blend-overlay z-20"></div>
                    
                    {/* Radar Effect for Intro */}
                    {slide.theme === 'intro' && <div className="radar-scan z-20"></div>}

                    {/* Particles for specific slides */}
                    {(slide.theme === 'milestone' || slide.theme === 'summary' || slide.theme === 'intro') && <Particles />}

                    {/* Content Wrapper */}
                    <div className="relative z-30 flex-1 flex flex-col">
                        
                        {/* Card Header */}
                        <div className="flex justify-between items-center mb-8 stagger-1">
                            {slide.theme === 'intro' ? (
                                <img src="/logo.svg" alt="SuperteamNG" className="h-8 w-auto drop-shadow-lg" />
                            ) : (
                                <h3 className="text-[10px] font-black tracking-[0.2em] text-white/80 uppercase text-shadow-sm">SUPERTEAMNG 2025</h3>
                            )}
                            <AudioBars />
                        </div>

                        {/* Slide Content */}
                        <div className="flex-1 flex flex-col justify-center items-center text-center">
                            
                            {slide.theme === 'intro' && (
                                <>
                                    <h1 className="text-6xl md:text-7xl font-black mb-6 leading-none tracking-tighter float stagger-2 drop-shadow-xl">
                                        2025<br/>
                                        <span className="text-4xl md:text-5xl font-bold text-white/90">Wasn't Just A Year.</span>
                                    </h1>
                                    <div className="bg-emerald-500/20 px-6 py-3 rounded-full backdrop-blur-md border border-emerald-500/30 mb-12 stagger-3 shadow-lg">
                                        <p className="text-xl md:text-2xl text-emerald-300 font-bold tracking-wide text-shadow-sm">It was a movement.</p>
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-[0.3em] pulse-slow text-white/70 stagger-4 text-shadow-sm">{slide.footer}</p>
                                </>
                            )}

                            {slide.theme === 'stat' && (

                                <div className="w-full">
                                    {slide.solanaLogo && (
                                        <div className="w-full mb-6 stagger-1 transform hover:scale-105 transition-all duration-500">
                                            <div className="p-1 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                                <img 
                                                    src={slide.solanaLogo} 
                                                    alt="Solana Foundation" 
                                                    className="w-full h-auto object-contain rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-lg font-bold text-emerald-200 mb-4 uppercase tracking-wider stagger-2 text-shadow-sm">{slide.label}</p>
                                    <h1 className="text-6xl font-black mb-6 glowing-text tracking-tighter stagger-3 drop-shadow-xl">
                                        <CountUp end={slide.value ?? 0} prefix={slide.prefix} />
                                    </h1>
                                    {slide.growth && <div className="inline-block bg-white/20 px-4 py-1 rounded-full mb-6 stagger-4 backdrop-blur-sm border border-white/10"><p className="text-sm font-bold text-white text-shadow-sm">{slide.growth}</p></div>}
                                    
                                    {slide.chartImage && (
                                        <div className="w-full mb-6 stagger-4 transform hover:scale-105 transition-all duration-500">
                                            <div className="p-1 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                                <img 
                                                    src={slide.chartImage} 
                                                    alt="Growth Chart" 
                                                    className="w-full h-auto object-contain rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {slide.checklist && (
                                        <div className="bg-black/40 p-4 rounded-2xl backdrop-blur-sm mb-6 border border-white/10 stagger-4 shadow-lg w-full max-w-sm mx-auto">
                                            <div className="flex flex-col gap-3">
                                                {slide.checklist.map((item: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-3 text-left bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors">
                                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
                                                            <span className="text-green-400 text-sm font-bold">✓</span>
                                                        </div>
                                                        <span className="text-base font-bold text-white text-shadow-sm leading-tight">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3 stagger-5">
                                        <p className="text-2xl font-bold leading-tight text-white text-shadow-md">{slide.subtext}</p>
                                        <p className="text-2xl font-bold text-emerald-200 leading-tight text-shadow-md">{slide.highlight}</p>
                                    </div>
                                </div>
                            )}

                            {slide.theme === 'milestone' && (
                                <>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/20 rounded-full blur-3xl opacity-30 pulse-slow"></div>
                                    <Sparkles className="mx-auto mb-2 sparkle text-yellow-300 stagger-2 drop-shadow-lg" size={32} />
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300 mb-1 stagger-3 text-shadow-sm">{slide.month}</p>
                                    <h1 className="text-lg md:text-xl font-bold text-white/90 mb-1 relative z-10 stagger-4 drop-shadow-lg leading-tight">{slide.title}</h1>
                                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 glowing-text relative z-10 stagger-5 drop-shadow-xl leading-none">{slide.achievement}</h2>
                                    
                                    {slide.chartImage && (
                                        <div className="w-full mb-4 relative z-10 stagger-5 transform hover:scale-105 transition-all duration-500">
                                            <div className="p-1 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                                <img 
                                                    src={slide.chartImage} 
                                                    alt="Milestone Chart" 
                                                    className="w-full h-auto object-contain rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-sm text-white/90 font-medium relative z-10 max-w-xs mx-auto leading-relaxed stagger-5 text-shadow-md">{slide.desc}</p>
                                </>
                            )}

                            {slide.theme === 'list' && (
                                <div className="w-full text-left">
                                    {slide.topImage && (
                                        <div className="flex justify-center mb-6 stagger-1">
                                            <img src={slide.topImage} alt="Medals" className="h-40 w-auto drop-shadow-2xl float" />
                                        </div>
                                    )}
                                    <h2 className="text-4xl font-black mb-2 stagger-2 drop-shadow-lg">{slide.title}</h2>
                                    <p className="text-white/80 mb-8 text-lg font-medium stagger-3 text-shadow-sm">{slide.subtitle}</p>
                                    <div className="space-y-4">
                                        {slide.items && slide.items.map((item: any, i: number) => (
                                            <div key={i} className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl hover:bg-black/50 transition-all transform hover:scale-105 border border-white/10 backdrop-blur-sm" style={{ animation: `fadeInUp 0.6s ease-out ${0.4 + i * 0.1}s backwards` }}>
                                                <div className="text-4xl drop-shadow-md">{item.icon}</div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-xl text-white text-shadow-sm">{item.name}</h3>
                                                    <p className="text-emerald-200 text-sm font-bold mt-1 text-shadow-sm">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {slide.theme === 'hackathon' && (
                                <div className="w-full">
                                    <h2 className="text-4xl font-black mb-10 stagger-2 drop-shadow-lg">{slide.title}</h2>
                                    <div className="space-y-4">
                                        {slide.stats && slide.stats.map((stat: any, i: number) => (
                                            <div key={i} className="bg-black/40 p-5 rounded-2xl border border-white/10 text-left backdrop-blur-sm" style={{ animation: `fadeInUp 0.6s ease-out ${0.3 + i * 0.1}s backwards` }}>
                                                <p className="text-xs text-white/70 uppercase tracking-wider mb-2 font-bold text-shadow-sm">{stat.label}</p>
                                                <h3 className="text-3xl font-black text-white mb-1 drop-shadow-md">{stat.value}</h3>
                                                <p className="text-sm text-emerald-200 font-bold text-shadow-sm">{stat.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {slide.theme === 'growth' && (
                                <div className="w-full">
                                    <h2 className="text-4xl font-black mb-8 stagger-2 drop-shadow-lg">{slide.title}</h2>
                                    <div className="space-y-4">
                                        {slide.metrics && slide.metrics.map((metric: any, i: number) => (
                                            <div key={i} className="bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-sm" style={{ animation: `fadeInUp 0.6s ease-out ${0.3 + i * 0.1}s backwards` }}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <p className="text-xs text-white/70 uppercase tracking-wider font-bold text-shadow-sm">{metric.label}</p>
                                                    <span className="text-sm text-emerald-300 font-bold bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/30 shadow-sm">{metric.growth}</span>
                                                </div>
                                                <div className="flex items-baseline gap-3">
                                                    <span className="text-xl font-bold text-white/60 text-shadow-sm">{metric.start}</span>
                                                    <span className="text-white/40">→</span>
                                                    <span className="text-3xl font-black text-white drop-shadow-md">{metric.end}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {slide.theme === 'events' && (
                                <>
                                    <h2 className="text-3xl font-bold mb-8 stagger-2 drop-shadow-lg">{slide.title}</h2>
                                    <h1 className="text-7xl font-black mb-4 glowing-text stagger-3 drop-shadow-2xl">
                                        <CountUp end={92700} />
                                    </h1>
                                    <p className="text-2xl font-bold text-emerald-200 mb-8 stagger-4 text-shadow-md">{slide.label}</p>
                                    <div className="bg-black/40 px-6 py-4 rounded-2xl stagger-5 backdrop-blur-sm border border-white/10">
                                        <p className="text-sm font-bold text-white/90 text-shadow-sm">{slide.breakdown}</p>
                                    </div>
                                </>
                            )}

                            {slide.theme === 'epic' && (
                                <div className="w-full">
                                    <h2 className="text-4xl font-black mb-10 stagger-2 drop-shadow-lg">{slide.title}</h2>
                                    <div className="space-y-4">
                                        {slide.moments && slide.moments.map((moment: string, i: number) => (
                                            <div key={i} className="bg-black/40 p-5 rounded-2xl border border-white/10 text-lg font-bold hover:bg-black/50 transition-all text-left backdrop-blur-sm text-shadow-sm" style={{ animation: `fadeInUp 0.6s ease-out ${0.3 + i * 0.1}s backwards` }}>
                                                {moment}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {slide.theme === 'collab' && (
                                <>
                                    <h2 className="text-sm font-bold mb-12 text-white/70 uppercase tracking-widest stagger-2 text-shadow-sm">{slide.title}</h2>
                                    <div className="flex items-center justify-center gap-4 mb-12 stagger-3">
                                        <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center border-4 border-white/20 font-bold text-xs p-3 shadow-xl backdrop-blur-md">
                                            <span className="text-center font-black">SuperteamNG</span>
                                        </div>
                                        <span className="text-2xl font-black text-white/60 drop-shadow-md">×</span>
                                        <div className="w-24 h-24 bg-green-700 rounded-full flex items-center justify-center border-4 border-white/20 font-bold text-xs p-3 text-center shadow-xl backdrop-blur-md">
                                            Ministry of Youth
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black mb-4 stagger-4 drop-shadow-lg">{slide.desc}</h3>
                                    <p className="text-emerald-200 font-bold mt-4 uppercase tracking-wider text-sm stagger-5 text-shadow-sm">{slide.verdict}</p>
                                </>
                            )}

                            {slide.theme === 'nationwide' && (
                                <>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/10 rounded-full blur-3xl opacity-30 pulse-slow"></div>
                                    <h2 className="text-3xl font-bold mb-8 relative z-10 stagger-2 drop-shadow-lg">{slide.title}</h2>
                                    <h1 className="text-8xl font-black mb-6 text-white glowing-text relative z-10 stagger-3 drop-shadow-2xl">{slide.stat}</h1>
                                    <p className="text-xl text-white/90 font-bold relative z-10 max-w-xs mx-auto leading-relaxed stagger-4 text-shadow-md">{slide.desc}</p>
                                </>
                            )}

                            {slide.theme === 'summit' && (
                                <>
                                    <h1 className="text-3xl md:text-4xl font-black mb-2 stagger-2 drop-shadow-xl">{slide.title}</h1>
                                    <p className="text-lg text-emerald-200 font-bold mb-4 stagger-3 text-shadow-md">{slide.location}</p>
                                    
                                    {slide.eventImage && (
                                        <div className="w-full mb-6 stagger-4 transform rotate-1 hover:rotate-0 transition-all duration-500">
                                            <div className="p-1 bg-white/20 rounded-2xl backdrop-blur-sm">
                                                <img 
                                                    src={slide.eventImage} 
                                                    alt="Solana Summit" 
                                                    className="w-full h-48 object-cover rounded-xl shadow-2xl"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-black/40 p-4 rounded-2xl backdrop-blur-sm mb-6 border border-white/10 stagger-4 shadow-lg w-full">
                                        <div className="flex flex-col gap-3">
                                            {slide.highlight?.split(' + ')?.map((item: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3 text-left bg-white/5 p-2 rounded-lg">
                                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                                        <span className="text-green-400 text-xs">✓</span>
                                                    </div>
                                                    <span className="text-lg font-bold text-white text-shadow-sm leading-tight">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-base text-white/90 font-bold stagger-5 text-shadow-sm">{slide.desc}</p>
                                </>
                            )}

                            {slide.theme === 'summary' && (
                                <div className="bg-black/80 p-4 rounded-none border-4 border-white shadow-2xl my-0 backdrop-blur-md w-full h-full flex flex-col">
                                    <div className="flex justify-between items-end mb-2 stagger-1 shrink-0">
                                        <h1 className="text-2xl font-black italic drop-shadow-lg">2025 WRAPPED</h1>
                                        <div className="relative w-12 h-12 flex items-center justify-center">
                                            <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                                            <img src="/logo.svg" alt="Superteam Logo" className="w-8 h-8 object-contain drop-shadow-lg" />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 mb-2 flex-1 overflow-y-auto custom-scrollbar min-h-0">
                                        {slide.stats && slide.stats.map((stat: any, i: number) => (
                                            <div key={i} className="flex justify-between items-center border-b border-white/20 pb-1" style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + i * 0.1}s backwards` }}>
                                                <span className="text-white/70 text-xs font-bold uppercase tracking-wide text-shadow-sm">{stat.label}</span>
                                                <span className="font-bold text-md text-green-400 text-shadow-sm">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-3 rounded-lg mb-3 stagger-5 shadow-lg border border-white/10 shrink-0">
                                        <span className="text-[10px] uppercase text-white/90 font-bold tracking-wider text-shadow-sm">2025 Vibe</span>
                                        <h2 className="text-xl font-black mt-0 drop-shadow-md">{slide.stats && slide.stats[6].value}</h2>
                                    </div>

                                    <p className="text-center text-[10px] font-mono text-white/50 mb-3 stagger-5 font-bold shrink-0">{slide.footer}</p>
                                    
                                    <div className="flex gap-2 justify-center stagger-5 shrink-0 pb-2">
                                        <button onClick={handleRestart} className="px-5 py-2 bg-white text-black font-bold rounded-full text-xs hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center gap-2 z-50 relative shadow-lg">
                                            <RotateCcw size={14} />
                                            Replay
                                        </button>
                                        <button onClick={handleShare} className="px-5 py-2 bg-green-500 text-white font-bold rounded-full text-xs hover:bg-green-600 transition-all transform hover:scale-105 flex items-center gap-2 z-50 relative shadow-lg">
                                            <Share2 size={14} />
                                            Share
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Hint */}
                        {current < slides.length - 1 && (
                            <div className="mt-8 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 animate-pulse text-shadow-sm">Tap to continue</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Share Modal Overlay */}
            {showShare && (
                <div className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-zinc-900 rounded-3xl p-6 w-full max-w-sm border border-white/10 shadow-2xl">
                        <h3 className="text-xl font-bold mb-6 text-center">Share Your Year</h3>
                        <div className="space-y-3">
                            <button onClick={() => shareToSocial('twitter')} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">Share on X</button>
                            <button onClick={() => shareToSocial('linkedin')} className="w-full py-3 bg-[#0077b5] text-white font-bold rounded-xl hover:bg-[#006396] transition-colors">LinkedIn</button>
                            <button onClick={() => shareToSocial('facebook')} className="w-full py-3 bg-[#1877f2] text-white font-bold rounded-xl hover:bg-[#166fe5] transition-colors">Facebook</button>
                            <button onClick={copyLink} className="w-full py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">Copy Link</button>
                        </div>
                        <button onClick={() => setShowShare(false)} className="mt-6 w-full py-2 text-white/50 text-sm font-bold hover:text-white transition-colors">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

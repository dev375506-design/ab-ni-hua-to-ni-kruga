import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function Chat() {
  const { t, lang } = useI18n();
  const [messages, setMessages] = useState<
    { id: number; role: "user" | "bot"; text: string }[]
  >([
    {
      id: 1,
      role: "bot",
      text: t("chat.welcome"),
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((p) => [...p, { id: Date.now(), role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          role: "bot",
          text: `${t("chat.searching")} ${text}`,
        },
      ]);
    }, 600);
  };

  const toggleSpeechRecognition = () => {
    if (isListening) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  const startSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      
      // Set language based on current app language
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert(t('chat.speechNotSupported'));
    }
  };
  
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Clean up speech recognition on component unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-intern-bg flex flex-col">
      {/* Header like reference: back on left, centered title, menu on right */}
      <header className="px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="/" aria-label="Back" className="text-intern-dark">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </a>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide font-poppins text-intern-dark">
          <span className="px-3 py-1 rounded-xl bg-white/60 shadow-sm">Internमित्र CHATBOT</span>
        </h1>
        <button aria-label="Menu" className="text-intern-dark">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pb-6">
        <div className="rounded-2xl border bg-white/70 backdrop-blur shadow-lg flex flex-col h-[72vh]">
          {/* Greeting and messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-intern-bg/40">
            {messages.length <= 1 && (
              <div className="space-y-6">
                <p className="text-intern-dark font-poppins leading-relaxed">
                  👋 Hi, I’m your Internमित्र AI Bot! I’ll help you find the perfect internship based on your skills, interests, and location. Let’s get started! 🚀
                </p>
                <div className="mx-auto w-56 h-56 sm:w-72 sm:h-68 opacity-80">
                  <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30" y="70" width="140" height="100" rx="28" fill="#e5edf9"></rect>
                    <rect x="55" y="95" width="90" height="50" rx="16" fill="#ffffff"></rect>
                    <circle cx="85" cy="120" r="6" fill="#273c75"></circle>
                    <circle cx="115" cy="120" r="6" fill="#273c75"></circle>
                    <path d="M90 136 q10 10 20 0" stroke="#273c75" strokeWidth="3" fill="none" />
                    <rect x="20" y="110" width="20" height="30" rx="8" fill="#dfe8f6"></rect>
                    <rect x="160" y="110" width="20" height="30" rx="8" fill="#dfe8f6"></rect>
                    <circle cx="70" cy="70" r="10" fill="#dfe8f6"></circle>
                    <circle cx="130" cy="70" r="10" fill="#dfe8f6"></circle>
                  </svg>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`${m.role === "user" ? "bg-intern-blue text-white" : "bg-white text-intern-dark"} px-4 py-3 rounded-2xl max-w-[75%] shadow`}>
                  <p className="font-poppins text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Composer like reference: rounded, plus on left, mic on right */}
          <div className="p-3 sm:p-4 bg-white/70 backdrop-blur border-t">
            <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-inner">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button aria-label="Add" className="text-intern-dark/70 hover:text-intern-dark">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[220px]">
                  <DropdownMenuLabel>Attach</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Photos or Videos</DropdownMenuItem>
                  <DropdownMenuItem>Documents</DropdownMenuItem>
                  <DropdownMenuItem>Links</DropdownMenuItem>
                  <DropdownMenuItem>Camera</DropdownMenuItem>
                  <DropdownMenuItem>Contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type your answer here…"
                className="flex-1 h-11 border-0 focus-visible:ring-0"
              />
              <button 
                onClick={toggleSpeechRecognition} 
                aria-label="Voice input" 
                className={`${isListening ? 'text-intern-blue animate-pulse' : 'text-intern-dark/70'} hover:text-intern-dark`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                </svg>
              </button>
              <button onClick={send} aria-label="Send message" className="text-intern-dark/70 hover:text-intern-dark ml-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

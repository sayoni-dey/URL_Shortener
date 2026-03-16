"use client"; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
  navigator.clipboard.writeText(shortUrl);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000); // Reset icon after 2s
};

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Connect to your Express backend
    const response = await fetch("http://localhost:8080/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    });

    const data = await response.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-fuchsia-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter">NOVA</div>
        <div className="space-x-4">
          <Button variant="ghost" className="text-zinc-400 hover:text-white">
            Log in
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6">
            Sign up
          </Button>
        </div>
      </nav>

        {/* Adjusted Hero Section */}
        <main className="flex flex-col items-center justify-center py-32 md:py-48 px-4 text-center">
          {/* Content Wrapper */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Shorten your links. <br /> Expand your reach.
            </h1>
    
            <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Minimalist, fast, and secure URL shortening for the modern web. 
            No clutter, just results.
            </p>

          {/* Shortener Input Area */}
          <form className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-2 p-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm shadow-2xl shadow-fuchsia-500/5" onSubmit={handleShorten}>
          <Input 
            placeholder="Paste your long link here..." 
            className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-600"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl px-8 transition-all shadow-lg shadow-fuchsia-600/20">
          Shorten
          </Button>
          </form>
          {shortUrl && (
            <div className="mt-4 flex items-center justify-between p-2 border rounded-md bg-muted/50">
            <code className="text-sm font-mono break-all">{shortUrl}</code>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
            {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
  </div>
)}
    </div>

      {/* This empty div acts as a visual "counter-weight" to the header */}
      <div className="mt-32 opacity-20 text-xs tracking-[0.2em] uppercase text-zinc-500">
      Trusted by modern teams worldwide
      </div>

      {/* Decorative Blur - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[140px] -z-10" />
  </main>
    </div>
  );

}
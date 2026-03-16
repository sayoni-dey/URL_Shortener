"use client"; // Required because we are using a form and state

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <main className="flex min-h-screen items-center justify-center p-24">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>URL Shortener</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleShorten} className="space-y-4">
            <Input 
              placeholder="Paste your link here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" className="w-full">Shorten</Button>
          </form>
          {shortUrl && (
  <div className="mt-4 flex items-center justify-between p-2 border rounded-md bg-muted/50">
    <code className="text-sm font-mono break-all">{shortUrl}</code>
    <Button variant="ghost" size="icon" onClick={copyToClipboard}>
      {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  </div>
)}
        </CardContent>
      </Card>
    </main>
  );
}
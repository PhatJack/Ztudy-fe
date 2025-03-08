"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Clipboard } from "lucide-react";

interface Props {
  text: string;
}

export default function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      type="button"
      size={"icon"}
      variant="outline"
      className="flex items-center gap-2"
    >
      {copied ? <Check className="text-emerald-600" /> : <Clipboard />}
    </Button>
  );
}

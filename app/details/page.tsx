"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DetailsPage() {
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: "", description: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "display promotion") {
      const response = await fetch("/api/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "registrations.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setIsOpen(false);
      } else {
        setErrorMessage({
          title: "Error",
          description: "Failed to download data"
        });
        setErrorModalOpen(true);
      }
    } else {
      setErrorMessage({
        title: "Invalid Password",
        description: "Please enter the correct password"
      });
      setErrorModalOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    router.push("/");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Download Data
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={errorModalOpen} onOpenChange={() => setErrorModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{errorMessage.title}</DialogTitle>
          </DialogHeader>
          <p>{errorMessage.description}</p>
          <Button onClick={() => setErrorModalOpen(false)} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
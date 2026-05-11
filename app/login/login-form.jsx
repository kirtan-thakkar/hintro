"use client";

import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials.");
        setIsPending(false);
      } else {
        // Force a hard refresh to ensure session state and Next.js router cache are cleared
        window.location.href = "/";
      }
    } catch (err) {
      setError("Something went wrong.");
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto p-6 md:p-8">
      <div className="text-center mb-10">
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Login</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Example@email.com"
              required
              className="w-full h-[44px] pl-10 pr-4 bg-gray-50/50 border border-gray-200 rounded-lg text-[14px] text-gray-900 outline-none focus:border-gray-400 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              required
              className="w-full h-[44px] px-4 bg-gray-50/50 border border-gray-200 rounded-lg text-[14px] text-gray-900 outline-none focus:border-gray-400 focus:bg-white transition-all placeholder:text-gray-400 font-mono tracking-wider"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            >
              {showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}

        <Button 
          type="submit" 
          variant="primary" 
          disabled={isPending}
          className="w-full h-[44px] mt-4 rounded-lg bg-black text-white hover:bg-gray-800 font-medium text-[15px]"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

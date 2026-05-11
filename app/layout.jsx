import { DM_Sans } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  subsets: ['latin'],
   weight: ['400', '500', '700'], 
});

export const metadata = {
  title: "Hintro - AI-Powered Conversation Assistant",
  description: "  Hintro is an AI-powered conversation assistant designed to help you analyze and improve your calls. With Hintro, you can easily review your conversations, identify key insights, and enhance your communication skills. Whether you're a sales professional, customer support agent, or anyone looking to improve their conversational abilities, Hintro provides the tools you need to succeed.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

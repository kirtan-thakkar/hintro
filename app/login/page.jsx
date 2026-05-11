import { LoginForm } from "./login-form";

export const metadata = {
  title: "Login | Hintro",
  description: "Log in to your Hintro account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
}
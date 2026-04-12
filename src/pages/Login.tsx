import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BrainCircuit, User, Building2, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/useAuth";
import type { UserRole } from "@/types/auth";

const Login = () => {
  const [role, setRole] = useState<UserRole>("student");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, signup } = useAuth();

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const name = String(form.get("name") || "").trim();

    try {
      if (mode === "signup" && role === "admin") {
        throw new Error("Admin signup is restricted.");
      }

      const user =
        mode === "signup"
          ? await signup(name, email, password, role)
          : await login(email, password);

      toast({
        title: mode === "signup" ? "Account created" : "Login successful",
        description: `Welcome ${user.name}`,
      });

      if (user.role === "student") {
        navigate("/student-dashboard");
      } else if (user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <BrainCircuit className="h-10 w-10 text-primary" />
          <span className="text-2xl font-bold text-foreground">JanMitram</span>
        </Link>

        <Card className="p-8 shadow-green-lg">
          <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="student" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Student</span>
              </TabsTrigger>
              <TabsTrigger value="recruiter" className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Recruiter</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <Button
                type="button"
                variant={mode === "login" ? "default" : "outline"}
                onClick={() => setMode("login")}
              >
                Login
              </Button>
              <Button
                type="button"
                variant={mode === "signup" ? "default" : "outline"}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </Button>
            </div>

            <TabsContent value="student">
              <LoginForm role="student" mode={mode} onSubmit={handleAuth} />
            </TabsContent>
            <TabsContent value="recruiter">
              <LoginForm role="recruiter" mode={mode} onSubmit={handleAuth} />
            </TabsContent>
            <TabsContent value="admin">
              <LoginForm role="admin" mode={mode} onSubmit={handleAuth} />
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center mt-4 text-muted-foreground">
          Use demo users from backend seed: student@janmitram.dev, recruiter@janmitram.dev, admin@janmitram.dev (password: Password@123)
        </p>
      </motion.div>
    </div>
  );
};

const LoginForm = ({
  role,
  mode,
  onSubmit,
}: {
  role: UserRole;
  mode: "login" | "signup";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "signup" ? (
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="Your full name" required className="bg-background" />
        </div>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={`${role}@example.com`}
          required
          className="bg-background"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          className="bg-background"
        />
      </div>
      <Button type="submit" className="w-full gradient-primary">
        {mode === "signup" ? `Create ${role} account` : `Login as ${role}`}
      </Button>
      {mode === "signup" && role === "admin" ? (
        <p className="text-xs text-muted-foreground text-center">
          Admin accounts can only be created by an existing administrator.
        </p>
      ) : null}
    </form>
  );
};

export default Login;
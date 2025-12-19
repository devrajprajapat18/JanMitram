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

const Login = () => {
  const [role, setRole] = useState<"student" | "recruiter" | "admin">("student");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Login Successful!",
      description: `Welcome back as ${role}`,
    });

    // Navigate based on role
    if (role === "student") {
      navigate("/student-dashboard");
    } else if (role === "recruiter") {
      navigate("/recruiter-dashboard");
    } else {
      navigate("/admin-dashboard");
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
          <Tabs value={role} onValueChange={(v) => setRole(v as any)}>
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

            <TabsContent value="student">
              <LoginForm role="student" onSubmit={handleLogin} />
            </TabsContent>
            <TabsContent value="recruiter">
              <LoginForm role="recruiter" onSubmit={handleLogin} />
            </TabsContent>
            <TabsContent value="admin">
              <LoginForm role="admin" onSubmit={handleLogin} />
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center mt-4 text-muted-foreground">
          Don't have an account?{" "}
          <a href="#" className="text-accent hover:underline">
            Create Account
          </a>
        </p>
      </motion.div>
    </div>
  );
};

const LoginForm = ({
  role,
  onSubmit,
}: {
  role: string;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
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
          type="password"
          placeholder="Enter your password"
          required
          className="bg-background"
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span className="text-muted-foreground">Remember me</span>
        </label>
        <a href="#" className="text-accent hover:underline">
          Forgot Password?
        </a>
      </div>
      <Button type="submit" className="w-full gradient-primary">
        Login as {role}
      </Button>
    </form>
  );
};

export default Login;
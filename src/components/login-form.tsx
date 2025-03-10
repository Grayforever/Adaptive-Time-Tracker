import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Props {
  handleOnSubmit: () => void;
  setUsername: (email: string) => void;
  Username: string;
  setPassword: (password: string) => void;
  Password: string
  onError:boolean
  onErrorMessage:string
}
export function LoginForm({
  setUsername,
  Username,
  Password,
  setPassword,
  handleOnSubmit,
  onError,
  onErrorMessage
}: Props) {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/adaptive.png"
                  alt="Image"
                  className="inset-0 h-9 object-contain mb-8"
                />
                <h1 className="text-2xl font-bold">Welcome back 👋</h1>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={Username}
                  onChange={(e) => setUsername(e.target?.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
              <Button type="button" className="w-full" onClick={handleOnSubmit}>
                Login
              </Button>

              {
                onError && ( <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {onErrorMessage}
                  </AlertDescription>
                </Alert>)
              }

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/Timemanagement.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

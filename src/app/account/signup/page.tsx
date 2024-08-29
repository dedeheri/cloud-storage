"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import AccountContainer from "@/components/account-container";
import { useState } from "react";
import axios from "axios";
import { IconLoader2 } from "@tabler/icons-react";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "password must have than 6 characters"),
});

const Page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast({
        description: (response as any)?.data?.message,
      });

      router.push("/account/signin");
    } catch (error) {
      setLoading(false);
      toast({
        description: (error as any)?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountContainer>
      <div className="space-y-10">
        <div>
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Registraion to Box
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to Box if you can because we don&apos;t have a login flow yet
          </p>
        </div>

        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name"
                      type="text"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      type="email"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10"
                      type="password"
                      placeholder="••••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              type="submit"
              className="w-full h-10 space-x-1"
              variant="secondary"
            >
              {loading && <IconLoader2 className="w-5 h-5 animate-spin" />}
              <span> Sign Up</span>
            </Button>
          </form>
        </Form>
      </div>
    </AccountContainer>
  );
};

export default Page;

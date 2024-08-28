"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import AccountContainer from "@/components/account-container";

import { toast } from "@/components/ui/use-toast";
import { IconBrandGoogle, IconLoader2 } from "@tabler/icons-react";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "password must have than 6 characters"),
});

const Page = () => {
  const router = useRouter();

  const callbackUrlParams = useSearchParams();
  const callbackUrl = callbackUrlParams.get("callbackUrl") as string;

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.status === 401) {
        toast({
          description: response?.error,
        });
      }

      if (response?.ok) {
        if (callbackUrl !== null) {
          router.push(callbackUrl);
        } else {
          router.push("/drive");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AccountContainer>
      <div className="space-y-10">
        <div className="space-y-3">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to Cloud
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to Cloud if you can because we don't have a login flow yet
          </p>
        </div>

        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10"
                      placeholder="email"
                      type="email"
                      {...field}
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

              <span> Sign in</span>
            </Button>
          </form>
        </Form>

        <div className="flex justify-center space-x-2">
          <h1 className="dark:text-neutral-500">Don't have an account?</h1>
          <Link href={"/account/signup"} className="underline font-medium">
            Sign Up
          </Link>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </div>
    </AccountContainer>
  );
};

export default Page;

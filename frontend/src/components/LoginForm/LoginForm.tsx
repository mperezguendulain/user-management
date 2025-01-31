"use client";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";

// Material UI
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography
} from "@mui/material";

// Stores
import { useAuthStore } from "@/stores/auth.store";

// Services
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";

import { zodResolver } from "@hookform/resolvers/zod";

type LoginInputs = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Required field")
    .email({ message: "Please provide a valid email" }),
  password: z.string().min(1, "Required field")
});

export const LoginForm = () => {
  const router = useRouter();
  const { setLoggedUser } = useAuthStore();

  const [showServerError, setShowServerError] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "admin@example.com",
      password: "password"
    },
    resolver: zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const token = await AuthService.Login(data.email, data.password);

      localStorage.setItem("token", token);

      const loggedUser = await UserService.GetAuthenticatedUser();
      setLoggedUser(loggedUser);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      if (err instanceof Error && err.message === "Invalid credentials") {
        setShowServerError(true);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2
      }}
    >
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="your@email.com"
              autoFocus
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              onChange={(e) => {
                field.onChange(e);
                setShowServerError(false);
              }}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="••••••"
              type="password"
              autoComplete="current-password"
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              onChange={(e) => {
                field.onChange(e);
                setShowServerError(false);
              }}
            />
          )}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained">
        Sign in
      </Button>
      {showServerError && (
        <Typography variant="caption" color="error">
          Invalid credentials
        </Typography>
      )}
    </Box>
  );
};

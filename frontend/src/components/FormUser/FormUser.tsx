"use client";
import { type ChangeEvent, useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Material UI
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Stack,
  Box,
  Avatar,
  FormControl,
  FormLabel,
  Grid2
} from "@mui/material";

const userSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    role: z.enum(["Admin", "User"], { required_error: "Role is required" }),
    status: z.enum(["Active", "Inactive"], {
      required_error: "Status is required"
    }),
    street: z.string().optional(),
    number: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional()
  })
  .refine(
    (data) => {
      const addressFields = [
        data.street,
        data.number,
        data.city,
        data.postalCode
      ];
      const filledFields = addressFields.filter(
        (field) => field !== undefined && field !== ""
      );
      return (
        filledFields.length === 0 ||
        filledFields.length === addressFields.length
      );
    },
    {
      message: "If one address field is provided, all must be filled",
      path: ["street"]
    }
  );

type UserInputs = z.infer<typeof userSchema>;

type FormUserProps = {
  open: boolean;
  onClose: () => void;
};

export const FormUser = ({ open, onClose }: FormUserProps) => {
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoURL(imageUrl);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserInputs>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "User",
      status: "Active",
      street: "",
      number: "",
      city: "",
      postalCode: ""
    }
  });

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    console.log("Form Data:", data);
    onClose();
  };

  const onCancel = () => {
    setPhotoURL(null);
    onClose();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="lg">
      {" "}
      <DialogTitle>Create New User</DialogTitle>{" "}
      <DialogContent
        sx={{ display: "flex", flexDirection: "row", gap: 2, padding: 3 }}
      >
        {" "}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
          p={3}
          mt={3}
        >
          {" "}
          <Avatar
            src={photoURL || ""}
            alt="Uploaded Photo"
            sx={{ width: 150, height: 150, mb: 2 }}
          />{" "}
          <Button
            variant="contained"
            component="label"
            color="primary"
            size="small"
          >
            {" "}
            Upload{" "}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleUpload}
            />{" "}
          </Button>{" "}
        </Box>{" "}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ width: "100%" }}
        >
          {" "}
          <Grid2 container spacing={2} mt={2}>
            {" "}
            <Grid2 size={{ xs: 12, sm: 6 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="firstName">First Name</FormLabel>{" "}
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="John"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2 size={{ xs: 12, sm: 6 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="lastName">Last Name</FormLabel>{" "}
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Doe"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2 size={{ xs: 12 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="email">Email</FormLabel>{" "}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="your@email.com"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2 size={{ xs: 12 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="phone">Phone Number</FormLabel>{" "}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth placeholder="+1234567890" />
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2 size={{ xs: 12, sm: 6 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="role">Role</FormLabel>{" "}
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.role}
                      helperText={errors.role?.message}
                    >
                      {" "}
                      <MenuItem value="Admin">Admin</MenuItem>{" "}
                      <MenuItem value="User">User</MenuItem>{" "}
                    </TextField>
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2 size={{ xs: 12, sm: 6 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="status">Status</FormLabel>{" "}
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      {" "}
                      <MenuItem value="Active">Active</MenuItem>{" "}
                      <MenuItem value="Inactive">Inactive</MenuItem>{" "}
                    </TextField>
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2 size={{ xs: 12 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="street">Street</FormLabel>{" "}
                <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth placeholder="Main St" />
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2 size={{ xs: 6 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="number">Number</FormLabel>{" "}
                <Controller
                  name="number"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth placeholder="123" />
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2 size={{ xs: 6 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="city">City</FormLabel>{" "}
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth placeholder="New York" />
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2 size={{ xs: 12 }}>
              {" "}
              <FormControl fullWidth>
                {" "}
                <FormLabel htmlFor="postalCode">Postal Code</FormLabel>{" "}
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth placeholder="10001" />
                  )}
                />{" "}
              </FormControl>{" "}
            </Grid2>{" "}
            <Grid2
              size={{ xs: 12 }}
              display="flex"
              justifyContent="flex-end"
              marginBottom={5}
            >
              {" "}
              <Stack direction="row" spacing={2}>
                {" "}
                <Button variant="outlined" onClick={onCancel}>
                  {" "}
                  Cancel{" "}
                </Button>{" "}
                <Button variant="contained" color="primary" type="submit">
                  {" "}
                  Submit{" "}
                </Button>{" "}
              </Stack>{" "}
            </Grid2>{" "}
          </Grid2>{" "}
        </Box>{" "}
      </DialogContent>{" "}
    </Dialog>
  );
};

import Image from "next/image";
import { Stack, Typography } from "@mui/material";

// Custom Components
import { LoginForm } from "@/components/LoginForm/LoginForm";

// Styled Components
import { Card, SignInContainer } from "./login.styles";

export default function LoginPage() {
  return (
    <Stack>
      <Image
        src="/images/background_login.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card
          variant="outlined"
          sx={{
            zIndex: 1,
            padding: 3
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <LoginForm />
        </Card>
      </SignInContainer>
    </Stack>
  );
}

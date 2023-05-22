import React from "react";
import RouteWrapper from "./routes/RouteWrapper";
import BackgroundWrapper from "./components/BackgroundWrapper";
import LanguageProvider from "./providers/LanguageProvider";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./constants/query-client";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundWrapper>
        <LanguageProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            autoHideDuration={3000}
            className="bg-white"
          >
            <RouteWrapper />
          </SnackbarProvider>
        </LanguageProvider>
      </BackgroundWrapper>
    </QueryClientProvider>
  );
};

export default App;

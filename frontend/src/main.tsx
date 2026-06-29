import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(

<React.StrictMode>
<QueryClientProvider client={queryClient}>
<AuthProvider>
<TooltipProvider>
<App/>
</TooltipProvider>
</AuthProvider>
</QueryClientProvider>
</React.StrictMode>

)
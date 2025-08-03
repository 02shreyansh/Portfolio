import { Button } from "@/components/ui/button"
import { toast } from "sonner"

function App() {
  const showToast=()=>{
    toast.success("hello setup")
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={showToast}>Click me</Button>
      
    </div>

  )
}

export default App
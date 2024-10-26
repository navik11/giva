"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(80), 700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-100 h-[100vh] flex items-center justify-center">
      <Progress value={progress} className="w-[120px]"/>
    </div>
  );
};

export default Loader;
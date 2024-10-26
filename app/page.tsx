import { HomeText } from "@/components/ui/homeText"
import Meteors from "@/components/ui/meteors"

export default function Home() {
  return (
    <div>
      <div className="fixed inset-0 flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Meteors number={30} />
      <HomeText />
      </div>
      <div className="z-10">
      </div>
    </div>
  )
}

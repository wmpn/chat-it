import Navbar from "@/components/base/Navbar";
import HeroSection from "@/components/base/HeroSection";
import FeatureSection from "@/components/base/FeatureSection";
import UserReviews from "@/components/base/UserReviews";
import Footer from "@/components/base/Footer";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import SessionProvider from "@/providers/SessionProvider";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="">
      <SessionProvider>
        {/* Header */}
        <Navbar user={session?.user} />
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeatureSection />

        {/* User Reviews Section */}
        <UserReviews />

        {/* Footer */}
        <Footer />
      </SessionProvider>
    </div>
  );
}

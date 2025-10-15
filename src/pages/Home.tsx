import { MoveRight, Zap } from 'lucide-react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import FeaturesSection from '../components/home/FeatureSection';
import colors from '../constants/colors';

const Home = () => {
  return (
    <div className="p-2">
      <Header />

      {/* Section 1 */}

      <section className="mt-20 flex flex-col gap-10 justify-center items-center p-3 w-3xl mx-auto">
        <div className="rounded-2xl items-center gap-3 flex p-1 border border-blue-500 bg-gray-200">
          <Zap size={18} color={colors.primary} />
          <h4 className="text-sm">Modern Project Management</h4>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-5xl font-bold">Collabarate Better</h1>
          <h3 className="text-3xl font-bold">Achieve More</h3>
          <p className="text-gray-500 text-xl text-center">
            MatchBox brings your team together with powerful project management,
            real-time collaboration, and beautiful analytics.
          </p>
          <div className="flex gap-4">
            <button className="cursor-pointer px-5 py-2 flex bg-blue-500 hover:bg-blue-600 gap-3 rounded-lg text-white">
              <h2>Get Started Free</h2>
              <MoveRight />
            </button>
            <button className="cursor-pointer px-5 py-2 hover:bg-blue-600 hover:text-white rounded-lg border border-blue-400">
              <h2>View Demo</h2>
            </button>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mt-30 flex flex-col gap-10 justify-center items-center p-3">
        {/* <div className=" w-3xl flex flex-col gap-5 justify-center items-center">
          <h1 className="text-3xl font-semibold">
            Everything you need to succeed
          </h1>
          <p className="text-xl text-gray-500 text-center">
            Powerful features designed to help teams collaborate and deliver
            projects faster
          </p>
        </div> */}
        <FeaturesSection />
      </section>
      <Footer />
    </div>
  );
};

export default Home;

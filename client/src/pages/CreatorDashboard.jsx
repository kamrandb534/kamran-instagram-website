import UploadMedia from "./creator/LocalComponents/UploadMedia";
import { SparklesIcon } from "@heroicons/react/24/outline";

const CreatorDashboard = () => {
  return (
    <div className="h-full">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="rounded-xl overflow-hidden">
          <div className="px-6 py-5 bg-gradient-to-r from-orange-400 to-orange-500">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <SparklesIcon className="h-8 w-8" />
              Creator Dashboard
            </h2>
          </div>
          <div className="p-6">
            <UploadMedia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;

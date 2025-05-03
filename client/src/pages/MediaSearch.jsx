import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PhotoIcon,
  VideoCameraIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [mediaList, setMediaList] = useState([]);

  const fetchMedia = async () => {
    try {
      const res = await axios.get("https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net//api/media/all", {
        params: {
          search: query,
          type,
        },
      });
      setMediaList(res.data);
    } catch (err) {
      console.error("Failed to fetch media", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [query, type]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="h-10 w-10 text-orange-400" />
          Explore Creative Works
        </h1>
        <p className="text-gray-600">
          Discover stunning images and videos from our community
        </p>
      </div>

      <div className="flex gap-4 mb-8 bg-white p-4 rounded-xl shadow-lg">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, caption, location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="appearance-none pl-3 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
          >
            <option value="">All Media Types</option>
            <option value="image">Images Only</option>
            <option value="video">Videos Only</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((media) => (
          <Link
            key={media.id}
            to={`/media/${media.id}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="relative aspect-[4/3]">
              {media.file_path.endsWith(".mp4") ? (
                <>
                  <video
                    src={`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net/${media.file_path}`}
                    controls
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 rounded-full px-2 py-1 flex items-center space-x-1">
                    <VideoCameraIcon className="h-4 w-4 text-white" />
                    <span className="text-xs text-white">Video</span>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net/${media.file_path}`}
                    alt={media.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 rounded-full px-2 py-1 flex items-center space-x-1">
                    <PhotoIcon className="h-4 w-4 text-white" />
                    <span className="text-xs text-white">Image</span>
                  </div>
                </>
              )}
            </div>
            <div className="p-3 space-y-1">
              <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors text-sm">
                {media.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {media.caption}
              </p>
              {media.location && (
                <div className="flex items-center text-xs text-gray-500">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Location: {media.location}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MediaSearch;

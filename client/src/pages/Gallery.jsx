import { useEffect, useState } from "react";
import axios from "axios";
import { ChatBubbleOvalLeftIcon, MapPinIcon, DocumentTextIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [mediaList, setMediaList] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/media/all");
        setMediaList(res.data);
      } catch (err) {
        console.error("Failed to load media", err);
      }
    };

    fetchMedia();
  }, []);

  const handleLike = (id) => {
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <SparklesIcon className="h-10 w-10 text-orange-400" />
            Creative Gallery
          </h1>
          <p className="text-gray-600">
            Explore stunning visual stories from our community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {mediaList.map((media) => (
            <Link 
              key={media.id} 
              to={`/media/${media.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-[340px] flex flex-col"
            >
              <div className="relative h-40">
                {media.file_path.endsWith(".mp4") ? (
                  <video controls className="w-full h-full object-cover">
                    <source src={`http://localhost:8080${media.file_path}`} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={`http://localhost:8080${media.file_path}`}
                    alt={media.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    <span className="text-gray-500 font-medium">Title:</span> {media.title}
                  </h3>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(media.id);
                    }}
                    className={`p-1.5 rounded-full transition-all duration-200 ${
                      likedPosts[media.id] ? 'bg-red-100' : 'bg-gray-100'
                    } hover:bg-red-100`}
                    aria-label="Like this post"
                  >
                    <HeartIcon className={`h-6 w-6 ${
                      likedPosts[media.id] ? 'text-red-500' : 'text-gray-500'
                    }`} />
                  </button>
                </div>

                <div className="flex items-start">
                  <DocumentTextIcon className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600 line-clamp-2">
                    <span className="text-gray-500 font-medium">Caption:</span> {media.caption}
                  </p>
                </div>

                {media.location && (
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 text-orange-500 mr-2" />
                    <p className="text-xs text-gray-500 truncate">
                      <span className="text-gray-500 font-medium">Location:</span> {media.location}
                    </p>
                  </div>
                )}

                <button 
                  className="w-full flex items-center justify-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-lg hover:bg-orange-100 transition-colors duration-200 mt-1"
                  onClick={(e) => e.preventDefault()}
                >
                  <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                  <span>Comment</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, BookmarkIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";

const MediaDetail = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [averageRating, setAverageRating] = useState(null);

  const fetchMediaData = async () => {
    try {
      const mediaRes = await axios.get(`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net//api/media/${id}`);
      setMedia(mediaRes.data);

      const commentsRes = await axios.get(`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net//api/interact/comments/${id}`);
      setComments(commentsRes.data);

      const ratingRes = await axios.get(`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net//api/interact/rating/${id}`);
      setAverageRating(ratingRes.data.average_rating);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMediaData();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment) return;
    await axios.post("https://kamran-backend-braah4dbapbshzg5.ukwest-01.azurewebsites.net//api/interact/comment", {
      user_id: 1,
      media_id: id,
      content: newComment,
    });
    setNewComment("");
    fetchMediaData();
  };

  const handleRatingSubmit = async () => {
    if (!rating) return;
    await axios.post("https://kamran-backend-braah4dbapbshzg5.ukwest-01.azurewebsites.net/api/interact/rating", {
      user_id: 1,
      media_id: id,
      rating,
    });
    setRating(0);
    alert("Thanks for rating!");
  };

  if (!media) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex">
       
          <div className="flex-1 bg-black flex items-center justify-center">
            {media.file_path.endsWith(".mp4") ? (
              <video
                controls
                className="w-full max-h-[600px] object-contain"
                src={`https://kamran-backend-braah4dbapbshzg5.ukwest-01.azurewebsites.net/${media.file_path}`}
              />
            ) : (
              <img
                src={`https://kamran-backend-braah4dbapbshzg5.ukwest-01.azurewebsites.net/${media.file_path}`}
                alt="media"
                className="w-full max-h-[600px] object-contain"
              />
            )}
          </div>

        
          <div className="w-96 border-l flex flex-col h-[80vh] overflow-hidden">
          
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <svg 
                    className="w-10 h-10 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-800">username</h3>
                    <p className="text-xs text-gray-500">Location</p>
                  </div>
                </div>
                <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
              </div>
            </div>

           
            <div className="p-4 border-b space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button onClick={() => setLiked(!liked)}>
                    {liked ? (
                      <HeartIconSolid className="h-7 w-7 text-red-500" />
                    ) : (
                      <HeartIcon className="h-7 w-7 text-gray-800" />
                    )}
                  </button>
                  <ChatBubbleOvalLeftIcon className="h-7 w-7 text-gray-800" />
                  <PaperAirplaneIcon className="h-7 w-7 text-gray-800 rotate-90" />
                </div>
                <button onClick={() => setSaved(!saved)}>
                  {saved ? (
                    <BookmarkIconSolid className="h-7 w-7 text-gray-800" />
                  ) : (
                    <BookmarkIcon className="h-7 w-7 text-gray-800" />
                  )}
                </button>
              </div>

             
              {averageRating !== null && (
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-800 font-medium">
                    {parseFloat(averageRating).toFixed(1)} / 5
                  </span>
                </div>
              )}

             
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`h-6 w-6 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    <StarIcon className="h-full w-full" />
                  </button>
                ))}
                <button
                  onClick={handleRatingSubmit}
                  className="ml-2 px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Rate
                </button>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-800">{media.title}</h2>
                <p className="text-sm text-gray-600">{media.caption}</p>
              </div>
            </div>

           
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="font-semibold text-gray-800 mb-4">Comments</h3>
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="flex items-start space-x-3">
                    <svg 
                      className="w-8 h-8 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-800">{c.content}</p>
                      <p className="text-xs text-gray-400">2h ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;

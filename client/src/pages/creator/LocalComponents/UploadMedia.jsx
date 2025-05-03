import { useState } from "react";
import axios from "axios";
import { PhotoIcon, MapPinIcon, UserGroupIcon, SparklesIcon } from "@heroicons/react/24/outline";

const UploadMedia = () => {
  const [media, setMedia] = useState(null);
  const [metadata, setMetadata] = useState({
    title: "",
    caption: "",
    location: "",
    people: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setMedia(files[0]);
    } else {
      setMetadata({ ...metadata, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!media) return alert("Upload a media file");

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please login to upload media");

    const formData = new FormData();
    formData.append("media", media);
    Object.entries(metadata).forEach(([key, val]) => formData.append(key, val));
    formData.append("creator_id", user.id);

    try {
      const res = await axios.post("https://kamran-backend-braah4dbapbshzg5.ukwest-01.azurewebsites.net///api/media/upload", formData);
      alert("Media uploaded!");
      window.location.reload(); // Reload the page after successful upload
    } catch (err) {
      alert("Upload failed.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <SparklesIcon className="h-6 w-6 text-orange-500" />
        Share Your Creation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Media File</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
              {media ? (
                <img src={URL.createObjectURL(media)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <>
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                  <p className="mt-1 text-xs text-gray-500">Click to upload</p>
                </>
              )}
              <input
                type="file"
                name="media"
                accept="image/*,video/*"
                onChange={handleChange}
                className="hidden"
                required
              />
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
            <input
              type="text"
              name="caption"
              placeholder="Tell your story..."
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Where was this taken?"
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <UserGroupIcon className="h-4 w-4 text-gray-500" />
              People Present
            </label>
            <input
              type="text"
              name="people"
              placeholder="Who's in this media?"
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors"
        >
          Upload and Share
        </button>
      </form>
    </div>
  );
};

export default UploadMedia;

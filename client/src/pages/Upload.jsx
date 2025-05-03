import { useEffect, useState } from "react";
import axios from "axios";
import { PencilSquareIcon, CheckCircleIcon, MapPinIcon, PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

const ManageUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", caption: "", location: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "creator") return;

    const fetchUploads = async () => {
      try {
        const res = await axios.get(`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net//api/media/creator/${storedUser.id}`);
        setUploads(res.data);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchUploads();
  }, []);

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      caption: item.caption,
      location: item.location,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (mediaId) => {
    try {
      await axios.put(`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net//api/media/update/${mediaId}`, editForm);
      alert("Updated successfully");
      setEditingId(null);
      const res = await axios.get(`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net//api/media/creator/${JSON.parse(localStorage.getItem("user")).id}`);
      setUploads(res.data);
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <PhotoIcon className="h-8 w-8 text-orange-500" />
            Your Media Library
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploads.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-y-scroll hover:shadow-xl transition-shadow w-80 h-96 flex flex-col">
              <div className="relative h-48 flex items-center justify-center">
                {item.file_path.endsWith(".mp4") ? (
                  <video 
                    src={`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net/${item.file_path}`}
                    controls
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <img 
                    src={`https://kamran-backend-braah4dbapbshzg5.uksouth-01.azurewebsites.net/${item.file_path}`}
                    className="max-h-full max-w-full object-contain"
                    alt={item.title}
                  />
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                {editingId === item.id ? (
                  <div className="space-y-3 flex-1">
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      name="caption"
                      value={editForm.caption}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Caption"
                    />
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={editForm.location}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Location"
                      />
                    </div>
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <CheckCircleIcon className="h-5 w-5" />
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.caption}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="mt-3 w-full flex items-center justify-center gap-2 bg-white text-orange-500 px-4 py-2 rounded-lg border border-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                      Edit Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUploads;

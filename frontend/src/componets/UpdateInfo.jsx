import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, Check, User } from "lucide-react";

const dsaOptions = ["Arrays", "Strings", "Graphs", "Trees", "DP"];
const mernOptions = ["React", "Node.js", "MongoDB", "JS"];

const UpdateInfo = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isSubscribed: true,
    preferences: {
      dsaTopics: [],
      mernTopics: [],
    },
  });

  const handleTopicToggle = (category, topic) => {
    const key = category === "DSA" ? "dsaTopics" : "mernTopics";
    const current = formData.preferences[key];
    const updated = current.includes(topic)
      ? current.filter((t) => t !== topic)
      : [...current, topic];

    setFormData({
      ...formData,
      preferences: { ...formData.preferences, [key]: updated },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Email and password are required!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/users/update-user",
        formData
      );
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-6 text-slate-200">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl p-8 border border-slate-700 shadow-lg">
        <h2 className="text-xl font-bold mb-5 text-white">Update Your Info</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 bg-[#0f172a] focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 bg-[#0f172a] focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Subscription Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isSubscribed}
              onChange={(e) =>
                setFormData({ ...formData, isSubscribed: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label>Subscribe to daily emails</label>
          </div>

          {/* Topic Selection */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
              DSA Topics
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {dsaOptions.map((topic) => {
                const selected = formData.preferences.dsaTopics.includes(topic);
                return (
                  <button
                    type="button"
                    key={topic}
                    onClick={() => handleTopicToggle("DSA", topic)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                      selected
                        ? "bg-blue-600/20 border-blue-500 text-blue-100"
                        : "bg-transparent border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {topic}
                    {selected && <Check size={14} className="inline ml-1" />}
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
              MERN Topics
            </p>
            <div className="grid grid-cols-2 gap-2">
              {mernOptions.map((topic) => {
                const selected = formData.preferences.mernTopics.includes(topic);
                return (
                  <button
                    type="button"
                    key={topic}
                    onClick={() => handleTopicToggle("MERN", topic)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                      selected
                        ? "bg-blue-600/20 border-blue-500 text-blue-100"
                        : "bg-transparent border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {topic}
                    {selected && <Check size={14} className="inline ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all active:scale-95"
          >
            Update Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfo;

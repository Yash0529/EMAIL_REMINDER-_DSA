import React, { useState } from 'react';
import { Mail, Lock, User, Clock, Check } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    preferences: {
      dsaTopics: [],
      mernTopics: [],
      preferredTime: '08:00',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://email-reminder-dsa.onrender.com/users/create-user",
        {
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          preferences: {
            dsaTopics: formData.preferences.dsaTopics,
            mernTopics: formData.preferences.mernTopics
          },
          emailTime: formData.preferences.preferredTime,
          timezone: formData.preferences.timezone
        }
      );

      console.log("Success:", response.data);
      alert("Account created! 🎉");
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      alert("Failed to create account.");
    }
  };

  const dsaOptions = ['Arrays', 'Strings', 'Graphs', 'Trees', 'DP'];
  const mernOptions = ['React', 'Node.js', 'MongoDB', 'JS'];

  const handleTopicToggle = (category, topic) => {
    const key = category === 'DSA' ? 'dsaTopics' : 'mernTopics';
    const current = formData.preferences[key];
    const updated = current.includes(topic)
      ? current.filter(t => t !== topic)
      : [...current, topic];

    setFormData({
      ...formData,
      preferences: { ...formData.preferences, [key]: updated }
    });
  };


  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 text-slate-200">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-xl border border-slate-700 p-8">

        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Get Daily Challenges</h1>
          <p className="text-slate-400 text-sm mt-1">
            Level up your coding skills every morning
          </p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* User Info */}
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5"
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="password"
                placeholder="Create Password"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <hr className="border-slate-700" />

          {/* Topics */}
          <div className="grid grid-cols-2 gap-2">
            {[...dsaOptions, ...mernOptions].map(topic => {
              const isDsa = dsaOptions.includes(topic);
              const isSelected = isDsa
                ? formData.preferences.dsaTopics.includes(topic)
                : formData.preferences.mernTopics.includes(topic);

              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() =>
                    handleTopicToggle(isDsa ? 'DSA' : 'MERN', topic)
                  }
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500'
                      : 'border-slate-700'
                  }`}
                >
                  {topic} {isSelected && <Check size={14} />}
                </button>
              );
            })}
          </div>

          {/* Time */}
          <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 text-slate-500" />
            <input
              type="time"
              value={formData.preferences.preferredTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferences: {
                    ...formData.preferences,
                    preferredTime: e.target.value
                  }
                })
              }
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 py-3 rounded-lg">
            Create Free Account
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link
              className="text-blue-400 cursor-pointer"
              to="/update-info"
            >
              Click here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

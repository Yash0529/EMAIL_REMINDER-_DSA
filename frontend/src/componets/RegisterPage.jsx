import React, { useState } from 'react';
import { Mail, Lock, User, Clock, Check } from 'lucide-react';
import axios from 'axios';

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
      "http://localhost:3001/users/create-user",
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
          <p className="text-slate-400 text-sm mt-1">Level up your coding skills every morning</p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* User Info Section */}
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Username" 
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none transition-colors"
                onChange={(e) => setFormData({...formData, userName: e.target.value})}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none transition-colors"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                placeholder="Create Password" 
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none transition-colors"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <hr className="border-slate-700" />

          {/* Topics Section */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Interests</label>
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
                    onClick={() => handleTopicToggle(isDsa ? 'DSA' : 'MERN', topic)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${
                      isSelected 
                      ? 'bg-blue-600/20 border-blue-500 text-blue-100' 
                      : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {topic}
                    {isSelected && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Picker */}
          <div className="flex items-center gap-4 bg-[#0f172a] p-3 rounded-lg border border-slate-700">
            <Clock className="w-5 h-5 text-slate-500" />
            <div className="flex-1">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Preferred Delivery Time</p>
              <input 
                type="time" 
                value={formData.preferences.preferredTime}
                className="bg-transparent text-white focus:outline-none w-full cursor-pointer"
                onChange={(e) => setFormData({
                  ...formData, 
                  preferences: {...formData.preferences, preferredTime: e.target.value}
                })}
              />
            </div>
          </div>

          <button 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95"
            type='submit'
          >
            Create Free Account
          </button>

          <p className="text-center text-slate-500 text-xs">
            By joining, you agree to receive 1 daily email.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
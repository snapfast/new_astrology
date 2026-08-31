'use client';

import { useState, useEffect, useMemo } from 'react';
import PageHeader from '@/components/PageHeader';
import ExploreTools from '@/components/ExploreTools';
import { calculateBTRData } from '@/lib/btr';
import KundliChart from '@/components/KundliChart';

export default function BtrClientPage() {
  const [isClient, setIsClient] = useState(false);

  // State for initial details
  const [showForm, setShowForm] = useState(true);
  const [name, setName] = useState("Jane Doe");
  const [dob, setDob] = useState("1990-01-01");
  const [tob, setTob] = useState("12:00:00");
  const [lat, setLat] = useState("28.6139");
  const [lon, setLon] = useState("77.2090");
  const [gender, setGender] = useState<"Male"|"Female">("Male");

  // State for dynamic BTR details
  const [currentTob, setCurrentTob] = useState(tob);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const btrData = useMemo(() => {
    if (!dob || !currentTob) return null;
    try {
        return calculateBTRData(dob, currentTob, lat, lon, gender);
    } catch {
        return null;
    }
  }, [dob, currentTob, lat, lon, gender]);

  // Adjust time by seconds
  const adjustTime = (secondsDelta: number) => {
    const [year, month, day] = dob.split('-').map(Number);
    const [h, m, s] = currentTob.split(':').map(Number);
    const date = new Date(year, month - 1, day, h || 0, m || 0, s || 0);
    date.setSeconds(date.getSeconds() + secondsDelta);

    const newY = date.getFullYear();
    const newMo = String(date.getMonth() + 1).padStart(2, '0');
    const newD = String(date.getDate()).padStart(2, '0');
    const newH = String(date.getHours()).padStart(2, '0');
    const newM = String(date.getMinutes()).padStart(2, '0');
    const newS = String(date.getSeconds()).padStart(2, '0');

    setDob(`${newY}-${newMo}-${newD}`);
    setCurrentTob(`${newH}:${newM}:${newS}`);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-surface pb-16">
      {!showForm ? (
         <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm py-3 px-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col">
               <span className="font-semibold text-lg">{name}</span>
               <span className="text-sm text-text-muted">{dob} • {currentTob} • {gender}</span>
            </div>

            <div className="flex items-center space-x-2">
               <div className="flex items-center space-x-1 border rounded p-1 bg-surface">
                   <button onClick={() => adjustTime(-3600)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-1h</button>
                   <button onClick={() => adjustTime(-60)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-1m</button>
                   <button onClick={() => adjustTime(-1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-1s</button>

                   <span className="px-4 font-mono font-bold text-lg">{currentTob}</span>

                   <button onClick={() => adjustTime(1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+1s</button>
                   <button onClick={() => adjustTime(60)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+1m</button>
                   <button onClick={() => adjustTime(3600)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+1h</button>
               </div>

               <button onClick={() => setShowForm(true)} className="ml-4 text-brand-500 underline text-sm">Edit Details</button>
            </div>
         </div>
      ) : (
        <PageHeader
          title="Birth Time Rectification (BTR)"
          subtitle="Vedic Tool"
          description="Interactive tool to adjust and rectify your exact birth time."
        />
      )}

      <main className="container mx-auto px-4 mt-8">
        {showForm ? (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold mb-4">Enter Birth Details</h2>
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded p-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date (YYYY-MM-DD)</label>
                      <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Time (HH:mm:ss)</label>
                      <input type="time" step="1" value={tob} onChange={e => { setTob(e.target.value); setCurrentTob(e.target.value); }} className="w-full border rounded p-2" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Latitude</label>
                      <input type="text" value={lat} onChange={e => setLat(e.target.value)} className="w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Longitude</label>
                      <input type="text" value={lon} onChange={e => setLon(e.target.value)} className="w-full border rounded p-2" />
                    </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select value={gender} onChange={e => setGender(e.target.value as "Male"|"Female")} className="w-full border rounded p-2">
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-full bg-brand-500 text-white font-bold py-3 rounded-lg hover:bg-brand-600 transition"
                >
                  Start Rectification
                </button>
             </div>
          </div>
        ) : btrData ? (
          <div className="flex flex-col gap-6">
             {/* Charts Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="font-bold text-center mb-2">D1 - Lagna Chart</h3>
                    <div className="w-full max-w-[300px] aspect-square">
                        <KundliChart data={btrData.chartData.d1} />
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="font-bold text-center mb-2">D9 - Navamsa</h3>
                    <div className="w-full max-w-[300px] aspect-square">
                        <KundliChart data={btrData.chartData.d9} />
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="font-bold text-center mb-2">D24 - Chaturvimshamsha</h3>
                    <div className="w-full max-w-[300px] aspect-square">
                        <KundliChart data={btrData.chartData.d24} />
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="font-bold text-center mb-2">D60 - Shashtiamsha</h3>
                    <div className="w-full max-w-[300px] aspect-square">
                        <KundliChart data={btrData.chartData.d60} />
                    </div>
                 </div>
             </div>

             {/* BTR Techniques Section */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Tattva Siddhanta */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">Tattva Siddhanta (Gender Rule)</h3>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Ascendant Element:</span>
                      <span className="font-medium">{btrData.tattva.rulingElement}</span>
                   </div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Expected Gender:</span>
                      <span className="font-medium">{btrData.tattva.expectedGender}</span>
                   </div>
                   <div className="flex justify-between items-center mt-4 p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Match Status:</span>
                      {btrData.tattva.genderMatches ? (
                         <span className="text-green-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Matched</span>
                      ) : (
                         <span className="text-red-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">cancel</span> Mismatched</span>
                      )}
                   </div>
                </div>

                {/* Kunda */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">Kunda (Lagna x 81)</h3>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Kunda Longitude:</span>
                      <span className="font-medium">{btrData.kunda.longitude.toFixed(2)}°</span>
                   </div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Kunda Rasi:</span>
                      <span className="font-medium">{btrData.kunda.rasi}</span>
                   </div>
                   <div className="flex justify-between items-center mt-4 p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Lagna Trine Match:</span>
                      {btrData.kunda.matchesLagna ? (
                         <span className="text-green-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Matched</span>
                      ) : (
                         <span className="text-yellow-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">warning</span> Adjust Time</span>
                      )}
                   </div>
                </div>

                {/* Pranapada */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">Pranapada Lagna</h3>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Pranapada Longitude:</span>
                      <span className="font-medium">{btrData.pranapada.longitude.toFixed(2)}°</span>
                   </div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Pranapada Rasi:</span>
                      <span className="font-medium">{btrData.pranapada.rasi}</span>
                   </div>
                   <p className="text-sm text-text-muted mt-3">
                     * Pranapada should ideally align with the Lagna, Navamsa Lagna, or their trines depending on the specific tradition followed by the astrologer.
                   </p>
                </div>

                {/* Gulika */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">Gulika Alignment</h3>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Gulika Longitude (Lagna point):</span>
                      <span className="font-medium">{btrData.gulika.longitude.toFixed(2)}°</span>
                   </div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Gulika Rasi:</span>
                      <span className="font-medium">{btrData.gulika.rasi}</span>
                   </div>
                   <p className="text-sm text-text-muted mt-3">
                     * Traditional texts suggest examining Gulika&apos;s relationship with the natal Ascendant for rectification.
                   </p>
                </div>

             </div>
          </div>
        ) : (
           <div className="text-center p-10 font-bold text-text-muted">Loading chart data...</div>
        )}
      </main>

      {showForm && <ExploreTools currentPath="/btr" />}
    </div>
  );
}

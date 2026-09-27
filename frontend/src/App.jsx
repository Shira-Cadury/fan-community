export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl text-center max-w-md border border-slate-700">
        <h1 className="text-3xl font-bold text-indigo-400 mb-2">
          קהילת מעריצים | Fan Community
        </h1>
        <p className="text-slate-300 mb-4">
          Tailwind CSS & React עובדים חלק!
        </p>
        <span className="inline-block px-3 py-1 text-sm bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
          סטטוס: מחובר ותקין
        </span>
      </div>
    </div>
  );
}
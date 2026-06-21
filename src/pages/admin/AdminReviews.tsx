import React, { useState } from 'react';
import { Star, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

// Mock data for reviews
const initialReviews = [
  { id: 1, customer: 'John Doe', rating: 5, comment: 'Excellent service! The technician arrived on time and fixed my fridge in 30 minutes.', date: '2026-06-20', status: 'Approved' },
  { id: 2, customer: 'Sarah Smith', rating: 4, comment: 'Good work, but the part took a few days to arrive.', date: '2026-06-19', status: 'Pending' },
  { id: 3, customer: 'Mike Johnson', rating: 1, comment: 'Tech was late and left a mess.', date: '2026-06-18', status: 'Rejected' },
  { id: 4, customer: 'Emily Brown', rating: 5, comment: 'Very professional. Highly recommend Rick Nees Repair!', date: '2026-06-15', status: 'Approved' },
];

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id: number, newStatus: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const filteredReviews = reviews.filter(r => 
    r.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-100 uppercase tracking-wide">
            Customer Reviews
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage and moderate testimonials before they appear on the website.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search reviews..." 
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 transition">
          <Filter className="w-4 h-4" /> Filter Status
        </button>
      </div>

      {/* Reviews Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Customer / Date</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredReviews.map(review => (
                <tr key={review.id} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-bold text-white">{review.customer}</p>
                    <p className="text-[10px] text-slate-500">{review.date}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1 text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-accent' : 'text-slate-700 fill-transparent'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate" title={review.comment}>
                    {review.comment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      review.status === 'Approved' ? 'bg-green-900/40 text-green-400 border border-green-800/50' :
                      review.status === 'Rejected' ? 'bg-red-900/40 text-red-400 border border-red-800/50' :
                      'bg-amber-900/40 text-amber-400 border border-amber-800/50'
                    }`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleStatusChange(review.id, 'Approved')}
                        className="p-1.5 text-slate-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition"
                        title="Approve"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(review.id, 'Rejected')}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
                        title="Reject"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-medium">
                    No reviews found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;

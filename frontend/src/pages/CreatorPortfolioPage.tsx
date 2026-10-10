import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { PortfolioItem } from '../types';
import { PortfolioItemModal } from '../components/PortfolioItemModal';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Layers, 
  Sparkles, 
  X, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal,
  ExternalLink
} from 'lucide-react';

export const CreatorPortfolioPage: React.FC = () => {
  const { user } = useAuth();
  const { creators, addPortfolioItem, editPortfolioItem, deletePortfolioItem } = useMarketplace();

  const currentCreator = creators.find(c => c.id === user?.id) || creators[0];

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<PortfolioItem | null>(null);

  // Modal State for Add / Edit Item
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'video' | 'imagery' | 'virtual-influencer' | 'product' | 'concept-art' | 'audio'>('video');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [aiToolsText, setAiToolsText] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [creatorContribution, setCreatorContribution] = useState('');
  const [promptSnippet, setPromptSnippet] = useState('');
  const [licensingInformation, setLicensingInformation] = useState('Full Commercial Buyout Cleared');

  const openAddModal = () => {
    setEditingItemId(null);
    setTitle('');
    setDescription('');
    setCategory('video');
    setThumbnailUrl('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80');
    setAiToolsText('Runway Gen-3, Midjourney v6, Topaz AI');
    setWorkflowDescription('Phase 1: Concept & Storyboard -> Phase 2: Video Diffusion -> Phase 3: Color Grading in DaVinci.');
    setCreatorContribution('Lead AI Director & Prompt Stylist');
    setPromptSnippet('cinematic photorealistic lighting, anamorphic lens, 8k resolution');
    setLicensingInformation('Full Commercial Buyout Cleared');
    setIsFormOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItemId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setThumbnailUrl(item.thumbnailUrl);
    setAiToolsText(item.aiTools.join(', '));
    setWorkflowDescription(item.workflowDescription || '');
    setCreatorContribution(item.creatorContribution || '');
    setPromptSnippet(item.promptSnippet || '');
    setLicensingInformation(item.licensingInformation || '');
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toolsArray = aiToolsText.split(',').map(t => t.trim()).filter(Boolean);

    if (editingItemId) {
      editPortfolioItem(currentCreator.id, editingItemId, {
        title,
        description,
        category,
        thumbnailUrl,
        aiTools: toolsArray,
        workflowDescription,
        creatorContribution,
        promptSnippet,
        licensingInformation
      });
    } else {
      addPortfolioItem(currentCreator.id, {
        title,
        description,
        category,
        thumbnailUrl,
        aiTools: toolsArray,
        workflowDescription,
        creatorContribution,
        promptSnippet,
        licensingInformation
      });
    }

    setIsFormOpen(false);
  };

  const handleDelete = (itemId: string, itemTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${itemTitle}" from your portfolio?`)) {
      deletePortfolioItem(currentCreator.id, itemId);
    }
  };

  // Filter items
  const filteredPortfolio = activeFilter === 'all'
    ? currentCreator.portfolio
    : currentCreator.portfolio.filter(item => item.category === activeFilter);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'video', label: 'AI Video Diffusion' },
    { id: 'imagery', label: 'Generative Imagery' },
    { id: 'virtual-influencer', label: 'Virtual Influencers & 3D' },
    { id: 'product', label: 'Product Staging' },
    { id: 'concept-art', label: 'Concept Art' },
    { id: 'audio', label: 'Voice & Audio' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Creator Studio</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">AI Creator Portfolio</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Showcase your best generative productions, diffusion prompt logs, and commercial licenses.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-xs text-white shadow-glow-sm flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Portfolio Work</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
              activeFilter === cat.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      {filteredPortfolio.length === 0 ? (
        <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Portfolio Works in this Category</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Add a project to demonstrate your skills to brands looking for this discipline.
          </p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition inline-block"
          >
            Add Work Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div 
              key={item.id}
              className="bg-[#0d111c] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden group shadow-lg transition flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Header */}
                <div 
                  className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedItemForModal(item)}
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition gap-2">
                    <span className="p-2 rounded-xl bg-slate-900/80 text-white backdrop-blur-md">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] font-semibold bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-brand-300 border border-slate-700 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2.5">
                  <h3 
                    className="text-base font-bold text-white hover:text-brand-300 cursor-pointer transition line-clamp-1"
                    onClick={() => setSelectedItemForModal(item)}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* AI Tools */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.aiTools.map((tool, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Prompt snippet preview if present */}
                  {item.promptSnippet && (
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] font-mono text-emerald-400 line-clamp-1">
                      "{item.promptSnippet}"
                    </div>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="p-4 bg-slate-900/40 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedItemForModal(item)}
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Full Details</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                    title="Edit Item"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio Item Full Modal */}
      <PortfolioItemModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
      />

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d111c] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-white">
                {editingItemId ? 'Edit Portfolio Work' : 'Add New Portfolio Work'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Provide rich details about the generation pipeline, prompt craft, and licensing rights.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Aetheria - Luxury Perfume Film"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Content Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="video">AI Video Diffusion</option>
                    <option value="imagery">Generative Imagery</option>
                    <option value="virtual-influencer">Virtual Influencers & 3D</option>
                    <option value="product">Product Staging</option>
                    <option value="concept-art">Concept Art</option>
                    <option value="audio">Voice & Audio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Thumbnail / Media URL *</label>
                  <input
                    type="url"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Brief summary of the commercial work or film spot..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">AI Tools Used (Comma-separated) *</label>
                <input
                  type="text"
                  value={aiToolsText}
                  onChange={(e) => setAiToolsText(e.target.value)}
                  placeholder="e.g. Runway Gen-3, Midjourney v6, Topaz AI"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Detailed Workflow Description</label>
                <textarea
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  rows={2}
                  placeholder="Phase 1: Storyboard -> Phase 2: High-motion diffusion -> Phase 3: Color grading..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Diffusion Prompt Snippet</label>
                <input
                  type="text"
                  value={promptSnippet}
                  onChange={(e) => setPromptSnippet(e.target.value)}
                  placeholder="cinematic micro macro shot, anamorphic 35mm lens, atmospheric haze --v 6.0"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-emerald-400 focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Creator Contribution</label>
                  <input
                    type="text"
                    value={creatorContribution}
                    onChange={(e) => setCreatorContribution(e.target.value)}
                    placeholder="e.g. Director, Prompt Engineer & Colorist"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Commercial Clearance</label>
                  <input
                    type="text"
                    value={licensingInformation}
                    onChange={(e) => setLicensingInformation(e.target.value)}
                    placeholder="e.g. Full Commercial Buyout"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition"
                >
                  {editingItemId ? 'Update Work' : 'Add to Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

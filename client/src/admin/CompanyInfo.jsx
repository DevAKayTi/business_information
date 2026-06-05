import { useState, useEffect } from 'react';

const CompanyInfoAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // State layout matching your Mongoose Schema
    const [formData, setFormData] = useState({
        overview: '',
        history: '',
        vision: '',
        mission: '',
        organizationalStructure: '',
        ceoMessage: '',
        certifications: [],
        awards: [],
        licenses: [],
        documents: []
    });

    // Temporary string tracking inputs for lists
    const [certInput, setCertInput] = useState('');
    const [awardInput, setAwardInput] = useState('');
    const [licenseInput, setLicenseInput] = useState('');
    const [docInput, setDocInput] = useState({ title: '', url: '' });

    // Fetch current company information data from API on mount
    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const response = await fetch('/api/company-info');
                const result = await response.json();
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            } catch (err) {
                setMessage({ type: 'error', text: 'Failed to retrieve company profile data.' });
            } finally {
                setLoading(false);
            }
        };
        fetchCompanyInfo();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // List Modification Handlers
    const addListItem = (field, value, setInput) => {
        if (!value.trim()) return;
        setFormData({ ...formData, [field]: [...formData[field], value.trim()] });
        setInput('');
    };

    const removeListItem = (field, index) => {
        setFormData({
            ...formData,
            [field]: formData[field].filter((_, i) => i !== index)
        });
    };

    // Document Modification Handlers
    const addDocument = () => {
        if (!docInput.title.trim() || !docInput.url.trim()) return;
        setFormData({ ...formData, documents: [...formData.documents, docInput] });
        setDocInput({ title: '', url: '' });
    };

    const removeDocument = (index) => {
        setFormData({
            ...formData,
            documents: formData.documents.filter((_, i) => i !== index)
        });
    };

    // Submit profile state changes to server API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const token = localStorage.getItem('token'); // Adjust depending on your auth storage method
            const response = await fetch('/api/company-info', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (result.success) {
                setMessage({ type: 'success', text: 'Company information updated successfully!' });
                setFormData(result.data);
            } else {
                setMessage({ type: 'error', text: result.message || 'Update failed.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Network configuration or server submission error.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Company Info Profile</h1>
                    <p className="text-slate-400 text-sm">Manage public company portfolio records, background matrices, and digital document registries.</p>
                </div>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl text-sm border ${message.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                    {message.type === 'success' ? '✅' : '❌'} {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-white">

                {/* SECTION 1: CORE SUMMARY OVERVIEW */}
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">📝 Profile Identity Summary</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-slate-400 text-xs font-medium uppercase mb-1.5">Company Overview</label>
                            <textarea name="overview" value={formData.overview} onChange={handleChange} rows="3" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Describe the company purpose..."></textarea>
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs font-medium uppercase mb-1.5">Historical Timeline</label>
                            <textarea name="history" value={formData.history} onChange={handleChange} rows="3" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Establishment timeline context..."></textarea>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: VISION & MISSION STRATEGY */}
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">🎯 Strategic Targets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-400 text-xs font-medium uppercase mb-1.5">Vision Framework</label>
                            <textarea name="vision" value={formData.vision} onChange={handleChange} rows="3" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Future operational vision..."></textarea>
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs font-medium uppercase mb-1.5">Mission Objectives</label>
                            <textarea name="mission" value={formData.mission} onChange={handleChange} rows="3" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Current production mission goals..."></textarea>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: GOVERNANCE & CORPORATE LOGISTICS */}
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">👔 Corporate Architecture</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-slate-400 text-xs font-medium uppercase mb-1.5">Organizational Framework Hierarchy Structure</label>
                            <input type="text" name="organizationalStructure" value={formData.organizationalStructure} onChange={handleChange} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Textual breakdown or link path connection to chart map visualization diagram." />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs font-medium uppercase mb-1.5">Executive CEO Message Address</label>
                            <textarea name="ceoMessage" value={formData.ceoMessage} onChange={handleChange} rows="3" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Direct messaging brief address from key stakeholders..."></textarea>
                        </div>
                    </div>
                </div>

                {/* SECTION 4: CREDENTIAL ARRAYS MATRIX */}
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">🛡️ Verifiable Verification Frameworks</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Certifications Dynamic Array Item UI */}
                        <div className="space-y-2">
                            <label className="block text-slate-400 text-xs font-medium uppercase">Certifications</label>
                            <div className="flex gap-2">
                                <input type="text" value={certInput} onChange={(e) => setCertInput(e.target.value)} className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500" placeholder="e.g. ISO 9001 Certification" />
                                <button type="button" onClick={() => addListItem('certifications', certInput, setCertInput)} className="bg-slate-800 border border-white/10 hover:bg-slate-700 px-3 rounded-xl text-sm transition-colors">+</button>
                            </div>
                            <ul className="space-y-1 max-h-32 overflow-y-auto pt-1">
                                {formData.certifications.map((item, idx) => (
                                    <li key={idx} className="flex items-center justify-between bg-slate-950/60 border border-white/5 px-2.5 py-1 rounded-lg text-xs">
                                        <span className="truncate pr-2">{item}</span>
                                        <button type="button" onClick={() => removeListItem('certifications', idx)} className="text-red-400 hover:text-red-300">✕</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Awards Dynamic Array Item UI */}
                        <div className="space-y-2">
                            <label className="block text-slate-400 text-xs font-medium uppercase">Awards Won</label>
                            <div className="flex gap-2">
                                <input type="text" value={awardInput} onChange={(e) => setAwardInput(e.target.value)} className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500" placeholder="e.g. Best Service Award 2026" />
                                <button type="button" onClick={() => addListItem('awards', awardInput, setAwardInput)} className="bg-slate-800 border border-white/10 hover:bg-slate-700 px-3 rounded-xl text-sm transition-colors">+</button>
                            </div>
                            <ul className="space-y-1 max-h-32 overflow-y-auto pt-1">
                                {formData.awards.map((item, idx) => (
                                    <li key={idx} className="flex items-center justify-between bg-slate-950/60 border border-white/5 px-2.5 py-1 rounded-lg text-xs">
                                        <span className="truncate pr-2">{item}</span>
                                        <button type="button" onClick={() => removeListItem('awards', idx)} className="text-red-400 hover:text-red-300">✕</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Licenses Dynamic Array Item UI */}
                        <div className="space-y-2">
                            <label className="block text-slate-400 text-xs font-medium uppercase">Legal Licenses</label>
                            <div className="flex gap-2">
                                <input type="text" value={licenseInput} onChange={(e) => setLicenseInput(e.target.value)} className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500" placeholder="e.g. Master Gas Fitter #11A" />
                                <button type="button" onClick={() => addListItem('licenses', licenseInput, setLicenseInput)} className="bg-slate-800 border border-white/10 hover:bg-slate-700 px-3 rounded-xl text-sm transition-colors">+</button>
                            </div>
                            <ul className="space-y-1 max-h-32 overflow-y-auto pt-1">
                                {formData.licenses.map((item, idx) => (
                                    <li key={idx} className="flex items-center justify-between bg-slate-950/60 border border-white/5 px-2.5 py-1 rounded-lg text-xs">
                                        <span className="truncate pr-2">{item}</span>
                                        <button type="button" onClick={() => removeListItem('licenses', idx)} className="text-red-400 hover:text-red-300">✕</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* SECTION 5: CORPORATE POLICY DOCUMENTS REGISTRY */}
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">📁 Compliance Documents Registry</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-slate-950 p-4 rounded-xl border border-white/5">
                        <div>
                            <label className="block text-slate-400 text-xs font-medium uppercase mb-1">Document Title</label>
                            <input type="text" value={docInput.title} onChange={(e) => setDocInput({ ...docInput, title: e.target.value })} className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="e.g. Safety Policy PDF Blueprint" />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-slate-400 text-xs font-medium uppercase mb-1">Document File Resource Location URL</label>
                                <input type="text" value={docInput.url} onChange={(e) => setDocInput({ ...docInput, url: e.target.value })} className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="/docs/safety-policy.pdf" />
                            </div>
                            <button type="button" onClick={addDocument} className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30 px-4 rounded-xl text-sm font-medium transition-colors h-9 mt-auto">Add</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {formData.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-slate-950 border border-white/5 px-4 py-2.5 rounded-xl text-sm">
                                <div className="min-w-0">
                                    <p className="text-white font-medium truncate">{doc.title}</p>
                                    <p className="text-slate-500 text-xs truncate">{doc.url}</p>
                                </div>
                                <button type="button" onClick={() => removeDocument(idx)} className="text-red-400 hover:text-red-300 ml-2">✕</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONTROLS BAR ACTIONS BUTTON SUBMIT */}
                <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
                    <button type="submit" disabled={saving} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:from-slate-800 disabled:to-slate-800 text-white disabled:text-slate-500 text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/10">
                        {saving ? 'Saving System Changes...' : '💾 Save Modifications'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompanyInfoAdmin;
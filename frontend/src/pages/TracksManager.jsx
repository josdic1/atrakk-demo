import { useState } from 'react';
import { initialData } from '../data/data';
import { 
  Music, Plus, Tag, LinkIcon, Trash2, ExternalLink, 
  Music2, Video, Image, FileText, Globe, Search, Edit, Eye, 
  HelpCircle, X, Save, Disc3
} from 'lucide-react';

function TracksManager() {
  // --- LOCAL STATE ---
  const [tracks, setTracks] = useState(initialData.tracks);
  const [artists, setArtists] = useState(initialData.artists);
  const [statuses] = useState(initialData.statuses);
  const [tags, setTags] = useState(initialData.tags);

  const [viewMode, setViewMode] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  
  const [newTrack, setNewTrack] = useState({ title: '', artist_id: '', status_id: '' });
  const [showLinkForm, setShowLinkForm] = useState(null);
  const [newLink, setNewLink] = useState({ link_type: '', link_url: '' });
  
  const [newArtist, setNewArtist] = useState('');
  const [showArtistForm, setShowArtistForm] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', artist_id: '', status_id: '' });
  const [newTag, setNewTag] = useState('');
  const [showTagForm, setShowTagForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);

  // --- HELPER FUNCTIONS ---
  const getLinkIcon = (linkType) => {
    const type = linkType.toLowerCase();
    if (type.includes('spotify') || type.includes('music') || type.includes('audio')) return <Music2 size={16} />;
    if (type.includes('youtube') || type.includes('video')) return <Video size={16} />;
    if (type.includes('image') || type.includes('cover')) return <Image size={16} />;
    if (type.includes('text') || type.includes('lyrics') || type.includes('songtrust')) return <FileText size={16} />;
    return <Globe size={16} />;
  };

  const getStatusClass = (statusName) => {
    const name = statusName?.toLowerCase().replace(/\s+/g, '-') || 'idea';
    return name;
  };

  // --- ACTIONS ---
  const createTrack = (e) => {
    e.preventDefault();
    const artist = artists.find(a => a.id === parseInt(newTrack.artist_id));
    const status = statuses.find(s => s.id === parseInt(newTrack.status_id));
    const trackToAdd = {
      ...newTrack,
      id: Date.now(),
      artist_id: parseInt(newTrack.artist_id),
      status_id: parseInt(newTrack.status_id),
      artist,
      status,
      tags: [],
      links: [],
      updated_at: new Date().toISOString()
    };
    setTracks([trackToAdd, ...tracks]);
    setNewTrack({ title: '', artist_id: '', status_id: '' });
  };

  const deleteTrack = (trackId) => {
    if (window.confirm('Delete this track?')) {
      setTracks(tracks.filter(t => t.id !== trackId));
      if (selectedTrack?.id === trackId) {
        setSelectedTrack(null);
        setViewMode(null);
      }
    }
  };

  const updateTrack = () => {
    const artist = artists.find(a => a.id === parseInt(editForm.artist_id));
    const status = statuses.find(s => s.id === parseInt(editForm.status_id));
    const updatedTracks = tracks.map(t => 
      t.id === selectedTrack.id 
        ? { ...t, ...editForm, artist_id: parseInt(editForm.artist_id), status_id: parseInt(editForm.status_id), artist, status } 
        : t
    );
    setTracks(updatedTracks);
    setSelectedTrack({ ...selectedTrack, ...editForm, artist, status });
    setViewMode('view');
  };

  const addTagToTrack = (trackId, tagId) => {
    if (!tagId) return;
    const tagObj = tags.find(t => t.id === parseInt(tagId));
    const updated = tracks.map(t => {
      if (t.id === trackId && !t.tags.find(tag => tag.id === tagObj.id)) {
        return { ...t, tags: [...t.tags, tagObj] };
      }
      return t;
    });
    setTracks(updated);
    if (selectedTrack?.id === trackId) setSelectedTrack(updated.find(t => t.id === trackId));
  };

  const removeTagFromTrack = (trackId, tagId) => {
    const updated = tracks.map(t => {
      if (t.id === trackId) return { ...t, tags: t.tags.filter(tag => tag.id !== tagId) };
      return t;
    });
    setTracks(updated);
    if (selectedTrack?.id === trackId) setSelectedTrack(updated.find(t => t.id === trackId));
  };

  const addLinkToTrack = (trackId) => {
    if (!newLink.link_type || !newLink.link_url) return;
    const linkToAdd = { ...newLink, id: Date.now() };
    const updated = tracks.map(t => {
      if (t.id === trackId) return { ...t, links: [...(t.links || []), linkToAdd] };
      return t;
    });
    setTracks(updated);
    setNewLink({ link_type: '', link_url: '' });
    setShowLinkForm(null);
    if (selectedTrack?.id === trackId) setSelectedTrack(updated.find(t => t.id === trackId));
  };

  const removeLink = (linkId) => {
    const updated = tracks.map(t => ({
      ...t,
      links: t.links.filter(l => l.id !== linkId)
    }));
    setTracks(updated);
    if (selectedTrack) setSelectedTrack(updated.find(t => t.id === selectedTrack.id));
  };

  const createArtist = (e) => {
    e.preventDefault();
    if (!newArtist.trim()) return;
    setArtists([...artists, { id: Date.now(), name: newArtist.trim() }]);
    setNewArtist('');
    setShowArtistForm(false);
  };

  const createTag = (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    setTags([...tags, { id: Date.now(), name: newTag.trim() }]);
    setNewTag('');
    setShowTagForm(false);
  };

  const handleViewTrack = (track) => {
    setSelectedTrack(track);
    setViewMode('view');
  };

  const handleEditTrack = (track) => {
    setSelectedTrack(track);
    setEditForm({ 
      title: track.title, 
      artist_id: track.artist_id?.toString() || '', 
      status_id: track.status_id?.toString() || '' 
    });
    setViewMode('edit');
  };

  const cancelEdit = () => {
    setViewMode('view');
  };

  const cancelLinkForm = () => {
    setNewLink({ link_type: '', link_url: '' });
    setShowLinkForm(null);
  };

  const cancelArtistForm = () => {
    setNewArtist('');
    setShowArtistForm(false);
  };

  const cancelTagForm = () => {
    setNewTag('');
    setShowTagForm(false);
  };

  const getFilteredList = () => {
    return tracks.filter(track => 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // --- RENDER ---
  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="top-bar">
        <h1 className="title">
          <Disc3 size={24} /> Song Manager
        </h1>
        <div className="top-actions">
          <button 
            className={`btn ${showArtistForm ? 'btn-gold' : 'btn-surface'}`}
            onClick={() => { setShowArtistForm(!showArtistForm); setShowTagForm(false); }}
          >
            <Plus size={16} /> Artist
          </button>
          <button 
            className={`btn ${showTagForm ? 'btn-gold' : 'btn-surface'}`}
            onClick={() => { setShowTagForm(!showTagForm); setShowArtistForm(false); }}
          >
            <Tag size={16} /> Tag
          </button>
        </div>
      </header>

      {/* Quick Forms */}
      {showArtistForm && (
        <div className="quick-form-bar">
          <form onSubmit={createArtist} className="quick-form">
            <input 
              type="text" 
              placeholder="Enter new artist name..." 
              value={newArtist} 
              onChange={(e) => setNewArtist(e.target.value)} 
              autoFocus
              required 
            />
            <button type="submit" className="btn btn-gold">
              <Plus size={16} /> Create Artist
            </button>
            <button type="button" className="btn btn-ghost" onClick={cancelArtistForm}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {showTagForm && (
        <div className="quick-form-bar">
          <form onSubmit={createTag} className="quick-form">
            <input 
              type="text" 
              placeholder="Enter new tag name..." 
              value={newTag} 
              onChange={(e) => setNewTag(e.target.value)} 
              autoFocus
              required 
            />
            <button type="submit" className="btn btn-gold">
              <Plus size={16} /> Create Tag
            </button>
            <button type="button" className="btn btn-ghost" onClick={cancelTagForm}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="search-container">
            <div className="search-wrapper">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                className="search-input"
                placeholder="Search tracks..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
          </div>

          <div className="scroll-area">
            {getFilteredList().map(track => (
              <div 
                key={track.id} 
                className={`track-item ${selectedTrack?.id === track.id ? 'selected' : ''}`}
                onClick={() => handleViewTrack(track)}
              >
                <div className="track-item-content">
                  <div className="track-title">{track.title}</div>
                  <div className="track-artist">{track.artist?.name}</div>
                </div>
                <span className={`track-status-badge ${getStatusClass(track.status?.name)}`}>
                  {track.status?.name}
                </span>
              </div>
            ))}
          </div>

          {/* Create Track Form */}
          <div className="create-form-container">
            <form onSubmit={createTrack} className="create-form">
              <input 
                type="text" 
                placeholder="Track title..." 
                value={newTrack.title} 
                onChange={(e) => setNewTrack({...newTrack, title: e.target.value})} 
                required 
              />
              <div className="form-row">
                <select 
                  value={newTrack.artist_id} 
                  onChange={(e) => setNewTrack({...newTrack, artist_id: e.target.value})} 
                  required
                >
                  <option value="">Select Artist</option>
                  {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <select 
                  value={newTrack.status_id} 
                  onChange={(e) => setNewTrack({...newTrack, status_id: e.target.value})} 
                  required
                >
                  <option value="">Select Status</option>
                  {statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-gold">
                <Plus size={16} /> Create Track
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {viewMode === 'view' && selectedTrack && (
            <>
              <div className="track-header">
                <div className="track-header-info">
                  <h2 className="track-name">{selectedTrack.title}</h2>
                  <div className="track-meta">
                    <p className="track-artist-large">by {selectedTrack.artist?.name}</p>
                    <span className={`track-status-large ${getStatusClass(selectedTrack.status?.name)}`}>
                      {selectedTrack.status?.name}
                    </span>
                  </div>
                </div>
                <div className="track-actions">
                  <button className="btn btn-surface" onClick={() => handleEditTrack(selectedTrack)}>
                    <Edit size={16} /> Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteTrack(selectedTrack.id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
              
              {/* Tags Section */}
              <section className="section">
                <h3 className="section-title"><Tag size={14} /> Tags</h3>
                <div className="tags-list">
                  {selectedTrack.tags?.map(t => (
                    <span key={t.id} className="tag-pill">
                      {t.name}
                      <span className="tag-remove" onClick={() => removeTagFromTrack(selectedTrack.id, t.id)}>×</span>
                    </span>
                  ))}
                  <select 
                    className="add-tag-select"
                    value=""
                    onChange={(e) => addTagToTrack(selectedTrack.id, e.target.value)}
                  >
                    <option value="">+ Add Tag</option>
                    {tags
                      .filter(t => !selectedTrack.tags?.find(st => st.id === t.id))
                      .map(t => <option key={t.id} value={t.id}>{t.name}</option>)
                    }
                  </select>
                </div>
              </section>

              {/* Links Section */}
              <section className="section">
                <h3 className="section-title"><LinkIcon size={14} /> Links</h3>
                <div className="links-list">
                  {selectedTrack.links?.map(l => (
                    <div key={l.id} className="link-card">
                      <div className="link-icon">{getLinkIcon(l.link_type)}</div>
                      <span className="link-type">{l.link_type}</span>
                      <div className="link-url">
                        <a href={l.link_url} target="_blank" rel="noreferrer">
                          {l.link_url}
                        </a>
                      </div>
                      <button className="link-remove" onClick={() => removeLink(l.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {showLinkForm === selectedTrack.id ? (
                  <div className="link-form">
                    <div className="link-form-row">
                      <input 
                        type="text" 
                        placeholder="Type (e.g. Spotify, YouTube, Audio)" 
                        value={newLink.link_type} 
                        onChange={(e) => setNewLink({...newLink, link_type: e.target.value})} 
                      />
                    </div>
                    <div className="link-form-row">
                      <input 
                        type="url" 
                        placeholder="URL (https://...)" 
                        value={newLink.link_url} 
                        onChange={(e) => setNewLink({...newLink, link_url: e.target.value})} 
                      />
                    </div>
                    <div className="link-form-actions">
                      <button className="btn btn-gold" onClick={() => addLinkToTrack(selectedTrack.id)}>
                        <Save size={16} /> Save Link
                      </button>
                      <button className="btn btn-ghost" onClick={cancelLinkForm}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="btn btn-surface mt-lg" onClick={() => setShowLinkForm(selectedTrack.id)}>
                    <Plus size={16} /> Add Link
                  </button>
                )}
              </section>
            </>
          )}

          {viewMode === 'edit' && selectedTrack && (
            <div className="edit-panel">
              <h2 className="track-name">Edit Track</h2>
              <form className="edit-form" onSubmit={(e) => { e.preventDefault(); updateTrack(); }}>
                <div className="edit-form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    value={editForm.title} 
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})} 
                    required
                  />
                </div>
                <div className="edit-form-group">
                  <label>Artist</label>
                  <select 
                    value={editForm.artist_id} 
                    onChange={(e) => setEditForm({...editForm, artist_id: e.target.value})} 
                    required
                  >
                    <option value="">Select Artist</option>
                    {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
                <div className="edit-form-group">
                  <label>Status</label>
                  <select 
                    value={editForm.status_id} 
                    onChange={(e) => setEditForm({...editForm, status_id: e.target.value})} 
                    required
                  >
                    <option value="">Select Status</option>
                    {statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="edit-form-actions">
                  <button type="submit" className="btn btn-gold">
                    <Save size={16} /> Save Changes
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {!viewMode && (
            <div className="empty-state">
              <Music size={80} />
              <p>Select a track from the list to view details</p>
            </div>
          )}
        </main>
      </div>

      {/* Floating Help Button */}
      <button className="help-fab" onClick={() => setShowHelpModal(true)} title="Help">
        <HelpCircle />
      </button>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                <HelpCircle size={20} /> How to Use Tracks Manager
              </h3>
              <button className="modal-close" onClick={() => setShowHelpModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <h4><Music size={16} /> Overview</h4>
              <p>
                Tracks Manager helps you organize your music projects. Keep track of songs, 
                their status, associated links, and categorize them with tags.
              </p>

              <h4><Plus size={16} /> Creating Tracks</h4>
              <p>
                Use the form at the bottom of the sidebar to create new tracks. 
                Enter a title, select an artist and status, then click <code>Create Track</code>.
              </p>

              <h4><Tag size={16} /> Managing Artists & Tags</h4>
              <p>
                Click the <code>+ Artist</code> or <code>+ Tag</code> buttons in the header 
                to add new artists or tags to your library. These can then be assigned to tracks.
              </p>

              <h4><Eye size={16} /> Viewing & Editing</h4>
              <ul>
                <li>Click any track in the sidebar to view its details</li>
                <li>Click <code>Edit</code> to modify the track's title, artist, or status</li>
                <li>Click <code>Delete</code> to remove a track (this cannot be undone)</li>
              </ul>

              <h4><LinkIcon size={16} /> Adding Links</h4>
              <p>
                When viewing a track, click <code>Add Link</code> to attach URLs like 
                Spotify links, YouTube videos, or any other relevant resources.
              </p>

              <h4><Search size={16} /> Searching</h4>
              <p>
                Use the search bar at the top of the sidebar to filter tracks by 
                title or artist name.
              </p>

              <h4><Disc3 size={16} /> Status Workflow</h4>
              <p>
                Track your songs through the production pipeline: 
                <code>Idea</code> → <code>Demo</code> → <code>In Progress</code> → 
                <code>Completed</code> → <code>Released</code>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TracksManager;
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Youtube,
  Play,
  Search,
  ExternalLink,
  Download,
  BookOpen,
  User,
  Clock,
  Eye,
  X,
  Share2,
  Check,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  PlayCircle,
  Edit,
  Plus
} from '../Icons';

export const YouTubeHub = () => {
  const {
    coachingInfo,
    videos,
    playingVideo,
    setPlayingVideo,
    savedVideoIds,
    toggleSaveVideo,
    showToast,
    isTeacherMode,
    navigateToAdmin
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Dynamic subject categories from current video list
  const subjects = ['All', ...Array.from(new Set(videos.map(v => v.category || v.subject)))];

  const filteredVideos = videos.filter((video) => {
    const matchesSubject = selectedSubject === 'All' || video.category === selectedSubject || video.subject === selectedSubject;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSaved = !showSavedOnly || savedVideoIds.includes(video.id);
    return matchesSubject && matchesSearch && matchesSaved;
  });

  const handleShare = (video) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast('Video link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDownloadNotes = (video) => {
    showToast(`Downloading lecture PDF notes for: ${video.title}`);
  };

  return (
    <section className="section" id="youtube-hub" style={{ background: 'var(--bg-card)' }}>
      <div className="container">
        {/* YouTube Channel Hero Banner */}
        <div className="yt-hero-banner">
          <div>
            <div className="yt-badge-strip">
              <span className="badge badge-danger" style={{ background: 'var(--youtube-red)', color: '#fff' }}>
                <Youtube size={14} /> Official YouTube Channel
              </span>
              <span className="badge badge-dark">100% Free Daily Masterclasses</span>
              {isTeacherMode && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigateToAdmin('youtube')}
                  style={{ borderRadius: 'var(--radius-full)', padding: '2px 10px', fontSize: '0.72rem', height: '24px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}
                  title="Edit Subscribers & Channel Info"
                >
                  <Edit size={11} /> Teacher: Edit YouTube Info
                </button>
              )}
            </div>

            <h2 className="yt-channel-title">{coachingInfo.youtubeChannel}</h2>
            <p style={{ color: '#d4d4d4', maxWidth: '620px', fontSize: '0.98rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Join over {coachingInfo.youtubeSubscribers} learners mastering English grammar rules, fearless spoken fluency, error spotting hacks, root vocabulary, and full board exam breakdowns completely free on {coachingInfo.youtubeHandle || '@umaenglishlearnology'}.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={coachingInfo.youtubeLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-youtube"
              >
                <Youtube size={18} />
                <span>Subscribe on YouTube ({coachingInfo.youtubeSubscribers})</span>
                <ExternalLink size={14} />
              </a>

              {isTeacherMode && (
                <button
                  onClick={() => navigateToAdmin('youtube')}
                  className="btn btn-secondary"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  <Edit size={14} /> Update Real Subscriber Count
                </button>
              )}

              <span className="yt-sub-count">
                Daily One-Shot Marathons & Live Q&A Sessions
              </span>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="section-title-wrap">
          <div className="section-badge">
            <Youtube size={14} color="var(--youtube-red)" /> Video Classroom Catalog
          </div>
          <h2 className="section-title">Free Concept Revision Masterclasses</h2>
          <p className="section-subtitle">
            Curated high-yield video lectures covering spoken communication, 100 grammar rules, IELTS speaking frameworks, and board exam blueprints.
          </p>
          {isTeacherMode && (
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigateToAdmin('youtube')}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
              >
                <Plus size={13} /> Teacher: Add New Video Masterclass
              </button>
            </div>
          )}
        </div>

        {/* Search, Filter Pills & Watch Later Toggle */}
        <div style={{ maxWidth: '850px', margin: '0 auto 3rem' }}>
          {/* Search bar */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search lectures by title, topic, or instructor name..."
                className="form-control"
                style={{ paddingLeft: '46px', borderRadius: 'var(--radius-full)' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              className={`btn btn-sm ${showSavedOnly ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1.15rem' }}
              onClick={() => setShowSavedOnly(!showSavedOnly)}
            >
              {showSavedOnly ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              <span>Watch Later ({savedVideoIds.length})</span>
            </button>
          </div>

          {/* Subject Category Pills */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`btn btn-sm ${selectedSubject === sub ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1.15rem' }}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="video-grid">
          {filteredVideos.map((video) => {
            const isSaved = savedVideoIds.includes(video.id);
            return (
              <div key={video.id} className="video-card">
                {/* Thumbnail & Duration */}
                <div
                  className="video-thumb-wrap"
                  onClick={() => setPlayingVideo(video)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={video.thumbnail} alt={video.title} className="video-thumb" />
                  <span className="video-duration-badge">{video.duration}</span>

                  <div className="video-play-overlay">
                    <div className="video-play-circle">
                      <Play size={22} fill="#ffffff" />
                    </div>
                  </div>

                  {video.isFeatured && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      Featured Masterclass
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge badge-primary">{video.category || video.subject}</span>
                      {isTeacherMode && (
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '2px 8px', fontSize: '0.7rem', height: '22px' }}
                          onClick={(e) => { e.stopPropagation(); navigateToAdmin('youtube', video.id); }}
                          title="Edit this Masterclass in Admin"
                        >
                          <Edit size={11} /> Edit
                        </button>
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSaveVideo(video.id); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSaved ? 'var(--primary)' : 'var(--text-muted)' }}
                      title={isSaved ? 'Remove from Watch Later' : 'Save to Watch Later'}
                    >
                      {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                    </button>
                  </div>

                  <h3
                    style={{ fontSize: '1.05rem', lineHeight: 1.35, marginBottom: '0.5rem', cursor: 'pointer' }}
                    onClick={() => setPlayingVideo(video)}
                  >
                    {video.title}
                  </h3>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5, flex: 1 }}>
                    {video.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={14} />
                      <span>{video.instructor}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.publishDate}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => setPlayingVideo(video)}
                    >
                      <Play size={15} /> Watch Lecture
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleDownloadNotes(video)}
                      title="Download PDF Notes"
                    >
                      <Download size={15} /> Notes
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredVideos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <Youtube size={48} color="var(--youtube-red)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3>No video lectures found</h3>
            <p style={{ marginTop: '0.5rem' }}>Try clearing your search query or reset filters.</p>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '1rem' }}
              onClick={() => { setSelectedSubject('All'); setSearchQuery(''); setShowSavedOnly(false); }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {playingVideo && (
        <div className="modal-backdrop" onClick={() => setPlayingVideo(null)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()} style={{ background: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Youtube size={22} color="var(--youtube-red)" />
                <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>{playingVideo.title}</h3>
              </div>
              <button
                className="btn btn-secondary btn-icon-only"
                style={{ background: '#1e293b', color: '#fff', border: 'none' }}
                onClick={() => setPlayingVideo(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: 0 }}>
              {/* Responsive Video Container */}
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000' }}>
                <iframe
                  src={playingVideo.embedUrl || `https://www.youtube-nocookie.com/embed/${playingVideo.youtubeId}?autoplay=1`}
                  title={playingVideo.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Info Strip */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <span className="badge badge-primary" style={{ marginBottom: '6px' }}>{playingVideo.category}</span>
                    <h2 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '4px' }}>{playingVideo.title}</h2>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                      Taught by <strong>{playingVideo.instructor}</strong> • {playingVideo.views} views • {playingVideo.publishDate}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ background: '#1e293b', color: '#fff', border: 'none' }}
                      onClick={() => toggleSaveVideo(playingVideo.id)}
                    >
                      {savedVideoIds.includes(playingVideo.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      <span>{savedVideoIds.includes(playingVideo.id) ? 'Saved' : 'Watch Later'}</span>
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ background: '#1e293b', color: '#fff', border: 'none' }}
                      onClick={() => handleShare(playingVideo)}
                    >
                      {copiedLink ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
                      <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleDownloadNotes(playingVideo)}
                    >
                      <Download size={16} /> Notes PDF
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {playingVideo.description}
                </p>

                {/* Interactive Chapters */}
                {playingVideo.chapters && playingVideo.chapters.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={16} color="var(--primary)" /> Lecture Timeline & Chapters
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {playingVideo.chapters.map((ch, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: '#1e293b',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            color: '#94a3b8',
                            border: '1px solid #334155'
                          }}
                        >
                          {ch}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

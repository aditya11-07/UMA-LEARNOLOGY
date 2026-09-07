import React, { useRef, useState } from 'react';
import { Upload, Camera, Trash2, Link as LinkIcon, Image as ImageIcon, Check } from './Icons';

export const ImageUploadInput = ({
  value = '',
  onChange,
  label = 'Upload Photo / Image',
  shape = 'circle', // 'circle' | 'rect' | 'rounded'
  aspectRatio = '1/1', // '1/1' | '16/9' | 'auto'
  presets = null,
  helperText = 'Choose an image file from your device (PNG, JPG, WebP) or camera',
  previewSize = 72
}) => {
  const fileInputRef = useRef(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      // Auto-compress large images using canvas to prevent localStorage overflow
      const img = new Image();
      img.onload = () => {
        const maxDim = 800;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        onChange(compressedDataUrl);
      };
      img.onerror = () => {
        onChange(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApplyUrl = (e) => {
    e.preventDefault();
    if (urlDraft.trim()) {
      onChange(urlDraft.trim());
      setUrlDraft('');
      setShowUrlInput(false);
    }
  };

  const isCircle = shape === 'circle';
  const is16by9 = aspectRatio === '16/9';

  return (
    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
      {label && <label className="form-label" style={{ fontWeight: 700 }}>{label}</label>}

      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Live Preview Box */}
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: is16by9 ? '120px' : `${previewSize}px`,
            height: is16by9 ? '68px' : `${previewSize}px`,
            borderRadius: isCircle ? '50%' : '14px',
            overflow: 'hidden',
            border: dragActive ? '2px dashed var(--primary)' : '2.5px solid var(--primary-light)',
            boxShadow: 'var(--shadow-md)',
            background: 'var(--bg-card-subtle)',
            flexShrink: 0,
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          title="Click to choose image file from device"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {value ? (
            <img
              src={value}
              alt="Uploaded Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: 'var(--text-muted)' }}>
              <Camera size={22} color="var(--primary)" />
              <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>Add Photo</span>
            </div>
          )}

          {/* Hover overlay hint */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s',
              fontSize: '0.7rem',
              fontWeight: 700
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
          >
            <Camera size={18} />
          </div>
        </div>

        {/* Upload Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => fileInputRef.current?.click()}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Upload size={14} />
              <span>Choose Image File</span>
            </button>

            {value && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => onChange('')}
                style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px' }}
                title="Remove current image"
              >
                <Trash2 size={13} />
                <span>Remove</span>
              </button>
            )}

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowUrlInput(!showUrlInput)}
              style={{ fontSize: '0.74rem', padding: '0.35rem 0.6rem' }}
              title="Toggle Paste Web URL option"
            >
              <LinkIcon size={12} />
              <span>{showUrlInput ? 'Hide URL' : 'Paste URL'}</span>
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {helperText && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {helperText}
            </div>
          )}

          {/* Optional Paste URL Input Drawer */}
          {showUrlInput && (
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              <input
                type="text"
                className="form-control"
                style={{ fontSize: '0.82rem', padding: '0.35rem 0.65rem' }}
                placeholder="Paste direct https:// image URL..."
                value={urlDraft}
                onChange={(e) => setUrlDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleApplyUrl(e);
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleApplyUrl}
              >
                <Check size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Preset Avatars (if provided) */}
      {presets && presets.length > 0 && (
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Or choose a preset portrait avatar:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {presets.map((presetUrl, idx) => (
              <div
                key={idx}
                onClick={() => onChange(presetUrl)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: value === presetUrl ? '3px solid var(--primary)' : '2px solid var(--border-color)',
                  boxShadow: value === presetUrl ? '0 0 8px var(--primary-glow)' : 'none',
                  transition: 'transform 0.15s',
                  transform: value === presetUrl ? 'scale(1.08)' : 'scale(1)'
                }}
                title={`Select Avatar Preset ${idx + 1}`}
              >
                <img src={presetUrl} alt="preset" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

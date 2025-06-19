'use client'

import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
import { Plus, AlertTriangle, Loader2, Edit3, Trash2, HomeIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Room {
  id: string;
  name: string;
  provider?: string | null;
}

interface ChatSidebarProps {
  rooms: Room[];
  activeRoomId: string | null;
  onNewRoom: () => void;
  onSelectRoom: (roomId: string) => void;
  onUpdateTitle: (roomId: string, newTitle: string) => void;
  onDeleteRoom: (roomId: string) => void;
  isLoading?: boolean;
  error?: string | null;
  isUserAuth: boolean;
  onLoginClick: () => void;
  onClose?: () => void; 
}

const ChatSidebar: React.FC<ChatSidebarProps> = React.forwardRef<HTMLDivElement, ChatSidebarProps>((
  {
    rooms,
    activeRoomId,
    onNewRoom,
    onSelectRoom,
    onUpdateTitle,
    onDeleteRoom,
    isLoading,
    error,
    isUserAuth,
    onLoginClick,
    onClose,
  }, ref // Forwarded ref
) => {
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const editInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleEditClick = (room: Room) => {
    setEditingRoomId(room.id);
    setEditingTitle(room.name);
  };

  const handleSaveTitle = () => {
    if (editingRoomId && editingTitle.trim()) {
      onUpdateTitle(editingRoomId, editingTitle.trim());
    }
    setEditingRoomId(null);
    setEditingTitle('');
  };

  useEffect(() => {
    if (editingRoomId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingRoomId]);

  return (
    // Use the forwarded ref here if needed for the root element, though your layout puts it on parent divs
    // For now, applying to the aside as it's the root of this component
    <aside ref={ref} className="flex flex-col h-full bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 md:w-64 lg:w-72">
      
      {/* New Chat Button */}
      <div className="p-2 sm:p-3 border-b border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => {
            if (isUserAuth) {
              onNewRoom();
              if (onClose) onClose(); 
            } else {
              onLoginClick();
            }
          }}
          disabled={isLoading && !isUserAuth} // Allow creating new chat even if list is loading, if authenticated
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg text-sm font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors h-10 disabled:opacity-70 disabled:cursor-not-allowed"
        >
           <img src="content/images/fusion.png" alt="Fusion AI Logo" className="w-5 h-5" />
          <span>{isUserAuth ? 'New Chat' : 'Login to Chat'}</span> {/* Change text if not authenticated */}
        </button>
         {/* Close button - mobile only */}
         {onClose && (
          <button
            onClick={onClose}
            className="md:hidden ml-2 p-2 rounded-full hover:bg-gray-100 h-10 w-10 flex items-center justify-center"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        )}

      </div>

      {/* Loading/Error States */}
      {isLoading && !rooms.length && (
         <div className="p-3 text-center text-gray-500 dark:text-neutral-400 flex items-center justify-center">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading chats...
        </div>
      )}
      {error && (
        <div className="p-3 m-2 text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/50 rounded-md">
            <AlertTriangle size={20} className="inline mr-1 mb-0.5" /> Error: {error}
        </div>
      )}
      {!isLoading && !error && !isUserAuth && rooms.length === 0 && (
        <p className="p-4 text-center text-base text-neutral-500 dark:text-neutral-400">
          Please log in to see your chats.
        </p>
      )}
       {!isLoading && !error && isUserAuth && rooms.length === 0 && (
          <p className="p-4 text-center text-base text-neutral-500 dark:text-neutral-400">
            No chats yet. Click "New Chat" to start!
          </p>
        )}


      {/* Chat Rooms List */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {isUserAuth && rooms.map((room) => (
            <div
                key={room.id}
                onClick={() => {
                  if (editingRoomId !== room.id) {
                    onSelectRoom(room.id);
                    if (onClose) onClose(); 
                  }
                }}
                className={`group flex items-center justify-between p-2.5 rounded-md cursor-pointer text-sm transition-colors ${
                    activeRoomId === room.id && !editingRoomId
                        ? 'bg-orange-100 dark:bg-orange-500/30 text-orange-700 dark:text-orange-300 font-medium'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-800 dark:hover:text-neutral-100'
                }`}
            >
                {editingRoomId === room.id ? (
                    <input
                        ref={editInputRef}
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={handleSaveTitle}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTitle();
                            if (e.key === 'Escape') {
                              setEditingRoomId(null);
                              setEditingTitle('');
                            }
                        }}
                        onClick={(e) => e.stopPropagation()} 
                        className="w-full p-1 border border-orange-300 dark:border-orange-400 rounded-md text-sm focus:ring-1 focus:ring-orange-500 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 flex-1 mr-2 min-w-0"
                        autoFocus
                    />
                ) : (
                    <div className="flex items-center flex-1 mr-2 min-w-0"> {/* Container for icon and name */}
                        {/* Provider Icon */}
                        {room.provider && (
                          <img
                            src={`/${room.provider.toLowerCase().replace(/\s+/g, '-')}.png`}
                            alt={`${room.provider} icon`}
                            className="w-5 h-5 mr-1.5 flex-shrink-0"
                            onError={(e) => {
                              // Attempt to load neuro-switch.png if neuroswitch fails (common variation)
                              const target = e.currentTarget as HTMLImageElement;
                              if (room.provider?.toLowerCase() === 'neuroswitch') {
                                target.src = '/neuro-switch.png';
                                // Ensure onError isn't called again for this specific fallback
                                target.onerror = null;
                              } else {
                                target.style.display = 'none';
                              }
                            }}
                          />
                        )}
                        <span className="truncate">{room.name || `Chat ${room.id.substring(0, 4)}`}</span>
                    </div>
                )}
                {activeRoomId === room.id && !editingRoomId && (
                    <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleEditClick(room); }}
                            className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 rounded-md"
                            title="Edit title"
                        > <Edit3 size={16} /> </button>
                        <button
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                if (window.confirm('Are you sure you want to delete this chat?')) {
                                    onDeleteRoom(room.id); 
                                    if (onClose) onClose(); // Close sidebar after delete on mobile
                                }
                            }}
                            className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 rounded-md"
                            title="Delete chat"
                        > <Trash2 size={16} /> </button>
                    </div>
                )}
            </div>
        ))}
      </nav>

      {/* Footer (Home button, etc.) */}
      <div className="p-2 border-t border-neutral-200 dark:border-neutral-700 sticky bottom-0 bg-white dark:bg-neutral-800 z-10">
        <button
            onClick={() => {
                router.push('/');
                if (onClose) onClose(); 
            }}
            className="w-full flex items-center justify-start gap-2 p-2.5 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm transition-colors h-10"
            title="Go to Home"
        >
            <HomeIcon size={18} />
            <span>Home</span>
        </button>
      </div>
    </aside>
  );
});

ChatSidebar.displayName = 'ChatSidebar'; // for DevTools

export default ChatSidebar;
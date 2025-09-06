import React, { useState, useRef, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
// import axios from 'axios'; // Will be replaced by apiClient
import apiClient from '../../lib/apiClient'; // Import apiClient
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import { Element } from 'hast';
import { useUser } from '../../contexts/UserContext'; // Import useUser
import { FileText, Lightbulb, Code, Eye, Copy, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
// import type { CodeProps } from 'react-markdown/lib/ast-to-react'; // Removed this due to import error

// Register languages
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('py', python);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('md', markdown);

// Define types for better type checking
interface MessageReactions {
  like: number;
  dislike: number;
}

interface MessageReactionResponse {
  success: boolean;
  counts: MessageReactions;
  userReaction: 'like' | 'dislike' | null;
  reaction?: any; // For the POST response
}

interface Message {
  id?: number | string; // Allow string for temporary IDs
  role: 'user' | 'assistant';
  content: string | any; // Allow 'any' for initial state, but expect string for rendering
  provider?: string;
  isError?: boolean; // Add optional isError for styling error messages
  isLoading?: boolean; // Added for temporary loading state
  reactions?: MessageReactions; // Add reaction counts
  userReaction?: 'like' | 'dislike' | null; // User's current reaction
  // New file/image support fields
  image_url?: string;
  file_url?: string;
  file_name?: string;
  mime_type?: string;
  // Consider adding timestamp if needed for local display sorting before saving
}

// Copied from ChatLayout - consider moving to a shared types file (e.g., types/chat.ts)
interface ChatSession {
  id: number;
  user_id: number;
  title: string | null;
  ui_selected_provider: string | null;
  created_at: string;
  updated_at: string;
  last_message_at: string;
}

interface AiResponseType {
  output?: string;
  text?: string;
  tokens?: number;
  fallback_reason?: string;
}

interface ApiResponseData {
  prompt: string;
  response: AiResponseType;
  provider: string;
  model: string | null;
  tokens?: {
    input_tokens?: number;
    output_tokens?: number;
    total_tokens?: number;
    max_tokens?: number;
  };
  tool_name?: string;
  file_downloads?: any[];
  // New file/image support fields
  image_url?: string;
  file_url?: string;
  file_name?: string;
  mime_type?: string;
}

interface AiModel {
  id: string;         // Will store the id_string from the DB (e.g., "openai/gpt-4.1")
  name: string;       // Display name from DB (e.g., "OpenAI: GPT-4.1")
  provider: string;   // General provider name from DB (e.g., "OpenAI", "Google", "Anthropic")
  is_active: boolean;
}

interface ChatWindowProps {
  activeChatId: number | null;
  onChatCreated: (newChat: ChatSession) => void; // Callback to inform layout of new chat
  // Add lifted state props from ChatLayout
  selectedModel: string; // This is the ID like "neuroswitch", "openai", "gpt-4o"
  allModels: AiModel[];   // List of all available AiModel objects
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
  neuroStatus: 'green' | 'orange' | '';
  setNeuroStatus: React.Dispatch<React.SetStateAction<'green' | 'orange' | ''>>;
  // isManualScrolling?: boolean; // Removed, will be handled internally by isScrolledUp
  promptForLogin: () => void; // Add promptForLogin prop
  // We might also need onMessageSaved or similar to trigger chat list refresh in layout
}

// Define the structure for a single message from GET /api/chats/:chatId response
interface FetchedMessage extends Message { // Extends existing Message interface
    id: number;
    chat_id: number;
    timestamp: string;
    // provider and model_used are already in Message if it came from an assistant
}

// Define the structure for the response of GET /api/chats/:chatId
interface FetchedChatSession extends ChatSession {
    messages: FetchedMessage[];
}

// Define the structure for the response of GET /api/chats/:chatId/tokens
interface ChatTokensResponse {
  chat_id: number;
  total_tokens: number;
  total_input_tokens: number;
  total_output_tokens: number;
  total_requests: number;
  is_approaching_limit: boolean;
  is_over_limit: boolean;
}

// Define a specific type for the props of the custom code component
interface CustomCodeProps {
  node?: Element; // Made node optional to align with TS error
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any; // Allow other props
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  activeChatId, 
  onChatCreated,
  selectedModel, // Destructure new props
  allModels,     // Destructure new props
  setSelectedModel, 
  neuroStatus, 
  setNeuroStatus,
  // isManualScrolling = false, // Removed
  promptForLogin // Destructure promptForLogin
}) => {
  const { user } = useUser(); // Get user from context
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [tokensUsed, setTokensUsed] = useState(0);
  const [historicalTokens, setHistoricalTokens] = useState(0);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);
  const maxTokens = 200000;
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<number | string | null>(null);

  const hasMessages = messages.length > 0;

  // Effect to handle activeChatId changes (new chat, loading existing chat)
  useEffect(() => {
    const loadChatMessages = async (chatId: number) => {
      console.log(`ChatWindow: Attempting to load messages for chat ID: ${chatId}`);
      setIsLoadingMessages(true);
      setMessages([]); // Clear existing messages first
      setInput(''); // Clear input field as well
      // setTokensUsed(0); // Reset token usage for the loaded session

      // const token = localStorage.getItem('auth_token'); // Handled by apiClient
      // if (!token) { // Handled by apiClient
      //   // This case should ideally be handled globally, but good to have a local check
      //   // setMessages([{ role: 'assistant', content: 'Authentication error: Cannot load chat.' }]);
      //   console.error('ChatWindow: No auth token found, cannot load chat.');
      //   setIsLoadingMessages(false);
      //   if (textareaRef.current) textareaRef.current.focus(); // Focus even on error/return
      //   return;
      // }

      try {
        // const response = await axios.get<FetchedChatSession>(`/api/chats/${chatId}`, { // Old call
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        const response = await apiClient.get<FetchedChatSession>(`/chats/${chatId}`); // New call
        const chatData = response.data;
        
        // Map FetchedMessage to Message if necessary, though structure might be compatible
        // For now, assuming FetchedMessage is compatible with local Message type
        setMessages(chatData.messages);
        
        // Load reaction data for all messages with IDs
        const messagesWithIds = chatData.messages.filter(msg => msg.id && typeof msg.id === 'number');
        if (messagesWithIds.length > 0) {
          const messagesWithReactions = await Promise.all(
            messagesWithIds.map(async (msg) => {
              try {
                const reactionResponse = await apiClient.get<{ counts: MessageReactions; userReaction: 'like' | 'dislike' | null }>(`/chats/messages/${msg.id}/reactions`);
                return {
                  ...msg,
                  reactions: reactionResponse.data.counts,
                  userReaction: reactionResponse.data.userReaction
                };
              } catch (error) {
                console.error(`Failed to load reactions for message ${msg.id}:`, error);
                return {
                  ...msg,
                  reactions: { like: 0, dislike: 0 },
                  userReaction: null
                };
              }
            })
          );
          setMessages(messagesWithReactions);
        }
        // When loading a chat, update the selectedModel in the parent (ChatLayout)
        if (chatData.ui_selected_provider) {
          setSelectedModel(chatData.ui_selected_provider); 
        } else {
          // setSelectedModel(getDefaultModel()); // getDefaultModel is in ChatLayout
          // Need a way to get default if not set, or ChatLayout handles this
        }
        console.log(`ChatWindow: Successfully loaded ${chatData.messages.length} messages for chat ID: ${chatId}`);

      } catch (err: any) {
        console.error('ChatWindow: Error fetching chat messages:', err);
        setMessages((prev) => [...prev, { role: 'assistant', content: `Error loading chat: ${err.response?.data?.error || err.message}` }]);
      }
      setIsLoadingMessages(false);
      if (textareaRef.current) textareaRef.current.focus(); // Focus after loading attempt
    };

    // Function to load historical tokens for existing chat
    const loadChatTokens = async (chatId: number) => {
      setIsLoadingTokens(true);
      try {
        const response = await apiClient.get<ChatTokensResponse>(`/chats/${chatId}/tokens`);
        const historical = response.data.total_tokens || 0;
        setHistoricalTokens(historical);
        setTokensUsed(historical); // Initialize with historical total
        console.log(`ChatWindow: Loaded ${historical} historical tokens for chat ${chatId}`);
        
        // Check if over limit and log warning
        if (response.data.is_over_limit) {
          console.warn(`Chat ${chatId} has exceeded 200k token limit`);
        }
      } catch (error) {
        console.error('Failed to load chat tokens:', error);
        setHistoricalTokens(0);
        setTokensUsed(0);
      } finally {
        setIsLoadingTokens(false);
      }
    };

    if (activeChatId === null) {
      // New chat mode: reset state
      setMessages([]);
      setInput('');
      // setSelectedModel(getDefaultModel()); // Handled by ChatLayout or on new chat creation
      setImageData(null);
      setImagePreview(null);
      setCurrentMode(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setNeuroStatus('');
      setTokensUsed(0);
      setHistoricalTokens(0); // 🆕 Reset historical tokens for new chat
      setLoading(false); 
      setIsLoadingMessages(false); // Ensure this is also false
      setIsScrolledUp(false); // Reset scroll state
      console.log('ChatWindow: New chat mode activated, state reset.');
      if (textareaRef.current) textareaRef.current.focus(); // Focus for new chat
    } else {
      // Existing chat mode: fetch messages and tokens for activeChatId
      loadChatMessages(activeChatId);
      loadChatTokens(activeChatId); // 🆕 Load historical tokens
      setIsScrolledUp(false); // Reset scroll state when loading new chat
    }
  }, [activeChatId, setSelectedModel, setNeuroStatus]); // Added dependencies from lifted state

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = '40px';
      ta.style.height = `${Math.max(40, ta.scrollHeight)}px`;
    }
  }, [input]);

  const handleSend = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (!user) {
      promptForLogin();
      return;
    }

    if (!input.trim() && !imageData) return;
    
    // const token = localStorage.getItem('auth_token'); // Handled by apiClient
    // if (!token) { // Handled by apiClient
    //   setMessages((prev) => [
    //     ...prev,
    //     { role: 'assistant', content: 'Authentication error: Please log in.', isError: true },
    //   ]);
    //   return;
    // }

    // Capture current input and image data *before* clearing for the payload
    const userMessageContent = input.trim();
    const imageToSend = imageData;
    const modeToSend = currentMode;
    const uiSelectedProviderForSession = selectedModel;

    const userMessage: Message = { role: 'user', content: userMessageContent };

    // Add user message to UI
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Prepare and add temporary assistant loading message
    const tempLoadingMessageId = `assistant-loading-${Date.now()}`;
    let tempProviderForIcon = selectedModel;
    if (selectedModel && selectedModel.includes('/')) {
        const parts = selectedModel.split('/');
        if (parts.length > 0) {
            tempProviderForIcon = parts[0].toLowerCase(); // e.g., "openai" from "openai/gpt-4.1"
        }
    } else if (selectedModel) {
        tempProviderForIcon = selectedModel.toLowerCase();
    }

    const tempAssistantMessage: Message = {
        id: tempLoadingMessageId,
        role: 'assistant',
        content: 'Thinking...', // Placeholder content
        provider: tempProviderForIcon, // Use parsed provider for icon
        isLoading: true,
    };
    setMessages((prevMessages) => [...prevMessages, tempAssistantMessage]);

    // Now clear input fields and related state
    setInput('');
    setImageData(null);
    setImagePreview(null);
    setCurrentMode(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    setLoading(true); // This now primarily controls the input field's disabled state and general loading perception
    setNeuroStatus('');

    let assistantResponseText = 'Error contacting AI.';
    let actualProvider = 'Unknown';
    let actualModelUsed = 'Unknown';
    let responseTokensData: ApiResponseData['tokens'] | undefined = undefined;
    let messageIsError = false;
    let toolNameUsed: string | undefined = undefined;
    // New file/image response variables
    let responseImageUrl: string | undefined = undefined;
    let responseFileUrl: string | undefined = undefined;
    let responseFileName: string | undefined = undefined;
    let responseMimeType: string | undefined = undefined;

    try {
      // 1. Construct payload for /api/chat (Fusion Backend)
      let apiPayload: {
        prompt: string;
        provider?: string; // For "neuroswitch", "openai", "claude", "gemini"
        model?: string;    // For specific model IDs like "gpt-4o", or "NeuroSwitch" if we revert
        image?: string | null;
        mode?: string | null;
      } = {
        prompt: userMessageContent,
        image: imageToSend,
        mode: modeToSend,
      };

      const knownProviderLevelSelections = ['neuroswitch', 'openai', 'claude', 'gemini'];

      if (knownProviderLevelSelections.includes(selectedModel)) {
        // Case: NeuroSwitch selected OR Provider default selected
        // (e.g., selectedModel is "neuroswitch" or "openai")
        apiPayload.provider = selectedModel;
        // No 'model' field sent to /api/chat for these top-level provider/NeuroSwitch selections
      } else {
        // Case: Provider + specific model selected
        // selectedModel is now an id_string like "openai/gpt-4.1" or "google/gemini-1.5-flash"
        const parts = selectedModel.split('/');
        if (parts.length === 2) {
          let providerNameFromIdString = parts[0].toLowerCase(); // e.g., "openai", "anthropic", "google"
          if (providerNameFromIdString === 'anthropic') {
            apiPayload.provider = 'claude';
          } else if (providerNameFromIdString === 'google') {
            apiPayload.provider = 'gemini';
          } else {
            // Directly use if it's already 'openai' or any other future provider that matches this convention
            apiPayload.provider = providerNameFromIdString; 
          }
          apiPayload.model = parts[1];    // e.g., "gpt-4.1", "claude-3.5-sonnet"
        } else {
          // Fallback if id_string format is unexpected
          console.warn(`ChatWindow: Could not parse provider/model from selectedModel id_string '${selectedModel}'. Sending it as provider. This might lead to unexpected behavior.`);
          apiPayload.provider = selectedModel; // Attempt to send the whole string as a provider
        }
      }
      
      console.log('[ChatWindow] Payload to /api/chat (Fusion Backend):', JSON.stringify(apiPayload, null, 2));


      // 2. Get response from AI Service (/api/chat)
      // const headers: Record<string, string> = { // Handled by apiClient, but X-Chat-ID needs to be passed if applicable
      //   Authorization: `Bearer ${token}` 
      // };
      const requestConfig: { headers?: Record<string, string> } = {}; // Initialize with empty headers

      if (activeChatId !== null) {
        // headers['X-Chat-ID'] = activeChatId.toString(); // Old way
        requestConfig.headers = { 'X-Chat-ID': activeChatId.toString() }; // Add X-Chat-ID to apiClient call config
      }
      // If activeChatId is null, the X-Chat-ID header will be omitted.
      // The backend can use the absence of this header to identify a new chat.

      // const aiServiceRes = await axios.post<ApiResponseData>( // Old call
      //   '/api/chat',
      //   apiPayload, 
      //   {
      //     headers: headers 
      //   }
      // );
      const aiServiceRes = await apiClient.post<ApiResponseData>( // New call
        '/chat', // Path relative to apiClient's baseURL
        apiPayload,
        requestConfig // Pass the config that may contain X-Chat-ID
      );

      const aiServiceData = aiServiceRes.data;
      assistantResponseText = aiServiceData.response.text || aiServiceData.response.output || '[No response text]';
      actualProvider = aiServiceData.provider; // Use the new 'provider' field
      actualModelUsed = aiServiceData.model || aiServiceData.provider; // Use specific model, fallback to provider for display if model is null
      responseTokensData = aiServiceData.tokens;
      toolNameUsed = aiServiceData.tool_name;
      // Capture file/image data from response
      responseImageUrl = aiServiceData.image_url;
      responseFileUrl = aiServiceData.file_url;
      responseFileName = aiServiceData.file_name;
      responseMimeType = aiServiceData.mime_type;

      if (toolNameUsed) {
        assistantResponseText = `${assistantResponseText}\n\n🔩 Used tool: ${toolNameUsed}`;
      }

      if (responseTokensData && typeof responseTokensData.total_tokens === 'number') {
        setTokensUsed(prev => prev + responseTokensData!.total_tokens!); // Accumulate tokens if it makes sense, or use session tokens
      }
      if (selectedModel === 'neuroswitch') {
        setNeuroStatus(aiServiceData.response.fallback_reason ? 'orange' : 'green');
      }

      // 2. Save chat turn to history (/api/chats)
      try {
        const titleSuggestion = activeChatId === null ? userMessageContent.substring(0, 75) : null;
        
        const saveHistoryPayload = {
          chatId: activeChatId, // This will be null for a new chat
          title_suggestion: titleSuggestion,
          ui_selected_provider_for_session: uiSelectedProviderForSession,
          user_message_content: userMessageContent,
          assistant_message_content: assistantResponseText,
          assistant_message_actual_provider: actualProvider,
          assistant_message_actual_model_used: actualModelUsed,
          // Include file/image data in save payload
          image_url: responseImageUrl,
          file_url: responseFileUrl,
          file_name: responseFileName,
          mime_type: responseMimeType
        };

        console.log('Saving to chat history:', saveHistoryPayload);
        // const historyRes = await axios.post<{ chat: ChatSession, message: string }>('/api/chats', saveHistoryPayload, { // Old call
        //     headers: { Authorization: `Bearer ${token}` },
        // });
        const historyRes = await apiClient.post<{ chat: ChatSession, message: string }>('/chats', saveHistoryPayload); // New call

        if (activeChatId === null && historyRes.data.chat) {
            console.log('New chat created on backend:', historyRes.data.chat);
            onChatCreated(historyRes.data.chat); // Notify layout about the new chat
        } else {
            // If chat existed, maybe update its last_message_at time in ChatLayout or refresh list
            console.log('Message added to existing chat:', historyRes.data.chat?.id);
        }

      } catch (historyError: any) {
        console.error("Error saving chat history:", historyError);
        // Decide how to handle this, maybe a small non-intrusive UI indicator
        // For now, the chat turn is in ChatWindow state, but not persisted if this fails.
      }

    } catch (err: any) {
      console.error("Error sending message to AI service:", err);
      messageIsError = true; // Mark this as an error message

      if (err && err.isAxiosError && err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 402) {
          assistantResponseText = err.response.data.message || 'You currently don’t have enough credits to proceed. Please visit the Credits Page to top up.';
        } else {
          // Other server errors (500, 400, 401, etc.)
          assistantResponseText = err.response.data.details || err.response.data.error || 'An error occurred with the AI service.';
        }
      } else if (err && err.isAxiosError && err.request) {
        // The request was made but no response was received
        assistantResponseText = 'The AI service is not responding. Please check your connection or try again later.';
      } else {
        // Something happened in setting up the request that triggered an Error or a non-Axios error
        assistantResponseText = 'An unexpected error occurred while sending your message.';
        // For non-Axios errors, log the error object if it might be useful
        if (err && !(err.isAxiosError)) {
            console.error("Non-Axios error details:", err);
        }
      }

    } finally {
      setLoading(false);
      // Update the temporary loading message with the actual response or error
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === tempLoadingMessageId
            ? {
                ...msg, // Retain role, id
                content: assistantResponseText,
                provider: actualProvider, // Update with the actual provider from the response
                isError: messageIsError,
                isLoading: false, // Mark as no longer loading
                // Add file/image data to the message
                image_url: responseImageUrl,
                file_url: responseFileUrl,
                file_name: responseFileName,
                mime_type: responseMimeType
              }
            : msg
        )
      );
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageData(base64String);
        setImagePreview(base64String);
      };
      reader.onerror = () => {
        console.error("Error reading file");
      };
      reader.readAsDataURL(file);
    } else {
      setImageData(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setImageData(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleModeButtonClick = (mode: string) => {
    setCurrentMode(currentMode === mode ? null : mode);
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      if (!user) {
        promptForLogin();
        return;
      }
      if (!loading && (input.trim() || imageData)) {
        handleSend(); 
      }
    }
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      if (!user) {
        promptForLogin();
        return;
      }
      if (!loading && (input.trim() || imageData)) {
        handleSend();
      }
    }
  };

  // Message action handlers
  const handleCopyMessage = async (content: string, messageId: number | string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      // Reset copy feedback after 2 seconds
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  const handleReactToMessage = async (messageId: number | string, reaction: 'like' | 'dislike') => {
    if (!user) {
      promptForLogin();
      return;
    }

    if (typeof messageId === 'string') {
      // Can't react to temporary messages
      return;
    }

    try {
      const response = await apiClient.post<MessageReactionResponse>(`/chats/messages/${messageId}/react`, {
        reaction
      });

      const { counts, userReaction } = response.data;

      // Update the message in state
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId
            ? { ...msg, reactions: counts, userReaction }
            : msg
        )
      );
    } catch (error) {
      console.error('Failed to react to message:', error);
    }
  };

  const handleRemoveReaction = async (messageId: number | string) => {
    if (!user) {
      promptForLogin();
      return;
    }

    if (typeof messageId === 'string') {
      // Can't remove reaction from temporary messages
      return;
    }

    try {
      const response = await apiClient.delete<MessageReactionResponse>(`/chats/messages/${messageId}/react`);
      const { counts, userReaction } = response.data;

      // Update the message in state
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId
            ? { ...msg, reactions: counts, userReaction }
            : msg
        )
      );
    } catch (error) {
      console.error('Failed to remove reaction:', error);
    }
  };

  // Add scrollToBottom function
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  // Effect for auto-scrolling and managing isScrolledUp state
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Check if scrolled to the very bottom
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 1; // +1 for leniency
      if (isAtBottom) {
        setIsScrolledUp(false);
      } else {
        setIsScrolledUp(true);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Add effect for auto-scrolling when new messages arrive
  useEffect(() => {
    // Auto-scroll only if not manually scrolled up OR if it's the initial load of messages
    // And ensure messages.length > 0 to avoid scrolling on empty/reset chat
    if (messages.length > 0 && !isScrolledUp) {
      // For the very first batch of messages (e.g., loading an existing chat),
      // scroll instantly. For new messages during an active chat, scroll smoothly.
      const initialLoad = messages.every(msg => msg.id && !msg.isLoading); // Approximation of initial load
      scrollToBottom(initialLoad && messages.length > 1 ? 'auto' : 'smooth');
    }
  }, [messages, isScrolledUp]); // React to messages change and isScrolledUp state

  // Message actions component
  const MessageActions: React.FC<{ message: Message }> = ({ message }) => {
    if (message.isLoading || !message.id || typeof message.id === 'string') {
      return null; // Don't show actions for loading or temporary messages
    }

    const handleToggleReaction = (reaction: 'like' | 'dislike') => {
      if (message.userReaction === reaction) {
        // Remove reaction if clicking the same one
        handleRemoveReaction(message.id!);
      } else {
        // Add or change reaction
        handleReactToMessage(message.id!, reaction);
      }
    };

    return (
      <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
        {/* Copy Button */}
        <button
          onClick={() => handleCopyMessage(message.content, message.id!)}
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${
            copiedMessageId === message.id
              ? 'text-green-600 bg-green-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          title={copiedMessageId === message.id ? "Copied!" : "Copy message"}
        >
          {copiedMessageId === message.id ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          <span>{copiedMessageId === message.id ? "Copied!" : "Copy"}</span>
        </button>

        {/* Like Button */}
        <button
          onClick={() => handleToggleReaction('like')}
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${
            message.userReaction === 'like'
              ? 'text-green-600 bg-green-50 hover:bg-green-100'
              : 'text-gray-500 hover:text-green-600 hover:bg-gray-100'
          }`}
          title="Like message"
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{message.reactions?.like || 0}</span>
        </button>

        {/* Dislike Button */}
        <button
          onClick={() => handleToggleReaction('dislike')}
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${
            message.userReaction === 'dislike'
              ? 'text-red-600 bg-red-50 hover:bg-red-100'
              : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
          }`}
          title="Dislike message"
        >
          <ThumbsDown className="w-3 h-3" />
          <span>{message.reactions?.dislike || 0}</span>
        </button>
      </div>
    );
  };

  const renderMessages = () => (
    messages.map((msg, index) => {
      // START: Contract Violation Check
      if (typeof msg.content !== 'string') {
        console.error(
          'ChatWindow: Message content is not a string!',
          {
            chatId: activeChatId,
            messageIndex: index,
            provider: msg.provider,
            payloadType: typeof msg.content,
            payload: msg.content,
          }
        );
        let prettyPrintedContent = '[Unsupported response structure]';
        try {
          prettyPrintedContent = JSON.stringify(msg.content, null, 2);
        } catch (e) {
          console.error('ChatWindow: Failed to stringify non-string content', e);
        }
        const key = msg.id ? `msg-${msg.id}-contract-violation` : `msg-idx-${index}-${msg.role}-contract-violation`;
        
        return (
          <div key={key} className="flex mb-4 px-2">
            <div className="max-w-[90vw] md:max-w-xl lg:max-w-3xl px-4 py-3 rounded-lg shadow bg-red-100 text-red-700 mr-auto">
              <p className="font-semibold">Contract Violation:</p>
              <pre className="whitespace-pre-wrap text-sm"><code>{prettyPrintedContent}</code></pre>
            </div>
          </div>
        );
      }
      // END: Contract Violation Check

      const messageKey = msg.id ? `msg-${msg.id}` : `msg-idx-${index}-${msg.role}`;
      const currentMessageContent = msg.content || ''; 

      const bubbleBaseClasses = "px-3 py-2.5 rounded-lg shadow-sm text-base"; 
      const bubbleMaxWidth = "max-w-[90vw] md:max-w-xl lg:max-w-2xl"; // Adjusted for consistency
      
      if (msg.role === 'user') {
        return (
          <div key={messageKey} className="flex items-start gap-3 mb-4 justify-end px-2">
            <div
              className={`message-content-container ${bubbleBaseClasses} ${bubbleMaxWidth} bg-gray-200 text-black rounded-br-none ml-auto`}
            >
              {msg.isError ? (
                <p className="text-red-100 text-base">{currentMessageContent}</p>
              ) : (
                <div className="prose prose-invert max-w-none chat-message-content font-sans text-base">
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => {
                        const childrenArray = React.Children.toArray(props.children);
                        const codeNode = childrenArray[0] as React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
                        
                        if (codeNode && codeNode.type === 'code' && typeof codeNode.props?.className === 'string') {
                          const match = /language-(\w+)/.exec(codeNode.props.className || '');
                          const language = match ? match[1] : undefined;
                          const codeString = String(codeNode.props.children ?? '').replace(/\n$/, '');
                          return (
                            <div className="my-2">
                              <SyntaxHighlighter
                                style={atomDark as any}
                                language={language || 'text'}
                                PreTag="div"
                                className="rounded-lg px-3 py-2 overflow-x-auto font-mono text-sm leading-tight"
                              >
                                {codeString}
                              </SyntaxHighlighter>
                            </div>
                          );
                        }
                        return <pre {...props} className="font-mono text-sm leading-tight my-2 p-2 bg-gray-700/50 rounded-md overflow-x-auto" />;
                      },
                      code: (props: CustomCodeProps) => {
                        const { node, className, children, ...rest } = props;
                        const inline = props.inline;

                        if (!node) return null;

                        if (inline) {
                          return (
                            <code
                              className="bg-gray-600/50 text-gray-200 px-1 py-0.5 rounded font-mono text-[0.9em]"
                              {...rest}
                            >
                              {children}
                            </code>
                          );
                        }
                        const match = /language-(\w+)/.exec(className || '');
                        if (match) {
                            return (
                                <div className="my-2">
                                    <SyntaxHighlighter
                                        style={atomDark as any}
                                        language={match[1]}
                                        PreTag="div"
                                        className="rounded-lg px-3 py-2 overflow-x-auto font-mono text-sm leading-tight"
                                        {...rest}
                                    >
                                        {String(children ?? '').replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                </div>
                            );
                        }
                        return (
                          <code 
                            className={`${className || ''} font-mono text-sm bg-gray-700/30 rounded p-1 block whitespace-pre-wrap overflow-x-auto`}
                            {...rest}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {currentMessageContent}
                  </ReactMarkdown>
                </div>
                )}
              
              {/* Add message actions for user messages */}
              <MessageActions message={msg} />
              </div>
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm font-semibold">
              You
            </div>
          </div>
        );
      } else { // Assistant messages
        return (
          <div key={messageKey} className="flex items-start gap-3 mb-4 justify-start px-2">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center text-white text-sm overflow-hidden">
              {(() => {
                // Extract provider from msg.provider, ensuring we get just the provider name
                let providerName = msg.provider?.toLowerCase().replace(/\s+/g, '-') || 'default';
                
                // If provider contains a slash, extract just the provider part (e.g., "openai/gpt-4o" -> "openai")
                if (providerName.includes('/')) {
                  providerName = providerName.split('/')[0];
                }
                
                console.log('ChatWindow: Using provider icon for:', providerName); // Debug log
                
                if (providerName === 'openai') return <img src="/openai.png" alt="OpenAI" className="w-full h-full object-contain" />;
                if (providerName === 'claude') return <img src="/claude.png" alt="Claude" className="w-full h-full object-contain" />;
                if (providerName === 'gemini') return <img src="/gemini.png" alt="Gemini" className="w-full h-full object-contain" />;
                if (providerName === 'neuroswitch' || providerName === 'neuro-switch') return <img src="/neuro-switch.png" alt="NeuroSwitch" className="w-full h-full object-contain" />;
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                );
              })()}
            </div>
            <div
              className={`message-content-container ${bubbleBaseClasses} ${bubbleMaxWidth} bg-gray-100 text-slate-900 rounded-bl-none mr-auto`}
            >
              {(() => {
                // Check if the message content is just an image URL
                const isImageUrl = currentMessageContent && 
                  typeof currentMessageContent === 'string' && 
                  (currentMessageContent.startsWith('https://fusionai.sfo3.cdn.digitaloceanspaces.com') ||
                   currentMessageContent.startsWith('https://fusionai.sfo3.digitaloceanspaces.com') ||
                   /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(currentMessageContent.trim()));

                if (msg.isLoading) {
                  return (
                    <div className="flex items-center text-base text-slate-700 py-1">
                      <svg className="animate-spin -ml-0.5 mr-2 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Thinking...</span>
                    </div>
                  );
                } else if (msg.isError) {
                  return <p className="text-red-500 text-base">{currentMessageContent}</p>;
                } else if (isImageUrl) {
                  // Render image with floating download button - suppress text content
                                     return (
                     <div className="relative flex justify-center p-2 group">
                       <img 
                         src={currentMessageContent}
                         alt="Generated Image"
                         className="rounded-lg max-w-full sm:max-w-lg max-h-[600px] object-contain border border-gray-300 shadow-md"
                         loading="lazy"
                         onError={() => console.error("Failed to load image")}
                       />
                       <button
                         onClick={async (e) => {
                           e.preventDefault();
                           try {
                             // Method 1: Direct download link approach
                             const link = document.createElement('a');
                             link.href = currentMessageContent;
                             link.download = `ai-generated-image-${Date.now()}.png`;
                             link.target = '_blank';
                             link.rel = 'noopener noreferrer';
                             document.body.appendChild(link);
                             link.click();
                             document.body.removeChild(link);
                           } catch (error) {
                             console.error('Direct download failed, trying fetch method:', error);
                             try {
                               // Method 2: Fetch with CORS handling
                               const response = await fetch(currentMessageContent, {
                                 mode: 'cors',
                                 headers: {
                                   'Origin': window.location.origin
                                 }
                               });
                               if (!response.ok) throw new Error('Fetch failed');
                               const blob = await response.blob();
                               const url = window.URL.createObjectURL(blob);
                               const link = document.createElement('a');
                               link.href = url;
                               link.download = `ai-generated-image-${Date.now()}.png`;
                               document.body.appendChild(link);
                               link.click();
                               document.body.removeChild(link);
                               window.URL.revokeObjectURL(url);
                             } catch (fetchError) {
                               console.error('All download methods failed:', fetchError);
                               // Final fallback: right-click context menu hint
                               alert('Please right-click the image and select "Save image as..." to download.');
                             }
                           }
                         }}
                         className="absolute top-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full shadow-sm 
                                  opacity-0 group-hover:opacity-100 hover:bg-white/90 hover:shadow-md
                                  md:opacity-0 md:group-hover:opacity-100
                                  touch:opacity-60 active:opacity-100 active:bg-white/90
                                  transition-all duration-200 ease-in-out
                                  focus:opacity-100 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                         title="Download image"
                         type="button"
                       >
                         <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                           <path d="M9 3a1 1 0 112 0v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V3zM3 17a1 1 0 100-2h14a1 1 0 100 2H3z" />
                         </svg>
                       </button>
                     </div>
                   );
                } else {
                  // Regular text content
                  return (
                    <div className="prose prose-invert max-w-none chat-message-content font-sans text-base">
                      <ReactMarkdown
                        components={{
                          pre: ({ node, ...props }) => {
                            const childrenArray = React.Children.toArray(props.children);
                            const codeNode = childrenArray[0] as React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
                            
                            if (codeNode && codeNode.type === 'code' && typeof codeNode.props?.className === 'string') {
                              const match = /language-(\w+)/.exec(codeNode.props.className || '');
                              const language = match ? match[1] : undefined;
                              const codeString = String(codeNode.props.children ?? '').replace(/\n$/, '');
                              return (
                                <div className="my-2">
                                  <SyntaxHighlighter
                                    style={atomDark as any}
                                    language={language || 'text'}
                                    PreTag="div"
                                    className="rounded-lg px-3 py-2 overflow-x-auto font-mono text-sm leading-tight"
                                  >
                                    {codeString}
                                  </SyntaxHighlighter>
                                </div>
                              );
                            }
                            return <pre {...props} className="font-mono text-sm leading-tight my-2 p-2 bg-gray-700/50 rounded-md overflow-x-auto" />;
                          },
                          code: (props: CustomCodeProps) => {
                            const { node, className, children, ...rest } = props;
                            const inline = props.inline;

                            if (!node) return null;

                            if (inline) {
                              return (
                                <code
                                  className="bg-gray-600/50 text-gray-200 px-1 py-0.5 rounded font-mono text-[0.9em]"
                                  {...rest}
                                >
                                  {children}
                                </code>
                              );
                            }
                            const match = /language-(\w+)/.exec(className || '');
                            if (match) {
                                return (
                                    <div className="my-2">
                                        <SyntaxHighlighter
                                            style={atomDark as any}
                                            language={match[1]}
                                            PreTag="div"
                                            className="rounded-lg px-3 py-2 overflow-x-auto font-mono text-sm leading-tight"
                                            {...rest}
                                        >
                                            {String(children ?? '').replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                );
                            }
                            return (
                              <code 
                                className={`${className || ''} font-mono text-sm bg-gray-700/30 rounded p-1 block whitespace-pre-wrap overflow-x-auto`}
                                {...rest}
                              >
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {currentMessageContent}
                      </ReactMarkdown>
                    </div>
                  );
                }
              })()}
              
              {/* Legacy Image Attachments - keep for backward compatibility */}
              {msg.image_url && !currentMessageContent?.startsWith('https://fusionai.sfo3') && (
                <div className="mt-3">
                  <img 
                    src={msg.image_url} 
                    alt="AI generated image"
                    className="rounded-md max-w-full w-full sm:w-auto max-h-96 object-contain border border-gray-200"
                    loading="lazy"
                  />
                </div>
              )}
              
              {msg.file_url && (
                <div className="mt-3">
                  <a 
                    href={msg.file_url} 
                    download={msg.file_name || "Generated File"}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="truncate">
                      📎 {msg.file_name || "Download File"}
                    </span>
                  </a>
                </div>
              )}
              
              {/* Add message actions for assistant messages */}
              <MessageActions message={msg} />
            </div>
          </div>
        );
      }
    })
  );
  
  return (
    <div className="flex flex-col h-full w-full relative font-sans overflow-hidden">
      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto pt-16 chat-messages-container ${hasMessages ? 'pb-48' : 'pb-0'}`}
      >
        {!hasMessages ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-2">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6 md:mb-8">
              {user?.displayName ? `Good to see you, ${user.displayName}.` : 'Good to see you.'}
            </h1>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-3xl px-2">
            {isLoadingMessages && messages.length === 0 ? (
              <div className="flex justify-center items-center h-full text-base text-gray-600">
                Loading messages...
              </div>
            ) : (
              <div className="pb-4">
                {renderMessages()}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Fixed Input Area */}
      <div className="fixed left-0 right-0 bg-gray-50 safe-area-inset-bottom md:left-64 mb-3" style={{ bottom: 'env(keyboard-inset-height, 0px)' }}>
        <div className="max-w-3xl mx-auto px-2 md:px-4 py-2 md:py-4">
          <form onSubmit={handleSend} className="relative w-full bg-white rounded-2xl border border-gray-300 p-2 md:p-3 shadow-xl">
            {imagePreview && (
              <div className="mb-2 flex justify-center">
                <div className="relative inline-block">
                  <img className="max-h-16 md:max-h-20 rounded-lg" src={imagePreview} alt="Preview" />
                  <button type="button" onClick={handleRemoveImage} className="absolute -top-1.5 -right-1.5 bg-gray-200 hover:bg-gray-300 rounded-full p-1 shadow-md h-6 w-6 md:h-7 md:w-7 flex items-center justify-center min-w-6 min-h-6 md:min-w-7 md:min-h-7" title="Remove image">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              </div>
            )}

            {hasMessages && (
              <div className="mb-2">
                {/* Token limit warnings */}
                {tokensUsed >= 200000 && (
                  <div className="mb-2 p-2 bg-red-100 border border-red-300 rounded-md text-red-800 text-xs md:text-sm">
                    ⚠️ This chat has exceeded the 200k token limit. Consider starting a new chat for optimal performance.
                  </div>
                )}
                {tokensUsed >= 180000 && tokensUsed < 200000 && (
                  <div className="mb-2 p-2 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-800 text-xs md:text-sm">
                    ⚠️ Approaching 200k token limit. Consider starting a new chat soon.
                  </div>
                )}
                
                {/* Token counter */}
                <div className={`text-xs md:text-sm ${tokensUsed >= 180000 ? 'text-red-600' : 'text-gray-500'}`}>
                  <span>Tokens Used: {tokensUsed.toLocaleString()} / {maxTokens.toLocaleString()} ({Math.floor((tokensUsed / maxTokens) * 100)}%)</span>
                  {isLoadingTokens && <span className="ml-2 text-blue-500">(Loading...)</span>}
                  <div className="w-full bg-gray-200 h-1.5 md:h-2 rounded">
                    <div 
                      className={`h-1.5 md:h-2 rounded transition-all duration-300 ${
                        tokensUsed >= 200000 ? 'bg-red-500' : 
                        tokensUsed >= 180000 ? 'bg-yellow-500' : 
                        'bg-blue-500'
                      }`} 
                      style={{ width: `${Math.min((tokensUsed / maxTokens) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-end space-x-2 w-full">
              <button type="button" onClick={handleImageUploadClick} className="p-2 md:p-2.5 text-gray-500 hover:text-gray-700 h-9 w-9 md:h-10 md:w-10 flex items-center justify-center min-w-9 min-h-9 md:min-w-10 md:min-h-10" title="Upload Image">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <textarea 
                ref={textareaRef} 
                value={input} 
                onChange={handleTextareaChange} 
                onKeyDown={handleKeyDown} 
                rows={1} 
                className="flex-1 border-0 bg-transparent p-2 focus:ring-0 focus:outline-none resize-none max-h-32 overflow-y-auto min-h-[2rem] md:min-h-[2.5rem] text-base w-full" 
                placeholder={hasMessages ? "Enter to send, Shift+Enter for new line" : "Ask a question..."}
                style={{ height: '32px' }} 
              />
              <button type="submit" disabled={loading || (!input.trim() && !imageData)} className={`p-2 md:p-2.5 text-blue-600 hover:text-blue-700 h-9 w-9 md:h-10 md:w-10 flex items-center justify-center min-w-9 min-h-9 md:min-w-10 md:min-h-10 ${loading || (!input.trim() && !imageData) ? 'opacity-50 cursor-not-allowed' : ''}`} title="Send Message">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </div>

            <div className="mt-2 md:mt-3 overflow-x-auto feature-buttons-container w-full">
              <div className="flex items-center flex-wrap gap-1 md:gap-1.5 justify-center">
                {(() => {
                  // All feature modes only available when NeuroSwitch is selected
                  const isNeuroSwitchSelected = selectedModel === 'neuroswitch';
                  
                  if (!isNeuroSwitchSelected) {
                    return null; // No feature buttons for other providers
                  }
                  
                  // NeuroSwitch-specific modes
                  const neuroSwitchModes = [
                    { key: 'deep_research', label: 'Deep Research', icon: <FileText className="h-3 w-3 md:h-4 md:w-4 mr-1" /> }, 
                    { key: 'canvas', label: 'Canvas', icon: <Lightbulb className="h-3 w-3 md:h-4 md:w-4 mr-1" /> }, 
                    { key: 'video', label: 'Video', icon: <Code className="h-3 w-3 md:h-4 md:w-4 mr-1" /> },
                    { key: 'image', label: 'Image', icon: <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1" /> }
                  ];
                  
                  return neuroSwitchModes.map((mode) => (
                    <button 
                      key={mode.key} 
                      type="button" 
                      onClick={() => handleModeButtonClick(mode.key)} 
                      className={`feature-button inline-flex items-center px-2 py-1 md:px-2.5 md:py-1.5 rounded-md border text-xs sm:text-sm whitespace-nowrap h-7 md:h-9 min-h-7 md:min-h-9 ${currentMode === mode.key ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
                    > 
                      {mode.icon} <span className="hidden sm:inline">{mode.label}</span> 
                    </button>
                  ));
                })()}
              </div>
            </div>
          </form>
          
          
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
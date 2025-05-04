// src/context/ChatbotContext.js
import React, { createContext, useState, useCallback, useRef, useEffect, useMemo, useContext } from 'react';

// Créer le contexte
const ChatbotContext = createContext(null);

// Créer le fournisseur de contexte
export const ChatbotProvider = ({ children }) => {
  // --- State spécifique au Chatbot ---
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState([
    { id: Date.now(), sender: 'ai', text: 'Bonjour ! Prêt(e) à commencer ?' },
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false); // État de frappe visuel du bot
  const [unreadCount, setUnreadCount] = useState(0);

  // --- Refs spécifiques au Chatbot ---
  const aiGenericResponseTimeoutRef = useRef(null); // Pour les réponses génériques

  // --- Effet de nettoyage ---
  useEffect(() => {
    return () => {
      if (aiGenericResponseTimeoutRef.current) clearTimeout(aiGenericResponseTimeoutRef.current);
    };
  }, []);

  // --- Fonctions de rappel (Callbacks) ---

  // Ajoute un message et gère le compteur non lu
  const addMessage = useCallback((text, sender) => {
    const newMessage = { id: Date.now() + Math.random(), sender, text };
    console.log(`ChatbotContext: Adding message from ${sender}`);
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Utilise la forme fonctionnelle pour garantir l'accès à la dernière valeur de isChatOpen
    setIsChatOpen(currentIsChatOpen => {
      if (sender === 'ai' && !currentIsChatOpen) {
        setUnreadCount(prevCount => prevCount + 1);
        console.log("ChatbotContext: Unread count incremented");
      }
      return currentIsChatOpen; // Ne modifie pas l'état ouvert/fermé ici
    });
  }, []); // addMessage lui-même n'a pas de dépendances externes directes critiques

  // Ouvre/ferme le chat et réinitialise le compteur
  const handleToggleChat = useCallback(() => {
    setIsChatOpen(prevIsOpen => {
      if (!prevIsOpen) { // Si on est sur le point de l'ouvrir
        console.log("ChatbotContext: Resetting unread count on open");
        setUnreadCount(0);
      }
      return !prevIsOpen; // Inverse l'état
    });
  }, []); // Pas de dépendances

  // Fonction pour que l'extérieur puisse contrôler l'indicateur de frappe
  const setAiTypingStatus = useCallback((isTyping) => {
     console.log(`ChatbotContext: Setting AI typing status to ${isTyping}`);
    setIsAiTyping(isTyping);
  }, []);

  // Gère la soumission d'un message générique DEPUIS l'input du chatbot
  const handleChatMessageSubmit = useCallback((messageText) => {
    console.log("ChatbotContext: handleChatMessageSubmit called");
    if (aiGenericResponseTimeoutRef.current) clearTimeout(aiGenericResponseTimeoutRef.current);
    // Utilise setAiTypingStatus pour changer l'état local
    setAiTypingStatus(false); // Assure qu'on arrête une éventuelle frappe précédente
    addMessage(messageText, 'user'); // Ajoute le message utilisateur via la fonction locale

    setAiTypingStatus(true); // Démarre l'indicateur de frappe
    aiGenericResponseTimeoutRef.current = setTimeout(() => {
      const genericResponses = ["Intéressant.", "Je vois.", "Compris.", "Ok."];
      const aiResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];

      setAiTypingStatus(false); // Arrête l'indicateur
      addMessage(aiResponse, 'ai'); // Ajoute la réponse IA via la fonction locale
      aiGenericResponseTimeoutRef.current = null;
      console.log("ChatbotContext: Generic AI response sent");
    }, 1200);
  }, [addMessage, setAiTypingStatus]); // Dépend de addMessage et setAiTypingStatus locales

  // Valeur du contexte mémoïsée
  const contextValue = useMemo(() => ({
    // State
    isChatOpen,
    messages,
    isAiTyping,
    unreadCount,
    // Handlers/Setters
    handleToggleChat,
    handleChatMessageSubmit, // Soumission depuis le chat
    addMessage,              // Fonction pour ajouter des messages (utilisée aussi par ExerciseContext)
    setAiTypingStatus,       // Fonction pour contrôler l'indicateur (utilisée aussi par ExerciseContext)
  }), [
    isChatOpen, messages, isAiTyping, unreadCount,
    handleToggleChat, handleChatMessageSubmit, addMessage, setAiTypingStatus
  ]);

  return (
    <ChatbotContext.Provider value={contextValue}>
      {children}
    </ChatbotContext.Provider>
  );
};

// Hook personnalisé pour consommer le contexte Chatbot
export const useChatbotContext = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbotContext must be used within a ChatbotProvider');
  }
  return context;
};
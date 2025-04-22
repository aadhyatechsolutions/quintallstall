import { create } from 'zustand';
import { fetchSessions, logoutSession } from './sessionApi';

const useSessionStore = create((set) => ({
  sessions: [],
  isLoading: false,
  error: null,

  // Fetch all sessions
  fetchSessions: async () => {
    set({ isLoading: true });
    try {
      const sessions = await fetchSessions();
      set({ sessions });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout from a specific session
  logoutSession: async (tokenId) => {
    set({ isLoading: true });
    try {
      await logoutSession(tokenId);
      set((state) => ({
        sessions: state.sessions.filter((session) => session.id !== tokenId),
      }));
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSessionStore;

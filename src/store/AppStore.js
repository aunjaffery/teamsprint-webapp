const createAppStore = (set) => ({
  isCreateBoardModal: false,
  openCreateBoardModal: () => set({ isCreateBoardModal: true }),
  closeModal: () => set({ isCreateBoardModal: false }),
});
export default createAppStore;

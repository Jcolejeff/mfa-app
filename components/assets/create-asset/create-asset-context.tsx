import { useState, createContext, useContext, Dispatch, SetStateAction } from 'react';

type CreateAssetContextType = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  createMore: boolean;
  setCreateMore: Dispatch<SetStateAction<boolean>>;
};
const CreateAssetContext = createContext({} as CreateAssetContextType);

export const useCreateAssetContext = () => {
  const ctx = useContext(CreateAssetContext);

  if (!ctx) {
    throw new Error('[useCreateAssetContext] must be used within a CreateAssetProvider');
  }

  return ctx;
};

const CreateAssetProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, isOpen] = useState(false);
  const [createMore, setCreateMore] = useState(false);

  const value = {
    open,
    onOpenChange: isOpen,
    createMore,
    setCreateMore,
  };

  return <CreateAssetContext.Provider value={value}>{children}</CreateAssetContext.Provider>;
};

export default CreateAssetProvider;

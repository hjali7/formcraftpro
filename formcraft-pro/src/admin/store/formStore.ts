import { create } from 'zustand';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'number' | 'date' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  styles?: {
    width?: string;
    labelColor?: string;
    borderColor?: string;
  };
}

export interface Form {
  id: number;
  title: string;
  fields: FormField[];
  settings: {
    submitButtonText: string;
    successMessage: string;
    redirectUrl?: string;
  };
}

interface FormStore {
  currentForm: Form | null;
  forms: Form[];
  setCurrentForm: (form: Form | null) => void;
  setForms: (forms: Form[]) => void;
  addField: (field: FormField) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  reorderFields: (fields: FormField[]) => void;
  updateFormSettings: (settings: Partial<Form['settings']>) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  currentForm: null,
  forms: [],
  
  setCurrentForm: (form) => set({ currentForm: form }),
  
  setForms: (forms) => set({ forms }),
  
  addField: (field) => set((state) => ({
    currentForm: state.currentForm ? {
      ...state.currentForm,
      fields: [...state.currentForm.fields, field]
    } : null
  })),
  
  updateField: (id, updates) => set((state) => ({
    currentForm: state.currentForm ? {
      ...state.currentForm,
      fields: state.currentForm.fields.map(f => 
        f.id === id ? { ...f, ...updates } : f
      )
    } : null
  })),
  
  removeField: (id) => set((state) => ({
    currentForm: state.currentForm ? {
      ...state.currentForm,
      fields: state.currentForm.fields.filter(f => f.id !== id)
    } : null
  })),
  
  reorderFields: (fields) => set((state) => ({
    currentForm: state.currentForm ? {
      ...state.currentForm,
      fields
    } : null
  })),
  
  updateFormSettings: (settings) => set((state) => ({
    currentForm: state.currentForm ? {
      ...state.currentForm,
      settings: { ...state.currentForm.settings, ...settings }
    } : null
  }))
}));

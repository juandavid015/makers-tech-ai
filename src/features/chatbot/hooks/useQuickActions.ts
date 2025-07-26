import { useCallback } from 'react';

export interface QuickAction {
  id: string;
  label: string;
  action: string;
  icon?: string;
}

export const useQuickActions = (onActionSelect: (action: string) => void) => {
  const quickActions: QuickAction[] = [
    {
      id: 'laptops',
      label: 'Show me laptops',
      action: 'Show me your laptop selection with prices and specs',
      icon: '💻'
    },
    {
      id: 'sale',
      label: "What's on sale?",
      action: 'What products do you have on sale or special offers?',
      icon: '🏷️'
    },
    {
      id: 'compare',
      label: 'Compare products',
      action: 'I want to compare different laptops or computers',
      icon: '⚖️'
    },
    {
      id: 'support',
      label: 'Tech support',
      action: 'I need technical support or help with a product',
      icon: '🛠️'
    },
    {
      id: 'accessories',
      label: 'Accessories',
      action: 'Show me computer accessories and peripherals',
      icon: '🎧'
    },
    {
      id: 'budget',
      label: 'Budget options',
      action: 'What are your best budget-friendly options?',
      icon: '💰'
    }
  ];

  const handleActionClick = useCallback((action: QuickAction) => {
    onActionSelect(action.action);
  }, [onActionSelect]);

  return {
    quickActions,
    handleActionClick
  };
}; 
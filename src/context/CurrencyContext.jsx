import { createContext, useContext, useMemo, useState } from 'react';

const CurrencyContext = createContext(null);

const currencyConfig = {
  EUR: { symbol: 'EUR', locale: 'de-DE', rate: 0.92 },
  INR: { symbol: 'INR', locale: 'en-IN', rate: 89.5 },
  USD: { symbol: 'USD', locale: 'en-US', rate: 1 },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('EUR');

  const value = useMemo(() => {
    const formatPrice = (amount) =>
      new Intl.NumberFormat(currencyConfig[currency].locale, {
        style: 'currency',
        currency: currencyConfig[currency].symbol,
        maximumFractionDigits: 2,
      }).format(amount * currencyConfig[currency].rate);

    return {
      currency,
      setCurrency,
      formatPrice,
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }

  return context;
}

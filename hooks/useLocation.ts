import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface LocationHook {
  location: LocationData | null;
  error: string | null;
  isLoading: boolean;
  getCurrentLocation: () => Promise<LocationData | null>;
  startWatching: () => void;
  stopWatching: () => void;
}

export function useLocation(): LocationHook {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  const getCurrentLocation = async (): Promise<LocationData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate getting location (in a real app, use expo-location)
      const mockLocation: LocationData = {
        latitude: 37.7749 + (Math.random() - 0.5) * 0.01,
        longitude: -122.4194 + (Math.random() - 0.5) * 0.01,
        accuracy: 5,
        timestamp: Date.now(),
      };

      setLocation(mockLocation);
      setIsLoading(false);
      return mockLocation;
    } catch (err) {
      setError('Failed to get location');
      setIsLoading(false);
      return null;
    }
  };

  const startWatching = () => {
    if (watchId !== null) return;

    // Simulate watching location updates
    const id = setInterval(() => {
      getCurrentLocation();
    }, 5000);

    setWatchId(id);
  };

  const stopWatching = () => {
    if (watchId !== null) {
      clearInterval(watchId);
      setWatchId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        clearInterval(watchId);
      }
    };
  }, [watchId]);

  return {
    location,
    error,
    isLoading,
    getCurrentLocation,
    startWatching,
    stopWatching,
  };
}
interface DispatchData {
  userId: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  timestamp: number;
  deviceInfo: {
    platform: string;
    userAgent: string;
  };
}

export class EmergencyDispatch {
  private static instance: EmergencyDispatch;
  
  static getInstance(): EmergencyDispatch {
    if (!EmergencyDispatch.instance) {
      EmergencyDispatch.instance = new EmergencyDispatch();
    }
    return EmergencyDispatch.instance;
  }

  async sendSilentAlert(locationData: any): Promise<boolean> {
    try {
      const dispatchData: DispatchData = {
        userId: 'user-123', // In real app, get from authentication
        location: {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          address: locationData.address || 'Unknown location',
        },
        timestamp: Date.now(),
        deviceInfo: {
          platform: 'mobile',
          userAgent: navigator.userAgent || 'unknown',
        },
      };

      // In a real implementation, this would send to your backend
      console.log('Emergency dispatch sent:', dispatchData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      return true;
    } catch (error) {
      console.error('Failed to send emergency dispatch:', error);
      return false;
    }
  }

  async notifyTrustedContacts(message: string): Promise<void> {
    try {
      const contacts = [
        { name: 'Parent', phone: '+1-555-0123' },
        { name: 'Roommate', phone: '+1-555-0124' },
        { name: 'Friend', phone: '+1-555-0125' },
      ];

      // In real app, integrate with SMS/push notification service
      console.log('Notifying trusted contacts:', message);
      
      for (const contact of contacts) {
        console.log(`Sending to ${contact.name} (${contact.phone}): ${message}`);
      }
    } catch (error) {
      console.error('Failed to notify contacts:', error);
    }
  }

  async trackJourney(destination: string, estimatedDuration: number): Promise<string> {
    const journeyId = `journey_${Date.now()}`;
    
    console.log('Starting journey tracking:', {
      journeyId,
      destination,
      estimatedDuration,
      startTime: new Date(),
    });

    return journeyId;
  }
}

export const emergencyDispatch = EmergencyDispatch.getInstance();
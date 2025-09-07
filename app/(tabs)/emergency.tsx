import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Vibration,
  Dimensions,
} from 'react-native';
import { Shield, Phone, Users, Clock } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function EmergencyScreen() {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [dispatchSent, setDispatchSent] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Loading...');

  useEffect(() => {
    // Simulate getting current location
    setTimeout(() => {
      setCurrentLocation('Main Campus Library');
    }, 1000);
  }, []);

  const handleLongPressStart = () => {
    setIsPressed(true);
    Vibration.vibrate(50);
    
    const timer = setTimeout(() => {
      triggerEmergencyDispatch();
    }, 3000); // 3 second long press
    
    setPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    setIsPressed(false);
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const triggerEmergencyDispatch = () => {
    setIsPressed(false);
    setDispatchSent(true);
    Vibration.vibrate([100, 50, 100]);
    
    Alert.alert(
      'Emergency Dispatch Sent',
      'Security has been notified of your location. Help is on the way.',
      [{ text: 'OK' }]
    );
  };

  const resetDispatch = () => {
    setDispatchSent(false);
  };

  if (dispatchSent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.dispatchedContent}>
          <View style={styles.successIcon}>
            <Shield size={48} color="#10B981" />
          </View>
          
          <Text style={styles.successTitle}>Help is Coming</Text>
          <Text style={styles.successSubtitle}>
            Security notified • {currentLocation}
          </Text>

          <View style={styles.dispatchActions}>
            <TouchableOpacity style={styles.callButton}>
              <Phone size={18} color="#FFFFFF" />
              <Text style={styles.callButtonText}>Call Security</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton}>
              <Users size={18} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>Notify Contacts</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={resetDispatch}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Emergency</Text>
        
        <View style={styles.emergencySection}>
          <TouchableOpacity
            style={[
              styles.emergencyButton,
              isPressed && styles.emergencyButtonPressed,
            ]}
            onPressIn={handleLongPressStart}
            onPressOut={handleLongPressEnd}
            activeOpacity={1}
          >
            <Shield size={56} color="#FFFFFF" />
            <Text style={styles.emergencyButtonText}>
              {isPressed ? 'SENDING...' : 'EMERGENCY'}
            </Text>
          </TouchableOpacity>
          
          {isPressed && (
            <View style={styles.progressIndicator}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>
          )}
        </View>

        <View style={styles.instructionsSection}>
          <Text style={styles.instructionTitle}>How to Use</Text>
          <Text style={styles.instructionText}>
            Hold the red button for 3 seconds to silently alert campus security of your exact location.
          </Text>
          
          <View style={styles.locationInfo}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.locationText}>{currentLocation}</Text>
          </View>
        </View>

        <View style={styles.alternativeSection}>
          <TouchableOpacity style={styles.phoneButton}>
            <Phone size={20} color="#2563EB" />
            <View style={styles.phoneInfo}>
              <Text style={styles.phoneLabel}>Campus Security</Text>
              <Text style={styles.phoneNumber}>(555) 000-9999</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buddyButton}>
            <Users size={20} color="#059669" />
            <Text style={styles.buddyText}>Request Walking Buddy</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.disclaimer}>
          For life-threatening emergencies, call 911 immediately
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 32,
  },
  emergencySection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emergencyButton: {
    width: width * 0.55,
    height: width * 0.55,
    backgroundColor: '#DC2626',
    borderRadius: width * 0.275,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  emergencyButtonPressed: {
    backgroundColor: '#B91C1C',
    transform: [{ scale: 0.95 }],
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    letterSpacing: 1,
  },
  progressIndicator: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressBar: {
    width: 160,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#DC2626',
    width: '100%',
  },
  instructionsSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#111827',
    marginLeft: 6,
    fontWeight: '500',
  },
  alternativeSection: {
    marginBottom: 24,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  phoneInfo: {
    marginLeft: 12,
    flex: 1,
  },
  phoneLabel: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    marginBottom: 2,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  buddyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  buddyText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    marginLeft: 12,
  },
  disclaimer: {
    fontSize: 12,
    color: '#DC2626',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 'auto',
  },
  dispatchedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#F0FDF4',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  dispatchActions: {
    width: '100%',
    marginBottom: 32,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B7280',
  },
  resetButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
});
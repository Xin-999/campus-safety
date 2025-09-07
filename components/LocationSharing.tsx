import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Clock, Users, Navigation } from 'lucide-react-native';

interface LocationSharingProps {
  isActive: boolean;
  onToggle: () => void;
}

interface JourneyData {
  startTime: Date;
  destination: string;
  estimatedDuration: number;
  currentProgress: number;
}

export default function LocationSharing({ isActive, onToggle }: LocationSharingProps) {
  const [journey, setJourney] = useState<JourneyData>({
    startTime: new Date(),
    destination: 'Student Dormitory',
    estimatedDuration: 15, // minutes
    currentProgress: 0.3, // 30% complete
  });

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - journey.startTime.getTime()) / 1000 / 60);
      setElapsedTime(elapsed);

      // Check if journey is taking too long
      if (elapsed > journey.estimatedDuration + 5) {
        // Trigger alert to contacts
        console.log('Journey taking longer than expected - alerting contacts');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, journey]);

  const remainingTime = Math.max(0, journey.estimatedDuration - elapsedTime);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MapPin size={24} color="#2563EB" />
        <Text style={styles.title}>Location Sharing</Text>
        <TouchableOpacity
          style={[styles.toggle, isActive && styles.toggleActive]}
          onPress={onToggle}
        >
          <Text style={[styles.toggleText, isActive && styles.toggleTextActive]}>
            {isActive ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>

      {isActive && (
        <View style={styles.activeContent}>
          <View style={styles.journeyCard}>
            <View style={styles.journeyHeader}>
              <Navigation size={20} color="#059669" />
              <Text style={styles.journeyTitle}>Active Journey</Text>
            </View>
            
            <View style={styles.journeyDetail}>
              <Text style={styles.destinationLabel}>Destination:</Text>
              <Text style={styles.destinationText}>{journey.destination}</Text>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { width: `${journey.currentProgress * 100}%` }]} 
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(journey.currentProgress * 100)}% complete
              </Text>
            </View>

            <View style={styles.timeInfo}>
              <View style={styles.timeRow}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.timeLabel}>Elapsed:</Text>
                <Text style={styles.timeValue}>{elapsedTime} min</Text>
              </View>
              <View style={styles.timeRow}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.timeLabel}>Remaining:</Text>
                <Text style={styles.timeValue}>{remainingTime} min</Text>
              </View>
            </View>
          </View>

          <View style={styles.contactsCard}>
            <Users size={20} color="#6B7280" />
            <Text style={styles.contactsTitle}>Sharing with 3 trusted contacts</Text>
            <Text style={styles.contactsSubtext}>
              They'll be notified if your journey takes longer than expected
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
    flex: 1,
  },
  toggle: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  toggleActive: {
    backgroundColor: '#10B981',
  },
  toggleText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  activeContent: {
    padding: 20,
  },
  journeyCard: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  journeyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 8,
  },
  journeyDetail: {
    marginBottom: 12,
  },
  destinationLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  destinationText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  progressSection: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#059669',
    textAlign: 'right',
    fontWeight: '500',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    marginRight: 4,
  },
  timeValue: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '600',
  },
  contactsCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  contactsTitle: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '500',
    marginLeft: 8,
    marginBottom: 4,
  },
  contactsSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
    lineHeight: 16,
  },
});
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { Shield, MapPin, Users, Clock, Navigation } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      id: 'emergency',
      title: 'Emergency',
      subtitle: 'Silent dispatch',
      icon: Shield,
      color: '#DC2626',
      route: '/emergency',
    },
    {
      id: 'shuttle',
      title: 'Find Shuttle',
      subtitle: 'Track nearby buses',
      icon: MapPin,
      color: '#2563EB',
      route: '/shuttle',
    },
    {
      id: 'buddy',
      title: 'Walking Buddy',
      subtitle: 'Get a guard',
      icon: Users,
      color: '#059669',
      route: '/buddy',
    },
    {
      id: 'report',
      title: 'Report Issue',
      subtitle: 'Suspicious activity',
      icon: Navigation,
      color: '#F59E0B',
      route: '/report',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: isOnline ? '#10B981' : '#EF4444' }]} />
          <Text style={styles.statusText}>
            {isOnline ? 'Connected' : 'Offline'}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.timeText}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Campus Safety</Text>
        <Text style={styles.welcomeSubtitle}>
          Your safety is our priority. Access emergency services and campus resources.
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionCard, { borderLeftColor: action.color }]}
            onPress={() => router.push(action.route)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
              <action.icon size={24} color={action.color} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.emergencyText}>
          For immediate emergencies, call campus security: 
          <Text style={styles.phoneNumber}> (555) 000-9999</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  actionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 80,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    flexShrink: 0,
  },
  actionContent: {
    flex: 1,
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 24,
  },
  actionSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 20,
  },
  bottomSection: {
    padding: 20,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  emergencyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneNumber: {
    fontWeight: '700',
    color: '#DC2626',
    fontSize: 15,
  },
});
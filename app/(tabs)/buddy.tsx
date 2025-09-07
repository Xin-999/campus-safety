import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Users, MapPin, Clock, Phone, Shield, Navigation } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Guard {
  id: string;
  name: string;
  location: string;
  distance: string;
  eta: string;
  status: 'available' | 'busy' | 'on-route';
  rating: number;
}

export default function BuddyScreen() {
  const [isRequesting, setIsRequesting] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<Guard | null>(null);
  const [nearbyGuards, setNearbyGuards] = useState<Guard[]>([
    {
      id: '1',
      name: 'Officer Johnson',
      location: 'Main Campus',
      distance: '0.2 km',
      eta: '2 min',
      status: 'available',
      rating: 4.9,
    },
    {
      id: '2',
      name: 'Officer Martinez',
      location: 'Library Area',
      distance: '0.5 km',
      eta: '4 min',
      status: 'available',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Officer Chen',
      location: 'Sports Complex',
      distance: '0.7 km',
      eta: '6 min',
      status: 'busy',
      rating: 4.7,
    },
  ]);

  const requestWalkingBuddy = (guard: Guard) => {
    setIsRequesting(true);
    setCurrentRequest(guard);
    
    // Simulate request processing
    setTimeout(() => {
      setIsRequesting(false);
    }, 2000);
  };

  const cancelRequest = () => {
    setCurrentRequest(null);
  };

  const getStatusColor = (status: Guard['status']) => {
    switch (status) {
      case 'available': return '#10B981';
      case 'busy': return '#EF4444';
      case 'on-route': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: Guard['status']) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'on-route': return 'En Route';
      default: return 'Unknown';
    }
  };

  if (currentRequest) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.requestContainer}>
          <View style={styles.requestHeader}>
            <Shield size={32} color="#10B981" />
            <Text style={styles.requestTitle}>Walking Buddy Assigned</Text>
            <Text style={styles.requestSubtitle}>
              {currentRequest.name} is on the way to escort you safely
            </Text>
          </View>

          <View style={styles.guardInfo}>
            <View style={styles.guardDetail}>
              <Users size={20} color="#6B7280" />
              <Text style={styles.guardDetailText}>{currentRequest.name}</Text>
            </View>
            <View style={styles.guardDetail}>
              <MapPin size={20} color="#6B7280" />
              <Text style={styles.guardDetailText}>{currentRequest.location}</Text>
            </View>
            <View style={styles.guardDetail}>
              <Clock size={20} color="#6B7280" />
              <Text style={styles.guardDetailText}>ETA: {currentRequest.eta}</Text>
            </View>
            <View style={styles.guardDetail}>
              <Navigation size={20} color="#6B7280" />
              <Text style={styles.guardDetailText}>Distance: {currentRequest.distance}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.callButton}>
              <Phone size={20} color="#FFFFFF" />
              <Text style={styles.callButtonText}>Call Guard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={cancelRequest}>
              <Text style={styles.cancelButtonText}>Cancel Request</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.safetyTips}>
            <Text style={styles.safetyTitle}>Safety Tips</Text>
            <Text style={styles.safetyText}>
              • Stay in well-lit areas while waiting{'\n'}
              • Keep your phone charged{'\n'}
              • Share your location with trusted contacts{'\n'}
              • Be ready to show your student ID
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Walking Buddy</Text>
        <Text style={styles.subtitle}>Request a security guard to escort you</Text>
      </View>

      <View style={styles.quickRequest}>
        <TouchableOpacity 
          style={styles.emergencyRequestButton}
          onPress={() => requestWalkingBuddy(nearbyGuards[0])}
          disabled={isRequesting}
        >
          <Shield size={24} color="#FFFFFF" />
          <Text style={styles.emergencyRequestText}>
            {isRequesting ? 'Requesting...' : 'Quick Request Nearest Guard'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.guardsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Available Guards Nearby</Text>
        
        {nearbyGuards.map((guard) => (
          <View key={guard.id} style={styles.guardCard}>
            <View style={styles.guardHeader}>
              <View style={styles.guardInfo}>
                <Text style={styles.guardName}>{guard.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.guardLocation}>{guard.location}</Text>
                </View>
              </View>
              
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(guard.status) + '20' }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(guard.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(guard.status) }]}>
                  {getStatusText(guard.status)}
                </Text>
              </View>
            </View>

            <View style={styles.guardStats}>
              <View style={styles.statItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.statText}>{guard.eta}</Text>
              </View>
              <View style={styles.statItem}>
                <Navigation size={16} color="#6B7280" />
                <Text style={styles.statText}>{guard.distance}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.ratingText}>★ {guard.rating}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[
                styles.requestButton,
                guard.status !== 'available' && styles.requestButtonDisabled,
              ]}
              onPress={() => guard.status === 'available' && requestWalkingBuddy(guard)}
              disabled={guard.status !== 'available'}
            >
              <Text style={[
                styles.requestButtonText,
                guard.status !== 'available' && styles.requestButtonTextDisabled,
              ]}>
                {guard.status === 'available' ? 'Request This Guard' : 'Not Available'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  quickRequest: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  emergencyRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emergencyRequestText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  guardsList: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  guardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  guardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  guardInfo: {
    flex: 1,
  },
  guardName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guardLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  guardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
  requestButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  requestButtonTextDisabled: {
    color: '#9CA3AF',
  },
  requestContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  requestHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  requestTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  requestSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  guardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  guardDetailText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  actionButtons: {
    marginVertical: 32,
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
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DC2626',
  },
  cancelButtonText: {
    color: '#DC2626',
    fontSize: 18,
    fontWeight: '600',
  },
  safetyTips: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  safetyText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
});
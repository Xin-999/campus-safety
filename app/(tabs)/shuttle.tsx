import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MapPin, Clock, Navigation, Users } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ShuttleBus {
  id: string;
  route: string;
  currentLocation: string;
  nextStop: string;
  estimatedArrival: string;
  distance: string;
  capacity: number;
  occupied: number;
}

export default function ShuttleScreen() {
  const [shuttles, setShuttles] = useState<ShuttleBus[]>([
    {
      id: '1',
      route: 'Campus Loop',
      currentLocation: 'Library Stop',
      nextStop: 'Student Center',
      estimatedArrival: '3 min',
      distance: '0.4 km',
      capacity: 40,
      occupied: 28,
    },
    {
      id: '2',
      route: 'Residence Hall Express',
      currentLocation: 'Science Building',
      nextStop: 'Dormitory A',
      estimatedArrival: '7 min',
      distance: '0.8 km',
      capacity: 35,
      occupied: 15,
    },
    {
      id: '3',
      route: 'Night Shuttle',
      currentLocation: 'Parking Lot C',
      nextStop: 'Main Gate',
      estimatedArrival: '12 min',
      distance: '1.2 km',
      capacity: 25,
      occupied: 8,
    },
  ]);

  const [selectedRoute, setSelectedRoute] = useState<string>('all');

  const routes = ['all', 'Campus Loop', 'Residence Hall Express', 'Night Shuttle'];

  const filteredShuttles = selectedRoute === 'all' 
    ? shuttles 
    : shuttles.filter(shuttle => shuttle.route === selectedRoute);

  const getCapacityColor = (occupied: number, capacity: number) => {
    const ratio = occupied / capacity;
    if (ratio < 0.5) return '#10B981';
    if (ratio < 0.8) return '#F59E0B';
    return '#EF4444';
  };

  const getCapacityText = (occupied: number, capacity: number) => {
    const ratio = occupied / capacity;
    if (ratio < 0.5) return 'Available';
    if (ratio < 0.8) return 'Filling Up';
    return 'Nearly Full';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shuttle Tracker</Text>
        <Text style={styles.subtitle}>Live bus locations within 1km</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {routes.map((route) => (
          <TouchableOpacity
            key={route}
            style={[
              styles.filterChip,
              selectedRoute === route && styles.filterChipActive,
            ]}
            onPress={() => setSelectedRoute(route)}
          >
            <Text style={[
              styles.filterText,
              selectedRoute === route && styles.filterTextActive,
            ]}>
              {route === 'all' ? 'All Routes' : route}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.shuttleList} showsVerticalScrollIndicator={false}>
        {filteredShuttles.map((shuttle) => (
          <View key={shuttle.id} style={styles.shuttleCard}>
            <View style={styles.shuttleHeader}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>{shuttle.route}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.currentLocation}>{shuttle.currentLocation}</Text>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>

            <View style={styles.shuttleDetails}>
              <View style={styles.detailRow}>
                <Navigation size={16} color="#2563EB" />
                <Text style={styles.detailLabel}>Next Stop:</Text>
                <Text style={styles.detailValue}>{shuttle.nextStop}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Clock size={16} color="#F59E0B" />
                <Text style={styles.detailLabel}>ETA:</Text>
                <Text style={styles.detailValue}>{shuttle.estimatedArrival}</Text>
              </View>

              <View style={styles.detailRow}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.detailLabel}>Distance:</Text>
                <Text style={styles.detailValue}>{shuttle.distance}</Text>
              </View>
            </View>

            <View style={styles.capacitySection}>
              <View style={styles.capacityHeader}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.capacityLabel}>Capacity</Text>
                <Text style={[
                  styles.capacityStatus,
                  { color: getCapacityColor(shuttle.occupied, shuttle.capacity) }
                ]}>
                  {getCapacityText(shuttle.occupied, shuttle.capacity)}
                </Text>
              </View>
              
              <View style={styles.capacityBar}>
                <View 
                  style={[
                    styles.capacityFill,
                    { 
                      width: `${(shuttle.occupied / shuttle.capacity) * 100}%`,
                      backgroundColor: getCapacityColor(shuttle.occupied, shuttle.capacity),
                    }
                  ]} 
                />
              </View>
              
              <Text style={styles.capacityText}>
                {shuttle.occupied}/{shuttle.capacity} passengers
              </Text>
            </View>

            <TouchableOpacity style={styles.trackButton}>
              <Text style={styles.trackButtonText}>Track This Shuttle</Text>
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
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  shuttleList: {
    flex: 1,
    padding: 20,
  },
  shuttleCard: {
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
  shuttleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
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
    color: '#10B981',
    fontWeight: '500',
  },
  shuttleDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    marginRight: 8,
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  capacitySection: {
    marginBottom: 16,
  },
  capacityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  capacityLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  capacityStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  capacityBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 4,
  },
  capacityFill: {
    height: '100%',
    borderRadius: 3,
  },
  capacityText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  trackButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
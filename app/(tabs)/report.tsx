import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { TriangleAlert as AlertTriangle, MapPin, Camera, Send, Clock } from 'lucide-react-native';

interface IncidentType {
  id: string;
  title: string;
  description: string;
  color: string;
}

export default function ReportScreen() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('Current Location');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incidentTypes: IncidentType[] = [
    {
      id: 'suspicious',
      title: 'Suspicious Activity',
      description: 'Unusual behavior or activities',
      color: '#F59E0B',
    },
    {
      id: 'harassment',
      title: 'Harassment',
      description: 'Verbal or physical harassment',
      color: '#DC2626',
    },
    {
      id: 'theft',
      title: 'Theft/Vandalism',
      description: 'Stolen property or damage',
      color: '#7C2D12',
    },
    {
      id: 'safety',
      title: 'Safety Hazard',
      description: 'Environmental or infrastructure issues',
      color: '#EA580C',
    },
    {
      id: 'emergency',
      title: 'Medical Emergency',
      description: 'Someone needs immediate help',
      color: '#DC2626',
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Something else concerning',
      color: '#6B7280',
    },
  ];

  const submitReport = async () => {
    if (!selectedType || !description.trim()) {
      Alert.alert('Incomplete Report', 'Please select an incident type and provide a description.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Report Submitted',
        'Your report has been sent to campus security. They will investigate and follow up if needed.',
        [{ text: 'OK', onPress: resetForm }]
      );
    }, 2000);
  };

  const resetForm = () => {
    setSelectedType('');
    setDescription('');
    setLocation('Current Location');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Report Incident</Text>
        <Text style={styles.subtitle}>Help keep our campus safe</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What type of incident?</Text>
          <View style={styles.typeGrid}>
            {incidentTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  selectedType === type.id && styles.typeCardSelected,
                  { borderLeftColor: type.color }
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={[
                  styles.typeTitle,
                  selectedType === type.id && styles.typeTitleSelected,
                ]}>
                  {type.title}
                </Text>
                <Text style={styles.typeDescription}>{type.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.locationCard}>
            <MapPin size={20} color="#2563EB" />
            <Text style={styles.locationText}>{location}</Text>
            <Text style={styles.locationAction}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Describe what you observed..."
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <TouchableOpacity style={styles.attachmentButton}>
            <Camera size={20} color="#6B7280" />
            <Text style={styles.attachmentText}>Add Photos (Optional)</Text>
          </TouchableOpacity>
          
          <View style={styles.timestampCard}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.timestampText}>
              Report timestamp: {new Date().toLocaleString()}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!selectedType || !description.trim()) && styles.submitButtonDisabled,
          ]}
          onPress={submitReport}
          disabled={!selectedType || !description.trim() || isSubmitting}
        >
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Text>
        </TouchableOpacity>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            Reports are sent directly to campus security. For immediate emergencies, call 911 or use the emergency button.
          </Text>
        </View>
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
  content: {
    flex: 1,
  },
  section: {
    margin: 20,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  typeGrid: {
    marginBottom: 20,
  },
  typeCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  typeCardSelected: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  typeTitleSelected: {
    color: '#DC2626',
  },
  typeDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  locationAction: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
    marginBottom: 20,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  attachmentText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 12,
  },
  timestampCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  timestampText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 12,
    margin: 20,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  disclaimer: {
    padding: 20,
    paddingTop: 0,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
});
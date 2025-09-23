// This defines the API contract for a single health record.
export interface HealthRecord {
    id: string;
    year: string;
    date: string;
    title: string;
    fileType: string;
    iconName: 'document' | 'heart-rate'; // Can be extended with more icon names
    iconBgClass: string;
    iconColorClass: string;
    doctor: string;
    details: {
        doctorInfo: string;
        time: string;
        location: string;
    };
}

export const mockHealthRecords: HealthRecord[] = [
    {
        id: 'rec-001',
        year: '2025',
        date: '2025-12-01',
        title: 'Annual Check-up',
        fileType: '.pdf',
        iconName: 'document',
        iconBgClass: 'bg-blue-100',
        iconColorClass: 'text-blue-500',
        doctor: 'Dr. Walter White',
        details: {
            doctorInfo: 'Dr. Walter White (Cardiologist)',
            time: '09:00 AM – 10:00 AM',
            location: 'Nawaloka Hospital',
        },
    },
    {
        id: 'rec-002',
        year: '2025',
        date: '2025-11-15',
        title: 'Blood Test Results',
        fileType: '.pdf',
        iconName: 'document',
        iconBgClass: 'bg-yellow-100',
        iconColorClass: 'text-yellow-500',
        doctor: 'Dr. Walter White',
        details: {
            doctorInfo: 'Dr. Walter White (Cardiologist)',
            time: '11:00 AM – 11:30 AM',
            location: 'Asiri Hospital Labs',
        },
    },
    {
        id: 'rec-003',
        year: '2024',
        date: '2024-12-01',
        title: 'X-Ray Report',
        fileType: '.pdf',
        iconName: 'document',
        iconBgClass: 'bg-purple-100',
        iconColorClass: 'text-purple-500',
        doctor: 'Dr. Jesse Pinkman',
        details: {
            doctorInfo: 'Dr. Jesse Pinkman (Radiology)',
            time: '02:00 PM – 02:15 PM',
            location: 'Durdans Hospital',
        },
    },
];
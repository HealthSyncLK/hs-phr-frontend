export interface HealthRecord {
    id: string;
    year: string;
    date: string;
    title: string;
    fileType: string;
    iconName?: 'document' | 'heart-rate';
    iconBgClass?: string;
    iconColorClass?: string;
    doctor: string;
    details?: {
        doctorInfo: string;
        time: string;
        location: string;
    };
}
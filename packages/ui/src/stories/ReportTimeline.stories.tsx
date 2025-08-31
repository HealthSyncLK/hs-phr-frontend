import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Timeline,
  TimelineItem,
  TimelineDate,
  TimelineConnector,
  TimelineContent,
  TimelineYear,
} from '../components/data/Timeline';
import { Card } from '../components/app/Card';
import { Icon, IconName } from '../components/general/Icon';
import { Typography } from '../components/general/Typography';

// --- Type definitions for the story's helper components ---
interface ReportCardHeaderProps {
  title: string;
  fileType: string;
  iconName: IconName;
  iconBg: string;
  iconColor: string;
}

interface ReportCardFooterProps {
  doctorName: string;
}

interface Report {
  header: ReportCardHeaderProps;
  doctor: string;
}

interface ReportCardProps {
  report: Report;
}

// --- Helper components for building the card UI ---

const ReportCardHeader = ({ title, fileType, iconName, iconBg, iconColor }: ReportCardHeaderProps) => (
  <div className="flex items-center gap-4 p-4 border-b border-neutral-100">
    <div className={`flex items-center justify-center w-11 h-11 ${iconBg} rounded-lg`}>
      <Icon name={iconName} className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div className="flex-grow">
      <Typography variant="body1" className="font-medium text-text-header">
        {title}
      </Typography>
      <Typography variant="caption" className="text-text-light">
        {fileType}
      </Typography>
    </div>
    <button>
      <Icon name="heart" className="w-6 h-6 text-text-light" />
    </button>
  </div>
);

const ReportCardFooter = ({ doctorName }: ReportCardFooterProps) => (
  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-b-xl">
    <div className="flex items-center gap-2">
      <Icon name="user" className="w-5 h-5 text-text-light" />
      <Typography variant="body2" className="text-text-header">
        {doctorName}
      </Typography>
    </div>
    <a href="#" className="inline-flex items-center text-sm font-medium text-primary">
      View Report
      <Icon name="chevron-right" className="w-4 h-4" />
    </a>
  </div>
);

const ReportCard = ({ report }: ReportCardProps) => (
  <div className="rounded-xl border border-neutral-100 shadow-sm">
    <ReportCardHeader {...report.header} />
    <ReportCardFooter doctorName={report.doctor} />
  </div>
);

const meta: Meta = {
  title: 'Data Display/Report Timeline',
};

export default meta;

// --- MOCK DATA ---
const reportsData: (Report & { year: string; date: string })[] = [
  { year: '2025', date: '2025.12.01', header: { title: 'Annual Check-up', fileType: '.pdf', iconName: 'document', iconBg: 'bg-blue-100', iconColor: 'text-blue-500' }, doctor: 'Dr. Walter White' },
  { year: '2025', date: '2025.11.15', header: { title: 'Blood Test Results', fileType: '.pdf', iconName: 'document', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-500' }, doctor: 'Dr. Walter White' },
  { year: '2024', date: '2024.12.01', header: { title: 'X-Ray Report', fileType: '.pdf', iconName: 'document', iconBg: 'bg-purple-100', iconColor: 'text-purple-500' }, doctor: 'Dr. Jesse Pinkman' },
];

export const Default: StoryObj = {
  render: () => {
    let lastRenderedYear: string | null = null;

    return (
      <Card className="max-w-2xl">
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-neutral-100">
          <Typography variant="h2">Reports</Typography>
        </div>
        <Timeline>
          {reportsData.map((report, index) => {
            const showYear = report.year !== lastRenderedYear;
            lastRenderedYear = report.year;
            return (
              <React.Fragment key={index}>
                {showYear && <div><br /></div>}
                <TimelineItem>
                  <TimelineDate date={report.date} />
                  <TimelineConnector isLast={index === reportsData.length - 1} />
                  <TimelineContent>
                    {showYear && <TimelineYear year={report.year} />}
                    <div className="flex flex-col gap-6">
                      <ReportCard report={report} />
                    </div>
                  </TimelineContent>
                </TimelineItem>
              </React.Fragment>
            );
          })}
        </Timeline>
      </Card>
    );
  },
};
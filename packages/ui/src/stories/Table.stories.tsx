import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableExpandableContent,
} from '../components/data/Table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../components/navigation/DropdownMenu';
import { Card } from '../components/app/Card';
import { Button } from '../components/general/Button';
import { Input } from '../components/form/Input';
import { Icon } from '../components/general/Icon';
import { Typography } from '../components/general/Typography';
import { Tag } from '../components/general/Tag';
import { Pagination } from '../components/navigation/Pagination';


const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

// A larger data set to demonstrate pagination
const paginatedInvoices = Array.from({ length: 100 }, (_, i) => ({
  invoice: `INV${String(i + 1).padStart(3, '0')}`,
  status: ['Paid', 'Pending', 'Unpaid'][i % 3],
  method: ['Credit Card', 'PayPal', 'Bank Transfer'][i % 3],
  amount: `$${(250 + i * 5).toFixed(2)}`,
}));

const insuranceData = [
  {
    insurance: 'Softlogic Life',
    plan: 'Medical',
    planNo: '1212121',
    status: 'Active',
    startDate: '2025.05.05',
    endDate: '2026.05.04',
  },
  {
    insurance: 'Softlogic Life',
    plan: 'Life',
    planNo: '1212121',
    status: 'Active',
    startDate: '2025.05.05',
    endDate: '2026.05.04',
  },
  {
    insurance: 'Softlogic Life',
    plan: 'Medical',
    planNo: '1212121',
    status: 'Active',
    startDate: '2025.05.05',
    endDate: '2026.05.04',
  },
  {
    insurance: 'Softlogic Life',
    plan: 'Accident Cover',
    planNo: '1212121',
    status: 'Active',
    startDate: '2025.05.05',
    endDate: '2026.05.04',
  },
];

const TableToolbar = () => (
  <Card>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input placeholder="Select Family Member" className="w-full sm:w-[313px]" rightIcon="chevron-down" />
        <Input placeholder="Search by immunization" className="w-full sm:w-[313px]" leftIcon="search" />
      </div>
      <Button variant="secondary">
        <Icon name="filter" className="w-5 h-5" />
      </Button>
    </div>
  </Card>
);

// --- THIS IS THE CORRECTED EXPANDED CONTENT ---
const ExpandedContent = () => (
  <Table>
    <TableHeader>
      {/* Style Change: Header row has a bottom border */}
      <TableRow className="border-b border-neutral-gray-100 bg-white hover:bg-white">
        {/* Style Change: Header cells have the light gray background color */}
        <TableHead className="bg-neutral-50 rounded-l-lg">Sequence</TableHead>
        <TableHead className="bg-neutral-50">Vaccination date</TableHead>
        <TableHead className="bg-neutral-50">Expiration Date</TableHead>
        <TableHead className="bg-neutral-50 rounded-r-lg w-20"></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {/* Style Change: Data rows now have `border-none` to remove horizontal lines and are explicitly white */}
      <TableRow className="border-none bg-white">
        <TableCell>Polio</TableCell>
        <TableCell>Moderate</TableCell>
        <TableCell>2025.05.05</TableCell>
        <TableCell className="text-center">
          <Button variant="tertiary" size="sm" className='text-text-header'>
            <Icon name="more-vertical" className="w-5 h-5" />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow className="border-none bg-white">
        <TableCell>Polio 1</TableCell>
        <TableCell>Moderate</TableCell>
        <TableCell>2025.05.05</TableCell>
        <TableCell className="text-center">
          <Button variant="tertiary" size="sm" className='text-text-header'>
            <Icon name="more-vertical" className="w-5 h-5" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);


export const FullExample: Story = {
  name: 'With Toolbar & Expandable Rows',
  render: () => (
    <div className="flex flex-col gap-6">
      <TableToolbar />
      <TableContainer>
        <div className="flex justify-between items-center pb-3 border-b border-neutral-gray-100">
          <Typography variant="h3">Immunizations</Typography>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="xs" leftIcon="email">
              Email
            </Button>
            <Button variant="ghost" size="xs" leftIcon="print">
              Print
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-white hover:bg-white even:bg-white">
              <TableHead className="w-12"></TableHead>
              <TableHead>Immunization Name</TableHead>
              <TableHead>Hospital/Clinic</TableHead>
              <TableHead>Received Date</TableHead>
              <TableHead className="w-20 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow isExpandable>
              <TableCell>BCG Vaccine</TableCell>
              <TableCell>Moderate</TableCell>
              <TableCell>2025.05.05</TableCell>
              <TableCell className="text-center">
                <Button variant="tertiary" size="sm" className='text-text-header'>
                  <Icon name="more-vertical" className="w-5 h-5" />
                </Button>
              </TableCell>
              <TableExpandableContent>
                <ExpandedContent />
              </TableExpandableContent>
            </TableRow>
            <TableRow isExpandable>
              <TableCell>Hepatitis B</TableCell>
              <TableCell>None</TableCell>
              <TableCell>2025.07.12</TableCell>
              <TableCell className="text-center">
                <Button variant="tertiary" size="sm" className='text-text-header'>
                  <Icon name="more-vertical" className="w-5 h-5" />
                </Button>
              </TableCell>
              <TableExpandableContent>
                <ExpandedContent />
              </TableExpandableContent>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ),
};

export const PrimaryTableWithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TableToolbar />
      <TableContainer>
        <div className="flex justify-between items-center pb-3 border-b border-neutral-gray-100">
          <Typography variant="h3">Insurance</Typography>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="xs" leftIcon="email">
              Email
            </Button>
            <Button variant="ghost" size="xs" leftIcon="print">
              Print
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            {/* Header row with a white background */}
            <TableRow className="bg-white hover:bg-white even:bg-white">
              <TableHead>Insurance</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Plan No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="w-20 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapping over data to create striped rows */}
            {insuranceData.map((item, index) => (
              <TableRow key={index} className={index % 2 !== 0 ? 'bg-neutral-50' : 'bg-white'}>
                <TableCell>{item.insurance}</TableCell>
                <TableCell>{item.plan}</TableCell>
                <TableCell>{item.planNo}</TableCell>
                <TableCell>
                  <Tag variant="success">{item.status}</Tag>
                </TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.endDate}</TableCell>
                <TableCell className="text-center">
                  <Button variant="tertiary" size="sm" className='text-text-header'>
                    <Icon name="more-vertical" className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ),
};

export const WithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Memoize the paginated data
    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return paginatedInvoices.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow className="bg-white hover:bg-white even:bg-white">
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTableData.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell>{invoice.invoice}</TableCell>
                <TableCell>
                  <Tag
                    variant={
                      invoice.status === 'Paid'
                        ? 'success'
                        : invoice.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {invoice.status}
                  </Tag>
                </TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalCount={paginatedInvoices.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </TableContainer>
    );
  },
};

export const WithDropdownActions: Story = {
  name: 'With Dropdown Action Menu',
  render: () => (
    <TableContainer>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-gray-100">
        <Typography variant="h3">Insurance Policies</Typography>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-white hover:bg-white even:bg-white">
            <TableHead>Insurance</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-20 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {insuranceData.map((item, index) => (
            <TableRow key={index} className={index % 2 !== 0 ? 'bg-neutral-50' : 'bg-white'}>
              <TableCell>{item.insurance}</TableCell>
              <TableCell>{item.plan}</TableCell>
              <TableCell>
                <Tag variant="success">{item.status}</Tag>
              </TableCell>
              <TableCell className="text-center">
                {/* --- THIS IS THE NEW PART --- */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="tertiary" size="sm" className='text-text-header'>
                      <Icon name="more-vertical" className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem>
                      <Icon name="edit" className="w-4 h-4 mr-2" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-danger-text focus:bg-danger focus:text-white">
                      <Icon name="trash" className="w-4 h-4 mr-2" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* --- END OF NEW PART --- */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
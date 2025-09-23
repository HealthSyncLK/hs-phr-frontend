'use client';

import { Card } from '@repo/ui/components/app/Card';
import { Input } from '@repo/ui/components/form/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/form/Select';
import { Button } from '@repo/ui/components/general/Button';
import { Icon } from '@repo/ui/components/general/Icon';
import React from 'react';

export const RecordsToolbar = () => {
    return (
        <Card variant='plain' className="p-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left side: Select Family Member */}
                <div className="w-full sm:w-auto sm:flex-1">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[313px]">
                            <SelectValue placeholder="Select Family Member" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="john">John (me)</SelectItem>
                            <SelectItem value="jane">Jane (Spouse)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Right side: Search and Filter */}
                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4">
                    <Input
                        placeholder="Search by Document Name or Doctor"
                        leftIcon="search"
                        className="w-full sm:w-[384px]"
                    />
                    <Button variant="secondary" className="w-full sm:w-auto">
                        <Icon name="filter" className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};
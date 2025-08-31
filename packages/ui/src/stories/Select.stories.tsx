import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '../components/form/Select';
import { FormControl } from '../components/form/FormControl';

const meta: Meta<typeof Select> = {
    title: 'Form Controls/Select',
    component: Select,
    subcomponents: { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue },
    tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Select> = {
    name: 'Default Select',
    render: () => {
        const [value, setValue] = useState('');
        return (
            <div className="w-full max-w-xs">
                <FormControl label="Select a Fruit">
                    <Select value={value} onValueChange={setValue}>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grape">Grape</SelectItem>
                        </SelectContent>
                    </Select>
                </FormControl>
            </div>
        );
    },
};


export const WithGroups: StoryObj<typeof Select> = {
    name: 'With Groups and a Disabled Item',
    render: () => {
        const [value, setValue] = useState('');
        return (
            <div className="w-full max-w-xs">
                <FormControl label="Select a Food">
                    <Select value={value} onValueChange={setValue}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a food..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                            </SelectGroup>
                            <SelectSeparator />
                            <SelectGroup>
                                <SelectLabel>Vegetables</SelectLabel>
                                <SelectItem value="carrot">Carrot</SelectItem>
                                <SelectItem value="broccoli">Broccoli</SelectItem>
                                <SelectItem value="spinach" disabled>Spinach (out of stock)</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormControl>
            </div>
        );
    },
};
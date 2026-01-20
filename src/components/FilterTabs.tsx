import { useState } from 'react';

interface FilterTabsProps {
    tabs: { id: string; label: string }[];
    defaultTab?: string;
    onChange?: (tabId: string) => void;
}

export default function FilterTabs({ tabs, defaultTab, onChange }: FilterTabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || 'all');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onChange?.(tabId);
    };

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
            ${activeTab === tab.id
                            ? 'bg-accent text-white shadow-lg shadow-accent/30'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
          `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

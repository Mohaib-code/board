"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { Loader } from "lucide-react";

interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
    const { organization, isLoaded } = useOrganization();

    // Show loading state while checking authentication
    if (!isLoaded) {
        return (
            <div className="flex-1 h-[calc(100%-80px)] p-5 flex items-center justify-center">
                <Loader className="h-8 w-8 text-muted-foreground animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-5">
            {!organization ? (
                <EmptyOrg />
            ) : (
                <BoardList orgId={organization.id} query={searchParams} />
            )}
        </div>
    );
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default DashboardPage;
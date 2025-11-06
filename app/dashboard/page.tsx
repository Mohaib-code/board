"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function DashboardContent() {
    const searchParams = useSearchParams();
    const { organization, isLoaded } = useOrganization();

    const searchParamsObject = {
        search: searchParams.get("search") || undefined,
        favorites: searchParams.get("favorites") || undefined,
    };

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
                <BoardList orgId={organization.id} query={searchParamsObject} />
            )}
        </div>
    );
}

const DashboardPage = () => {
    return (
        <Suspense
            fallback={
                <div className="flex-1 h-[calc(100%-80px)] p-5 flex items-center justify-center">
                    <Loader className="h-8 w-8 text-muted-foreground animate-spin" />
                </div>
            }
        >
            <DashboardContent />
        </Suspense>
    );
};

export default DashboardPage;
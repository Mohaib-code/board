"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";

export const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [debouncedValue, setValue] = useDebounceValue("", 500);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const currentSearch = searchParams.get("search") || "";
        setInputValue(currentSearch);
    }, [searchParams]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setValue(value);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                const input = document.querySelector("input");
                input?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const favorites = searchParams.get("favorites");
        const params = new URLSearchParams();

        if (debouncedValue) {
            params.set("search", debouncedValue);
        }

        if (favorites) {
            params.set("favorites", favorites);
        }

        const queryString = params.toString();
        const url = queryString ? `/dashboard?${queryString}` : "/dashboard";

        router.push(url);
    }, [debouncedValue, router, searchParams]);

    return (
        <div className="w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
                className="w-full pl-9"
                placeholder="Search boards"
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

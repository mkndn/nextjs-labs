import { Categories } from "@/components/categories";
import SearchInput from "@/components/search-input";
import prisma from "@/lib/prismadb";
import React from "react";

const RootPage = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};

export default RootPage;

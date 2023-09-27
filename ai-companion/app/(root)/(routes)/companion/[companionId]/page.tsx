import prisma from "@/lib/prismadb";
import React from "react";
import CompanionForm from "./components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

type CompanionIdProps = {
  params: {
    companionId?: string;
  };
};

const CompanionIdPage = async ({ params }: CompanionIdProps) => {
  //TODO check subscription
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prisma.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;

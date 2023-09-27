import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.companionId) {
      return new NextResponse("Companion ID is required", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("UNauthorized", { status: 401 });
    }
    if (
      !src ||
      !name ||
      !description ||
      !seed ||
      !instructions ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    //TODO check for subscription
    const companion = await prisma.companion.update({
      where: {
        id: params.companionId,
      },
      data: {
        categoryId,
        userId: user.id,
        src,
        description,
        instructions,
        name,
        userName: user.firstName,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[API_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

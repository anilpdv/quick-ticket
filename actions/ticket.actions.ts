"use server";

import { prisma } from "@/db/prisma";
import { logEvent } from "@/utils/sentry";

export async function createTicket(
  _pervState: { success: boolean; message: string },
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  try {
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;

    console.log(subject, description, priority);
    if (!subject || !description || !priority) {
      logEvent(
        "Ticket creation failed due to missing fields",
        "ticket",
        { subject, description, priority },
        "warning",
      );
      return { success: false, message: "All fields are required" };
    }

    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        priority,
      },
    });

    logEvent(
      "Ticket created successfully",
      "ticket",
      { ticketId: ticket.id },
      "info",
    );
    return { success: true, message: "Ticket created successfully" };
  } catch (error) {
    logEvent(
      "Error occurred while creating ticket",
      "ticket",
      {
        formData: Object.fromEntries(formData.entries()),
      },
      "error",
      error,
    );

    return {
      success: false,
      message: "An error occurred while creating the ticket",
    };
  }
}

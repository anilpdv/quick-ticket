import { redirect } from "next/navigation";
import NewTicketForm from "./ticket-form";
//import { getCurrentUser } from "@/lib/current-user";

const NewTicketPage = async () => {
  // const user = await getCurrentUser();
  const user = { id: 1, name: "Test User" }; // Placeholder for current user

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <NewTicketForm />
    </div>
  );
};

export default NewTicketPage;
